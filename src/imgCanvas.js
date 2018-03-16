/**
 * The imgCanvas in charge of appling effects on the image
 */
const imgCanvas = {
  MAX_SIZE: 480,

  /**
   * @parm outputImg {HTMLElement} The img element to hold the processed image.
   *                               Notice: This is not the source. Set the image
   *                               source by `setImg`
   */
  init(outputImg) {
    this._outputImg = outputImg;
    this._cvs = document.createElement("canvas");
    this._ctx = this._cvs.getContext("2d");
  },

  /**
   * Setting an image will remove the old image.
   *
   * @parm sourceImg {HTMLElement} The source img element
   */
  setImg(sourceImg) {
    console.log("TMP> setImg", sourceImg);

    let srcWidth = sourceImg.naturalWidth;
    let srcHeight = sourceImg.naturalHeight;

    let dstWidth = srcWidth;
    let dstHeight = srcHeight;
    if (dstWidth > this.MAX_SIZE) {
      dstWidth = this.MAX_SIZE;
      dstHeight = Math.floor(srcHeight * dstWidth / srcWidth);
    }
    if (dstHeight > this.MAX_SIZE) {
      dstHeight = this.MAX_SIZE;
      dstWidth = Math.floor(srcWidth * dstHeight / srcHeight);
    }

    let dimension = {
      srcX: 0,
      srcY: 0,
      srcWidth,
      srcHeight,
      dstWidth,
      dstHeight,
    };
    this._drawCanvas(sourceImg, dimension);
    this._outputImg.src = this._cvs.toDataURL();
  },

  _drawCanvas(img, dimension, filter) {
    let {
      srcX,
      srcY,
      srcWidth,
      srcHeight,
      dstWidth,
      dstHeight,
    } = dimension;

    this._ctx.clearRect(0, 0, this._cvs.width, this._cvs.height);
    this._cvs.width = dstWidth;
    this._cvs.height = dstHeight;
    
    if (filter) {
      this._ctx.filter = filter;
    }
    console.log("TMp> _drawCanvas", img.src);
    this._ctx.drawImage(img, 
      // The source dimesion
      srcX, srcY, srcWidth, srcHeight, 
      // The destination dimension
      0, 0, dstWidth, dstHeight);
  },

  _applyCSSFilter() {
    if (!this._outputImg.cssFilter) {
      return;
    }
    let filter = this._outputImg.cssFilter.style.filter;
    this._drawCanvas(this._outputImg, this._source, filter);
  },


  /**
   * @param range {Array} Shall be [lowerX, upperX, lowerY, upperY].
   *                           For example [0.3, 0.6, 0.3, 0.6] means
   *                           retain the area of 30% ~ 60% on the x axis and
   *                           30% ~ 60% on the y axis.
   */
  cropImg(range) {
    let [lowerX, upperX, lowerY, upperY] = range;
    let totalWidth = this._outputImg.naturalWidth;
    let totalHeight = this._outputImg.naturalHeight;
    let dimension = {
      srcX: Math.floor(totalWidth * lowerX),
      srcY: Math.floor(totalHeight * lowerY),
      srcWidth: Math.floor(totalWidth * (upperX - lowerX)),
      srcHeight: Math.floor(totalHeight * (upperY - lowerY))
    };
    dimension.dstWidth = dimension.srcWidth;
    dimension.dstHeight = dimension.srcHeight;
    this._drawCanvas(this._outputImg, dimension);
    this._outputImg.src = this._cvs.toDataURL();
  },

  /**
   * @param focusRange {Array} Shall be [lowerX, upperX, lowerY, upperY].
   *                           For example [0.3, 0.6, 0.3, 0.6] means
   *                           focus within the area of 30% ~ 60% on the x axis and
   *                           30% ~ 60% on the y axis.
   */
  applyDOF(focusRange) {
    // Always apply the css filter effects first
    // so we got them blended into our blur effect
    this._applyCSSFilter();
    let imgData = this._ctx.getImageData(0, 0, this._cvs.width, this._cvs.height);

    if (!focusRange) {
      focusRange = [0.3, 0.6, 0.3, 0.6];
    }

    // Notice 1: A focus range in the depth of field effect is the convolution-skipped range.
    //           Because we don't want it to be blur!
    // Notice 2: Below we do 2-stage convolution so a more smooth depth of field effect.
    let [lowerX, upperX, lowerY, upperY] = focusRange;
    let effects = [
      {
        kernel: this.BLUR_KERNEL_BY_3,
        skipRange: { lowerY, upperY, lowerX, upperX }
      },
      {
        kernel: this.BLUR_KERNEL_BY_5,
        skipRange: { 
          lowerY: lowerY / 2,
          upperY: (1 + upperY) / 2,
          lowerX: lowerX / 2,
          upperX: (1 + upperX) / 2,
        }
      }
    ];
    let newImgData = imgData;
    effects.forEach(effect => {
      newImgData = this._blurConvolute(newImgData, effect.kernel, effect.skipRange);
    });

    this._ctx.putImageData(newImgData, 0, 0);
    this._outputImg.src = this._cvs.toDataURL();
  },

  BLUR_KERNEL_BY_5: [
    0.023528, 0.033969, 0.038393, 0.033969, 0.023528,
    0.033969, 0.049045, 0.055432, 0.049045, 0.033969,
    0.038393, 0.055432, 0.062651, 0.055432, 0.038393,
    0.033969, 0.049045, 0.055432, 0.049045, 0.033969,
    0.023528, 0.033969, 0.038393, 0.033969, 0.023528,
  ],

  BLUR_KERNEL_BY_3: [
    0.095332, 0.118095, 0.095332,
    0.118095, 0.146293, 0.118095,
    0.095332, 0.118095, 0.095332,
  ],

  _blurConvolute(imgData, kernel, skipRange) {
    let w = imgData.width;
    let h = imgData.height;
    let src = imgData.data;
    let lowerY = Math.floor(skipRange.lowerY * h);
    let upperY = Math.floor(skipRange.upperY * h);
    let lowerX = Math.floor(skipRange.lowerX * w);
    let upperX = Math.floor(skipRange.upperX * w);

    let bound = Math.sqrt(kernel.length);
    let boundCenter = Math.floor(bound / 2);

    let newImgData = this._ctx.createImageData(this._cvs.width, this._cvs.height);

    for (let y = 0; y < h; ++y) {
      for (let x = 0; x < w; ++x) {
        let dstIdx = 4* (y * w + x);
        let r = 0, g = 0, b = 0, a = 0; // RGBA channels
        if (lowerY <= y && y <= upperY && lowerX <= x && x <= upperX) {
          // Don't convolute if in the skipped area
          r = src[dstIdx];
          g = src[dstIdx + 1];
          b = src[dstIdx + 2];
          a = src[dstIdx + 3];
        } else {
          for (let ky = 0; ky < bound; ++ky) {
            for (let kx = 0; kx < bound; ++kx) {
              let yConvoluted = y + ky - boundCenter;
              let xConvoluted = x + kx - boundCenter;
              if (0 <= yConvoluted && yConvoluted < h && 0 <= xConvoluted && xConvoluted < w) {
                let srcIdx = 4 * (yConvoluted * w + xConvoluted);
                let weight = kernel[ky * bound + kx];
                r += src[srcIdx] * weight;
                g += src[srcIdx+1] * weight;
                b += src[srcIdx+2] * weight;
                a += src[srcIdx+3] * weight;
              }
            }
          }
        }
        newImgData.data[dstIdx] = r;
        newImgData.data[dstIdx + 1] = g;
        newImgData.data[dstIdx + 2] = b;
        newImgData.data[dstIdx + 3] = a;
      }
    }
    return newImgData;
  }
};

export default imgCanvas;

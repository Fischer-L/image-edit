/**
 * The imgCanvas in charge of appling effects on the image
 */
const imgCanvas = {
  MAX_SIZE: 480,

  /**
   * @parm outputImg {HTMLElement} The img element to hold the processed image.
   *                               Notice: This is not the source. Set the image
   *                               source by `setSource`
   */
  init(outputImg) {
    this._outputImg = outputImg;
    this._cvs = document.createElement("canvas");
    this._ctx = this._cvs.getContext("2d");
    this._cssFilters = new Map();
    this._convolutionWorker = new Worker("convolutionWorker.bundle.js");
  },

  /**
   * Setting an image will remove the old image.
   *
   * @parm source {Object} The img source
   */
  setSource(source) {
    let srcWidth = source.img.naturalWidth;
    let srcHeight = source.img.naturalHeight;

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
    
    this._source = source;
    // Remembe to clear the old styles
    this._cssFilters.clear();
    this._outputImg.style.clipPath = "";

    if (!this._source.isCORS) {
      this._drawCanvas(source.img, dimension);
    }
    this._drawToImg(dstWidth, dstHeight);
  },

  /**.
   * @return {Promise} Once done, the promise will be resolved with the blob data 
   *                   of the processed image pulled from the canvas.
   *                   Null will be resolved if unable to pull the image blob.
   *                   Notice: unable to pull the blob if the source image is a CORS source.
   *
   */
  toBlob() {
    return new Promise(resolve => {
      if (!this._source || this._source.isCORS) {
        resolve(null);
        return;
      }
      window.requestIdleCallback(() => {
        let filter = this._outputImg.style.filter;
        let outputCtx = document.createElement("canvas").getContext("2d");
        outputCtx.canvas.width = this._cvs.width;
        outputCtx.canvas.height = this._cvs.height;
        if (filter) {
          outputCtx.filter = filter;
        }
        outputCtx.drawImage(this._cvs, 0, 0);
        outputCtx.canvas.toBlob(blob => resolve(blob));
      });
    });
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
    this._ctx.drawImage(img, 
      // The source dimesion
      srcX, srcY, srcWidth, srcHeight, 
      // The destination dimension
      0, 0, dstWidth, dstHeight);
  },

  _drawToImg(w, h) {
    this._outputImg.width = w; //this._cvs.width;
    this._outputImg.height = h; //this._cvs.height;
    // If the source is from the internel,
    // we can't extract image data from the canvas because of the CORS policy.
    // So use the regular img source instead.
    this._outputImg.src = 
      this._source.isCORS ? this._source.img.src : this._cvs.toDataURL();
    this._applyCSSFilter();
  },

  _applyCSSFilter() {
    if (this._cssFilters.size) {
      let rules = [];
      this._cssFilters.forEach((lv, effect) => {
        rules += `${effect}(${lv}%) `;
      });
      this._outputImg.style.filter = rules;
    } else {
      this._outputImg.style.filter = "";
    }
  },

  /**
   * @param lv {Number} the effect level from 0 ~ 1
   */
  applyGrayScale(lv) {
    if (!this._source) {
      return;
    }

    lv = lv * 100;
    if (lv != this._cssFilters.get("sepia")) {
      this._cssFilters.set("grayscale", lv);
      this._applyCSSFilter();
    }
  },

  /**
   * @param lv {Number} the effect level from 0 ~ 1
   */
  applySepia(lv) {
    if (!this._source) {
      return;
    }

    lv = lv * 100;
    if (lv != this._cssFilters.get("sepia")) {
      this._cssFilters.set("sepia", lv);
      this._applyCSSFilter();
    }
  },

  /**
   * @param range {Array} Shall be [lowerX, upperX, lowerY, upperY].
   *                           For example [0.3, 0.6, 0.3, 0.6] means
   *                           retain the area of 30% ~ 60% on the x axis and
   *                           30% ~ 60% on the y axis.
   */
  cropImg(range) {
    if (!this._source) {
      return;
    }

    // Because of CORS, we can't do advanced canvas operation.
    // So simply fall back to the css solution
    if (this._source.isCORS) {
      let [lowerX, upperX, lowerY, upperY] = range.map(bound => bound * 100 + "%");
      this._outputImg.style.clipPath =
        `polygon(${lowerX} ${lowerY}, ${upperX} ${lowerY}, ${upperX} ${upperY}, ${lowerX} ${upperY})`;
      return;
    }

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
    this._drawToImg(dimension.dstWidth, dimension.dstHeight);
  },

  /**
   * Notice: If the source image is a CORS source, applying this effect is an no-op.
   *
   * @param focusRange {Array} Shall be [lowerX, upperX, lowerY, upperY].
   *                           For example [0.3, 0.6, 0.3, 0.6] means
   *                           focus within the area of 30% ~ 60% on the x axis and
   *                           30% ~ 60% on the y axis.
   */
  async applyDOF(focusRange) {
    if (!this._source || this._source.isCORS) {
      return;
    }

    let imgData = this._ctx.getImageData(0, 0, this._cvs.width, this._cvs.height);
    let newImgData = await new Promise(resolve => {
      this._convolutionWorker.onmessage = e => {
        this._convolutionWorker.onmessage = null;
        resolve(e.data);
      };
      this._convolutionWorker.postMessage([ imgData, focusRange ]);
    });
    this._ctx.putImageData(newImgData, 0, 0);
    this._drawToImg(this._cvs.width, this._cvs.height);
  },
};

export default imgCanvas;

const convolutor = {
  applyDOF(imgData, focusRange) {
    // Notice 1: A focus range in the depth of field effect is the convolution-skipped range.
    //           Because we don't want it to be blur!
    // Notice 2: Below we do multi-stage convolutions and the convolution order matters.
    //           Each convolution will blur the previous one so a more smooth depth of field effect.
    let [lowerX, upperX, lowerY, upperY] = focusRange;
    let effects = [
      {
        kernel: this.BLUR_KERNEL_BY_5_SIGMA_12,
        skipRange: { 
          lowerY: lowerY / 2,
          upperY: (1 + upperY) / 2,
          lowerX: lowerX / 2,
          upperX: (1 + upperX) / 2,
        }
      },
      {
        kernel: this.BLUR_KERNEL_BY_3_SIGMA_12,
        skipRange: { 
          lowerY: lowerY * 0.8,
          upperY: upperY + (1 - upperY) * 0.2,
          lowerX: lowerX * 0.8,
          upperX: upperX + (1 - upperX) * 0.2,
        }
      },
      {
        kernel: this.BLUR_KERNEL_BY_3_SIGMA_55,
        skipRange: { lowerY, upperY, lowerX, upperX }
      },
    ];
    let newImgData = imgData;
    effects.forEach(effect => {
      newImgData = this._blurConvolute(newImgData, effect.kernel, effect.skipRange);
    });
    return newImgData;
  },

  BLUR_KERNEL_BY_5_SIGMA_12: [
    0.008173, 0.021861, 0.030337, 0.021861, 0.008173,
    0.021861, 0.058473, 0.081144, 0.058473, 0.021861,
    0.030337, 0.081144, 0.112606, 0.081144, 0.030337,
    0.021861, 0.058473, 0.081144, 0.058473, 0.021861,
    0.008173, 0.021861, 0.030337, 0.021861, 0.008173,
  ],
  
  BLUR_KERNEL_BY_3_SIGMA_12: [
    0.087133, 0.120917, 0.087133,
    0.120917, 0.167799, 0.120917,
    0.087133, 0.120917, 0.087133,
  ],

  BLUR_KERNEL_BY_3_SIGMA_55: [
    0.032258, 0.115089, 0.032258,
    0.115089, 0.410612, 0.115089,
    0.032258, 0.115089, 0.032258,
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

    let newImgData = new ImageData(w, h);

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

onmessage = e => {
  postMessage(convolutor.applyDOF(...e.data));
};

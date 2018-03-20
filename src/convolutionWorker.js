const convolutor = {
  applyDOF(imgData, focusRange) {
    // Notice 1: A focus range in the depth of field effect is the convolution-skipped range.
    //           Because we don't want it to be blur!
    // Notice 2: Below we do multi-stage convolutions and the convolution order matters.
    //           Each convolution will blur the previous one so a more smooth depth of field effect.
    let [lowerX, upperX, lowerY, upperY] = focusRange;
    let effects = [
      {
        kernel: this.BLUR_KERNEL_BY_5_SIGMA_15,
        skipRange: {
          lowerY: lowerY * 0.7,
          upperY: upperY + (1 - upperY) * 0.3,
          lowerX: lowerX * 0.7,
          upperX: upperX + (1 - upperX) * 0.3,
        }
      },
      {
        kernel: this.BLUR_KERNEL_BY_3_SIGMA_15,
        skipRange: {
          lowerY: lowerY * 0.9,
          upperY: upperY + (1 - upperY) * 0.1,
          lowerX: lowerX * 0.9,
          upperX: upperX + (1 - upperX) * 0.1,
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
  
  BLUR_KERNEL_BY_5_SIGMA_15: [
    0.015026, 0.028569, 0.035391, 0.028569, 0.015026,
    0.028569, 0.054318, 0.067288, 0.054318, 0.028569,
    0.035391, 0.067288, 0.083355, 0.067288, 0.035391,
    0.028569, 0.054318, 0.067288, 0.054318, 0.028569,
    0.015026, 0.028569, 0.035391, 0.028569, 0.015026,
  ],

  BLUR_KERNEL_BY_3_SIGMA_15: [
    0.095332, 0.118095, 0.095332,
    0.118095, 0.146293, 0.118095,
    0.095332, 0.118095, 0.095332,
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

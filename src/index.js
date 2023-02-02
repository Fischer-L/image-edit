import "./index.css";

import imgLoader from "./imgLoader";
import imgCanvas from "./imgCanvas";

import loadingSVG from "./loading.svg";


const imgEditor = {
  init(imgCanvas, imgLoader) {
    this._imgEditor = document.querySelector("#img-editor");
    this._controlPanel = this._imgEditor.querySelector("#control-panel");
    this._coverArea = this._imgEditor.querySelector("#img-panel__cover_area");
    this._coverImg = this._imgEditor.querySelector("#img-panel-cover-img");
    this._outputImg = this._imgEditor.querySelector("#img-panel-output-img");
    this._dropArea = this._imgEditor.querySelector("#img-panel__drop-area");

    this._imgCanvas = imgCanvas;
    this._imgCanvas.init(this._outputImg);
    this._imgLoader = imgLoader;
    this._imgLoader.init(this._imgEditor, this);

    this._controlPanel.addEventListener("click", e => this.onClick(e));
    this._controlPanel.addEventListener("change", e => this.onChange(e));
    this._controlPanel.addEventListener("mousedown", e => this.onMousedown(e));

    this._resetControlPanel();
    window._imgEditor = imgEditor;
  },

  _resetControlPanel() {
    let inputs = this._controlPanel.querySelectorAll(".control-input");
    for (let input of inputs) {
      input.value = input.min;
    }

    let dofControl = this._controlPanel.querySelector("#effect-dof").parentNode;
    let downloadControl = this._controlPanel.querySelector("#download").parentNode;
    if (this._source && this._source.isCORS) {
      // If it is a CORS source, our canvas usage is restricted.
      // So we don't support the download and the dof efect
      dofControl.classList.add("no-display");
      downloadControl.classList.add("no-display");
    } else {
      dofControl.classList.remove("no-display");
      downloadControl.classList.remove("no-display");
    }

    const urlBtn = document.querySelector("#url-input-btn");
    if (ENV_DISABLE_URL_INPUT && urlBtn) {
      urlBtn.remove();
    }
  },

  onClick(e) {
    if (!this._source) {
      return;
    }

    switch (e.target.id) {
      case "effect-crop":
        this._selectImgRange(range => this.cropImg(range));
        return;

      case "effect-dof":
        this._selectImgRange(range => this.applyDOF(range));
        return;

      case "download":
        this.download();
        return;
    }
  },

  onChange(e) {
    if (!this._source) {
      return;
    }

    switch (e.target.id) {
      case "effect-sepia":
      case "effect-grayscale":
        this._applyFilterChange(e.target);
        return;
    }
  },

  onMousedown(e) {
    if (!this._source) {
      return;
    }
    
    switch (e.target.id) {
      case "effect-sepia":
      case "effect-grayscale":
        this._trackFilterChange(e.target);
        return;
    }
  },

  onImgLoaded(source) {
    this._source = source;
    this._imgCanvas.setSource(source);
    this._dropArea.classList.add("no-display");
    this._outputImg.classList.remove("no-display");
    this._resetControlPanel();
    window._imgCanvas = this._imgCanvas;
  },

  async download() {
    let blob = await this._imgCanvas.toBlob();
    if (!blob) {
      return;
    }

    let link = this._controlPanel.querySelector("#download-link");
    link.href = URL.createObjectURL(blob);
    link.download = Date.now() + ".jpg";
    // Remember to release the blob we don't like the memory leak.
    window.setTimeout(() => {
      URL.revokeObjectURL(link.href);
      link.href = "";
      link = null;
    }, 150000);
    link.click();
  },

  _applyFilterChange(input) {
    switch (input.id) {
      case "effect-sepia":
        this.applySepia(input.value);
        return;

      case "effect-grayscale":
        this.applyGrayScale(input.value);
        return;
    }
  },

  _trackFilterChange(input) {
    if (this._onUserDragInput) {
      return; // Already tracking
    }

    this._onUserDragInput = () => this._applyFilterChange(input);
    input.addEventListener("mousemove", this._onUserDragInput);

    this._stopTrackFilterChange = () => {
      input.removeEventListener("mousemove", this._onUserDragInput);
      input.removeEventListener("mouseup", this._stopTrackFilterChange);
      this._onUserDragInput = this._stopTrackFilterChange = null;
    };
    input.addEventListener("mouseup", this._stopTrackFilterChange);
  },

  _showCoverImg(coverImg, coverArea) {
    this._coverImg.src = coverImg.src;
    this._coverImg.style.width = coverImg.width ? coverImg.width + "px" : "";
    this._coverImg.style.height = coverImg.height ? coverImg.height + "px" : "";
    this._coverImg.style.clipPath = coverImg.clipPath || "";

    this._coverArea.style.width = coverArea.width ? coverArea.width + "px" : "";
    this._coverArea.style.height = coverArea.height ? coverArea.height + "px" : "";
    this._coverArea.style.clipPath = coverArea.clipPath || "";
    let className = "img-panel--center ";
    if (coverArea.className) {
      className += coverArea.className;
    }
    this._coverArea.className = className;
  },

  _hideCoverImg() {
    this._coverArea.className = "no-display";
  },

  async _selectImgRange(onSelect) {
    if (this._selectRangePromise) {
      return; // Already tracking
    }
    this._selectRangePromise = this._trackImgSelectRange();
    let range = await this._selectRangePromise;
    if (range) {
      onSelect(range);
    }
    this._selectRangePromise = null;
  },

  async _trackImgSelectRange() {
    if (this._pickSelectRangeOrign) {
      return; // Already start
    }
    
    let pos = await new Promise(resolve => {
      let totalWidth = this._outputImg.width;
      let totalHeight = this._outputImg.height;
      this._pickSelectRangeOrign = e => {
        this._coverArea.removeEventListener("mousedown", this._pickSelectRangeOrign);
        resolve([e.offsetX, e.offsetY, totalWidth, totalHeight])
      };
      this._coverArea.addEventListener("mousedown", this._pickSelectRangeOrign);
      this._showCoverImg({
        src: this._outputImg.src,
        clipPath: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",
        width: totalWidth,
        height: totalHeight
      }, {
        clipPath: this._outputImg.style.clipPath,
        width: totalWidth,
        height: totalHeight
      });
    });

    return this._detectRangeOnMousemove(...pos);
  },

  /**
   * @param originX {Number} the origin x cordinate on the image
   * @param originY {Number} the origin y cordinate on the image
   * @param totalWidth {Number} the total width of the image
   * @param totalHeight {Number} the total height of the image
   */
  _detectRangeOnMousemove(originX, originY, totalWidth, totalHeight) {
    if (this._drawImgSelectRange) {
      return; //Already drawing
    }

    return new Promise(resolve => {
      this._drawImgSelectRange = e => {
        let range = this._computeSelectRange(
          totalWidth, totalHeight, [originX, originY], [e.offsetX, e.offsetY]);
        let [lowerX, upperX, lowerY, upperY] = range.map(bound => bound * 100 + "%");
        this._coverImg.style.clipPath =
          `polygon(${lowerX} ${lowerY}, ${upperX} ${lowerY}, ${upperX} ${upperY}, ${lowerX} ${upperY})`;
      };
      this._coverArea.addEventListener("mousemove", this._drawImgSelectRange);
      
      this._stopTrackImgSelectRange = e => {
        this._coverArea.removeEventListener("mousemove", this._drawImgSelectRange);
        this._coverArea.removeEventListener("mouseup", this._stopTrackImgSelectRange);
        this._pickSelectRangeOrign = this._drawImgSelectRange = this._stopTrackImgSelectRange = null;

        let range = this._computeSelectRange(
          totalWidth, totalHeight, [originX, originY], [e.offsetX, e.offsetY]);
        // Alwasy hide the cover area in the end so as to keep the mouse position correct
        this._hideCoverImg();
        resolve(range);
      };
      this._coverArea.addEventListener("mouseup", this._stopTrackImgSelectRange);
    });
  },

  _computeSelectRange(totalWidth, totalHeight, startPos, endPos) {
    // `startX` is the start point of the slection range bound (0 ~ 1) on the x axis.
    // `startY` is for the y axis.
    let startX = startPos[0] / totalWidth;
    let startY = startPos[1] / totalHeight;
    let endX = endPos[0] / totalWidth;
    let endY = endPos[1] / totalHeight;
    let lowerX = Math.min(startX, endX);
    let upperX = Math.max(startX, endX);
    let lowerY = Math.min(startY, endY);
    let upperY = Math.max(startY, endY);
    return [lowerX, upperX, lowerY, upperY];
  },

  cropImg(range) {
    window.requestAnimationFrame(() => this._imgCanvas.cropImg(range));
  },

  applyDOF(range) {
    window.requestAnimationFrame(async () => {
      this._showCoverImg({
        src: loadingSVG,
      }, {
        className: "loading-img",
        width: this._outputImg.width,
        height: this._outputImg.height
      });
      await this._imgCanvas.applyDOF(range);
      this._hideCoverImg();
    });
  },

  applySepia(lv) {
    window.requestAnimationFrame(() => this._imgCanvas.applySepia(lv));
  },

  applyGrayScale(lv) {
    window.requestAnimationFrame(() => this._imgCanvas.applyGrayScale(lv));
  }
};

imgEditor.init(imgCanvas, imgLoader);

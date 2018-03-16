import "./index.css";

import imgLoader from "./imgLoader";
import imgCanvas from "./imgCanvas";

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
    let inputs = this._controlPanel.querySelectorAll(".control__input");
    for (let input of inputs) {
      input.value = input.min;
    }
  },

  onClick(e) {
    switch (e.target.id) {
      case "effect-crop":
        this._selectImgRange(range => this.cropImg(range));
        return;

      case "effect-dof":
        this._selectImgRange(range => this.applyDOF(range));
        return;
    }
  },

  onChange(e) {
    switch (e.target.id) {
      case "effect-sepia":
      case "effect-grayscale":
        this._applyFilterChange(e.target);
        return;
    }
  },

  onMousedown(e) {
    switch (e.target.id) {
      case "effect-sepia":
      case "effect-grayscale":
        this._trackFilterChange(e.target);
        return;
    }
  },

  onImgLoaded(img) {
    this._resetControlPanel();
    this._imgCanvas.setImg(img);
    this._dropArea.classList.add("no-display");
    this._outputImg.classList.remove("no-display");
    window._imgCanvas = this._imgCanvas;
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

  _showCoverImg(src, w, h) {
    this._coverImg.style.width = this._coverArea.style.width = w + "px";
    this._coverImg.style.height = this._coverArea.style.height = h + "px";
    this._coverImg.src = src;
    this._coverArea.classList.remove("no-display");
  },

  _hideCoverImg() {
    this._coverArea.classList.add("no-display");
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
      this._coverImg.style.clipPath = "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)";
      this._showCoverImg(this._outputImg.src, totalWidth, totalHeight);
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
    window.requestAnimationFrame(() => this._imgCanvas.applyDOF(range));
  },

  applySepia(lv) {
    window.requestAnimationFrame(() => this._imgCanvas.applySepia(lv));
  },

  applyGrayScale(lv) {
    window.requestAnimationFrame(() => this._imgCanvas.applyGrayScale(lv));
  }
};

imgEditor.init(imgCanvas, imgLoader);

import "./index.css";

import imgLoader from "./imgLoader";
import imgCanvas from "./imgCanvas";

const imgEditor = {
  init() {
    this._imgEditor = document.querySelector("#img-editor");
    this._coverArea = this._imgEditor.querySelector("#img-panel__cover_area");
    this._coverImg = this._imgEditor.querySelector("#img-panel-cover-img");
    this._outputImg = this._imgEditor.querySelector("#img-panel-output-img");
    this._dropArea = this._imgEditor.querySelector("#img-panel__drop-area");
    imgCanvas.init(this._outputImg);
    imgLoader.init(this._imgEditor, this);

    this._imgEditor.addEventListener("click", e => this.onClick(e));

    let tmp_selectBtn = this._imgEditor.querySelector("#select-btn");
    tmp_selectBtn.addEventListener("click", e => this._startSelectImgRange());
    window._imgEditor = imgEditor;
  },

  onClick(e) {
    switch (e.target.id) {
      case "effect-crop-btn":
        this.cropImg();
        return;

      case "effect-dof-btn":
        this.applyDOF()
        return;
    }
  },

  onImgLoaded(img) {
    imgCanvas.setImg(img);
    this._dropArea.classList.add("no-display");
    this._outputImg.classList.remove("no-display");

    window._imgCanvas = imgCanvas;
  },

  async cropImg() {
    let range = await this._selectImgRange();
    if (range) {
      imgCanvas.cropImg(range);
    }
  },

  async applyDOF() {
    let focusRange = await this._selectImgRange();
    if (focusRange) {
      imgCanvas.applyDOF(focusRange);
    }
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

  async _selectImgRange() {
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
      
      this._endSelectImgRange = e => {
        this._coverArea.removeEventListener("mousemove", this._drawImgSelectRange);
        this._coverArea.removeEventListener("mouseup", this._endSelectImgRange);
        this._pickSelectRangeOrign = this._drawImgSelectRange = this._endSelectImgRange = null;

        let range = this._computeSelectRange(
          totalWidth, totalHeight, [originX, originY], [e.offsetX, e.offsetY]);
        // Alwasy hide the cover area in the end so as to keep the mouse position correct
        this._hideCoverImg();
        resolve(range);
      };
      this._coverArea.addEventListener("mouseup", this._endSelectImgRange);
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
};

imgEditor.init();

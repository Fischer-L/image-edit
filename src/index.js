import "./index.css";

import imgLoader from "./imgLoader";
import imgCanvas from "./imgCanvas";

const imgEditor = {
  init() {
    this._imgEditor = document.querySelector("#img-editor");
    this._outputImg = this._imgEditor.querySelector("#img-panel-output-img");
    this._dropArea = this._imgEditor.querySelector("#img-panel-drop-area");
    imgCanvas.init(this._outputImg);
    imgLoader.init(this._imgEditor, this);
  },

  onImgLoaded(img) {
    this._sourceImg = img;
    this._dropArea.style.display = "none";
    imgCanvas.setImg(this._sourceImg);
    window._imgCanvas = imgCanvas;
  }
};

imgEditor.init();

/**
 * The imgLoader in charge of loading img from a URL or a local file
 */
const imgLoader  = {
  /**
   * @param imgEditor {HTMLELement} the #img-editor element
   * @param listener {Object} an object with the `onImgLoaded` method.
   *                          When an new image is loaded, the method will be called with the source loaded.
   */
  init(imgEditor, listener) {
    this._img = null;
    this._listener = listener;
    this._inputFile = imgEditor.querySelector("#input-file");
    this._imgDropArea = imgEditor.querySelector("#img-panel__drop-area");

    imgEditor.addEventListener("click", e => this._handleClick(e));

    this._inputFile.addEventListener("change", e => {
      console.log("TMP> Onchange");
      this._handleInputFromFile(e);
    });

    this._imgDropArea.addEventListener("dragover", e => {
      console.log("TMP> Ondragover");
      e.stopPropagation();
      e.preventDefault();
    });
    this._imgDropArea.addEventListener("drop", e => {
      console.log("TMP> OnDrop");
      e.stopPropagation();
      e.preventDefault();
      this._handleInputFromFile(e);
    });

    console.log("TMP> imgLoader init");
  },

  _handleClick(e) {
    switch (e.target.id) {
      case "file-input-btn":
        this._inputFile.click();
        break;

      case "url-input-btn":
        let url = prompt("Please input the image url");
        this._handleInputFromURL(url);
        break;
    }
  },

  _createImg(url, isCORS) {
    let img = new Image();
    img.onload = () => {
      console.log("TMP> Image Created");
      img.onload = null;
      // If the image is from the internet,
      // the usage of canvas with image will be restricted because of CORS.
      // Expose this info to let outside know.
      this._listener.onImgLoaded({ img, isCORS });
    };
    img.src = url;
  },

  _handleInputFromURL(url) {
    // Check https or http or base64 urls
    let reg = /https:\/\/|http:\/\/|data:image\/png;base64/;
    if (!url || url.search(reg) !== 0) {
      return;
    }
    // An new image coming, release the old one in case the memory leak
    this._revokeImgObjURL();
    this._createImg(url, true);
  },

  _handleInputFromFile(e) {
    let files = e.target.files || e.dataTransfer.files;
    let file = files ? files[0] : null; // Currently only support a single file first
    if (!file || !file.type.match("image/*")) {
      return;
    }
    // An new image coming, release the old one in case the memory leak
    this._revokeImgObjURL();
    this._imgObjURL = URL.createObjectURL(file);
    // A workaound for Chrome:
    // User uploads the a.jpg and apply wrong effects, then re-uploads the a.jpg.
    // In this case Chrome won't fire the change event on the file input (FF does).
    // We have change the type so the next time the change will be invoked.
    this._inputFile.type = "hidden";
    this._createImg(this._imgObjURL, false);
    this._inputFile.type = "file";
  },

  _revokeImgObjURL() {
    if (this._imgObjURL) {
      URL.revokeObjectURL(this._imgObjURL);
      this._imgObjURL = null;
    }
  }
};

export default imgLoader;

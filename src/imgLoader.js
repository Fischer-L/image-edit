/**
 * The imgLoader in charge of loading img from a URL or a local file
 */
const imgLoader  = {
  /**
   * @param imgEditor {HTMLELement} the #img-editor element
   * @param listener {Object} an object with the `onImgLoaded` method.
   *                          When an new image is loaded, 
   *                          the method will be called with the image loaded.
   */
  init(imgEditor, listener) {
    this._img = null;
    this._listener = listener;
    this._inputFile = imgEditor.querySelector("#input-file");
    this._imgDropArea = imgEditor.querySelector("#img-panel-drop-area");

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

  _createImg(url) {
    let img = new Image();
    img.onload = () => {
      console.log("TMP> Image Created");
      img.onload = null;
      this._listener.onImgLoaded(img);
    };
    img.src = url;
  },

  _handleInputFromURL(url) {
    // Check https or http or base64 urls
    let reg = /https:\/\/|http:\/\/|data:image\/png;base64/;
    if (!url || url.search(reg) !== 0) {
      return;
    }
    this._createImg(url);
  },

  _handleInputFromFile(e) {
    let files = e.target.files || e.dataTransfer.files;
    let file = files ? files[0] : null; // Currently only support a single file first
    if (!file || !file.type.match("image/*")) {
      return;
    }
    this._createImg(URL.createObjectURL(file));
  },
};

export default imgLoader;

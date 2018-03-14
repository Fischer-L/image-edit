/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./src/flexMenu.css":
/*!****************************************************!*\
  !*** ./node_modules/css-loader!./src/flexMenu.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#flexMenu {\n  --border-color: #e2e2e2;\n  width: 98%;\n  padding: 0;\n  margin: 10px auto;\n  border: 1px solid var(--border-color);\n  color: var(--text-color);\n}\n\n.flexMenu__item {\n  width: 100%;\n  display: flex;\n  border-top: 1px solid var(--border-color);\n}\n\n.flexMenu__item:first-child {\n  border-top: none; \n}\n\n.flexMenu__item-attr,\n.flexMenu__item-header {\n  text-align: center;\n  padding: 10px 0;\n  border-right: 1px solid var(--border-color);\n  word-break: break-all;\n}\n\n.flexMenu__item-attr:last-child,\n.flexMenu__item-header:last-child {\n  border-right: none;\n}\n\n.flexMenu__item-header {\n  font-weight: 900;\n  cursor: pointer;\n  background: #f1f1f1;\n}\n\n@media screen and (max-width: 768px) {\n  .flexMenu__item-header {\n    padding: 16px 0;\n  }\n}\n\n.flexMenu__item-name {\n  flex: 1;\n}\n\n.flexMenu__item-desc {\n  flex: 2;\n}\n\n.flexMenu__item-price {\n  flex: 1;\n}\n\n.flexMenu__item-img {\n  flex: 1;\n}\n\n.flexMenu__item-img > img {\n  width: 60%;\n}\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./src/index.css":
/*!*************************************************!*\
  !*** ./node_modules/css-loader!./src/index.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "html {\n  --text-color: #555;\n}\n\n.menu-nav__button {\n  border: 1px solid #efefef;\n  padding: 10px 20px;\n  background: #f1f1f1;\n  margin-right: 10px;\n  outline: none;\n  color: var(--text-color);\n}\n\n.menu-nav__button:hover {\n  border: 1px solid #e1e1e1;\n  background: #e9e9e9;\n}\n\n#menu-container {\n  width: 100%;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./src/data.js":
/*!*********************!*\
  !*** ./src/data.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var img = "https://www.google.com.tw/images/branding/googlelogo/2x/googlelogo_color_120x44dp.png";
var data = [];
for (var i = 0; i < 100; i++) {
  var item = {
    name: "Name_" + i,
    price: i,
    desc: "Given preorder and inorder traversal of a tree, construct the binary tree.",
    link: img,
    img: img
  };
  if (i == 0) {
    item.name += "<script type='text/javascript'>alert('XSS Hijacked !!!');</script>";
  }
  if (i == 1) {
    item.link = "javascript:void(alert('XSS Hijacked !!!'))";
  }
  if (i == 2) {
    item.img = item.img + "''>" + "<img style='visibility:hidden' src='?' onerror='alert(\"XSS Hijacked !!!\")'>" + "<img style='visibility:hidden'";
  }
  data.push(item);
}
exports.default = data;

/***/ }),

/***/ "./src/flexMenu.css":
/*!**************************!*\
  !*** ./src/flexMenu.css ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader!./flexMenu.css */ "./node_modules/css-loader/index.js!./src/flexMenu.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/flexboxMenu.js":
/*!****************************!*\
  !*** ./src/flexboxMenu.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(/*! ./flexMenu.css */ "./src/flexMenu.css");

var _util = __webpack_require__(/*! ./util.js */ "./src/util.js");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var flexboxMenu = {
  build: function build(menuContainer, data) {
    var _this = this;

    this._menuContainer = menuContainer;
    menuContainer.innerHTML = "";

    this._flexMenu = document.getElementById("flexMenu");
    if (!this._flexMenu) {
      this._flexMenu = this._createFlexMenu();
      menuContainer.appendChild(this._flexMenu);
    }

    this._data = _util2.default.sortData(data.slice(), "name", "ASC");
    this._updateMenuItems(this._data);
    this._flexMenu.addEventListener("click", function (e) {
      return _this.onClick(e);
    });
  },
  onClick: function onClick(e) {
    var target = e.target;
    if (!target.classList.contains("flexMenu__item-header")) {
      return;
    }
    var sortAttr = target.classList.contains("flexMenu__item-name") ? "name" : target.classList.contains("flexMenu__item-price") ? "price" : null;
    var dir = target.getAttribute("data-dir") || "ASC";
    dir = dir == "ASC" ? "DSC" : "ASC";
    if (sortAttr) {
      this._data = _util2.default.sortData(this._data, sortAttr, dir);
      target.setAttribute("data-dir", dir);
      this._updateMenuItems(this._data);
    }
  },
  _updateMenuItems: function _updateMenuItems(data) {
    var _this2 = this;

    window.requestAnimationFrame(function () {
      var items = Array.from(_this2._flexMenu.children);
      items.shift();
      var dataNum = data.length;
      var itemNum = items.length;
      for (; dataNum > 0, itemNum > 0; --dataNum, --itemNum) {
        var i = data.length - dataNum;
        var j = items.length - itemNum;
        items[j] = _this2._safeInsertMenuData(items[j], data[i]);
      }

      if (dataNum < itemNum) {
        for (; itemNum > 0; --itemNum) {
          var _j = item.length - itemNum;
          items[_j].remove();
        }
      } else if (dataNum > itemNum) {
        var frag = document.createDocumentFragment();
        for (; dataNum > 0; --dataNum) {
          var _i = data.length - dataNum;
          frag.appendChild(_this2._createMenuItem(data[_i]));
        }
        _this2._flexMenu.appendChild(frag);
      }
    });
  },
  _createFlexMenu: function _createFlexMenu() {
    var ul = document.createElement("ul");
    ul.id = "flexMenu";
    ul.innerHTML = "\n      <li class=\"flexMenu__item\">\n        <div class=\"flexMenu__item-name flexMenu__item-header\">Name</div>\n        <div class=\"flexMenu__item-desc flexMenu__item-header\">Description</div>\n        <div class=\"flexMenu__item-price flexMenu__item-header\">Price</div>\n        <div class=\"flexMenu__item-img flexMenu__item-header\">Image</div>\n      </li>\n    ";
    return ul;
  },
  _createMenuItem: function _createMenuItem(data) {
    var li = document.createElement("li");
    li.classList.add("flexMenu__item");
    li.innerHTML = "\n      <div class=\"flexMenu__item-name flexMenu__item-attr\"></div>\n      <div class=\"flexMenu__item-desc flexMenu__item-attr\"></div>\n      <div class=\"flexMenu__item-price flexMenu__item-attr\"></div>\n      <div class=\"flexMenu__item-img flexMenu__item-attr\"></div>\n    ";
    return this._safeInsertMenuData(li, data);
  },
  _safeInsertMenuData: function _safeInsertMenuData(item, _ref) {
    var name = _ref.name,
        desc = _ref.desc,
        price = _ref.price,
        img = _ref.img,
        link = _ref.link;

    item.children[0].innerHTML = "";
    item.children[1].innerHTML = "";
    item.children[2].innerHTML = "";
    item.children[3].innerHTML = "";

    link = link.trim();
    if (link.indexOf("javascript") != 0) {
      var a = document.createElement("a");
      a.href = link;
      a.textContent = name;
      item.children[0].appendChild(a);
    } else {
      item.children[0].textContent = name;
    }

    item.children[1].textContent = desc;
    item.children[2].textContent = price;

    var imgElem = document.createElement("img");
    imgElem.src = img;
    item.children[3].appendChild(imgElem);

    // item.children[3].innerHTML = "<img src='" + img + "'>";

    return item;
  }
};

exports.default = flexboxMenu;

/***/ }),

/***/ "./src/gridMenu.js":
/*!*************************!*\
  !*** ./src/gridMenu.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(/*! ./flexMenu.css */ "./src/flexMenu.css");

var _util = __webpack_require__(/*! ./util.js */ "./src/util.js");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gridMenu = {
  build: function build(menuContainer, data) {
    this._menuContainer = menuContainer;
    menuContainer.innerHTML = "";

    this._gridMenu = document.getElementById("grideMenu");
    if (!this._gridMenu) {
      this._gridMenu = this._createGirdMenu();
      menuContainer.appendChild(this._gridMenu);
    }

    this._data = _util2.default.sortData(data.slice(), "name", "ASC");
    this._updateMenuItems(this._data);
  },
  _createGirdMenu: function _createGirdMenu() {
    var article = document.createElement("article");
    article.id = "gridMenu";
    article.innerHTML = "\n      <section class=\"gridMenu__headers\">\n        <div class=\"gridMenu__header gridMenu__header--name\">Name</div>\n        <div class=\"gridMenu__header gridMenu__header--desc\">Description</div>\n        <div class=\"gridMenu__header gridMenu__header--price\">Price</div>\n        <div class=\"gridMenu__header gridMenu__header--img\">Image</div>\n      </section>\n      <ul class=\"gridMenu__body\">\n      </ul>\n    ";
    return ul;
  },
  _createMenuItem: function _createMenuItem(_ref) {
    var name = _ref.name,
        desc = _ref.desc,
        price = _ref.price,
        img = _ref.img,
        link = _ref.link;

    var item = document.createElement("li");
    item.classList.add("gridMenu__item");
    item.innerHTML = "\n      <div class=\"gridMenu__item-attr gridMenu__item--name\"></div>\n      <div class=\"gridMenu__item-attr gridMenu__item--desc\"></div>\n      <div class=\"gridMenu__item-attr gridMenu__item--price\"></div>\n      <div class=\"gridMenu__item-attr gridMenu__item--img\"></div>\n    ";

    link = link.trim();
    if (link.indexOf("javascript") != 0) {
      var a = document.createElement("a");
      a.href = link;
      a.textContent = name;
      item.children[0].appendChild(a);
    } else {
      item.children[0].textContent = name;
    }

    item.children[1].textContent = desc;
    item.children[2].textContent = price;

    var imgElem = document.createElement("img");
    imgElem.src = img;
    item.children[3].appendChild(imgElem);

    return item;
  },
  _updateMenuItems: function _updateMenuItems(data) {
    var _this = this;

    window.requestAnimationFrame(function () {
      var menuBody = _this._gridMenu.querySelctor(".gridMenu__body");
      var frag = document.createDocumentFragment();
      data.forEach(function (d) {
        return frag.appendChild(_this._createMenuItem(d));
      });
      menuBody.innerHTML = "";
      menuBody.appendChild(frag);
    });
  }
};

exports.default = gridMenu;

/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader!./index.css */ "./node_modules/css-loader/index.js!./src/index.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ./index.css */ "./src/index.css");

var _data = __webpack_require__(/*! ./data */ "./src/data.js");

var _data2 = _interopRequireDefault(_data);

var _gridMenu = __webpack_require__(/*! ./gridMenu.js */ "./src/gridMenu.js");

var _gridMenu2 = _interopRequireDefault(_gridMenu);

var _flexboxMenu = __webpack_require__(/*! ./flexboxMenu.js */ "./src/flexboxMenu.js");

var _flexboxMenu2 = _interopRequireDefault(_flexboxMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = {
  init: function init() {
    var _this = this;

    this._menuContainer = document.getElementById("menu-container");

    document.addEventListener("click", function (e) {
      switch (e.target.id) {
        case "menu-nav__grid":
          _gridMenu2.default.build(_this._menuContainer, _data2.default);
          break;

        case "menu-nav__flexbox":
          _flexboxMenu2.default.build(_this._menuContainer, _data2.default);
          break;
      }
    });
  }
};

app.init();

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var util = {
  sortData: function sortData(data, attr, dir) {
    var cmp = null;
    dir = dir == "ASC" ? 1 : -1;
    switch (attr) {
      case "name":
        cmp = function cmp(a, b) {
          return a.name.localeCompare(b.name) * dir;
        };
        break;

      case "price":
        cmp = function cmp(a, b) {
          return (a.price - b.price) * dir;
        };
        break;

      default:
        return data;
    }
    return data.sort(cmp);
  }
};

exports.default = util;

/***/ })

/******/ });
//# sourceMappingURL=index.bundle.js.map
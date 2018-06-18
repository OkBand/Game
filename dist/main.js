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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/Container.js":
/*!**************************!*\
  !*** ./lib/Container.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Container {\r\n  constructor() {\r\n      this.pos = { x: 0, y: 0 };\r\n      this.children = [];\r\n    }\r\n\r\n    add (child) {\r\n      this.children.push(child);\r\n      return child;\r\n    }\r\n    remove (child) {\r\n      this.children = this.children.filter(c => c !== child);\r\n      return child;\r\n    }\r\n\r\n    update(dt, t) {\r\n      this.children = this.children.filter(child => {\r\n        if (child.update) {\r\n          child.update(dt, t, this);\r\n        }\r\n        return child.dead ? false : true;\r\n      });\r\n    }\r\n\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Container);\r\n\n\n//# sourceURL=webpack:///./lib/Container.js?");

/***/ }),

/***/ "./lib/Game.js":
/*!*********************!*\
  !*** ./lib/Game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _container_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./container.js */ \"./lib/container.js\");\n/* harmony import */ var _renderer_CanvasRenderer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderer/CanvasRenderer.js */ \"./lib/renderer/CanvasRenderer.js\");\n\r\n\r\n\r\nconst STEP = 1 / 60;\r\nconst MAX_FRAME = STEP * 5;\r\n\r\nclass Game {\r\n  constructor (w, h, parent = \".main-board\") {\r\n  this.w = w;\r\n  this.h = h;\r\n  this.renderer = new _renderer_CanvasRenderer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](w, h);\r\n  document.querySelector(parent).appendChild(this.renderer.view);\r\n  this.scene = new _container_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n  }\r\n\r\n  run(gameUpdate = () => {}) {\r\n    let dt = 0;\r\n    let last = 0;\r\n    const loopy = ms => {\r\n      requestAnimationFrame(loopy);\r\n\r\n      const t = ms / 1000;\r\n      dt = Math.min(t - last, MAX_FRAME);\r\n      last = t;\r\n\r\n      this.scene.update(dt, t);\r\n      gameUpdate(dt, t);\r\n      this.renderer.render(this.scene);\r\n    };\r\n    requestAnimationFrame(loopy);\r\n  }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\r\n\n\n//# sourceURL=webpack:///./lib/Game.js?");

/***/ }),

/***/ "./lib/MathTask.js":
/*!*************************!*\
  !*** ./lib/MathTask.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass MathTask {\r\n  constructor() {\r\n    const operators = {\r\n      \"+\": function (a, b) {return a + b},\r\n      \"-\": function (a, b) {return a - b},\r\n      \"*\": function (a, b) {return a * b},\r\n    };\r\n\r\n    function getRandomInt(max) {\r\n      return Math.floor(Math.random() * Math.floor(max));\r\n    };\r\n\r\n    let left = getRandomInt(10);\r\n    let right = getRandomInt(10);\r\n    let i = getRandomInt(2);\r\n    let sign = Object.keys(operators)[i];\r\n    let operator = operators[sign];\r\n\r\n\r\n    this.text = left + \" \" + sign + \" \" + right + \" = ?\";\r\n    this.result = operator(left, right);\r\n  }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (MathTask);\r\n\n\n//# sourceURL=webpack:///./lib/MathTask.js?");

/***/ }),

/***/ "./lib/Sprite.js":
/*!***********************!*\
  !*** ./lib/Sprite.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Sprite {\r\n  constructor (texture) {\r\n    this.texture = texture;\r\n    this.pos = { x: 0, y: 0 };\r\n    this.anchor = { x: 0, y: 0 };\r\n    this.scale = { x: 1, y: 1 };\r\n  }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Sprite);\r\n\n\n//# sourceURL=webpack:///./lib/Sprite.js?");

/***/ }),

/***/ "./lib/Task.js":
/*!*********************!*\
  !*** ./lib/Task.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Task {\r\n  constructor (text, answer) {\r\n    this.text = text;\r\n    this.answer = answer;\r\n  }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Task);\r\n\n\n//# sourceURL=webpack:///./lib/Task.js?");

/***/ }),

/***/ "./lib/Text.js":
/*!*********************!*\
  !*** ./lib/Text.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Text {\r\n  constructor(text = \"\", style = {}) {\r\n  this.pos = { x: 0, y: 0 };\r\n  this.text = text;\r\n  this.style = style;\r\n  }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Text);\r\n\n\n//# sourceURL=webpack:///./lib/Text.js?");

/***/ }),

/***/ "./lib/Texture.js":
/*!************************!*\
  !*** ./lib/Texture.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Texture {\r\n  constructor (url) {\r\n    this.img = new Image();\r\n    this.img.src = url;\r\n  }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Texture);\r\n\n\n//# sourceURL=webpack:///./lib/Texture.js?");

/***/ }),

/***/ "./lib/TileSprite.js":
/*!***************************!*\
  !*** ./lib/TileSprite.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Sprite_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sprite.js */ \"./lib/Sprite.js\");\n\r\nclass TileSprite extends _Sprite_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n  constructor (texture, w, h) {\r\n  super(texture);\r\n  this.tileW = w;\r\n  this.tileH = h;\r\n  this.frame = { x: 0, y: 0 };\r\n  }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (TileSprite);\r\n\n\n//# sourceURL=webpack:///./lib/TileSprite.js?");

/***/ }),

/***/ "./lib/container.js":
/*!**************************!*\
  !*** ./lib/container.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Container {\r\n  constructor() {\r\n      this.pos = { x: 0, y: 0 };\r\n      this.children = [];\r\n    }\r\n\r\n    add (child) {\r\n      this.children.push(child);\r\n      return child;\r\n    }\r\n    remove (child) {\r\n      this.children = this.children.filter(c => c !== child);\r\n      return child;\r\n    }\r\n\r\n    update(dt, t) {\r\n      this.children = this.children.filter(child => {\r\n        if (child.update) {\r\n          child.update(dt, t, this);\r\n        }\r\n        return child.dead ? false : true;\r\n      });\r\n    }\r\n\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Container);\r\n\n\n//# sourceURL=webpack:///./lib/container.js?");

/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Container_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Container.js */ \"./lib/Container.js\");\n/* harmony import */ var _renderer_CanvasRenderer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderer/CanvasRenderer.js */ \"./lib/renderer/CanvasRenderer.js\");\n/* harmony import */ var _Game_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Game.js */ \"./lib/Game.js\");\n/* harmony import */ var _Text_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Text.js */ \"./lib/Text.js\");\n/* harmony import */ var _Task_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Task.js */ \"./lib/Task.js\");\n/* harmony import */ var _MathTask_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./MathTask.js */ \"./lib/MathTask.js\");\n/* harmony import */ var _Sprite_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Sprite.js */ \"./lib/Sprite.js\");\n/* harmony import */ var _TileSprite_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./TileSprite.js */ \"./lib/TileSprite.js\");\n/* harmony import */ var _Texture_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Texture.js */ \"./lib/Texture.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\r\n  Container: _Container_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\r\n  CanvasRenderer: _renderer_CanvasRenderer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\r\n  Game: _Game_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\r\n  Text: _Text_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\r\n  Task: _Task_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\r\n  MathTask: _MathTask_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\r\n  Sprite: _Sprite_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"],\r\n  TileSprite: _TileSprite_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"],\r\n  Texture: _Texture_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"]\r\n});\r\n\n\n//# sourceURL=webpack:///./lib/index.js?");

/***/ }),

/***/ "./lib/renderer/CanvasRenderer.js":
/*!****************************************!*\
  !*** ./lib/renderer/CanvasRenderer.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass CanvasRenderer {\r\n  constructor(w, h) {\r\n    const canvas = document.createElement(\"canvas\");\r\n    this.w = canvas.width = w;\r\n    this.h = canvas.height = h;\r\n    this.view = canvas;\r\n    this.ctx = canvas.getContext(\"2d\");\r\n    this.ctx.imageSmoothingEnabled = false;\r\n    this.ctx.textBaseline = \"top\";\r\n  }\r\n\r\n  render(container, clear = true) {\r\n    if (container.visible == false) {\r\n      return;\r\n    }\r\n    const { ctx } = this;\r\n\r\n    function renderRec(container) {\r\n      // Render the container children\r\n      container.children.forEach(child => {\r\n        if (child.visible == false) {\r\n          return;\r\n        }\r\n        ctx.save();\r\n\r\n        // Handle transforms\r\n        if (child.pos) {\r\n          ctx.translate(Math.round(child.pos.x), Math.round(child.pos.y));\r\n        }\r\n        if (child.anchor) ctx.translate(child.anchor.x, child.anchor.y);\r\n        if (child.scale) ctx.scale(child.scale.x, child.scale.y);\r\n\r\n        // Draw the leaf nodes\r\n        if (child.text) {\r\n          const { font, fill, align } = child.style;\r\n          if (font) ctx.font = font;\r\n          if (fill) ctx.fillStyle = fill;\r\n          if (align) ctx.textAlign = align;\r\n          ctx.fillText(child.text, 0, 0);\r\n        }\r\n\r\n        else if (child.texture) {\r\n          const img = child.texture.img;\r\n            if (child.tileW) {\r\n              ctx.drawImage(\r\n                img,\r\n                child.frame.x, // source x\r\n                child.frame.y, // source y\r\n                child.tileW, child.tileH,    // width and height\r\n                0, 0,                       // destination x and y\r\n                child.tileW, child.tileH    // destination width and height\r\n              );\r\n            } else {\r\n              ctx.drawImage(img, 0, 0);\r\n            }\r\n          }\r\n\r\n        // Render any child sub-nodes\r\n        if (child.children) {\r\n          renderRec(child);\r\n        }\r\n        ctx.restore();\r\n      });\r\n    }\r\n\r\n    if (clear) {\r\n      ctx.clearRect(0, 0, this.w, this.h);\r\n    }\r\n    renderRec(container);\r\n  }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (CanvasRenderer);\r\n\n\n//# sourceURL=webpack:///./lib/renderer/CanvasRenderer.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/index.js */ \"./lib/index.js\");\n\r\nconst { Container, CanvasRenderer, Text, Sprite, TileSprite, Texture, Task, MathTask } = _lib_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\r\n\r\n// Game setup code\r\nconst w = 640;\r\nconst h = 480;\r\nconst renderer = new CanvasRenderer(w, h);\r\ndocument.querySelector(\".main-board\").appendChild(renderer.view);\r\n\r\n// Load game textures\r\nconst textures = {\r\n  background0: new Texture(\"res/img/bg0.jpg\"),\r\n  background1: new Texture(\"res/img/bg1.jpg\"),\r\n  background2: new Texture(\"res/img/bg2.jpg\"),\r\n  player: new Texture(\"res/img/player_stand.png\"),\r\n  monster: new Texture(\"res/img/monster_parts.png\"),\r\n  playerDefeated: new Texture(\"res/img/player_hurt.png\"),\r\n  monsterDefeated: new Texture(\"res/img/zombie_hurt.png\"),\r\n  fire: new Texture(\"res/img/spells/fire.png\"),\r\n  light: new Texture(\"res/img/spells/lightning.png\"),\r\n  heal: new Texture(\"res/img/spells/heal.png\"),\r\n  monsterSpell: new Texture(\"res/img/spells/snakebite.png\")\r\n};\r\n\r\n// Game objects\r\nconst scene = new Container();\r\nconst modal = document.querySelector(\".modal\");\r\nconst taskWindow = document.querySelector(\".task-window\");\r\n\r\n// Game state variables\r\nlet healthAmount = 100;\r\nlet monsterHealthAmount = 100;\r\n\r\nlet taskTextField = document.querySelector(\".task\");\r\nlet mathTask = new MathTask();\r\nlet newTask = new Task(mathTask.text, mathTask.result);\r\ntaskTextField.innerHTML = newTask.text;\r\n\r\n//Game state\r\nlet win = false;\r\nlet gameOver = false;\r\nlet score = 0;\r\nlet rightAnswer;\r\n\r\n//Background\r\nlet background = new Sprite(textures[\"background\" + getRandomInt(3)]);\r\n\r\n//Spells\r\nlet spell;\r\nconst monsterSpell = new TileSprite(textures.monsterSpell, 128, 128);\r\n\r\n//Player\r\nconst player = new Sprite(textures.player);\r\n\r\nplayer.pos.x = 100;\r\nplayer.pos.y = 300;\r\n\r\n//Monster\r\nconst monster = {\r\n  head: new TileSprite(textures.monster, 50, 52),\r\n  body: new TileSprite(textures.monster, 39, 31),\r\n  leg1: new TileSprite(textures.monster, 21, 23),\r\n  leg2: new TileSprite(textures.monster, 21, 23),\r\n  arm1: new TileSprite(textures.monster, 17, 33),\r\n  arm2: new TileSprite(textures.monster, 17, 33),\r\n  hand1: new TileSprite(textures.monster, 17, 15),\r\n  hand2: new TileSprite(textures.monster, 17, 15),\r\n  weapon: new TileSprite(textures.monster, 58, 57)\r\n};\r\n\r\n//Monster parts positions\r\nmonster.head.pos.x = 500;\r\nmonster.head.pos.y = 300;\r\n\r\nmonster.body.pos.x = monster.head.pos.x + 5;\r\nmonster.body.pos.y = monster.head.pos.y + monster.head.tileH - 5;\r\n\r\nmonster.leg1.pos.x = 500;\r\nmonster.leg1.pos.y = monster.body.pos.y + monster.body.tileH - 7;\r\n\r\nmonster.leg2.pos.x = 500 + monster.leg2.tileW;\r\nmonster.leg2.pos.y = monster.body.pos.y + monster.body.tileH - 7;\r\n\r\nmonster.arm1.pos.x = 500 - monster.arm1.tileW / 2 + 5;\r\nmonster.arm1.pos.y = monster.body.pos.y;\r\n\r\nmonster.arm1.anchor.x = monster.arm1.tileW;\r\nmonster.arm1.scale.x = -1;\r\n\r\nmonster.arm2.pos.x = 500 + monster.body.tileW - monster.arm1.tileW / 2;\r\nmonster.arm2.pos.y = monster.body.pos.y;\r\n\r\nmonster.hand1.pos.x = monster.arm1.pos.x;\r\nmonster.hand1.pos.y = monster.arm1.pos.y + monster.arm1.tileH - 5;\r\n\r\nmonster.hand1.anchor.x = monster.hand1.tileW;\r\nmonster.hand1.scale.x = -1;\r\n\r\nmonster.hand2.pos.x = monster.arm2.pos.x;\r\nmonster.hand2.pos.y = monster.arm2.pos.y + monster.arm2.tileH - 5;\r\n\r\nmonster.weapon.pos.x = monster.hand1.pos.x - 5;\r\nmonster.weapon.pos.y = monster.hand1.pos.y - monster.weapon.tileH + 25;\r\n\r\nconst monsterParts = {\r\n  head: \"294, 398, 498, 599\",\r\n  body: \"70, 109, 148, 187\",\r\n  leg: \"696, 717, 738, 759\",\r\n  arm: \"0, 17, 35, 53\",\r\n  hand: \"226, 243, 260, 277\",\r\n  weapon: \"780, 838, 896, 954\"\r\n}\r\n\r\nmonster.head.frame.x = monsterParts.head.split(\", \")[getRandomInt(4)];\r\nmonster.body.frame.x = monsterParts.body.split(\", \")[getRandomInt(4)];\r\nmonster.leg1.frame.x = monsterParts.leg.split(\", \")[getRandomInt(4)];\r\nmonster.leg2.frame.x = monsterParts.leg.split(\", \")[getRandomInt(4)];\r\nmonster.arm1.frame.x = monsterParts.arm.split(\", \")[getRandomInt(4)];\r\nmonster.arm2.frame.x = monsterParts.arm.split(\", \")[getRandomInt(4)];\r\nmonster.hand1.frame.x = monsterParts.hand.split(\", \")[getRandomInt(4)];\r\nmonster.hand2.frame.x = monsterParts.hand.split(\", \")[getRandomInt(4)];\r\nmonster.weapon.frame.x = monsterParts.weapon.split(\", \")[getRandomInt(4)];\r\n\r\n//Monster name\r\nconst monsterNamespace = {\r\n  firstname: \"Evil, Angry, Furious, Almighty, Wicked, Gross, Sneaky, Desperate, Black, Green, Punky, Dirty, Dark\",\r\n  secondname: \"Ogre, Orc, Dwarf, Human, Gnome, Elf, Drow, Fairy, Coder, Editor, Doctor, Manager, Lord\",\r\n  thirdname: \"Dima, Valeriy, Vladimir, Joseph, Adolf, Alex, Piotr, Donald, Victor, Tom, Voldy, Vader, Anakin, Yoda, Kylo\"\r\n}\r\n\r\nconst monsterNameText = nameTheMonster(monsterNamespace.firstname) + \" \" + nameTheMonster(monsterNamespace.secondname) + \" \" + nameTheMonster(monsterNamespace.thirdname);\r\n\r\n// Text objects\r\nconst playerName = new Text(\"Arseniy\",\r\n{\r\n  font: \"16px sans-serif\",\r\n  fill: \"#2A080D\",\r\n  align: \"left\"\r\n}\r\n)\r\n\r\nplayerName.pos.x = player.pos.x + 10;\r\nplayerName.pos.y = player.pos.y - 20;\r\n\r\nconst monsterName = new Text(monsterNameText,\r\n{\r\n  font: \"16px sans-serif\",\r\n  fill: \"#2A080D\",\r\n  align: \"left\"\r\n});\r\n\r\nmonsterName.pos.x = monster.head.pos.x - 40;\r\nmonsterName.pos.y = monster.head.pos.y - 20;\r\n\r\nconst health = new Text(\"Health:\",\r\n{\r\n  font: \"20px sans-serif\",\r\n  fill: \"#2A080D\",\r\n  align: \"left\"\r\n});\r\n\r\nhealth.pos.x = 15;\r\nhealth.pos.y = 15;\r\n\r\nconst monsterHealth = new Text(\"Health:\", {\r\n  font: \"20px sans-serif\",\r\n  fill: \"#2A080D\",\r\n  align: \"right\"\r\n});\r\n\r\nmonsterHealth.pos.x = 630;\r\nmonsterHealth.pos.y = 15;\r\n\r\nconst message = new Text(\" \", {\r\n  font: \"30pt sans-serif\",\r\n  fill: \"#2A080D\",\r\n  align: \"center\"\r\n});\r\n\r\nmessage.pos.x = 330;\r\nmessage.pos.y = 220;\r\n\r\n//Records\r\nconst tableOfRecords = document.createElement(\"table\");\r\n\r\n\r\n// Add everything to the scene container\r\nscene.add(background);\r\nscene.add(player);\r\n\r\nscene.add(monster.hand1);\r\nscene.add(monster.leg1);\r\nscene.add(monster.leg2);\r\nscene.add(monster.arm1);\r\nscene.add(monster.body);\r\nscene.add(monster.arm2);\r\nscene.add(monster.head);\r\nscene.add(monster.weapon);\r\nscene.add(monster.hand2);\r\n\r\nscene.add(playerName);\r\nscene.add(monsterName);\r\nscene.add(health);\r\nscene.add(monsterHealth);\r\nscene.add(message);\r\n\r\n// Main game loop\r\nlet dt = 0;\r\nlet last = 0;\r\n\r\nfunction loopy(ms) {\r\n  requestAnimationFrame(loopy);\r\n\r\n  const t = ms / 1000;\r\n  dt = t - last;\r\n  last = t;\r\n\r\n  // Game logic code\r\n  health.text = \"Health: \" + healthAmount;\r\n  monsterHealth.text = \"Health: \" + monsterHealthAmount;\r\n\r\n  //Check for win\r\n  if (monsterHealthAmount < 1) {\r\n    doNextRound();\r\n  }\r\n\r\n  // Check for game over\r\n  if (healthAmount < 1) {\r\n    doGameOver();\r\n  }\r\n\r\n  //Update score\r\n  localStorage.setItem(\"score\", score);\r\n\r\n  // Update everything\r\n  scene.update(dt, t);\r\n  // Render everything\r\n  renderer.render(scene);\r\n}\r\nrequestAnimationFrame(loopy);\r\n\r\nmodal.classList.remove(\"hidden\");\r\nlet answerField = document.querySelector(\".answer\");\r\nlet spells = document.getElementsByName(\"spell\");\r\nlet choose = document.querySelector(\".choose-spell\");\r\nlet submit = document.querySelector(\".submit-answer\");\r\nlet chosenSpell;\r\n\r\nchoose.addEventListener(\"submit\", function() {\r\n  event.preventDefault();\r\n  taskWindow.classList.remove(\"hidden\");\r\n  modal.classList.add(\"hidden\");\r\n  for (let i = 0; i < 3; i++) {\r\n      if (spells[i].checked) {\r\n        chosenSpell = spells[i].value;\r\n      }\r\n    }\r\n  spell = new TileSprite(textures[chosenSpell], 128, 128);\r\n});\r\n\r\nsubmit.addEventListener(\"submit\", function() {\r\n  event.preventDefault();\r\n  localStorage.setItem(\"answer\", answerField.value);\r\n  taskWindow.classList.add(\"hidden\");\r\n  animateSpell();\r\n  let answer = localStorage.getItem(\"answer\");\r\n  if (answer == newTask.answer) {\r\n    rightAnswer = true;\r\n    score += 5;\r\n    message.text = \"Right!\";\r\n    clearText();\r\n  }\r\n  else {\r\n    rightAnswer = false;\r\n    message.text = \"Wrong!\";\r\n    clearText();\r\n  }\r\n\r\n  localStorage.removeItem(\"answer\");\r\n  answerField.value = \"\";\r\n  setTimeout(function(){\r\n    if (monsterHealthAmount > 0) {\r\n      console.log(monsterHealthAmount);\r\n      mathTask = new MathTask();\r\n      newTask = new Task(mathTask.text, mathTask.result);\r\n      taskTextField.innerHTML = newTask.text;\r\n      animateMonsterSpell();\r\n    }\r\n    }, 3000);\r\n  });\r\n\r\nfunction doWin() {\r\n  const winMessage = new Text(\"You won!\", {\r\n    font: \"30pt sans-serif\",\r\n    fill: \"black\",\r\n    align: \"center\"\r\n  });\r\n  winMessage.pos.x = w / 2;\r\n  winMessage.pos.y = 120;\r\n  scene.add(winMessage);\r\n  monster.head.frame.x += 52;\r\n  taskWindow.classList.add(\"hidden\");\r\n  modal.classList.add(\"hidden\");\r\n}\r\n\r\nfunction doGameOver() {\r\n  const gameOverMessage = new Text(\"Game Over\", {\r\n    font: \"30pt sans-serif\",\r\n    fill: \"black\",\r\n    align: \"center\"\r\n  });\r\n  gameOverMessage.pos.x = w / 2;\r\n  gameOverMessage.pos.y = 120;\r\n  scene.add(gameOverMessage);\r\n  player.texture = textures.playerDefeated;\r\n  taskWindow.classList.add(\"hidden\");\r\n  modal.classList.add(\"hidden\");\r\n  gameOver = true;\r\n}\r\n\r\nfunction getRandomInt(max) {\r\n  return Math.floor(Math.random() * Math.floor(max));\r\n};\r\n\r\nfunction nameTheMonster(str) {\r\n  let arr = str.split(\", \");\r\n  let index = getRandomInt(arr.length);\r\n  return arr[index];\r\n}\r\n\r\nfunction clearText() {\r\n  setTimeout(function(){\r\n    message.text = \"\";\r\n    modal.classList.remove(\"hidden\");\r\n  }, 6000);\r\n}\r\n\r\nfunction animateSpell() {\r\n  if(chosenSpell == \"heal\") {\r\n    spell.pos.x = player.pos.x - 20;\r\n    spell.pos.y = player.pos.y\r\n  }\r\n\r\n  else {\r\n    spell.pos.x = player.pos.x + 50;\r\n    spell.pos.y = player.pos.y;\r\n  }\r\n\r\n  scene.add(spell);\r\n  let interval = setInterval(frame, 50);\r\n\r\n  function frame(){\r\n    if(spell.frame.x < 512) {\r\n      spell.frame.x += 128;\r\n    }\r\n    else {\r\n      spell.frame.y += 128;\r\n      spell.frame.x = 0;\r\n    };\r\n\r\n    if(chosenSpell != \"heal\") {\r\n      spell.pos.x += 15;\r\n    }\r\n  };\r\n\r\n  setTimeout(function(){\r\n    applySpell();\r\n    clearInterval(interval);\r\n    spell.frame.x = 0;\r\n    spell.frame.y = 0;\r\n    scene.remove(spell);\r\n  }, 1000);\r\n}\r\n\r\nfunction animateMonsterSpell() {\r\n  monsterSpell.pos.x = monster.body.pos.x - 50;\r\n  monsterSpell.pos.y = monster.body.pos.y;\r\n\r\n  scene.add(monsterSpell);\r\n  let interval = setInterval(frame, 50);\r\n\r\n  function frame(){\r\n    if(monsterSpell.frame.x < 512) {\r\n      monsterSpell.frame.x += 128;\r\n    }\r\n    else {\r\n      monsterSpell.frame.y += 128;\r\n      monsterSpell.frame.x = 0;\r\n    };\r\n\r\n    monsterSpell.pos.x -= 20;\r\n  };\r\n\r\n  setTimeout(function(){\r\n    applyMonsterSpell();\r\n    clearInterval(interval);\r\n    monsterSpell.frame.x = 0;\r\n    monsterSpell.frame.y = 0;\r\n    scene.remove(monsterSpell);\r\n  }, 1500);\r\n}\r\n\r\nfunction applySpell() {\r\n  if (rightAnswer == true) {\r\n    if(chosenSpell == \"heal\") {\r\n      healthAmount += 20;\r\n    }\r\n    else {\r\n      monsterHealthAmount -= 20;\r\n    }\r\n  }\r\n}\r\n\r\nfunction applyMonsterSpell() {\r\n  if (rightAnswer == true) {\r\n    healthAmount -= 5;\r\n  }\r\n  else {\r\n    healthAmount -= 20;\r\n  }\r\n}\r\n\r\nfunction doNextRound() {\r\n  doWin();\r\n  setTimeout(function(){\r\n    let interval = setInterval(frame, 1000);\r\n    function frame(){\r\n      player.pos.x += 5;\r\n    };\r\n  }, 1000);\r\n\r\n  setTimeout(function(){\r\n    window.location.reload(false);\r\n  }, 4000);\r\n}\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });
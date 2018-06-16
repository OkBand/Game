(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Container = function () {
  function Container() {
    _classCallCheck(this, Container);

    this.pos = { x: 0, y: 0 };
    this.children = [];
  }

  _createClass(Container, [{
    key: "add",
    value: function add(child) {
      this.children.push(child);
      return child;
    }
  }, {
    key: "remove",
    value: function remove(child) {
      this.children = this.children.filter(function (c) {
        return c !== child;
      });
      return child;
    }
  }, {
    key: "update",
    value: function update(dt, t) {
      var _this = this;

      this.children = this.children.filter(function (child) {
        if (child.update) {
          child.update(dt, t, _this);
        }
        return child.dead ? false : true;
      });
    }
  }]);

  return Container;
}();

exports.default = Container;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _container = require("./container.js");

var _container2 = _interopRequireDefault(_container);

var _CanvasRenderer = require("./renderer/CanvasRenderer.js");

var _CanvasRenderer2 = _interopRequireDefault(_CanvasRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var STEP = 1 / 60;
var MAX_FRAME = STEP * 5;

var Game = function () {
  function Game(w, h) {
    var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ".main-board";

    _classCallCheck(this, Game);

    this.w = w;
    this.h = h;
    this.renderer = new _CanvasRenderer2.default(w, h);
    document.querySelector(parent).appendChild(this.renderer.view);
    this.scene = new _container2.default();
  }

  _createClass(Game, [{
    key: "run",
    value: function run() {
      var _this = this;

      var gameUpdate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

      var dt = 0;
      var last = 0;
      var loopy = function loopy(ms) {
        requestAnimationFrame(loopy);

        var t = ms / 1000;
        dt = Math.min(t - last, MAX_FRAME);
        last = t;

        _this.scene.update(dt, t);
        gameUpdate(dt, t);
        _this.renderer.render(_this.scene);
      };
      requestAnimationFrame(loopy);
    }
  }]);

  return Game;
}();

exports.default = Game;

},{"./container.js":8,"./renderer/CanvasRenderer.js":12}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MathTask = function MathTask() {
  _classCallCheck(this, MathTask);

  var operators = {
    "+": function _(a, b) {
      return a + b;
    },
    "-": function _(a, b) {
      return a - b;
    },
    "*": function _(a, b) {
      return a * b;
    }
  };

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  };

  var left = getRandomInt(10);
  var right = getRandomInt(10);
  var i = getRandomInt(2);
  var sign = Object.keys(operators)[i];
  var operator = operators[sign];

  this.text = left + " " + sign + " " + right;
  this.result = operator(left, right);
};

exports.default = MathTask;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sprite = function Sprite(texture) {
  _classCallCheck(this, Sprite);

  this.texture = texture;
  this.pos = { x: 0, y: 0 };
};

exports.default = Sprite;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Task = function Task(text, answer) {
  _classCallCheck(this, Task);

  this.text = text;
  this.answer = answer;
};

exports.default = Task;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Text = function Text() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  _classCallCheck(this, Text);

  this.pos = { x: 0, y: 0 };
  this.text = text;
  this.style = style;
};

exports.default = Text;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Texture = function Texture(url) {
  _classCallCheck(this, Texture);

  this.img = new Image();
  this.img.src = url;
};

exports.default = Texture;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Container = function () {
  function Container() {
    _classCallCheck(this, Container);

    this.pos = { x: 0, y: 0 };
    this.children = [];
  }

  _createClass(Container, [{
    key: "add",
    value: function add(child) {
      this.children.push(child);
      return child;
    }
  }, {
    key: "remove",
    value: function remove(child) {
      this.children = this.children.filter(function (c) {
        return c !== child;
      });
      return child;
    }
  }, {
    key: "update",
    value: function update(dt, t) {
      var _this = this;

      this.children = this.children.filter(function (child) {
        if (child.update) {
          child.update(dt, t, _this);
        }
        return child.dead ? false : true;
      });
    }
  }]);

  return Container;
}();

exports.default = Container;

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KeyControls = function () {
  function KeyControls() {
    var _this = this;

    _classCallCheck(this, KeyControls);

    this.keys = {};
    // Bind event handlers
    document.addEventListener("keydown", function (e) {
      if ([37, 38, 39, 40].indexOf(e.which) >= 0) {
        e.preventDefault();
      }
      _this.keys[e.which] = true;
    }, false);
    document.addEventListener("keyup", function (e) {
      _this.keys[e.which] = false;
    }, false);
  }
  // Handle key actions


  _createClass(KeyControls, [{
    key: "action",
    get: function get() {
      return this.keys[32];
    }
  }, {
    key: "x",
    get: function get() {
      if (this.keys[37] || this.keys[65]) {
        return -1;
      }
      if (this.keys[39] || this.keys[68]) {
        return 1;
      }
      return 0;
    }
  }, {
    key: "y",
    get: function get() {
      if (this.keys[38] || this.keys[87]) {
        return -1;
      }
      if (this.keys[40] || this.keys[83]) {
        return 1;
      }
      return 0;
    }
  }]);

  return KeyControls;
}();

exports.default = KeyControls;

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MouseControls = function () {
  function MouseControls(container) {
    var _this = this;

    _classCallCheck(this, MouseControls);

    this.el = container || document.body;

    this.pos = { x: 0, y: 0 };
    this.isDown = false;
    this.pressed = false;
    this.released = false;

    // Handlers
    document.addEventListener("mousedown", function (e) {
      return _this.down(e);
    }, false);
    document.addEventListener("mouseup", function (e) {
      return _this.up(e);
    }, false);
    document.addEventListener("mousemove", function (e) {
      return _this.move(e);
    }, false);
  }

  _createClass(MouseControls, [{
    key: "mousePosFromEvent",
    value: function mousePosFromEvent(_ref) {
      var clientX = _ref.clientX,
          clientY = _ref.clientY;
      var el = this.el,
          pos = this.pos;

      var rect = el.getBoundingClientRect();
      pos.x = clientX - rect.left;
      pos.y = clientY - rect.top;
    }
  }, {
    key: "down",
    value: function down(e) {
      this.isDown = true;
      this.pressed = true;
      this.mousePosFromEvent(e);
    }
  }, {
    key: "up",
    value: function up() {
      this.isDown = false;
      this.released = true;
    }
  }, {
    key: "move",
    value: function move(e) {
      this.mousePosFromEvent(e);
    }
  }, {
    key: "update",
    value: function update() {
      this.released = false;
      this.pressed = false;
    }
  }]);

  return MouseControls;
}();

exports.default = MouseControls;

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Container = require("./Container.js");

var _Container2 = _interopRequireDefault(_Container);

var _CanvasRenderer = require("./renderer/CanvasRenderer.js");

var _CanvasRenderer2 = _interopRequireDefault(_CanvasRenderer);

var _Game = require("./Game.js");

var _Game2 = _interopRequireDefault(_Game);

var _Text = require("./Text.js");

var _Text2 = _interopRequireDefault(_Text);

var _Task = require("./Task.js");

var _Task2 = _interopRequireDefault(_Task);

var _MathTask = require("./MathTask.js");

var _MathTask2 = _interopRequireDefault(_MathTask);

var _KeyControls = require("./controls/KeyControls.js");

var _KeyControls2 = _interopRequireDefault(_KeyControls);

var _MouseControls = require("./controls/MouseControls.js");

var _MouseControls2 = _interopRequireDefault(_MouseControls);

var _Sprite = require("./Sprite.js");

var _Sprite2 = _interopRequireDefault(_Sprite);

var _Texture = require("./Texture.js");

var _Texture2 = _interopRequireDefault(_Texture);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Container: _Container2.default,
  CanvasRenderer: _CanvasRenderer2.default,
  Game: _Game2.default,
  KeyControls: _KeyControls2.default,
  MouseControls: _MouseControls2.default,
  Text: _Text2.default,
  Task: _Task2.default,
  MathTask: _MathTask2.default,
  Sprite: _Sprite2.default,
  Texture: _Texture2.default
};

},{"./Container.js":1,"./Game.js":2,"./MathTask.js":3,"./Sprite.js":4,"./Task.js":5,"./Text.js":6,"./Texture.js":7,"./controls/KeyControls.js":9,"./controls/MouseControls.js":10,"./renderer/CanvasRenderer.js":12}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CanvasRenderer = function () {
  function CanvasRenderer(w, h) {
    _classCallCheck(this, CanvasRenderer);

    var canvas = document.createElement("canvas");
    this.w = canvas.width = w;
    this.h = canvas.height = h;
    this.view = canvas;
    this.ctx = canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.textBaseline = "top";
  }

  _createClass(CanvasRenderer, [{
    key: "render",
    value: function render(container) {
      var clear = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (container.visible == false) {
        return;
      }
      var ctx = this.ctx;


      function renderRec(container) {
        // Render the container children
        container.children.forEach(function (child) {
          if (child.visible == false) {
            return;
          }
          ctx.save();

          // Handle transforms
          if (child.pos) {
            ctx.translate(Math.round(child.pos.x), Math.round(child.pos.y));
          }

          // Draw the leaf nodes
          if (child.text) {
            var _child$style = child.style,
                font = _child$style.font,
                fill = _child$style.fill,
                align = _child$style.align;

            if (font) ctx.font = font;
            if (fill) ctx.fillStyle = fill;
            if (align) ctx.textAlign = align;
            ctx.fillText(child.text, 0, 0);
          } else if (child.texture) {
            ctx.drawImage(child.texture.img, 0, 0);
          }

          // Render any child sub-nodes
          if (child.children) {
            renderRec(child);
          }
          ctx.restore();
        });
      }

      if (clear) {
        ctx.clearRect(0, 0, this.w, this.h);
      }
      renderRec(container);
    }
  }]);

  return CanvasRenderer;
}();

exports.default = CanvasRenderer;

},{}],13:[function(require,module,exports){
"use strict";

var _index = require("../lib/index.js");

var _index2 = _interopRequireDefault(_index);

var _GameScreen = require("./screens/GameScreen.js");

var _GameScreen2 = _interopRequireDefault(_GameScreen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Container = _index2.default.Container,
    CanvasRenderer = _index2.default.CanvasRenderer,
    Game = _index2.default.Game,
    Text = _index2.default.Text,
    Sprite = _index2.default.Sprite,
    Texture = _index2.default.Texture,
    KeyControls = _index2.default.KeyControls,
    MouseControls = _index2.default.MouseControls,
    Task = _index2.default.Task,
    MathTask = _index2.default.MathTask;


// Game setup code
var game = new Game(640, 480);
var scene = game.scene,
    w = game.w,
    h = game.h;


game.scene = new _GameScreen2.default(game);
game.run();

},{"../lib/index.js":11,"./screens/GameScreen.js":14}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require("../../lib/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Container = _index2.default.Container,
    CanvasRenderer = _index2.default.CanvasRenderer,
    Text = _index2.default.Text,
    Sprite = _index2.default.Sprite,
    Texture = _index2.default.Texture,
    Task = _index2.default.Task,
    MathTask = _index2.default.MathTask;


var textures = {
  background: new Texture("res/img/bg.jpg"),
  player: new Texture("res/img/player_stand.png"),
  monster: new Texture("res/img/zombie_stand.png"),
  playerDefeated: new Texture("res/img/player_hurt.png"),
  monsterDefeated: new Texture("res/img/zombie_hurt.png")
};

// Game objects
var modal = document.querySelector(".modal");
var taskWindow = document.querySelector(".task-window");

// Game state variables
var healthAmount = 100;
var monsterHealthAmount = 100;

//Task handling
var taskTextField = document.querySelector(".task");
var mathTask = new MathTask();
var newTask = new Task(mathTask.text, mathTask.result);
taskTextField.innerHTML = newTask.text;

//Game state
//let win = false;
//let gameOver = false;


//Player
var player = new Sprite(textures.player);

//Monster
var monster = new Sprite(textures.monster);

// Add the health game object
var health = new Text("Health:", {
  font: "20px sans-serif",
  fill: "black",
  align: "left"
});

// Add the monster health game object
var monsterHealth = new Text("Health:", {
  font: "20px sans-serif",
  fill: "black",
  align: "right"
});

modal.classList.remove("hidden");
var answerField = document.querySelector(".answer");
var choose = document.querySelector(".choose-spell");
var submit = document.querySelector(".submit-answer");
var answer = void 0;

choose.addEventListener("submit", function () {
  event.preventDefault();
  taskWindow.classList.remove("hidden");
  modal.classList.add("hidden");
});

submit.addEventListener("submit", function () {
  event.preventDefault();
  localStorage.setItem("answer", answerField.value);
  var answer = localStorage.getItem("answer");
  if (answer == newTask.answer) {
    monsterHealthAmount -= 20;
  } else {
    healthAmount -= 20;
  }
  localStorage.removeItem("answer");
  answerField.value = "";
  if (!monster.dead) {
    mathTask = new MathTask();
    newTask = new Task(mathTask.text, mathTask.result);
    taskTextField.innerHTML = newTask.text;
  }
});

var message = new Text(" ", {
  font: "30pt sans-serif",
  fill: "black",
  align: "center"
});

var GameScreen = function (_Container) {
  _inherits(GameScreen, _Container);

  function GameScreen(game, w, h) {
    _classCallCheck(this, GameScreen);

    var _this = _possibleConstructorReturn(this, (GameScreen.__proto__ || Object.getPrototypeOf(GameScreen)).call(this));

    player.pos.x = 100;
    player.pos.y = 300;

    monster.pos.x = 500;
    monster.pos.y = 300;

    health.pos.x = 15;
    health.pos.y = 15;

    monsterHealth.pos.x = 630;
    monsterHealth.pos.y = 15;

    message.pos.x = 330;
    message.pos.y = 220;

    // Add everything to the scene container
    _this.add(new Sprite(textures.background));
    _this.add(player);
    _this.add(monster);
    _this.add(health);
    _this.add(monsterHealth);
    _this.add(message);
    return _this;
  }

  _createClass(GameScreen, [{
    key: "update",
    value: function update(dt, t) {
      health.text = "Health: " + healthAmount;
      monsterHealth.text = "Health: " + monsterHealthAmount;

      //Check for win
      if (monsterHealthAmount < 1) {
        monster.texture = textures.monsterDefeated;
        taskWindow.classList.add("hidden");
        message.text = "You won!";
      }
      // Check for game over
      if (healthAmount < 1) {
        player.texture = textures.playerDefeated;
        taskWindow.classList.add("hidden");
        message.text = "Game over";
      }
    }
  }]);

  return GameScreen;
}(Container);

exports.default = GameScreen;

},{"../../lib/index.js":11}]},{},[13]);

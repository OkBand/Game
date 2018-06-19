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

},{"./container.js":9,"./renderer/CanvasRenderer.js":11}],3:[function(require,module,exports){
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

  this.text = left + " " + sign + " " + right + " = ?";
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
  this.anchor = { x: 0, y: 0 };
  this.scale = { x: 1, y: 1 };
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

var _Sprite2 = require("./Sprite.js");

var _Sprite3 = _interopRequireDefault(_Sprite2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TileSprite = function (_Sprite) {
  _inherits(TileSprite, _Sprite);

  function TileSprite(texture, w, h) {
    _classCallCheck(this, TileSprite);

    var _this = _possibleConstructorReturn(this, (TileSprite.__proto__ || Object.getPrototypeOf(TileSprite)).call(this, texture));

    _this.tileW = w;
    _this.tileH = h;
    _this.frame = { x: 0, y: 0 };
    return _this;
  }

  return TileSprite;
}(_Sprite3.default);

exports.default = TileSprite;

},{"./Sprite.js":4}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

var _Sprite = require("./Sprite.js");

var _Sprite2 = _interopRequireDefault(_Sprite);

var _TileSprite = require("./TileSprite.js");

var _TileSprite2 = _interopRequireDefault(_TileSprite);

var _Texture = require("./Texture.js");

var _Texture2 = _interopRequireDefault(_Texture);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Container: _Container2.default,
  CanvasRenderer: _CanvasRenderer2.default,
  Game: _Game2.default,
  Text: _Text2.default,
  Task: _Task2.default,
  MathTask: _MathTask2.default,
  Sprite: _Sprite2.default,
  TileSprite: _TileSprite2.default,
  Texture: _Texture2.default
};

},{"./Container.js":1,"./Game.js":2,"./MathTask.js":3,"./Sprite.js":4,"./Task.js":5,"./Text.js":6,"./Texture.js":7,"./TileSprite.js":8,"./renderer/CanvasRenderer.js":11}],11:[function(require,module,exports){
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
          if (child.anchor) ctx.translate(child.anchor.x, child.anchor.y);
          if (child.scale) ctx.scale(child.scale.x, child.scale.y);

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
            var img = child.texture.img;
            if (child.tileW) {
              ctx.drawImage(img, child.frame.x, // source x
              child.frame.y, // source y
              child.tileW, child.tileH, // width and height
              0, 0, // destination x and y
              child.tileW, child.tileH // destination width and height
              );
            } else {
              ctx.drawImage(img, 0, 0);
            }
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

},{}],12:[function(require,module,exports){
"use strict";

var _index = require("../lib/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Container = _index2.default.Container,
    CanvasRenderer = _index2.default.CanvasRenderer,
    Text = _index2.default.Text,
    Sprite = _index2.default.Sprite,
    TileSprite = _index2.default.TileSprite,
    Texture = _index2.default.Texture,
    Task = _index2.default.Task,
    MathTask = _index2.default.MathTask;

// Game setup code

var w = 640;
var h = 480;
var renderer = new CanvasRenderer(w, h);
document.querySelector(".main-board").appendChild(renderer.view);

// Load game textures
var textures = {
  background0: new Texture("res/img/bg0.jpg"),
  background1: new Texture("res/img/bg1.jpg"),
  background2: new Texture("res/img/bg2.jpg"),
  player: new Texture("res/img/player_stand.png"),
  monster: new Texture("res/img/monster_parts.png"),
  playerDefeated: new Texture("res/img/player_hurt.png"),
  monsterDefeated: new Texture("res/img/zombie_hurt.png"),
  fire: new Texture("res/img/spells/fire.png"),
  light: new Texture("res/img/spells/lightning.png"),
  heal: new Texture("res/img/spells/heal.png"),
  monsterSpell: new Texture("res/img/spells/snakebite.png")
};

// Game objects
var scene = new Container();
var modal = document.querySelector(".modal");
var taskWindow = document.querySelector(".task-window");

// Game state variables
var healthAmount = 100;
var monsterHealthAmount = 100;

var taskTextField = document.querySelector(".task");
var mathTask = new MathTask();
var newTask = new Task(mathTask.text, mathTask.result);
taskTextField.innerHTML = newTask.text;

//Game state
var win = false;
var gameOver = false;
var score = 0;
var rightAnswer = void 0;

//Background
var background = new Sprite(textures["background" + getRandomInt(3)]);

//Spells
var spell = void 0;
var monsterSpell = new TileSprite(textures.monsterSpell, 128, 128);

//Player
var player = new Sprite(textures.player);

player.pos.x = 100;
player.pos.y = 300;

//Monster
var monster = {
  head: new TileSprite(textures.monster, 50, 52),
  body: new TileSprite(textures.monster, 39, 31),
  leg1: new TileSprite(textures.monster, 21, 23),
  leg2: new TileSprite(textures.monster, 21, 23),
  arm1: new TileSprite(textures.monster, 17, 33),
  arm2: new TileSprite(textures.monster, 17, 33),
  hand1: new TileSprite(textures.monster, 17, 15),
  hand2: new TileSprite(textures.monster, 17, 15),
  weapon: new TileSprite(textures.monster, 58, 57)
};

//Monster parts positions
monster.head.pos.x = 500;
monster.head.pos.y = 300;

monster.body.pos.x = monster.head.pos.x + 5;
monster.body.pos.y = monster.head.pos.y + monster.head.tileH - 5;

monster.leg1.pos.x = 500;
monster.leg1.pos.y = monster.body.pos.y + monster.body.tileH - 7;

monster.leg2.pos.x = 500 + monster.leg2.tileW;
monster.leg2.pos.y = monster.body.pos.y + monster.body.tileH - 7;

monster.arm1.pos.x = 500 - monster.arm1.tileW / 2 + 5;
monster.arm1.pos.y = monster.body.pos.y;

monster.arm1.anchor.x = monster.arm1.tileW;
monster.arm1.scale.x = -1;

monster.arm2.pos.x = 500 + monster.body.tileW - monster.arm1.tileW / 2;
monster.arm2.pos.y = monster.body.pos.y;

monster.hand1.pos.x = monster.arm1.pos.x;
monster.hand1.pos.y = monster.arm1.pos.y + monster.arm1.tileH - 5;

monster.hand1.anchor.x = monster.hand1.tileW;
monster.hand1.scale.x = -1;

monster.hand2.pos.x = monster.arm2.pos.x;
monster.hand2.pos.y = monster.arm2.pos.y + monster.arm2.tileH - 5;

monster.weapon.pos.x = monster.hand1.pos.x - 5;
monster.weapon.pos.y = monster.hand1.pos.y - monster.weapon.tileH + 25;

var monsterParts = {
  head: "294, 398, 498, 599",
  body: "70, 109, 148, 187",
  leg: "696, 717, 738, 759",
  arm: "0, 17, 35, 53",
  hand: "226, 243, 260, 277",
  weapon: "780, 838, 896, 954"
};

monster.head.frame.x = monsterParts.head.split(", ")[getRandomInt(4)];
monster.body.frame.x = monsterParts.body.split(", ")[getRandomInt(4)];
monster.leg1.frame.x = monsterParts.leg.split(", ")[getRandomInt(4)];
monster.leg2.frame.x = monsterParts.leg.split(", ")[getRandomInt(4)];
monster.arm1.frame.x = monsterParts.arm.split(", ")[getRandomInt(4)];
monster.arm2.frame.x = monsterParts.arm.split(", ")[getRandomInt(4)];
monster.hand1.frame.x = monsterParts.hand.split(", ")[getRandomInt(4)];
monster.hand2.frame.x = monsterParts.hand.split(", ")[getRandomInt(4)];
monster.weapon.frame.x = monsterParts.weapon.split(", ")[getRandomInt(4)];

//Monster name
var monsterNamespace = {
  firstname: "Evil, Angry, Furious, Almighty, Wicked, Gross, Sneaky, Desperate, Black, Green, Punky, Dirty, Dark",
  secondname: "Ogre, Orc, Dwarf, Human, Gnome, Elf, Drow, Fairy, Coder, Editor, Doctor, Manager, Lord",
  thirdname: "Dima, Valeriy, Vladimir, Joseph, Adolf, Alex, Piotr, Donald, Victor, Tom, Voldy, Vader, Anakin, Yoda, Kylo"
};

var monsterNameText = nameTheMonster(monsterNamespace.firstname) + " " + nameTheMonster(monsterNamespace.secondname) + " " + nameTheMonster(monsterNamespace.thirdname);

// Text objects
var playerName = new Text("Arseniy", {
  font: "16px sans-serif",
  fill: "#2A080D",
  align: "left"
});

playerName.pos.x = player.pos.x + 10;
playerName.pos.y = player.pos.y - 20;

var monsterName = new Text(monsterNameText, {
  font: "16px sans-serif",
  fill: "#2A080D",
  align: "left"
});

monsterName.pos.x = monster.head.pos.x - 40;
monsterName.pos.y = monster.head.pos.y - 20;

var health = new Text("Health:", {
  font: "20px sans-serif",
  fill: "#2A080D",
  align: "left"
});

health.pos.x = 15;
health.pos.y = 15;

var monsterHealth = new Text("Health:", {
  font: "20px sans-serif",
  fill: "#2A080D",
  align: "right"
});

monsterHealth.pos.x = 630;
monsterHealth.pos.y = 15;

var message = new Text(" ", {
  font: "30pt sans-serif",
  fill: "#2A080D",
  align: "center"
});

message.pos.x = 330;
message.pos.y = 220;

//Records
var tableOfRecords = document.createElement("table");

// Add everything to the scene container
scene.add(background);
scene.add(player);

scene.add(monster.hand1);
scene.add(monster.leg1);
scene.add(monster.leg2);
scene.add(monster.arm1);
scene.add(monster.body);
scene.add(monster.arm2);
scene.add(monster.head);
scene.add(monster.weapon);
scene.add(monster.hand2);

scene.add(playerName);
scene.add(monsterName);
scene.add(health);
scene.add(monsterHealth);
scene.add(message);

// Main game loop
var dt = 0;
var last = 0;

function loopy(ms) {
  requestAnimationFrame(loopy);

  var t = ms / 1000;
  dt = t - last;
  last = t;

  // Game logic code
  health.text = "Health: " + healthAmount;
  monsterHealth.text = "Health: " + monsterHealthAmount;

  //Check for win
  if (monsterHealthAmount < 1) {
    doNextRound();
  }

  // Check for game over
  if (healthAmount < 1) {
    doGameOver();
  }

  //Update score
  localStorage.setItem("score", score);

  // Update everything
  scene.update(dt, t);
  // Render everything
  renderer.render(scene);
}
requestAnimationFrame(loopy);

modal.classList.remove("hidden");
var answerField = document.querySelector(".answer");
var spells = document.getElementsByName("spell");
var choose = document.querySelector(".choose-spell");
var submit = document.querySelector(".submit-answer");
var chosenSpell = void 0;

choose.addEventListener("submit", function () {
  event.preventDefault();
  taskWindow.classList.remove("hidden");
  modal.classList.add("hidden");
  for (var i = 0; i < 3; i++) {
    if (spells[i].checked) {
      chosenSpell = spells[i].value;
    }
  }
  spell = new TileSprite(textures[chosenSpell], 128, 128);
});

submit.addEventListener("submit", function () {
  event.preventDefault();
  localStorage.setItem("answer", answerField.value);
  taskWindow.classList.add("hidden");
  animateSpell();
  var answer = localStorage.getItem("answer");
  if (answer == newTask.answer) {
    rightAnswer = true;
    score += 5;
    message.text = "Right!";
    clearText();
  } else {
    rightAnswer = false;
    message.text = "Wrong!";
    clearText();
  }

  localStorage.removeItem("answer");
  answerField.value = "";
  setTimeout(function () {
    if (monsterHealthAmount > 0) {
      console.log(monsterHealthAmount);
      mathTask = new MathTask();
      newTask = new Task(mathTask.text, mathTask.result);
      taskTextField.innerHTML = newTask.text;
      animateMonsterSpell();
    }
  }, 3000);
});

function doWin() {
  var winMessage = new Text("You won!", {
    font: "30pt sans-serif",
    fill: "black",
    align: "center"
  });
  winMessage.pos.x = w / 2;
  winMessage.pos.y = 120;
  scene.add(winMessage);
  monster.head.frame.x += 52;
  taskWindow.classList.add("hidden");
  modal.classList.add("hidden");
}

function doGameOver() {
  var gameOverMessage = new Text("Game Over", {
    font: "30pt sans-serif",
    fill: "black",
    align: "center"
  });
  gameOverMessage.pos.x = w / 2;
  gameOverMessage.pos.y = 120;
  scene.add(gameOverMessage);
  player.texture = textures.playerDefeated;
  taskWindow.classList.add("hidden");
  modal.classList.add("hidden");
  gameOver = true;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

function nameTheMonster(str) {
  var arr = str.split(", ");
  var index = getRandomInt(arr.length);
  return arr[index];
}

function clearText() {
  setTimeout(function () {
    message.text = "";
    modal.classList.remove("hidden");
  }, 6000);
}

function animateSpell() {
  if (chosenSpell == "heal") {
    spell.pos.x = player.pos.x - 20;
    spell.pos.y = player.pos.y;
  } else {
    spell.pos.x = player.pos.x + 50;
    spell.pos.y = player.pos.y;
  }

  scene.add(spell);
  var interval = setInterval(frame, 50);

  function frame() {
    if (spell.frame.x < 512) {
      spell.frame.x += 128;
    } else {
      spell.frame.y += 128;
      spell.frame.x = 0;
    };

    if (chosenSpell != "heal") {
      spell.pos.x += 15;
    }
  };

  setTimeout(function () {
    applySpell();
    clearInterval(interval);
    spell.frame.x = 0;
    spell.frame.y = 0;
    scene.remove(spell);
  }, 1000);
}

function animateMonsterSpell() {
  monsterSpell.pos.x = monster.body.pos.x - 50;
  monsterSpell.pos.y = monster.body.pos.y;

  scene.add(monsterSpell);
  var interval = setInterval(frame, 50);

  function frame() {
    if (monsterSpell.frame.x < 512) {
      monsterSpell.frame.x += 128;
    } else {
      monsterSpell.frame.y += 128;
      monsterSpell.frame.x = 0;
    };

    monsterSpell.pos.x -= 20;
  };

  setTimeout(function () {
    applyMonsterSpell();
    clearInterval(interval);
    monsterSpell.frame.x = 0;
    monsterSpell.frame.y = 0;
    scene.remove(monsterSpell);
  }, 1500);
}

function applySpell() {
  if (rightAnswer == true) {
    if (chosenSpell == "heal") {
      healthAmount += 20;
    } else {
      monsterHealthAmount -= 20;
    }
  }
}

function applyMonsterSpell() {
  if (rightAnswer == true) {
    healthAmount -= 5;
  } else {
    healthAmount -= 20;
  }
}

function doNextRound() {
  doWin();
  setTimeout(function () {
    var interval = setInterval(frame, 1000);
    function frame() {
      player.pos.x += 5;
    };
  }, 1000);

  setTimeout(function () {
    window.location.reload(false);
  }, 4000);
}

},{"../lib/index.js":10}]},{},[12])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvQ29udGFpbmVyLmpzIiwibGliL0dhbWUuanMiLCJsaWIvTWF0aFRhc2suanMiLCJsaWIvU3ByaXRlLmpzIiwibGliL1Rhc2suanMiLCJsaWIvVGV4dC5qcyIsImxpYi9UZXh0dXJlLmpzIiwibGliL1RpbGVTcHJpdGUuanMiLCJsaWIvY29udGFpbmVyLmpzIiwibGliL2luZGV4LmpzIiwibGliL3JlbmRlcmVyL0NhbnZhc1JlbmRlcmVyLmpzIiwic3JjL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0lDQU0sUztBQUNKLHVCQUFjO0FBQUE7O0FBQ1YsU0FBSyxHQUFMLEdBQVcsRUFBRSxHQUFHLENBQUwsRUFBUSxHQUFHLENBQVgsRUFBWDtBQUNBLFNBQUssUUFBTCxHQUFnQixFQUFoQjtBQUNEOzs7O3dCQUVJLEssRUFBTztBQUNWLFdBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsS0FBbkI7QUFDQSxhQUFPLEtBQVA7QUFDRDs7OzJCQUNPLEssRUFBTztBQUNiLFdBQUssUUFBTCxHQUFnQixLQUFLLFFBQUwsQ0FBYyxNQUFkLENBQXFCO0FBQUEsZUFBSyxNQUFNLEtBQVg7QUFBQSxPQUFyQixDQUFoQjtBQUNBLGFBQU8sS0FBUDtBQUNEOzs7MkJBRU0sRSxFQUFJLEMsRUFBRztBQUFBOztBQUNaLFdBQUssUUFBTCxHQUFnQixLQUFLLFFBQUwsQ0FBYyxNQUFkLENBQXFCLGlCQUFTO0FBQzVDLFlBQUksTUFBTSxNQUFWLEVBQWtCO0FBQ2hCLGdCQUFNLE1BQU4sQ0FBYSxFQUFiLEVBQWlCLENBQWpCLEVBQW9CLEtBQXBCO0FBQ0Q7QUFDRCxlQUFPLE1BQU0sSUFBTixHQUFhLEtBQWIsR0FBcUIsSUFBNUI7QUFDRCxPQUxlLENBQWhCO0FBTUQ7Ozs7OztrQkFHVSxTOzs7Ozs7Ozs7OztBQ3pCZjs7OztBQUNBOzs7Ozs7OztBQUVBLElBQU0s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QUdLO0FBQ0gsb0JBQWdCLEVBQWhCO0FBQ0Q7QUFDRjs7QUFFRCxTQUFTLFdBQVQsR0FBdUI7QUFDckI7QUFDQSxhQUFXLFlBQVU7QUFDbkIsUUFBSSxXQUFXLFlBQVksS0FBWixFQUFtQixJQUFuQixDQUFmO0FBQ0EsYUFBUyxLQUFULEdBQWdCO0FBQ2QsYUFBTyxHQUFQLENBQVcsQ0FBWCxJQUFnQixDQUFoQjtBQUNEO0FBQ0YsR0FMRCxFQUtHLElBTEg7O0FBT0EsYUFBVyxZQUFVO0FBQ25CLFdBQU8sUUFBUCxDQUFnQixNQUFoQixDQUF1QixLQUF2QjtBQUNELEdBRkQsRUFFRyxJQUZIO0FBR0QiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjbGFzcyBDb250YWluZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICB0aGlzLnBvcyA9IHsgeDogMCwgeTogMCB9O1xyXG4gICAgICB0aGlzLmNoaWxkcmVuID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgYWRkIChjaGlsZCkge1xyXG4gICAgICB0aGlzLmNoaWxkcmVuLnB1c2goY2hpbGQpO1xyXG4gICAgICByZXR1cm4gY2hpbGQ7XHJcbiAgICB9XHJcbiAgICByZW1vdmUgKGNoaWxkKSB7XHJcbiAgICAgIHRoaXMuY2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuLmZpbHRlcihjID0+IGMgIT09IGNoaWxkKTtcclxuICAgICAgcmV0dXJuIGNoaWxkO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkdCwgdCkge1xyXG4gICAgICB0aGlzLmNoaWxkcmVuID0gdGhpcy5jaGlsZHJlbi5maWx0ZXIoY2hpbGQgPT4ge1xyXG4gICAgICAgIGlmIChjaGlsZC51cGRhdGUpIHtcclxuICAgICAgICAgIGNoaWxkLnVwZGF0ZShkdCwgdCwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjaGlsZC5kZWFkID8gZmFsc2UgOiB0cnVlO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgQ29udGFpbmVyO1xyXG4iLCJpbXBvcnQgQ29udGFpbmVyIGZyb20gXCIuL2NvbnRhaW5lci5qc1wiO1xyXG5pbXBvcnQgQ2FudmFzUmVuZGVyZXIgZnJvbSBcIi4vcmVuZGVyZXIvQ2FudmFzUmVuZGVyZXIuanNcIjtcclxuXHJcbmNvbnN0IFNURVAgPSAxIC8gNjA7XHJcbmNvbnN0IE1BWF9GUkFNRSA9IFNURVAgKiA1O1xyXG5cclxuY2xhc3MgR2FtZSB7XHJcbiAgY29uc3RydWN0b3IgKHcsIGgsIHBhcmVudCA9IFwiLm1haW4tYm9hcmRcIikge1xyXG4gIHRoaXMudyA9IHc7XHJcbiAgdGhpcy5oID0gaDtcclxuICB0aGlzLnJlbmRlcmVyID0gbmV3IENhbnZhc1JlbmRlcmVyKHcsIGgpO1xyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocGFyZW50KS5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlcmVyLnZpZXcpO1xyXG4gIHRoaXMuc2NlbmUgPSBuZXcgQ29udGFpbmVyKCk7XHJcbiAgfVxyXG5cclxuICBydW4oZ2FtZVVwZGF0ZSA9ICgpID0+IHt9KSB7XHJcbiAgICBsZXQgZHQgPSAwO1xyXG4gICAgbGV0IGxhc3QgPSAwO1xyXG4gICAgY29uc3QgbG9vcHkgPSBtcyA9PiB7XHJcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29weSk7XHJcblxyXG4gICAgICBjb25zdCB0ID0gbXMgLyAxMDAwO1xyXG4gICAgICBkdCA9IE1hdGgubWluKHQgLSBsYXN0LCBNQVhfRlJBTUUpO1xyXG4gICAgICBsYXN0ID0gdDtcclxuXHJcbiAgICAgIHRoaXMuc2NlbmUudXBkYXRlKGR0LCB0KTtcclxuICAgICAgZ2FtZVVwZGF0ZShkdCwgdCk7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUpO1xyXG4gICAgfTtcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29weSk7XHJcbiAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEdhbWU7XHJcbiIsImNsYXNzIE1hdGhUYXNrIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIGNvbnN0IG9wZXJhdG9ycyA9IHtcclxuICAgICAgXCIrXCI6IGZ1bmN0aW9uIChhLCBiKSB7cmV0dXJuIGEgKyBifSxcclxuICAgICAgXCItXCI6IGZ1bmN0aW9uIChhLCBiKSB7cmV0dXJuIGEgLSBifSxcclxuICAgICAgXCIqXCI6IGZ1bmN0aW9uIChhLCBiKSB7cmV0dXJuIGEgKiBifSxcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0UmFuZG9tSW50KG1heCkge1xyXG4gICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogTWF0aC5mbG9vcihtYXgpKTtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IGxlZnQgPSBnZXRSYW5kb21JbnQoMTApO1xyXG4gICAgbGV0IHJpZ2h0ID0gZ2V0UmFuZG9tSW50KDEwKTtcclxuICAgIGxldCBpID0gZ2V0UmFuZG9tSW50KDIpO1xyXG4gICAgbGV0IHNpZ24gPSBPYmplY3Qua2V5cyhvcGVyYXRvcnMpW2ldO1xyXG4gICAgbGV0IG9wZXJhdG9yID0gb3BlcmF0b3JzW3NpZ25dO1xyXG5cclxuXHJcbiAgICB0aGlzLnRleHQgPSBsZWZ0ICsgXCIgXCIgKyBzaWduICsgXCIgXCIgKyByaWdodCArIFwiID0gP1wiO1xyXG4gICAgdGhpcy5yZXN1bHQgPSBvcGVyYXRvcihsZWZ0LCByaWdodCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYXRoVGFzaztcclxuIiwiY2xhc3MgU3ByaXRlIHtcclxuICBjb25zdHJ1Y3RvciAodGV4dHVyZSkge1xyXG4gICAgdGhpcy50ZXh0dXJlID0gdGV4dHVyZTtcclxuICAgIHRoaXMucG9zID0geyB4OiAwLCB5OiAwIH07XHJcbiAgICB0aGlzLmFuY2hvciA9IHsgeDogMCwgeTogMCB9O1xyXG4gICAgdGhpcy5zY2FsZSA9IHsgeDogMSwgeTogMSB9O1xyXG4gIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBTcHJpdGU7XHJcbiIsImNsYXNzIFRhc2sge1xyXG4gIGNvbnN0cnVjdG9yICh0ZXh0LCBhbnN3ZXIpIHtcclxuICAgIHRoaXMudGV4dCA9IHRleHQ7XHJcbiAgICB0aGlzLmFuc3dlciA9IGFuc3dlcjtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRhc2s7XHJcbiIsImNsYXNzIFRleHQge1xyXG4gIGNvbnN0cnVjdG9yKHRleHQgPSBcIlwiLCBzdHlsZSA9IHt9KSB7XHJcbiAgdGhpcy5wb3MgPSB7IHg6IDAsIHk6IDAgfTtcclxuICB0aGlzLnRleHQgPSB0ZXh0O1xyXG4gIHRoaXMuc3R5bGUgPSBzdHlsZTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRleHQ7XHJcbiIsImNsYXNzIFRleHR1cmUge1xyXG4gIGNvbnN0cnVjdG9yICh1cmwpIHtcclxuICAgIHRoaXMuaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICB0aGlzLmltZy5zcmMgPSB1cmw7XHJcbiAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IFRleHR1cmU7XHJcbiIsImltcG9ydCBTcHJpdGUgZnJvbSBcIi4vU3ByaXRlLmpzXCI7XHJcbmNsYXNzIFRpbGVTcHJpdGUgZXh0ZW5kcyBTcHJpdGUge1xyXG4gIGNvbnN0cnVjdG9yICh0ZXh0dXJlLCB3LCBoKSB7XHJcbiAgc3VwZXIodGV4dHVyZSk7XHJcbiAgdGhpcy50aWxlVyA9IHc7XHJcbiAgdGhpcy50aWxlSCA9IGg7XHJcbiAgdGhpcy5mcmFtZSA9IHsgeDogMCwgeTogMCB9O1xyXG4gIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBUaWxlU3ByaXRlO1xyXG4iLCJjbGFzcyBDb250YWluZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICB0aGlzLnBvcyA9IHsgeDogMCwgeTogMCB9O1xyXG4gICAgICB0aGlzLmNoaWxkcmVuID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgYWRkIChjaGlsZCkge1xyXG4gICAgICB0aGlzLmNoaWxkcmVuLnB1c2goY2hpbGQpO1xyXG4gICAgICByZXR1cm4gY2hpbGQ7XHJcbiAgICB9XHJcbiAgICByZW1vdmUgKGNoaWxkKSB7XHJcbiAgICAgIHRoaXMuY2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuLmZpbHRlcihjID0+IGMgIT09IGNoaWxkKTtcclxuICAgICAgcmV0dXJuIGNoaWxkO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkdCwgdCkge1xyXG4gICAgICB0aGlzLmNoaWxkcmVuID0gdGhpcy5jaGlsZHJlbi5maWx0ZXIoY2hpbGQgPT4ge1xyXG4gICAgICAgIGlmIChjaGlsZC51cGRhdGUpIHtcclxuICAgICAgICAgIGNoaWxkLnVwZGF0ZShkdCwgdCwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjaGlsZC5kZWFkID8gZmFsc2UgOiB0cnVlO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgQ29udGFpbmVyO1xyXG4iLCJpbXBvcnQgQ29udGFpbmVyIGZyb20gXCIuL0NvbnRhaW5lci5qc1wiO1xyXG5pbXBvcnQgQ2FudmFzUmVuZGVyZXIgZnJvbSBcIi4vcmVuZGVyZXIvQ2FudmFzUmVuZGVyZXIuanNcIjtcclxuaW1wb3J0IEdhbWUgZnJvbSBcIi4vR2FtZS5qc1wiO1xyXG5pbXBvcnQgVGV4dCBmcm9tIFwiLi9UZXh0LmpzXCI7XHJcbmltcG9ydCBUYXNrIGZyb20gXCIuL1Rhc2suanNcIjtcclxuaW1wb3J0IE1hdGhUYXNrIGZyb20gXCIuL01hdGhUYXNrLmpzXCI7XHJcbmltcG9ydCBTcHJpdGUgZnJvbSBcIi4vU3ByaXRlLmpzXCI7XHJcbmltcG9ydCBUaWxlU3ByaXRlIGZyb20gXCIuL1RpbGVTcHJpdGUuanNcIjtcclxuaW1wb3J0IFRleHR1cmUgZnJvbSBcIi4vVGV4dHVyZS5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIENvbnRhaW5lcixcclxuICBDYW52YXNSZW5kZXJlcixcclxuICBHYW1lLFxyXG4gIFRleHQsXHJcbiAgVGFzayxcclxuICBNYXRoVGFzayxcclxuICBTcHJpdGUsXHJcbiAgVGlsZVNwcml0ZSxcclxuICBUZXh0dXJlXHJcbn07XHJcbiIsImNsYXNzIENhbnZhc1JlbmRlcmVyIHtcclxuICBjb25zdHJ1Y3Rvcih3LCBoKSB7XHJcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgdGhpcy53ID0gY2FudmFzLndpZHRoID0gdztcclxuICAgIHRoaXMuaCA9IGNhbnZhcy5oZWlnaHQgPSBoO1xyXG4gICAgdGhpcy52aWV3ID0gY2FudmFzO1xyXG4gICAgdGhpcy5jdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgdGhpcy5jdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmN0eC50ZXh0QmFzZWxpbmUgPSBcInRvcFwiO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKGNvbnRhaW5lciwgY2xlYXIgPSB0cnVlKSB7XHJcbiAgICBpZiAoY29udGFpbmVyLnZpc2libGUgPT0gZmFsc2UpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgeyBjdHggfSA9IHRoaXM7XHJcblxyXG4gICAgZnVuY3Rpb24gcmVuZGVyUmVjKGNvbnRhaW5lcikge1xyXG4gICAgICAvLyBSZW5kZXIgdGhlIGNvbnRhaW5lciBjaGlsZHJlblxyXG4gICAgICBjb250YWluZXIuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XHJcbiAgICAgICAgaWYgKGNoaWxkLnZpc2libGUgPT0gZmFsc2UpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY3R4LnNhdmUoKTtcclxuXHJcbiAgICAgICAgLy8gSGFuZGxlIHRyYW5zZm9ybXNcclxuICAgICAgICBpZiAoY2hpbGQucG9zKSB7XHJcbiAgICAgICAgICBjdHgudHJhbnNsYXRlKE1hdGgucm91bmQoY2hpbGQucG9zLngpLCBNYXRoLnJvdW5kKGNoaWxkLnBvcy55KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGlsZC5hbmNob3IpIGN0eC50cmFuc2xhdGUoY2hpbGQuYW5jaG9yLngsIGNoaWxkLmFuY2hvci55KTtcclxuICAgICAgICBpZiAoY2hpbGQuc2NhbGUpIGN0eC5zY2FsZShjaGlsZC5zY2FsZS54LCBjaGlsZC5zY2FsZS55KTtcclxuXHJcbiAgICAgICAgLy8gRHJhdyB0aGUgbGVhZiBub2Rlc1xyXG4gICAgICAgIGlmIChjaGlsZC50ZXh0KSB7XHJcbiAgICAgICAgICBjb25zdCB7IGZvbnQsIGZpbGwsIGFsaWduIH0gPSBjaGlsZC5zdHlsZTtcclxuICAgICAgICAgIGlmIChmb250KSBjdHguZm9udCA9IGZvbnQ7XHJcbiAgICAgICAgICBpZiAoZmlsbCkgY3R4LmZpbGxTdHlsZSA9IGZpbGw7XHJcbiAgICAgICAgICBpZiAoYWxpZ24pIGN0eC50ZXh0QWxpZ24gPSBhbGlnbjtcclxuICAgICAgICAgIGN0eC5maWxsVGV4dChjaGlsZC50ZXh0LCAwLCAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGVsc2UgaWYgKGNoaWxkLnRleHR1cmUpIHtcclxuICAgICAgICAgIGNvbnN0IGltZyA9IGNoaWxkLnRleHR1cmUuaW1nO1xyXG4gICAgICAgICAgICBpZiAoY2hpbGQudGlsZVcpIHtcclxuICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKFxyXG4gICAgICAgICAgICAgICAgaW1nLFxyXG4gICAgICAgICAgICAgICAgY2hpbGQuZnJhbWUueCwgLy8gc291cmNlIHhcclxuICAgICAgICAgICAgICAgIGNoaWxkLmZyYW1lLnksIC8vIHNvdXJjZSB5XHJcbiAgICAgICAgICAgICAgICBjaGlsZC50aWxlVywgY2hpbGQudGlsZUgsICAgIC8vIHdpZHRoIGFuZCBoZWlnaHRcclxuICAgICAgICAgICAgICAgIDAsIDAsICAgICAgICAgICAgICAgICAgICAgICAvLyBkZXN0aW5hdGlvbiB4IGFuZCB5XHJcbiAgICAgICAgICAgICAgICBjaGlsZC50aWxlVywgY2hpbGQudGlsZUggICAgLy8gZGVzdGluYXRpb24gd2lkdGggYW5kIGhlaWdodFxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcsIDAsIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJlbmRlciBhbnkgY2hpbGQgc3ViLW5vZGVzXHJcbiAgICAgICAgaWYgKGNoaWxkLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICByZW5kZXJSZWMoY2hpbGQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdHgucmVzdG9yZSgpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2xlYXIpIHtcclxuICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLncsIHRoaXMuaCk7XHJcbiAgICB9XHJcbiAgICByZW5kZXJSZWMoY29udGFpbmVyKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENhbnZhc1JlbmRlcmVyO1xyXG4iLCJpbXBvcnQgbGliIGZyb20gXCIuLi9saWIvaW5kZXguanNcIjtcclxuY29uc3QgeyBDb250YWluZXIsIENhbnZhc1JlbmRlcmVyLCBUZXh0LCBTcHJpdGUsIFRpbGVTcHJpdGUsIFRleHR1cmUsIFRhc2ssIE1hdGhUYXNrIH0gPSBsaWI7XHJcblxyXG4vLyBHYW1lIHNldHVwIGNvZGVcclxuY29uc3QgdyA9IDY0MDtcclxuY29uc3QgaCA9IDQ4MDtcclxuY29uc3QgcmVuZGVyZXIgPSBuZXcgQ2FudmFzUmVuZGVyZXIodywgaCk7XHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1ib2FyZFwiKS5hcHBlbmRDaGlsZChyZW5kZXJlci52aWV3KTtcclxuXHJcbi8vIExvYWQgZ2FtZSB0ZXh0dXJlc1xyXG5jb25zdCB0ZXh0dXJlcyA9IHtcclxuICBiYWNrZ3JvdW5kMDogbmV3IFRleHR1cmUoXCJyZXMvaW1nL2JnMC5qcGdcIiksXHJcbiAgYmFja2dyb3VuZDE6IG5ldyBUZXh0dXJlKFwicmVzL2ltZy9iZzEuanBnXCIpLFxyXG4gIGJhY2tncm91bmQyOiBuZXcgVGV4dHVyZShcInJlcy9pbWcvYmcyLmpwZ1wiKSxcclxuICBwbGF5ZXI6IG5ldyBUZXh0dXJlKFwicmVzL2ltZy9wbGF5ZXJfc3RhbmQucG5nXCIpLFxyXG4gIG1vbnN0ZXI6IG5ldyBUZXh0dXJlKFwicmVzL2ltZy9tb25zdGVyX3BhcnRzLnBuZ1wiKSxcclxuICBwbGF5ZXJEZWZlYXRlZDogbmV3IFRleHR1cmUoXCJyZXMvaW1nL3BsYXllcl9odXJ0LnBuZ1wiKSxcclxuICBtb25zdGVyRGVmZWF0ZWQ6IG5ldyBUZXh0dXJlKFwicmVzL2ltZy96b21iaWVfaHVydC5wbmdcIiksXHJcbiAgZmlyZTogbmV3IFRleHR1cmUoXCJyZXMvaW1nL3NwZWxscy9maXJlLnBuZ1wiKSxcclxuICBsaWdodDogbmV3IFRleHR1cmUoXCJyZXMvaW1nL3NwZWxscy9saWdodG5pbmcucG5nXCIpLFxyXG4gIGhlYWw6IG5ldyBUZXh0dXJlKFwicmVzL2ltZy9zcGVsbHMvaGVhbC5wbmdcIiksXHJcbiAgbW9uc3RlclNwZWxsOiBuZXcgVGV4dHVyZShcInJlcy9pbWcvc3BlbGxzL3NuYWtlYml0ZS5wbmdcIilcclxufTtcclxuXHJcbi8vIEdhbWUgb2JqZWN0c1xyXG5jb25zdCBzY2VuZSA9IG5ldyBDb250YWluZXIoKTtcclxuY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsXCIpO1xyXG5jb25zdCB0YXNrV2luZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLXdpbmRvd1wiKTtcclxuXHJcbi8vIEdhbWUgc3RhdGUgdmFyaWFibGVzXHJcbmxldCBoZWFsdGhBbW91bnQgPSAxMDA7XHJcbmxldCBtb25zdGVySGVhbHRoQW1vdW50ID0gMTAwO1xyXG5cclxubGV0IHRhc2tUZXh0RmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2tcIik7XHJcbmxldCBtYXRoVGFzayA9IG5ldyBNYXRoVGFzaygpO1xyXG5sZXQgbmV3VGFzayA9IG5ldyBUYXNrKG1hdGhUYXNrLnRleHQsIG1hdGhUYXNrLnJlc3VsdCk7XHJcbnRhc2tUZXh0RmllbGQuaW5uZXJIVE1MID0gbmV3VGFzay50ZXh0O1xyXG5cclxuLy9HYW1lIHN0YXRlXHJcbmxldCB3aW4gPSBmYWxzZTtcclxubGV0IGdhbWVPdmVyID0gZmFsc2U7XHJcbmxldCBzY29yZSA9IDA7XHJcbmxldCByaWdodEFuc3dlcjtcclxuXHJcbi8vQmFja2dyb3VuZFxyXG5sZXQgYmFja2dyb3VuZCA9IG5ldyBTcHJpdGUodGV4dHVyZXNbXCJiYWNrZ3JvdW5kXCIgKyBnZXRSYW5kb21JbnQoMyldKTtcclxuXHJcbi8vU3BlbGxzXHJcbmxldCBzcGVsbDtcclxuY29uc3QgbW9uc3RlclNwZWxsID0gbmV3IFRpbGVTcHJpdGUodGV4dHVyZXMubW9uc3RlclNwZWxsLCAxMjgsIDEyOCk7XHJcblxyXG4vL1BsYXllclxyXG5jb25zdCBwbGF5ZXIgPSBuZXcgU3ByaXRlKHRleHR1cmVzLnBsYXllcik7XHJcblxyXG5wbGF5ZXIucG9zLnggPSAxMDA7XHJcbnBsYXllci5wb3MueSA9IDMwMDtcclxuXHJcbi8vTW9uc3RlclxyXG5jb25zdCBtb25zdGVyID0ge1xyXG4gIGhlYWQ6IG5ldyBUaWxlU3ByaXRlKHRleHR1cmVzLm1vbnN0ZXIsIDUwLCA1MiksXHJcbiAgYm9keTogbmV3IFRpbGVTcHJpdGUodGV4dHVyZXMubW9uc3RlciwgMzksIDMxKSxcclxuICBsZWcxOiBuZXcgVGlsZVNwcml0ZSh0ZXh0dXJlcy5tb25zdGVyLCAyMSwgMjMpLFxyXG4gIGxlZzI6IG5ldyBUaWxlU3ByaXRlKHRleHR1cmVzLm1vbnN0ZXIsIDIxLCAyMyksXHJcbiAgYXJtMTogbmV3IFRpbGVTcHJpdGUodGV4dHVyZXMubW9uc3RlciwgMTcsIDMzKSxcclxuICBhcm0yOiBuZXcgVGlsZVNwcml0ZSh0ZXh0dXJlcy5tb25zdGVyLCAxNywgMzMpLFxyXG4gIGhhbmQxOiBuZXcgVGlsZVNwcml0ZSh0ZXh0dXJlcy5tb25zdGVyLCAxNywgMTUpLFxyXG4gIGhhbmQyOiBuZXcgVGlsZVNwcml0ZSh0ZXh0dXJlcy5tb25zdGVyLCAxNywgMTUpLFxyXG4gIHdlYXBvbjogbmV3IFRpbGVTcHJpdGUodGV4dHVyZXMubW9uc3RlciwgNTgsIDU3KVxyXG59O1xyXG5cclxuLy9Nb25zdGVyIHBhcnRzIHBvc2l0aW9uc1xyXG5tb25zdGVyLmhlYWQucG9zLnggPSA1MDA7XHJcbm1vbnN0ZXIuaGVhZC5wb3MueSA9IDMwMDtcclxuXHJcbm1vbnN0ZXIuYm9keS5wb3MueCA9IG1vbnN0ZXIuaGVhZC5wb3MueCArIDU7XHJcbm1vbnN0ZXIuYm9keS5wb3MueSA9IG1vbnN0ZXIuaGVhZC5wb3MueSArIG1vbnN0ZXIuaGVhZC50aWxlSCAtIDU7XHJcblxyXG5tb25zdGVyLmxlZzEucG9zLnggPSA1MDA7XHJcbm1vbnN0ZXIubGVnMS5wb3MueSA9IG1vbnN0ZXIuYm9keS5wb3MueSArIG1vbnN0ZXIuYm9keS50aWxlSCAtIDc7XHJcblxyXG5tb25zdGVyLmxlZzIucG9zLnggPSA1MDAgKyBtb25zdGVyLmxlZzIudGlsZVc7XHJcbm1vbnN0ZXIubGVnMi5wb3MueSA9IG1vbnN0ZXIuYm9keS5wb3MueSArIG1vbnN0ZXIuYm9keS50aWxlSCAtIDc7XHJcblxyXG5tb25zdGVyLmFybTEucG9zLnggPSA1MDAgLSBtb25zdGVyLmFybTEudGlsZVcgLyAyICsgNTtcclxubW9uc3Rlci5hcm0xLnBvcy55ID0gbW9uc3Rlci5ib2R5LnBvcy55O1xyXG5cclxubW9uc3Rlci5hcm0xLmFuY2hvci54ID0gbW9uc3Rlci5hcm0xLnRpbGVXO1xyXG5tb25zdGVyLmFybTEuc2NhbGUueCA9IC0xO1xyXG5cclxubW9uc3Rlci5hcm0yLnBvcy54ID0gNTAwICsgbW9uc3Rlci5ib2R5LnRpbGVXIC0gbW9uc3Rlci5hcm0xLnRpbGVXIC8gMjtcclxubW9uc3Rlci5hcm0yLnBvcy55ID0gbW9uc3Rlci5ib2R5LnBvcy55O1xyXG5cclxubW9uc3Rlci5oYW5kMS5wb3MueCA9IG1vbnN0ZXIuYXJtMS5wb3MueDtcclxubW9uc3Rlci5oYW5kMS5wb3MueSA9IG1vbnN0ZXIuYXJtMS5wb3MueSArIG1vbnN0ZXIuYXJtMS50aWxlSCAtIDU7XHJcblxyXG5tb25zdGVyLmhhbmQxLmFuY2hvci54ID0gbW9uc3Rlci5oYW5kMS50aWxlVztcclxubW9uc3Rlci5oYW5kMS5zY2FsZS54ID0gLTE7XHJcblxyXG5tb25zdGVyLmhhbmQyLnBvcy54ID0gbW9uc3Rlci5hcm0yLnBvcy54O1xyXG5tb25zdGVyLmhhbmQyLnBvcy55ID0gbW9uc3Rlci5hcm0yLnBvcy55ICsgbW9uc3Rlci5hcm0yLnRpbGVIIC0gNTtcclxuXHJcbm1vbnN0ZXIud2VhcG9uLnBvcy54ID0gbW9uc3Rlci5oYW5kMS5wb3MueCAtIDU7XHJcbm1vbnN0ZXIud2VhcG9uLnBvcy55ID0gbW9uc3Rlci5oYW5kMS5wb3MueSAtIG1vbnN0ZXIud2VhcG9uLnRpbGVIICsgMjU7XHJcblxyXG5jb25zdCBtb25zdGVyUGFydHMgPSB7XHJcbiAgaGVhZDogXCIyOTQsIDM5OCwgNDk4LCA1OTlcIixcclxuICBib2R5OiBcIjcwLCAxMDksIDE0OCwgMTg3XCIsXHJcbiAgbGVnOiBcIjY5NiwgNzE3LCA3MzgsIDc1OVwiLFxyXG4gIGFybTogXCIwLCAxNywgMzUsIDUzXCIsXHJcbiAgaGFuZDogXCIyMjYsIDI0MywgMjYwLCAyNzdcIixcclxuICB3ZWFwb246IFwiNzgwLCA4MzgsIDg5NiwgOTU0XCJcclxufVxyXG5cclxubW9uc3Rlci5oZWFkLmZyYW1lLnggPSBtb25zdGVyUGFydHMuaGVhZC5zcGxpdChcIiwgXCIpW2dldFJhbmRvbUludCg0KV07XHJcbm1vbnN0ZXIuYm9keS5mcmFtZS54ID0gbW9uc3RlclBhcnRzLmJvZHkuc3BsaXQoXCIsIFwiKVtnZXRSYW5kb21JbnQoNCldO1xyXG5tb25zdGVyLmxlZzEuZnJhbWUueCA9IG1vbnN0ZXJQYXJ0cy5sZWcuc3BsaXQoXCIsIFwiKVtnZXRSYW5kb21JbnQoNCldO1xyXG5tb25zdGVyLmxlZzIuZnJhbWUueCA9IG1vbnN0ZXJQYXJ0cy5sZWcuc3BsaXQoXCIsIFwiKVtnZXRSYW5kb21JbnQoNCldO1xyXG5tb25zdGVyLmFybTEuZnJhbWUueCA9IG1vbnN0ZXJQYXJ0cy5hcm0uc3BsaXQoXCIsIFwiKVtnZXRSYW5kb21JbnQoNCldO1xyXG5tb25zdGVyLmFybTIuZnJhbWUueCA9IG1vbnN0ZXJQYXJ0cy5hcm0uc3BsaXQoXCIsIFwiKVtnZXRSYW5kb21JbnQoNCldO1xyXG5tb25zdGVyLmhhbmQxLmZyYW1lLnggPSBtb25zdGVyUGFydHMuaGFuZC5zcGxpdChcIiwgXCIpW2dldFJhbmRvbUludCg0KV07XHJcbm1vbnN0ZXIuaGFuZDIuZnJhbWUueCA9IG1vbnN0ZXJQYXJ0cy5oYW5kLnNwbGl0KFwiLCBcIilbZ2V0UmFuZG9tSW50KDQpXTtcclxubW9uc3Rlci53ZWFwb24uZnJhbWUueCA9IG1vbnN0ZXJQYXJ0cy53ZWFwb24uc3BsaXQoXCIsIFwiKVtnZXRSYW5kb21JbnQoNCldO1xyXG5cclxuLy9Nb25zdGVyIG5hbWVcclxuY29uc3QgbW9uc3Rlck5hbWVzcGFjZSA9IHtcclxuICBmaXJzdG5hbWU6IFwiRXZpbCwgQW5ncnksIEZ1cmlvdXMsIEFsbWlnaHR5LCBXaWNrZWQsIEdyb3NzLCBTbmVha3ksIERlc3BlcmF0ZSwgQmxhY2ssIEdyZWVuLCBQdW5reSwgRGlydHksIERhcmtcIixcclxuICBzZWNvbmRuYW1lOiBcIk9ncmUsIE9yYywgRHdhcmYsIEh1bWFuLCBHbm9tZSwgRWxmLCBEcm93LCBGYWlyeSwgQ29kZXIsIEVkaXRvciwgRG9jdG9yLCBNYW5hZ2VyLCBMb3JkXCIsXHJcbiAgdGhpcmRuYW1lOiBcIkRpbWEsIFZhbGVyaXksIFZsYWRpbWlyLCBKb3NlcGgsIEFkb2xmLCBBbGV4LCBQaW90ciwgRG9uYWxkLCBWaWN0b3IsIFRvbSwgVm9sZHksIFZhZGVyLCBBbmFraW4sIFlvZGEsIEt5bG9cIlxyXG59XHJcblxyXG5jb25zdCBtb25zdGVyTmFtZVRleHQgPSBuYW1lVGhlTW9uc3Rlcihtb25zdGVyTmFtZXNwYWNlLmZpcnN0bmFtZSkgKyBcIiBcIiArIG5hbWVUaGVNb25zdGVyKG1vbnN0ZXJOYW1lc3BhY2Uuc2Vjb25kbmFtZSkgKyBcIiBcIiArIG5hbWVUaGVNb25zdGVyKG1vbnN0ZXJOYW1lc3BhY2UudGhpcmRuYW1lKTtcclxuXHJcbi8vIFRleHQgb2JqZWN0c1xyXG5jb25zdCBwbGF5ZXJOYW1lID0gbmV3IFRleHQoXCJBcnNlbml5XCIsXHJcbntcclxuICBmb250OiBcIjE2cHggc2Fucy1zZXJpZlwiLFxyXG4gIGZpbGw6IFwiIzJBMDgwRFwiLFxyXG4gIGFsaWduOiBcImxlZnRcIlxyXG59XHJcbilcclxuXHJcbnBsYXllck5hbWUucG9zLnggPSBwbGF5ZXIucG9zLnggKyAxMDtcclxucGxheWVyTmFtZS5wb3MueSA9IHBsYXllci5wb3MueSAtIDIwO1xyXG5cclxuY29uc3QgbW9uc3Rlck5hbWUgPSBuZXcgVGV4dChtb25zdGVyTmFtZVRleHQsXHJcbntcclxuICBmb250OiBcIjE2cHggc2Fucy1zZXJpZlwiLFxyXG4gIGZpbGw6IFwiIzJBMDgwRFwiLFxyXG4gIGFsaWduOiBcImxlZnRcIlxyXG59KTtcclxuXHJcbm1vbnN0ZXJOYW1lLnBvcy54ID0gbW9uc3Rlci5oZWFkLnBvcy54IC0gNDA7XHJcbm1vbnN0ZXJOYW1lLnBvcy55ID0gbW9uc3Rlci5oZWFkLnBvcy55IC0gMjA7XHJcblxyXG5jb25zdCBoZWFsdGggPSBuZXcgVGV4dChcIkhlYWx0aDpcIixcclxue1xyXG4gIGZvbnQ6IFwiMjBweCBzYW5zLXNlcmlmXCIsXHJcbiAgZmlsbDogXCIjMkEwODBEXCIsXHJcbiAgYWxpZ246IFwibGVmdFwiXHJcbn0pO1xyXG5cclxuaGVhbHRoLnBvcy54ID0gMTU7XHJcbmhlYWx0aC5wb3MueSA9IDE1O1xyXG5cclxuY29uc3QgbW9uc3RlckhlYWx0aCA9IG5ldyBUZXh0KFwiSGVhbHRoOlwiLCB7XHJcbiAgZm9udDogXCIyMHB4IHNhbnMtc2VyaWZcIixcclxuICBmaWxsOiBcIiMyQTA4MERcIixcclxuICBhbGlnbjogXCJyaWdodFwiXHJcbn0pO1xyXG5cclxubW9uc3RlckhlYWx0aC5wb3MueCA9IDYzMDtcclxubW9uc3RlckhlYWx0aC5wb3MueSA9IDE1O1xyXG5cclxuY29uc3QgbWVzc2FnZSA9IG5ldyBUZXh0KFwiIFwiLCB7XHJcbiAgZm9udDogXCIzMHB0IHNhbnMtc2VyaWZcIixcclxuICBmaWxsOiBcIiMyQTA4MERcIixcclxuICBhbGlnbjogXCJjZW50ZXJcIlxyXG59KTtcclxuXHJcbm1lc3NhZ2UucG9zLnggPSAzMzA7XHJcbm1lc3NhZ2UucG9zLnkgPSAyMjA7XHJcblxyXG4vL1JlY29yZHNcclxuY29uc3QgdGFibGVPZlJlY29yZHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGFibGVcIik7XHJcblxyXG5cclxuLy8gQWRkIGV2ZXJ5dGhpbmcgdG8gdGhlIHNjZW5lIGNvbnRhaW5lclxyXG5zY2VuZS5hZGQoYmFja2dyb3VuZCk7XHJcbnNjZW5lLmFkZChwbGF5ZXIpO1xyXG5cclxuc2NlbmUuYWRkKG1vbnN0ZXIuaGFuZDEpO1xyXG5zY2VuZS5hZGQobW9uc3Rlci5sZWcxKTtcclxuc2NlbmUuYWRkKG1vbnN0ZXIubGVnMik7XHJcbnNjZW5lLmFkZChtb25zdGVyLmFybTEpO1xyXG5zY2VuZS5hZGQobW9uc3Rlci5ib2R5KTtcclxuc2NlbmUuYWRkKG1vbnN0ZXIuYXJtMik7XHJcbnNjZW5lLmFkZChtb25zdGVyLmhlYWQpO1xyXG5zY2VuZS5hZGQobW9uc3Rlci53ZWFwb24pO1xyXG5zY2VuZS5hZGQobW9uc3Rlci5oYW5kMik7XHJcblxyXG5zY2VuZS5hZGQocGxheWVyTmFtZSk7XHJcbnNjZW5lLmFkZChtb25zdGVyTmFtZSk7XHJcbnNjZW5lLmFkZChoZWFsdGgpO1xyXG5zY2VuZS5hZGQobW9uc3RlckhlYWx0aCk7XHJcbnNjZW5lLmFkZChtZXNzYWdlKTtcclxuXHJcbi8vIE1haW4gZ2FtZSBsb29wXHJcbmxldCBkdCA9IDA7XHJcbmxldCBsYXN0ID0gMDtcclxuXHJcbmZ1bmN0aW9uIGxvb3B5KG1zKSB7XHJcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3B5KTtcclxuXHJcbiAgY29uc3QgdCA9IG1zIC8gMTAwMDtcclxuICBkdCA9IHQgLSBsYXN0O1xyXG4gIGxhc3QgPSB0O1xyXG5cclxuICAvLyBHYW1lIGxvZ2ljIGNvZGVcclxuICBoZWFsdGgudGV4dCA9IFwiSGVhbHRoOiBcIiArIGhlYWx0aEFtb3VudDtcclxuICBtb25zdGVySGVhbHRoLnRleHQgPSBcIkhlYWx0aDogXCIgKyBtb25zdGVySGVhbHRoQW1vdW50O1xyXG5cclxuICAvL0NoZWNrIGZvciB3aW5cclxuICBpZiAobW9uc3RlckhlYWx0aEFtb3VudCA8IDEpIHtcclxuICAgIGRvTmV4dFJvdW5kKCk7XHJcbiAgfVxyXG5cclxuICAvLyBDaGVjayBmb3IgZ2FtZSBvdmVyXHJcbiAgaWYgKGhlYWx0aEFtb3VudCA8IDEpIHtcclxuICAgIGRvR2FtZU92ZXIoKTtcclxuICB9XHJcblxyXG4gIC8vVXBkYXRlIHNjb3JlXHJcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJzY29yZVwiLCBzY29yZSk7XHJcblxyXG4gIC8vIFVwZGF0ZSBldmVyeXRoaW5nXHJcbiAgc2NlbmUudXBkYXRlKGR0LCB0KTtcclxuICAvLyBSZW5kZXIgZXZlcnl0aGluZ1xyXG4gIHJlbmRlcmVyLnJlbmRlcihzY2VuZSk7XHJcbn1cclxucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3B5KTtcclxuXHJcbm1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbmxldCBhbnN3ZXJGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYW5zd2VyXCIpO1xyXG5sZXQgc3BlbGxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoXCJzcGVsbFwiKTtcclxubGV0IGNob29zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2hvb3NlLXNwZWxsXCIpO1xyXG5sZXQgc3VibWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdWJtaXQtYW5zd2VyXCIpO1xyXG5sZXQgY2hvc2VuU3BlbGw7XHJcblxyXG5jaG9vc2UuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBmdW5jdGlvbigpIHtcclxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIHRhc2tXaW5kb3cuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICBtb2RhbC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XHJcbiAgICAgIGlmIChzcGVsbHNbaV0uY2hlY2tlZCkge1xyXG4gICAgICAgIGNob3NlblNwZWxsID0gc3BlbGxzW2ldLnZhbHVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgc3BlbGwgPSBuZXcgVGlsZVNwcml0ZSh0ZXh0dXJlc1tjaG9zZW5TcGVsbF0sIDEyOCwgMTI4KTtcclxufSk7XHJcblxyXG5zdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBmdW5jdGlvbigpIHtcclxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiYW5zd2VyXCIsIGFuc3dlckZpZWxkLnZhbHVlKTtcclxuICB0YXNrV2luZG93LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgYW5pbWF0ZVNwZWxsKCk7XHJcbiAgbGV0IGFuc3dlciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiYW5zd2VyXCIpO1xyXG4gIGlmIChhbnN3ZXIgPT0gbmV3VGFzay5hbnN3ZXIpIHtcclxuICAgIHJpZ2h0QW5zd2VyID0gdHJ1ZTtcclxuICAgIHNjb3JlICs9IDU7XHJcbiAgICBtZXNzYWdlLnRleHQgPSBcIlJpZ2h0IVwiO1xyXG4gICAgY2xlYXJUZXh0KCk7XHJcbiAgfVxyXG4gIGVsc2Uge1xyXG4gICAgcmlnaHRBbnN3ZXIgPSBmYWxzZTtcclxuICAgIG1lc3NhZ2UudGV4dCA9IFwiV3JvbmchXCI7XHJcbiAgICBjbGVhclRleHQoKTtcclxuICB9XHJcblxyXG4gIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiYW5zd2VyXCIpO1xyXG4gIGFuc3dlckZpZWxkLnZhbHVlID0gXCJcIjtcclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICBpZiAobW9uc3RlckhlYWx0aEFtb3VudCA+IDApIHtcclxuICAgICAgY29uc29sZS5sb2cobW9uc3RlckhlYWx0aEFtb3VudCk7XHJcbiAgICAgIG1hdGhUYXNrID0gbmV3IE1hdGhUYXNrKCk7XHJcbiAgICAgIG5ld1Rhc2sgPSBuZXcgVGFzayhtYXRoVGFzay50ZXh0LCBtYXRoVGFzay5yZXN1bHQpO1xyXG4gICAgICB0YXNrVGV4dEZpZWxkLmlubmVySFRNTCA9IG5ld1Rhc2sudGV4dDtcclxuICAgICAgYW5pbWF0ZU1vbnN0ZXJTcGVsbCgpO1xyXG4gICAgfVxyXG4gICAgfSwgMzAwMCk7XHJcbiAgfSk7XHJcblxyXG5mdW5jdGlvbiBkb1dpbigpIHtcclxuICBjb25zdCB3aW5NZXNzYWdlID0gbmV3IFRleHQoXCJZb3Ugd29uIVwiLCB7XHJcbiAgICBmb250OiBcIjMwcHQgc2Fucy1zZXJpZlwiLFxyXG4gICAgZmlsbDogXCJibGFja1wiLFxyXG4gICAgYWxpZ246IFwiY2VudGVyXCJcclxuICB9KTtcclxuICB3aW5NZXNzYWdlLnBvcy54ID0gdyAvIDI7XHJcbiAgd2luTWVzc2FnZS5wb3MueSA9IDEyMDtcclxuICBzY2VuZS5hZGQod2luTWVzc2FnZSk7XHJcbiAgbW9uc3Rlci5oZWFkLmZyYW1lLnggKz0gNTI7XHJcbiAgdGFza1dpbmRvdy5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gIG1vZGFsLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRvR2FtZU92ZXIoKSB7XHJcbiAgY29uc3QgZ2FtZU92ZXJNZXNzYWdlID0gbmV3IFRleHQoXCJHYW1lIE92ZXJcIiwge1xyXG4gICAgZm9udDogXCIzMHB0IHNhbnMtc2VyaWZcIixcclxuICAgIGZpbGw6IFwiYmxhY2tcIixcclxuICAgIGFsaWduOiBcImNlbnRlclwiXHJcbiAgfSk7XHJcbiAgZ2FtZU92ZXJNZXNzYWdlLnBvcy54ID0gdyAvIDI7XHJcbiAgZ2FtZU92ZXJNZXNzYWdlLnBvcy55ID0gMTIwO1xyXG4gIHNjZW5lLmFkZChnYW1lT3Zlck1lc3NhZ2UpO1xyXG4gIHBsYXllci50ZXh0dXJlID0gdGV4dHVyZXMucGxheWVyRGVmZWF0ZWQ7XHJcbiAgdGFza1dpbmRvdy5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gIG1vZGFsLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgZ2FtZU92ZXIgPSB0cnVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRSYW5kb21JbnQobWF4KSB7XHJcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1hdGguZmxvb3IobWF4KSk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBuYW1lVGhlTW9uc3RlcihzdHIpIHtcclxuICBsZXQgYXJyID0gc3RyLnNwbGl0KFwiLCBcIik7XHJcbiAgbGV0IGluZGV4ID0gZ2V0UmFuZG9tSW50KGFyci5sZW5ndGgpO1xyXG4gIHJldHVybiBhcnJbaW5kZXhdO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhclRleHQoKSB7XHJcbiAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgbWVzc2FnZS50ZXh0ID0gXCJcIjtcclxuICAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgfSwgNjAwMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFuaW1hdGVTcGVsbCgpIHtcclxuICBpZihjaG9zZW5TcGVsbCA9PSBcImhlYWxcIikge1xyXG4gICAgc3BlbGwucG9zLnggPSBwbGF5ZXIucG9zLnggLSAyMDtcclxuICAgIHNwZWxsLnBvcy55ID0gcGxheWVyLnBvcy55XHJcbiAgfVxyXG5cclxuICBlbHNlIHtcclxuICAgIHNwZWxsLnBvcy54ID0gcGxheWVyLnBvcy54ICsgNTA7XHJcbiAgICBzcGVsbC5wb3MueSA9IHBsYXllci5wb3MueTtcclxuICB9XHJcblxyXG4gIHNjZW5lLmFkZChzcGVsbCk7XHJcbiAgbGV0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoZnJhbWUsIDUwKTtcclxuXHJcbiAgZnVuY3Rpb24gZnJhbWUoKXtcclxuICAgIGlmKHNwZWxsLmZyYW1lLnggPCA1MTIpIHtcclxuICAgICAgc3BlbGwuZnJhbWUueCArPSAxMjg7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgc3BlbGwuZnJhbWUueSArPSAxMjg7XHJcbiAgICAgIHNwZWxsLmZyYW1lLnggPSAwO1xyXG4gICAgfTtcclxuXHJcbiAgICBpZihjaG9zZW5TcGVsbCAhPSBcImhlYWxcIikge1xyXG4gICAgICBzcGVsbC5wb3MueCArPSAxNTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICBhcHBseVNwZWxsKCk7XHJcbiAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcclxuICAgIHNwZWxsLmZyYW1lLnggPSAwO1xyXG4gICAgc3BlbGwuZnJhbWUueSA9IDA7XHJcbiAgICBzY2VuZS5yZW1vdmUoc3BlbGwpO1xyXG4gIH0sIDEwMDApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhbmltYXRlTW9uc3RlclNwZWxsKCkge1xyXG4gIG1vbnN0ZXJTcGVsbC5wb3MueCA9IG1vbnN0ZXIuYm9keS5wb3MueCAtIDUwO1xyXG4gIG1vbnN0ZXJTcGVsbC5wb3MueSA9IG1vbnN0ZXIuYm9keS5wb3MueTtcclxuXHJcbiAgc2NlbmUuYWRkKG1vbnN0ZXJTcGVsbCk7XHJcbiAgbGV0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoZnJhbWUsIDUwKTtcclxuXHJcbiAgZnVuY3Rpb24gZnJhbWUoKXtcclxuICAgIGlmKG1vbnN0ZXJTcGVsbC5mcmFtZS54IDwgNTEyKSB7XHJcbiAgICAgIG1vbnN0ZXJTcGVsbC5mcmFtZS54ICs9IDEyODtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBtb25zdGVyU3BlbGwuZnJhbWUueSArPSAxMjg7XHJcbiAgICAgIG1vbnN0ZXJTcGVsbC5mcmFtZS54ID0gMDtcclxuICAgIH07XHJcblxyXG4gICAgbW9uc3RlclNwZWxsLnBvcy54IC09IDIwO1xyXG4gIH07XHJcblxyXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgIGFwcGx5TW9uc3RlclNwZWxsKCk7XHJcbiAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcclxuICAgIG1vbnN0ZXJTcGVsbC5mcmFtZS54ID0gMDtcclxuICAgIG1vbnN0ZXJTcGVsbC5mcmFtZS55ID0gMDtcclxuICAgIHNjZW5lLnJlbW92ZShtb25zdGVyU3BlbGwpO1xyXG4gIH0sIDE1MDApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBseVNwZWxsKCkge1xyXG4gIGlmIChyaWdodEFuc3dlciA9PSB0cnVlKSB7XHJcbiAgICBpZihjaG9zZW5TcGVsbCA9PSBcImhlYWxcIikge1xyXG4gICAgICBoZWFsdGhBbW91bnQgKz0gMjA7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgbW9uc3RlckhlYWx0aEFtb3VudCAtPSAyMDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGx5TW9uc3RlclNwZWxsKCkge1xyXG4gIGlmIChyaWdodEFuc3dlciA9PSB0cnVlKSB7XHJcbiAgICBoZWFsdGhBbW91bnQgLT0gNTtcclxuICB9XHJcbiAgZWxzZSB7XHJcbiAgICBoZWFsdGhBbW91bnQgLT0gMjA7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkb05leHRSb3VuZCgpIHtcclxuICBkb1dpbigpO1xyXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgIGxldCBpbnRlcnZhbCA9IHNldEludGVydmFsKGZyYW1lLCAxMDAwKTtcclxuICAgIGZ1bmN0aW9uIGZyYW1lKCl7XHJcbiAgICAgIHBsYXllci5wb3MueCArPSA1O1xyXG4gICAgfTtcclxuICB9LCAxMDAwKTtcclxuXHJcbiAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZChmYWxzZSk7XHJcbiAgfSwgNDAwMCk7XHJcbn1cclxuIl19

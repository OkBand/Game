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

},{"../lib/index.js":10}]},{},[12]);

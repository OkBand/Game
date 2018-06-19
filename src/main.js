import lib from "../lib/index.js";
const { Container, CanvasRenderer, Text, Sprite, TileSprite, Texture, Task, MathTask } = lib;

// Game setup code
const w = 640;
const h = 480;
const renderer = new CanvasRenderer(w, h);
document.querySelector(".main-board").appendChild(renderer.view);

// Load game textures
const textures = {
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
const scene = new Container();
const modal = document.querySelector(".modal");
const taskWindow = document.querySelector(".task-window");

// Game state variables
let healthAmount = 100;
let monsterHealthAmount = 100;

let taskTextField = document.querySelector(".task");
let mathTask = new MathTask();
let newTask = new Task(mathTask.text, mathTask.result);
taskTextField.innerHTML = newTask.text;

//Game state
let win = false;
let gameOver = false;
let score = 0;
let rightAnswer;

//Background
let background = new Sprite(textures["background" + getRandomInt(3)]);

//Spells
let spell;
const monsterSpell = new TileSprite(textures.monsterSpell, 128, 128);

//Player
const player = new Sprite(textures.player);

player.pos.x = 100;
player.pos.y = 300;

//Monster
const monster = {
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

const monsterParts = {
  head: "294, 398, 498, 599",
  body: "70, 109, 148, 187",
  leg: "696, 717, 738, 759",
  arm: "0, 17, 35, 53",
  hand: "226, 243, 260, 277",
  weapon: "780, 838, 896, 954"
}

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
const monsterNamespace = {
  firstname: "Evil, Angry, Furious, Almighty, Wicked, Gross, Sneaky, Desperate, Black, Green, Punky, Dirty, Dark",
  secondname: "Ogre, Orc, Dwarf, Human, Gnome, Elf, Drow, Fairy, Coder, Editor, Doctor, Manager, Lord",
  thirdname: "Dima, Valeriy, Vladimir, Joseph, Adolf, Alex, Piotr, Donald, Victor, Tom, Voldy, Vader, Anakin, Yoda, Kylo"
}

const monsterNameText = nameTheMonster(monsterNamespace.firstname) + " " + nameTheMonster(monsterNamespace.secondname) + " " + nameTheMonster(monsterNamespace.thirdname);

// Text objects
const playerName = new Text("Arseniy",
{
  font: "16px sans-serif",
  fill: "#2A080D",
  align: "left"
}
)

playerName.pos.x = player.pos.x + 10;
playerName.pos.y = player.pos.y - 20;

const monsterName = new Text(monsterNameText,
{
  font: "16px sans-serif",
  fill: "#2A080D",
  align: "left"
});

monsterName.pos.x = monster.head.pos.x - 40;
monsterName.pos.y = monster.head.pos.y - 20;

const health = new Text("Health:",
{
  font: "20px sans-serif",
  fill: "#2A080D",
  align: "left"
});

health.pos.x = 15;
health.pos.y = 15;

const monsterHealth = new Text("Health:", {
  font: "20px sans-serif",
  fill: "#2A080D",
  align: "right"
});

monsterHealth.pos.x = 630;
monsterHealth.pos.y = 15;

const message = new Text(" ", {
  font: "30pt sans-serif",
  fill: "#2A080D",
  align: "center"
});

message.pos.x = 330;
message.pos.y = 220;

//Records
const tableOfRecords = document.createElement("table");


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
let dt = 0;
let last = 0;

function loopy(ms) {
  requestAnimationFrame(loopy);

  const t = ms / 1000;
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
let answerField = document.querySelector(".answer");
let spells = document.getElementsByName("spell");
let choose = document.querySelector(".choose-spell");
let submit = document.querySelector(".submit-answer");
let chosenSpell;

choose.addEventListener("submit", function() {
  event.preventDefault();
  taskWindow.classList.remove("hidden");
  modal.classList.add("hidden");
  for (let i = 0; i < 3; i++) {
      if (spells[i].checked) {
        chosenSpell = spells[i].value;
      }
    }
  spell = new TileSprite(textures[chosenSpell], 128, 128);
});

submit.addEventListener("submit", function() {
  event.preventDefault();
  localStorage.setItem("answer", answerField.value);
  taskWindow.classList.add("hidden");
  animateSpell();
  let answer = localStorage.getItem("answer");
  if (answer == newTask.answer) {
    rightAnswer = true;
    score += 5;
    message.text = "Right!";
    clearText();
  }
  else {
    rightAnswer = false;
    message.text = "Wrong!";
    clearText();
  }

  localStorage.removeItem("answer");
  answerField.value = "";
  setTimeout(function(){
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
  const winMessage = new Text("You won!", {
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
  const gameOverMessage = new Text("Game Over", {
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
  let arr = str.split(", ");
  let index = getRandomInt(arr.length);
  return arr[index];
}

function clearText() {
  setTimeout(function(){
    message.text = "";
    modal.classList.remove("hidden");
  }, 6000);
}

function animateSpell() {
  if(chosenSpell == "heal") {
    spell.pos.x = player.pos.x - 20;
    spell.pos.y = player.pos.y
  }

  else {
    spell.pos.x = player.pos.x + 50;
    spell.pos.y = player.pos.y;
  }

  scene.add(spell);
  let interval = setInterval(frame, 50);

  function frame(){
    if(spell.frame.x < 512) {
      spell.frame.x += 128;
    }
    else {
      spell.frame.y += 128;
      spell.frame.x = 0;
    };

    if(chosenSpell != "heal") {
      spell.pos.x += 15;
    }
  };

  setTimeout(function(){
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
  let interval = setInterval(frame, 50);

  function frame(){
    if(monsterSpell.frame.x < 512) {
      monsterSpell.frame.x += 128;
    }
    else {
      monsterSpell.frame.y += 128;
      monsterSpell.frame.x = 0;
    };

    monsterSpell.pos.x -= 20;
  };

  setTimeout(function(){
    applyMonsterSpell();
    clearInterval(interval);
    monsterSpell.frame.x = 0;
    monsterSpell.frame.y = 0;
    scene.remove(monsterSpell);
  }, 1500);
}

function applySpell() {
  if (rightAnswer == true) {
    if(chosenSpell == "heal") {
      healthAmount += 20;
    }
    else {
      monsterHealthAmount -= 20;
    }
  }
}

function applyMonsterSpell() {
  if (rightAnswer == true) {
    healthAmount -= 5;
  }
  else {
    healthAmount -= 20;
  }
}

function doNextRound() {
  doWin();
  setTimeout(function(){
    let interval = setInterval(frame, 1000);
    function frame(){
      player.pos.x += 5;
    };
  }, 1000);

  setTimeout(function(){
    window.location.reload(false);
  }, 1500);
}

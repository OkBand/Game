import lib from "../lib/index.js";
const { Container, CanvasRenderer, Text, Sprite, Texture, KeyControls, MouseControls, Task, MathTask } = lib;

// Game setup code
const w = 640;
const h = 480;
const renderer = new CanvasRenderer(w, h);
document.querySelector(".main-board").appendChild(renderer.view);

// Load game textures
const textures = {
  background: new Texture("res/img/bg.jpg"),
  player: new Texture("res/img/player_stand.png"),
  monster: new Texture("res/img/zombie_stand.png"),
  playerDefeated: new Texture("res/img/player_hurt.png"),
  monsterDefeated: new Texture("res/img/zombie_hurt.png")
};

// Game objects
const scene = new Container();
const controls = new KeyControls();
const mouse = new MouseControls();
const modal = document.querySelector(".modal");
const taskWindow = document.querySelector(".task-window");

// Game state variables
let healthAmount = 100;
let monsterHealthAmount = 100;
let taskTextField = document.querySelector(".task");

let mathTask = new MathTask();
let newTask = new Task(mathTask.text, mathTask.result);
taskTextField.innerHTML = newTask.text;

let gameOver = false;


//Player
const player = new Sprite(textures.player);
player.update = function(dt) {
  const { pos } = this;
  player.pos.x = 2/10 * w;
  player.pos.y = 2/3 * h;
};

//Monster
const monster = new Sprite(textures.monster);
monster.update = function(dt) {
  monster.pos.x = 7/10 * w;
  monster.pos.y = 2/3 * h;
};

// Add the health game object
const health = new Text("Health:", {
  font: "20px sans-serif",
  fill: "black",
  align: "left"
});
health.pos.x = 15;
health.pos.y = 15;


// Add the monster health game object
const monsterHealth = new Text("Health:", {
  font: "20px sans-serif",
  fill: "black",
  align: "right"
});
monsterHealth.pos.x = 630;
monsterHealth.pos.y = 15;


// Add everything to the scene container
scene.add(new Sprite(textures.background));
scene.add(player);
scene.add(monster);
scene.add(health);
scene.add(monsterHealth);

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
    doWin();
  }

  // Check for game over
  if (healthAmount < 1) {
    doGameOver();
  }

  // Update everything
  scene.update(dt, t);
  // Render everything
  renderer.render(scene);
}

requestAnimationFrame(loopy);

modal.classList.remove("hidden");


let answerField = document.querySelector(".answer");
let choose = document.querySelector(".choose-spell");
let submit = document.querySelector(".submit-answer");
let answer;

choose.addEventListener("submit", function() {
  event.preventDefault();
  taskWindow.classList.remove("hidden");
  modal.classList.add("hidden");
});

submit.addEventListener("submit", function() {
  event.preventDefault();
  localStorage.setItem("answer", answerField.value);
  let answer = localStorage.getItem("answer");
  if (answer == newTask.answer) {
    monsterHealthAmount -=  20;
  }
  else {
    healthAmount -=  20;
  }
  localStorage.removeItem("answer");
  if (!monster.dead) {
    mathTask = new MathTask();
    newTask = new Task(mathTask.text, mathTask.result);
    taskTextField.innerHTML = newTask.text;
  }
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
  monster.texture = textures.monsterDefeated;
  taskWindow.classList.add("hidden");
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
  gameOver = true;
}

import lib from "../lib/index.js";
const { Game, Container, CanvasRenderer, Text, Sprite, Texture, KeyControls, MouseControls } = lib;
const math = require("mathjs");

// Game setup code
const game = new Game(640, 320);
const { scene, w, h } = game;

const renderer = new CanvasRenderer(w, h);
document.querySelector(".main-board").appendChild(renderer.view);

// Load game textures
const textures = {
  background: new Texture("res/img/bg.jpg"),
  player: new Texture("res/img/player_stand.png"),
  monster: new Texture("res/img/zombie_stand.png")
};

// Game objects

const controls = new KeyControls();
const mouse = new MouseControls();

// Game state variables
let healthAmount = 100;
let monsterHealthAmount = 100;
let gameOver = false;

//Player
const player = new Sprite(textures.player);
player.pos.x = 2/10 * w;
player.pos.y = 2/3 * h;

//Monster
const monster = new Sprite(textures.monster);
monster.pos.x = 7/10 * w;
monster.pos.y = 2/3 * h;


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




  // Update everything
  scene.update(dt, t);

  // Render everything
  renderer.render(scene);
}
requestAnimationFrame(loopy);

const modal = document.querySelector(".modal");
modal.classList.remove("hidden");
let task = document.querySelector(".task").innerHTML;
let answerField = document.querySelector(".answer");
let submit = document.querySelector(".submit-answer");
let answer;

submit.addEventListener("click", function() {
  localStorage.setItem("answer", answerField.value);
  let answer = localStorage.getItem("answer");
  if (answer == math.eval(task)) {
    monsterHealthAmount -=  20;
  }
  else {
    healthAmount -=  20;
  }
  localStorage.removeItem("answer");
});

function doGameOver() {
  const gameOverMessage = new Text("Game Over", {
    font: "30pt sans-serif",
    fill: "black",
    align: "center"
  });
  gameOverMessage.pos.x = w / 2;
  gameOverMessage.pos.y = 120;
  scene.add(gameOverMessage);
  scene.remove(player);
  gameOver = true;
}

// Check for game over
if (health < 1) {
  if (!gameOver) {
    doGameOver();
  }
  player.dead = true;
}

import lib from "../../lib/index.js";
const { Container, CanvasRenderer, Text, Sprite, Texture, Task, MathTask } = lib;

const textures = {
  background: new Texture("res/img/bg.jpg"),
  player: new Texture("res/img/player_stand.png"),
  monster: new Texture("res/img/zombie_stand.png"),
  playerDefeated: new Texture("res/img/player_hurt.png"),
  monsterDefeated: new Texture("res/img/zombie_hurt.png")
};

// Game objects
const modal = document.querySelector(".modal");
const taskWindow = document.querySelector(".task-window");

// Game state variables
let healthAmount = 100;
let monsterHealthAmount = 100;

//Task handling
let taskTextField = document.querySelector(".task");
let mathTask = new MathTask();
let newTask = new Task(mathTask.text, mathTask.result);
taskTextField.innerHTML = newTask.text;

//Game state
//let win = false;
//let gameOver = false;


//Player
const player = new Sprite(textures.player);

//Monster
const monster = new Sprite(textures.monster);

// Add the health game object
const health = new Text("Health:", {
  font: "20px sans-serif",
  fill: "black",
  align: "left"
});

// Add the monster health game object
const monsterHealth = new Text("Health:", {
  font: "20px sans-serif",
  fill: "black",
  align: "right"
});


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
  answerField.value = "";
  if (!monster.dead) {
    mathTask = new MathTask();
    newTask = new Task(mathTask.text, mathTask.result);
    taskTextField.innerHTML = newTask.text;
    taskWindow.classList.add("hidden");
    modal.classList.remove("hidden");
  }
});

const message = new Text(" ", {
  font: "30pt sans-serif",
  fill: "black",
  align: "center"
});


class GameScreen extends Container {
  constructor(game, w, h) {
    super();

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
    this.add(new Sprite(textures.background));
    this.add(player);
    this.add(monster);
    this.add(health);
    this.add(monsterHealth);
    this.add(message);
  }

  update(dt, t) {
    health.text = "Health: " + healthAmount;
    monsterHealth.text = "Health: " + monsterHealthAmount;

    //Check for win
    if (monsterHealthAmount < 1) {
      monster.texture = textures.monsterDefeated;
      taskWindow.classList.add("hidden");
      modal.classList.add("hidden");
      message.text = "You won!"
    }
    // Check for game over
    if (healthAmount < 1) {
      player.texture = textures.playerDefeated;
      taskWindow.classList.add("hidden");
      modal.classList.add("hidden");
      message.text = "Game over"
    }
  }
}

export default GameScreen;

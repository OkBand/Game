import lib from "../../lib/index.js";
const { Container, CanvasRenderer, Text, Sprite, TileSprite, Texture, Task, MathTask } = lib;

import Spell from "../entities/Spell.js";

const textures = {
  background: new Texture("res/img/bg.jpg"),
  player: new Texture("res/img/player_stand.png"),
  monster: new Texture("res/img/monster_parts.png"),
  playerDefeated: new Texture("res/img/player_hurt.png"),
  monsterDefeated: new Texture("res/img/zombie_hurt.png"),
  //fire: new Texture ("res/img/spells/fire.png")
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
const playerName = new Text("Arseniy",
{
  font: "16px sans-serif",
  fill: "black",
  align: "left"
}
)

//Monster
const monster = {
  head: new TileSprite(textures.monster, 50, 53),
  body: new TileSprite(textures.monster, 39, 31),
  leg1: new TileSprite(textures.monster, 21, 23),
  leg2: new TileSprite(textures.monster, 21, 23),
  arm1: new TileSprite(textures.monster, 17, 33),
  arm2: new TileSprite(textures.monster, 17, 33),
  hand1: new TileSprite(textures.monster, 17, 15),
  hand2: new TileSprite(textures.monster, 17, 15),
  weapon: new TileSprite(textures.monster, 58, 57)
};

const monsterNamespace = {
  firstname: "Evil, Angry, Furious, Almighty, Wicked, Gross, Sneaky, Desperate, Black, Green, Punky, Dirty, Dark",
  secondname: "Ogre, Orc, Dwarf, Human, Gnome, Elf, Drow, Fairy, Coder, Editor, Doctor, Manager, Lord",
  thirdname: "Dima, Valeriy, Vladimir, Joseph, Adolf, Alexander, Piotr, Donald, Victor, Tom, Voldy, Vader, Anakin, Yoda, Kylo"
}

// Add the health game object
const health = new Text("Health:",
{
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


const message = new Text(" ", {
  font: "30pt sans-serif",
  fill: "black",
  align: "center"
});


class GameScreen extends Container {
  constructor(game, w, h) {
    super();



    const monsterNameText = nameTheMonster(monsterNamespace.firstname) + " " + nameTheMonster(monsterNamespace.secondname) + " " + nameTheMonster(monsterNamespace.thirdname);


    const monsterName = new Text(monsterNameText,
    {
      font: "16px sans-serif",
      fill: "black",
      align: "left"
    });

    player.pos.x = 100;
    player.pos.y = 300;

    playerName.pos.x = player.pos.x + 10;
    playerName.pos.y = player.pos.y - 20;

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

    monsterName.pos.x = monster.head.pos.x - 40;
    monsterName.pos.y = monster.head.pos.y - 20;

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

    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    };

    health.pos.x = 15;
    health.pos.y = 15;

    monsterHealth.pos.x = 630;
    monsterHealth.pos.y = 15;

    message.pos.x = 330;
    message.pos.y = 220;

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
      taskWindow.classList.add("hidden");
      const fire = new Spell();

      this.remove(fire);

      let answer = localStorage.getItem("answer");
      if (answer == newTask.answer) {
        monsterHealthAmount -=  20;
        message.text = "Right!";
        clearText();
      }
      else {
        healthAmount -=  20;
        message.text = "Wrong!";
        clearText();
      }
      localStorage.removeItem("answer");
      answerField.value = "";
      if (!monster.dead) {
        mathTask = new MathTask();
        newTask = new Task(mathTask.text, mathTask.result);
        taskTextField.innerHTML = newTask.text;
      }
    });


    function nameTheMonster(str) {
      let arr = str.split(", ");
      let index = getRandomInt(arr.length);
      return arr[index];

      function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      };
    }

    function clearText() {
      setTimeout(function(){
        message.text = "";
        modal.classList.remove("hidden");
      }, 1000);
    }

    //const fire = new TileSprite(fire, 128, 128);

    function animateSpell() {
    };


    // Add everything to the scene container
    this.add(new Sprite(textures.background));
    this.add(player);

    this.add(monster.hand1);
    this.add(monster.leg1);
    this.add(monster.leg2);

    this.add(monster.arm1);
    this.add(monster.body);
    this.add(monster.arm2);

    this.add(monster.head);
    this.add(monster.weapon);
    this.add(monster.hand2);

    this.add(playerName);
    this.add(monsterName);
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

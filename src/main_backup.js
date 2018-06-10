import GameScreen from "./screens/GameScreen.js";
const game = new Game(640, 480);
const controls = new KeyControls();
game.scene = new GameScreen(game, controls);
game.run();


const scene = new Container();
  const message = new Text("The Renderer!", {
  font: "40pt monospace",
  fill: "blue",
  align: "center"
});
message.pos.x = w / 2;
message.pos.y = h / 2;
scene.add(message);

const w = 640;
const h = 480;
const renderer = new CanvasRenderer(w, h);
document.querySelector(".board").appendChild(renderer.view);

const game = new Game(640, 320);
const { scene, w, h } = game;
const ship = new Sprite(new Texture("res/images/spaceship.png"));
scene.add(ship);
// Our old loop!
game.run((dt, t) => {
ship.pos.x += dt * 0.2;
if (ship.pos.x > w) {
ship.pos.x = -32;
}
});


render(container) {
  const { ctx } = this;
  function renderRec (container) {
    // Render the container children
    container.children.forEach(child => {
    ctx.save();
    // Draw the leaf node
    if (child.pos) {
      ctx.translate(Math.round(child.pos.x), Math.round(child.pos.y));
    }
    if (child.text) {
      const { font, fill, align } = child.style;
      if (font) ctx.font = font;
      if (fill) ctx.fillStyle = fill;
      if (align) ctx.textAlign = align;
      ctx.fillText(child.text, 0, 0);
    }

    // Handle the child types
    if (child.children) {
    renderRec(child);
  }
  ctx.restore();
});

}
ctx.clearRect(0, 0, this.w, this.h);
renderRec(container);
}


let dt = 0;
let last = 0;
const speed = 64;
let p1 = 0;
let p2 = 0;
const mouse = new MouseControls(canvas);

// Game setup code

function loopy (ms) {
requestAnimationFrame(loopy);

}
requestAnimationFrame(loopy); // Start things running!




function doWin() {
  const winMessage = new Text("You won!", {
    font: "30pt sans-serif",
    fill: "black",
    align: "center"
  });
  winMessage.pos.x = 120;
  winMessage.pos.y = 120;
  this.add(winMessage);
  monster.texture = textures.monsterDefeated;
  taskWindow.classList.add("hidden");
}

function doGameOver() {
  const gameOverMessage = new Text("Game Over", {
    font: "30pt sans-serif",
    fill: "black",
    align: "center"
  });
  gameOverMessage.pos.x = 120;
  gameOverMessage.pos.y = 120;
  this.add(gameOverMessage);
  player.texture = textures.playerDefeated;
  taskWindow.classList.add("hidden");
  gameOver = true;
}

import Container from "./container.js";
import CanvasRenderer from "./renderer/CanvasRenderer.js";

class Game {
  constructor (w, h, parent = ".board") {
  this.w = w;
  this.h = h;
  this.renderer = new CanvasRenderer(w, h);
  document.querySelector(parent).appendChild(this.renderer.view);
  this.scene = new Container();
  }
}
export default Game;

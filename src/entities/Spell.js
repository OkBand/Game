import lib from "../../lib/index.js";
const { TileSprite, Texture } = lib;
const texture = new Texture("res/img/fire.png");
class Spell extends TileSprite {
  constructor() {
    super(texture, 128, 128);
  }
  update (dt, t) {
    this.frame.x = Math.floor(t / 100) % 4;
  }
}
export default Spell;

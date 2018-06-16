import Texture from "./Texture.js";
class MultiTexture extends Texture {
  constructor (img, x, h) {
  super(texture);
  this.tileW = w;
  this.tileH = h;
  this.frame = { x: 0, y: 0 };
  }
}
export default TileSprite;



const monsterParts = {
  getMonsterPart("head");
  getMonsterPart("body");
  getMonsterPart("arm");
  getMonsterPart("leg");
  getMonsterPart("weapon");

  getMonsterPart(name) {
    this.name.src = "res/img/" + name + "/" + getRandomInt(4) + ".png";
  };
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

head: "294, 398, 494, 598",
body: "70, 109, 148, 187",
leg: "696, 717, 738, 759"

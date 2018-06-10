import lib from "../../lib/index.js";
const { Container, Text } = lib;

class TitleScreen extends Container {
  constructor(game, onStart) {
    super();
    this.onStart = onStart;
  }
}

export default TitleScreen;

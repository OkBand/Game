import lib from "../lib/index.js";
const { Container, CanvasRenderer, Game, Text, Sprite, TileSprite, Texture, Task, MathTask } = lib;

import GameScreen from "./screens/GameScreen.js";

// Game setup code
const game = new Game(640, 480);
const { scene, w, h } = game;

game.scene = new GameScreen(game);
game.run();

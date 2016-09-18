// import Ball from './ball';
import Mover from './mover';
import PixiRenderer from '../modules/pixiRenderer.js';
const renderer = new PixiRenderer();

// const ball = new Ball(renderer);
for (let i = 0, len = 2000; i < len; i++) {
  new Mover(renderer);
}


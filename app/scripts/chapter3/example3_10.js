import Pendulum from './pendulum';
import PixiRenderer from '../modules/pixiRenderer.js';
const renderer = new PixiRenderer();

const { width, height } = renderer.renderer;
const { stage } = renderer;

const p = new Pendulum(renderer, 150);
const p2 = new Pendulum(renderer, 300);

renderer.draw(() => {
  p.update();
  p2.update();
  p.display();
  p2.display();
});

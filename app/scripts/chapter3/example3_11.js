import Bob from './bob';
import Spring from './spring';
import PVector from '../modules/pVector';
import PixiRenderer from '../modules/pixiRenderer';
const renderer = new PixiRenderer();

const { width, height } = renderer.renderer;
const { stage } = renderer;

const b = new Bob(renderer, 30, 250, 10);
const s = new Spring(renderer, width / 2, 10, 120);

renderer.draw(() => {
  const gravity = new PVector(0, 0.1);
  b.applyForce(gravity);
  s.connect(b);
  b.display();
  s.display();
});

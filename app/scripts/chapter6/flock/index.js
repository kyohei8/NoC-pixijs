import _ from 'lodash';
import PixiRenderer from '../../pixiRenderer.js';
const renderer = new PixiRenderer();
import PVector from '../../pVector';

import Flock from './flock';
import Boid from './boid';

const { width, height } = renderer.renderer;
const { stage } = renderer;

const flock = new Flock();

const boids = _.range(192).map(() => {
  const boid = new Boid(renderer, _.random(width), _.random(height));
  flock.add(boid);
  return boid;
});

// クリックを有効化
renderer.stage.interactive = true;
renderer.stage.hitArea = new PIXI.Rectangle(0, 0, width, height);

let x = 0;
let y = 0;
renderer.stage.on('mousemove', (e) => {
  x = e.data.global.x;
  y = e.data.global.y;
});

renderer.draw(() => {
  const mouse = new PVector(x, y);
  flock.run(mouse);
});


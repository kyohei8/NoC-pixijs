import _ from 'lodash';
import PixiRenderer from '../../modules/pixiRenderer.js';
const renderer = new PixiRenderer();
import PVector from '../../modules/pVector';

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

renderer.draw(() => {
  flock.run();
});


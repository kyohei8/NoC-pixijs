import _ from 'lodash';
import PixiRenderer from '../../pixiRenderer.js';
const renderer = new PixiRenderer();
import PVector from '../../pVector';

import Path from './path';
import Vehicle from './vehicle';

const { width, height } = renderer.renderer;
const { stage } = renderer;

const p = new Path(renderer);

const vehicles = _.range(30).map(() => {
  const h = Math.random() < 0.5 ? _.random(height / 4 * 3, height) :  _.random(0, height / 4);
  return new Vehicle(
    renderer, 10, _.random(0, width), h, ff, _.random(1, 8), _.random(0.01, 0.5, true)
  );
});

p.addPoint(width * 0.25, _.random(height));
p.addPoint(width * 0.5 , _.random(height));
p.addPoint(width * 0.75, _.random(height));

renderer.draw(() => {
  vehicles.forEach((v) => {
    v.separate(vehicles);
    v.follow(p);
    v.run();
  });
});

import _ from 'lodash';
import PixiRenderer from '../../modules/pixiRenderer.js';
const renderer = new PixiRenderer();
import PVector from '../../modules/pVector';

import Vehicle from './vehicle';
import FlowField from './flowField';

const { width, height } = renderer.renderer;

const ff = new FlowField(renderer, 50);
const vehicles = _.range(100).map(() => new Vehicle(
  renderer, 10, _.random(0, width), _.random(0, height), ff, _.random(1, 8), _.random(0.01, 0.5, true)
));

renderer.draw(() => {
  vehicles.forEach((v) => v.run());
});

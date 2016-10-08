import _ from 'lodash';
import PixiRenderer from '../../modules/pixiRenderer.js';
const renderer = new PixiRenderer();
import PVector from '../../modules/pVector';

import Vehicle from './vehicle';

const { width, height } = renderer.renderer;
const { stage } = renderer;

const desired = new PVector(width/2, height/2);
const s = new PIXI.Graphics();
s.beginFill(0xCC0000).drawCircle(0, 0, 5).endFill();
s.position.set(desired.x, desired.y);
s.anchor = 0.5;
renderer.append(s);

// 障害物
const targets = _.range(10).map(() => new PVector(_.random(width), _.random(height)));

targets.forEach((t) => {
  const s = new PIXI.Graphics();
  s.beginFill().drawRect(0, 0, 10, 10).endFill();
  s.anchor = 0.5;
  s.position.set(t.x, t.y);
  renderer.append(s);
});

const vehicles = _.range(10).map(() => {
  return new Vehicle(renderer, 7, _.random(width), _.random(height), false);
});

renderer.draw(() => {
  vehicles.forEach((v) => {
    v.steer(targets, desired);
    v.update();
    v.display();
  });
});


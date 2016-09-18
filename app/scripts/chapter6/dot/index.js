import _ from 'lodash';
import PixiRenderer from '../../modules/pixiRenderer.js';
const renderer = new PixiRenderer();
import PVector from '../../modules/pVector';

import Arrow from './arrow';

const { width, height } = renderer.renderer;
const { stage } = renderer;

const aV = new PVector(_.random(-10, 10), _.random(-10, 10));
const bV = new PVector(_.random(-10, 10), _.random(-10, 10));
const a = new Arrow(renderer, aV);
const b = new Arrow(renderer, bV);

var text = new PIXI.Text('', {
  font : '24px Arial',
  fill : 0xff1010
});
renderer.append(text);

let cnt = 0;
renderer.draw(() => {
  cnt += 0.01;
  aV.x = aV.mag() * Math.sin(cnt);
  aV.y = aV.mag() * Math.cos(cnt);

  const theta = PVector.angleBetween(aV, bV);
  const degrees = theta * (180 / Math.PI);
  text.text = `theta: ${_.round(theta, 2)} \ndegrees: ${_.round(degrees, 2)}`;
  a.display();
  b.display();
});


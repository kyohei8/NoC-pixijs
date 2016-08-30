import _ from 'lodash';
import PixiRenderer from '../../pixiRenderer.js';
const renderer = new PixiRenderer();
import PVector from '../../pVector';

import Arrow from './arrow';

const { width, height } = renderer.renderer;
const { stage } = renderer;

const a = new Arrow(renderer, new PVector(_.random(-10, 10), _.random(-10, 10)));
const b = new Arrow(renderer, new PVector(_.random(-10, 10), _.random(-10, 10)));
const theta = PVector.angleBetween(a.v, b.v);
const degrees = theta * (180 / Math.PI)
console.log(`theta: ${theta}, degrees: ${degrees}`);

// renderer.draw(() => { });


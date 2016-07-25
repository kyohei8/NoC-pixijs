import _ from 'lodash';
import Mover from './mover';
import Attractor from './attractor';
import Liquid from './liquid';
import PixiRenderer from '../pixiRenderer.js';
const renderer = new PixiRenderer();

const { width, height } = renderer.renderer;
const liquid = new Liquid(0, height * 0.75 , width, height * 0.25, 0.5);

const liquidArea = new PIXI.Graphics();
liquidArea.beginFill(0x3333dd);
liquidArea.drawRect(liquid.x, liquid.y, liquid.w, liquid.h);
renderer.append(liquidArea);

const attractor = new Attractor(renderer, _.random(0, width), _.random(0, 30));
_.range(10).forEach(() => {
  new Mover(renderer, liquid, attractor, _.random(1, 20), _.random(0, width), _.random(0, 30));
});



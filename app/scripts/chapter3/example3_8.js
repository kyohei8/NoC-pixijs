import _ from 'lodash';
import { Noise } from 'noisejs';
import PixiRenderer from '../pixiRenderer.js';
const renderer = new PixiRenderer();
import Oscillator from './oscillator';

console.log(Noise);
const noise = new Noise(Math.random());

const { width, height } = renderer.renderer;
const { stage } = renderer;

Math.map = function (value, istart, istop, ostart, ostop) {
	return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}

let angle = 0;
const angleVel = 0.02;
const amplitude = 100;
const startAngle = 0;

const circle = new PIXI.Graphics();
const r = 10;
circle.moveTo(0, 0);
circle.beginFill(0xff00ff);
circle.drawCircle(0,0,r);
// circle.pivot.set(r / 2, r / 2);
stage.addChild(circle);

renderer.draw(() => {
  angle = startAngle;
  circle.clear();
  _.range(width).forEach((x) => {
    var value = noise.perlin2(x / 100, -x / 100);
    // const y = Math.map(Math.sin(angle), -1, 1, 0, height);
    const y = Math.map(value, -1, 1, 0, height);
    circle.beginFill(0xff00ff);
    circle.drawCircle(x,y,r);
    angle += angleVel;
  });
});



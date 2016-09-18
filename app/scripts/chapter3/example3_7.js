import _ from 'lodash';
import PixiRenderer from '../modules/pixiRenderer.js';
const renderer = new PixiRenderer();
import Oscillator from './oscillator';

const { width, height } = renderer.renderer;
const { stage } = renderer;


const oscList = [];
_.range(10).forEach(() => {
  oscList.push(new Oscillator(renderer));
});

renderer.draw(() => {
  oscList.forEach((osc) => osc.display());
});



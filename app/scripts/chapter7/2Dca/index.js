// import _ from 'lodash';
import PixiRenderer from '../../pixiRenderer.js';
const renderer = new PixiRenderer(640, 480);
import CA from './ca';

const { width, height } = renderer.renderer;
const { stage } = renderer;

const ca = new CA(renderer);

renderer.draw(() => {
  ca.generate();
  ca.display();
});


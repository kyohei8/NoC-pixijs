// import _ from 'lodash';
import PixiRenderer from '../../pixiRenderer.js';
const renderer = new PixiRenderer(640, 480);
// import Cell from './cell';
import CA from './ca';

const { width, height } = renderer.renderer;
const { stage } = renderer;

const ca = new CA(renderer);
// new Cell(renderer, 1, 0, true, 1, 20);
// new Cell(renderer, 3, 0, true, 0, 20);
// new Cell(renderer, 0, 1, true, 1, 20);
// new Cell(renderer, 2, 1, true, 0, 20);
// new Cell(renderer, 2, 3, true, 0, 20);
//

renderer.draw(() => {
  ca.generate();
  ca.display();
});



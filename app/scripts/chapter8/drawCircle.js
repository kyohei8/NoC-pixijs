// import _ from 'lodash';
import PixiRenderer from '../modules/pixiRenderer.js';
const renderer = new PixiRenderer();

const { width, height } = renderer.renderer;
const { stage } = renderer;

const drawCircle = (x, y, radius) => {
  const c = new PIXI.Graphics();
  c.lineStyle(3).drawCircle(x, y, radius);
  renderer.append(c);
  if(radius > 2){
    radius *= 0.75;
    drawCircle(x, y, radius);
  }
}

drawCircle(width/2, height/2, width/2);

renderer.draw(() => { });

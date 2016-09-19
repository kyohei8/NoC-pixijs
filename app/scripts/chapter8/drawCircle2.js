// import _ from 'lodash';
import PixiRenderer from '../modules/pixiRenderer.js';
const renderer = new PixiRenderer();

const { width, height } = renderer.renderer;
const { stage } = renderer;

const drawCircle = (x, y, radius) => {
  const c = new PIXI.Graphics();
  c.lineStyle(1).drawCircle(x, y, radius);
  renderer.append(c);
  if(radius > 20){
    drawCircle(x + radius / 2, y, radius / 2);
    drawCircle(x - radius / 2, y, radius / 2);
    drawCircle(x , y + radius / 2, radius / 2);
    drawCircle(x , y - radius / 2, radius / 2);
  }
}

drawCircle(width/2, height/2, width/2);

renderer.draw(() => { });

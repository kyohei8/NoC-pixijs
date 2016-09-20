import _ from 'lodash';
import PixiRenderer from '../../modules/pixiRenderer.js';
import PVector from '../../modules/pVector';
const renderer = new PixiRenderer();

const { width, height } = renderer.renderer;
const { stage } = renderer;


const branch = (_x, _y, x, y, len, r) =>{
  const b = new PIXI.Graphics();
  const p = new PVector(0, 0);
  p.sub(new PVector(0, -len));
  p.rotate(r);
  b.lineStyle(2).moveTo(0,0).lineTo(p.x, -p.y);
  _y += y;
  _x += x;
  b.position.set(_x, _y);
  renderer.append(b);
  len *= 0.66;
  if(len > 2){
    const r1 = r + Math.PI / 6;
    const r2 = r - Math.PI / 6;
    setTimeout(() => {
      branch(_x, _y, p.x, -p.y, len, r1);
      branch(_x, _y, p.x, -p.y, len, r2);
    }, 300);
  }
};
branch(width / 2, height, 0, 0, 200, 0);

// renderer.draw(() => { });



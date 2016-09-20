import _ from 'lodash';
import PixiRenderer from '../../modules/pixiRenderer.js';
import PVector from '../../modules/pVector';
const renderer = new PixiRenderer();

const { width, height } = renderer.renderer;
const { stage } = renderer;

const branch = (_x, _y, x, y, len, r, diameter) =>{
  const b = new PIXI.Graphics();
  const p = new PVector(0, 0);
  p.sub(new PVector(0, -len));
  p.rotate(r);
  b.lineStyle(diameter).moveTo(0,0).lineTo(p.x, -p.y);
  _y += y;
  _x += x;
  b.position.set(_x, _y);
  renderer.append(b);
  len *= 0.66;
  if(len > 2){
    if(diameter > 2){
      diameter -= 2;
    }
    setTimeout(() => {
      _.range(_.random(1,4)).forEach(() => {
        const theta = _.random(-Math.PI / 6, Math.PI / 6, true);
        const r1 = r + theta;
        branch(_x, _y, p.x, -p.y, len, r1, diameter);
      });
    }, 300);
  }
};
branch(width / 2, height, 0, 0, 200, 0, 16);

// renderer.draw(() => { });



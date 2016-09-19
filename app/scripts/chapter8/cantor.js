// import _ from 'lodash';
import PixiRenderer from '../modules/pixiRenderer.js';
const renderer = new PixiRenderer();

const { width, height } = renderer.renderer;
const { stage } = renderer;

// カントール集合
const cantor = (x, y, len) => {
  const line = new PIXI.Graphics();
  line.lineStyle(3).moveTo(x, y)
    .lineTo(x+len, y);
  y += 20;
  renderer.append(line);

  if(len >= 1){
    cantor(x, y, len / 3);
    cantor(x + len * 2 / 3, y, len / 3);
  }

}

cantor(0, 0, width);

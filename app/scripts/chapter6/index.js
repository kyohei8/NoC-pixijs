import _ from 'lodash';
import PixiRenderer from '../modules/pixiRenderer.js';
const renderer = new PixiRenderer();
import PVector from '../modules/pVector';

import Vehicle from './vehicle';

const { width, height } = renderer.renderer;
const { stage } = renderer;

// クリックを有効化
renderer.stage.interactive = true;
renderer.stage.hitArea = new PIXI.Rectangle(0, 0, width, height);

let x = 0;
let y = 0;
renderer.stage.on('mousemove', (e) => {
  x = e.data.global.x;
  y = e.data.global.y;
});

// 追従
const v = new Vehicle(renderer, 10, 100, 100, false);
// 徘徊
const w = new Vehicle(renderer, 10, 100, 100, true);
// バウンド
const b = new Vehicle(renderer, 10, 100, 100, false);
b.velocity = new PVector(3, -10);

renderer.draw(() => {
  v.arrive(new PVector(x, y));
  v.display();
  w.wander();
  w.run();
  b.run2();
});

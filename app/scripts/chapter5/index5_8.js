import _ from 'lodash';
import PixiRenderer from '../modules/pixiRenderer.js';
const renderer = new PixiRenderer();

import Box from './box';
import Spring from './spring';

const { width, height } = renderer.renderer;
const { stage } = renderer;

// クリックを有効化
renderer.stage.interactive = true;
renderer.stage.hitArea = new PIXI.Rectangle(0, 0, width, height);

// worldを生成
const gravity = new Box2D.b2Vec2(0, 100);
const world = new Box2D.b2World(gravity);

const box = new Box(renderer, world, width / 2, height / 2);
const spring = new Spring(renderer, world);

let mouseX = 0;
let mouseY = 0;


const press = (x, y) => {
  spring.bind(x, y, box);
};
const release = () => {
  spring.destroy();
};
renderer.stage.on('mousedown', (e) => {
  release();
  const { x, y } = e.data.global;
  mouseX = x;
  mouseY = y;
  press(x, y);
});
renderer.stage.on('touchstart', (e) => {
  release();
  const { x, y } = e.data.global;
  mouseX = x;
  mouseY = y;
  press(x, y);
});



renderer.draw(() => {
  world.Step(1/60, 3, 3);
  world.ClearForces();
  spring.update(mouseX, mouseY);
  box.display();
  spring.display();
});



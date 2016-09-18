import _ from 'lodash';
import PixiRenderer from '../modules/pixiRenderer.js';
const renderer = new PixiRenderer();

import Box from './box';
import Circle from './circle';
import Polygon from './polygon';
import MultiShape from './multiShape';
import Pair from './pair';
import Windmill from './windmill';
import Board from './board';
import Edge from './edge';

const { width, height } = renderer.renderer;
const { stage } = renderer;

// クリックを有効化
renderer.stage.interactive = true;
renderer.stage.hitArea = new PIXI.Rectangle(0, 0, width, height);

// worldを生成
const gravity = new Box2D.b2Vec2(0, 100);
const world = new Box2D.b2World(gravity);

let pressed = false;
const boxes = [];
const pairs = [];
const boards = [];
const generateBox = (e) => {
  if(pressed){
    const { x, y } = e.data.global;
    const d = _.random(4);
    switch (d) {
      case 0:
        boxes.push(new Polygon(renderer, world, x, y));
        break;
      case 1:
        boxes.push(new Box(renderer, world, x, y));
        break;
      case 2:
        boxes.push(new Circle(renderer, world, x, y));
        break;
      case 3:
        boxes.push(new MultiShape(renderer, world, x, y));
        break;
      case 4:
        pairs.push(new Pair(renderer, world, x, y));
        break;
      default:
    }
  }
};

renderer.stage.on('mousedown', (e) => {
  pressed = true
  generateBox(e);
});
renderer.stage.on('touchstart', (e) => {
  pressed = true
  generateBox(e);
});
renderer.stage.on('mouseup', () => pressed = false);
renderer.stage.on('touchend', () => pressed = false);
renderer.stage.on('mousemove', (e) => generateBox(e));
renderer.stage.on('touchmove', (e) => generateBox(e));

_.range(5).forEach(() => {
  boards.push(new Board(renderer, world, _.random(0, width), _.random(0, height), _.random(150, 300), _.random(10, 20)));
});

new Edge(renderer, world);
const windmill = new Windmill(renderer, world, width / 2, height / 2);

renderer.draw(() => {
  world.Step(1/60, 3, 3);
  world.ClearForces();
  for (let i = boxes.length - 1; i >= 0; i--) {
    const box = boxes[i];
    if(box.isDead()){
      boxes.splice(i, 1);
      box.destroy();
    }
    box.display();
  }

  for (let i = pairs.length - 1; i >= 0; i--) {
    const p = pairs[i];
    p.display();
  }

  windmill.display();
});


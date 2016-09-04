import _ from 'lodash';
import PixiRenderer from '../../pixiRenderer.js';
import Vehicle from './vehicle';
import PVector from '../../pVector';
const renderer = new PixiRenderer();

const { width, height } = renderer.renderer;
const { stage } = renderer;

const vehicles = _.range(30)
  .map(() => new Vehicle(
    renderer, 10, _.random(0, width), _.random(0, height), true
  ));

// クリックを有効化
renderer.stage.interactive = true;
renderer.stage.hitArea = new PIXI.Rectangle(0, 0, width, height);

let x = 0;
let y = 0;
renderer.stage.on('mousemove', (e) => {
  x = e.data.global.x;
  y = e.data.global.y;
});

renderer.draw(() => {
  vehicles.forEach((v) => {
    v.applyBehaviors(vehicles, new PVector(x, y));
    v.update();
    v.display();
  });
});


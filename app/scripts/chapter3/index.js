import _ from 'lodash';
import PixiRenderer from '../pixiRenderer.js';
const renderer = new PixiRenderer();
import Counter from './counter';
import Mover from './mover';
import Attractor from '../chapter2/attractor';
import Liquid from '../chapter2/liquid';
const c = new Counter();

const { width, height } = renderer.renderer;
const { stage } = renderer;

/*
// Originをセンターにした線を作成
const createStroke = (x, y, width, height, color = 0x000000) => {
  var stroke = new PIXI.Graphics();
  stroke.lineStyle(width, color);
  stroke.moveTo(0, 0);
  stroke.lineTo(height, height);
  stroke.position.x = x;
  stroke.position.y = y;
  stroke.pivot.set(height / 2, height / 2);
  return stroke;
};

const createCircle = (x, y, radius, dist, color = 0x000000) => {
  const circle = new PIXI.Graphics();
  circle.moveTo(0, 0);
  circle.beginFill(color);
  circle.drawCircle(0,0,radius);
  circle.position.x = x;
  circle.position.y = y;
  circle.pivot.set(dist / 2, dist / 2);
  return circle;
};

const stroke1 = createStroke(width / 2, height / 2, 10, 100, 0xff0ff0);
const circle1 = createCircle(width / 2, height / 2, 15, 100,  0xff0ff0);
const circle2 = createCircle(width / 2, height / 2, 15, -100, 0xff0ff0);
stage.addChild(stroke1);
stage.addChild(circle1);
stage.addChild(circle2);

let angle = 0;
let aVelocity = 0;
const aAcceleration = 0.001;


renderer.draw(() => {
  // c.up(10);
  aVelocity += aAcceleration;
  angle += aVelocity;

  stroke1.rotation = angle;
  circle1.rotation = angle;
  circle2.rotation = angle;
});
*/

const liquid = new Liquid(0, height * 0.75 , width, height * 0.25, 0.5);

const attractor = new Attractor(renderer, _.random(0, width), _.random(0, height));

const liquidArea = new PIXI.Graphics();
liquidArea.beginFill(0x3333dd);
liquidArea.drawRect(liquid.x, liquid.y, liquid.w, liquid.h);
renderer.append(liquidArea);

const movers = [];
_.range(10).forEach(() => {
  movers.push(new Mover(renderer, liquid, attractor, _.random(1, 20), _.random(0, width), _.random(0, 30)));
});

renderer.draw(() => {
  movers.forEach((m, i) => {
    movers.forEach((m2, j) => {
      if(i !== j){
        const f = m2.attract(m);
        m.applyForce(f);
        m.display();
      }
    });
  });
});



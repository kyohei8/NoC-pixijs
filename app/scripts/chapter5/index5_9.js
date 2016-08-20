import _ from 'lodash';
import PixiRenderer from '../pixiRenderer.js';
const renderer = new PixiRenderer();

import Particle from './particle';
import Board from './board';

const { width, height } = renderer.renderer;
const { stage } = renderer;

// クリックを有効化
renderer.stage.interactive = true;
renderer.stage.hitArea = new PIXI.Rectangle(0, 0, width, height);

// worldを生成
const gravity = new Box2D.b2Vec2(0, 100);
const world = new Box2D.b2World(gravity);

// collision
// const listener = new Box2D.b2ContactListener();
const listener = new Box2D.JSContactListener();
listener.BeginContact = (contactPtr) => {
  const contact = Box2D.wrapPointer( contactPtr, Box2D.b2Contact );
  const f1 = contact.GetFixtureA();
  const f2 = contact.GetFixtureB();
  const b1 = f1.GetBody();
  const b2 = f2.GetBody();
  const o1 = b1.userData;
  const o2 = b2.userData;
  if(o1 && o2){
    o1.change();
    o2.change();
  }
};
listener.EndContact = (contactPtr) => {
  const contact = Box2D.wrapPointer( contactPtr, Box2D.b2Contact );
  const f1 = contact.GetFixtureA();
  const f2 = contact.GetFixtureB();
  const b1 = f1.GetBody();
  const b2 = f2.GetBody();
  const o1 = b1.userData;
  const o2 = b2.userData;
  if(o1 && o2){
    o1.restore();
    o2.restore();
  }
};
listener.PreSolve = () => {};
listener.PostSolve = () => {};
world.SetContactListener(listener);

let mouseX = 0;
let mouseY = 0;


const press = (x, y) => {
};
const release = () => {
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

const particles = [];

const bottomBoard = new Board(renderer, world, width / 2, height - 10, width, 10);

renderer.draw(() => {
  world.Step(1/60, 3, 3);
  world.ClearForces();
  if(Math.random() < 0.01){
    const size = _.random(10, 30);
    particles.push(new Particle(renderer, world, _.random(width), height / 2, size));
  }

  for(var i = particles.length - 1; i >= 0; i--){
    const p = particles[i];
    p.display();
    if (p.done()) {
      particles.splice(i, 1);
    }
  }
});



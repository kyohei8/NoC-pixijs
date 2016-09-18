import toxi from 'toxiclibsjs';
window.toxi = toxi;
import PixiRenderer from '../../modules/pixiRenderer.js';
const renderer = new PixiRenderer();

import Particle from './particle';
import Rope from './rope';
import Cloth from './cloth';

const { width, height } = renderer.renderer;
const { stage } = renderer;

// クリックを有効化
renderer.stage.interactive = true;
renderer.stage.hitArea = new PIXI.Rectangle(0, 0, width, height);

// worldを作成
const physics = new toxi.physics2d.VerletPhysics2D();
physics.addBehavior(new toxi.physics2d.behaviors.GravityBehavior(
  new toxi.geom.Vec2D(0, 0.5)
));
physics.setWorldBounds(new toxi.geom.Rect(0, 0, width, height));

// 2つのパーティクルを生成
const p1 = new Particle(renderer, new toxi.geom.Vec2D(width / 2, height / 2));
const p2 = new Particle(renderer, new toxi.geom.Vec2D(width / 2 + 100, height / 2 + 200));

p1.lock();

physics.addParticle(p1);
physics.addParticle(p2);

// ばねを生成
const spring = new toxi.physics2d.VerletSpring2D(p1, p2, 80, 0.01);
physics.addSpring(spring);

const line = new PIXI.Graphics();
line.beginFill(0x000000)
  .moveTo(0, 0)
  .lineTo(0, 0)
  .endFill();
renderer.append(line);

let pressed = false;
renderer.stage.on('mousedown', (e) => {
  const { x, y } = e.data.global;
  pressed = true;
  p2.lock();
  p2.x = x;
  p2.y = y;
});

renderer.stage.on('mousemove', (e) => {
  if(pressed){
    const { x, y } = e.data.global;
    p2.x = x;
    p2.y = y;
  }
});
renderer.stage.on('mouseup', (e) => {
  pressed = false;
  p2.unlock();
});

// ropeを作成
const rope = new Rope(renderer, physics, 15);

const cloth = new Cloth(renderer, physics, 10);

renderer.draw(() => {
  physics.update();

  p1.display();
  p2.display();

  line.clear();
  line.lineStyle(2).moveTo(p1.x, p1.y).lineTo(p2.x, p2.y);

  rope.display();
  cloth.display();
});

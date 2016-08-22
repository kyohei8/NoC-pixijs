import toxi from 'toxiclibsjs';
import _ from 'lodash';
window.toxi = toxi;

import PixiRenderer from '../../pixiRenderer.js';
const renderer = new PixiRenderer();

import Particle from './particle';
import Attractor from './attractor';

const { width, height } = renderer.renderer;
const { stage } = renderer;

// クリックを有効化
renderer.stage.interactive = true;
renderer.stage.hitArea = new PIXI.Rectangle(0, 0, width, height);

// worldを作成
const physics = new toxi.physics2d.VerletPhysics2D();
// physics.setDrag(0.01);
// physics.addBehavior(new toxi.physics2d.behaviors.GravityBehavior(
  // new toxi.geom.Vec2D(0, 0.5)
// ));
physics.setWorldBounds(new toxi.geom.Rect(0, 0, width, height));

const particles = _.range(50).map(() => {
  return new Particle(renderer, physics,
    new toxi.geom.Vec2D(_.random(width), _.random(height)));
});

const a = new Attractor(renderer, physics, new toxi.geom.Vec2D(width/2 - 1, height/2 - 1));
a.lock();


renderer.draw(() => {
  physics.update();
  particles.forEach((p) => p.display());
  a.display();
});

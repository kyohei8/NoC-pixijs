import toxi from 'toxiclibsjs';
import _ from 'lodash';

import PixiRenderer from '../../pixiRenderer.js';
const renderer = new PixiRenderer();

import Cluster from './cluster';

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

const cluster = new Cluster(renderer, physics, _.random(8, 20), 200, new toxi.geom.Vec2D(width / 2, height / 2));

renderer.draw(() => {
  physics.update();
  cluster.display();
});


import _ from 'lodash';
import PixiRenderer from '../../pixiRenderer.js';
const renderer = new PixiRenderer();
import ParticleSystem from '../particleSystem';
import PVector from '../../pVector';
import Repeller from '../repeller';

const { width, height } = renderer.renderer;
const { stage } = renderer;

renderer.stage.interactive = true;
renderer.stage.hitArea = new PIXI.Rectangle(0, 0, width, height);

const psList = [];
renderer.stage.on('click', (e) => {
  const { x, y } = e.data.global;
  const loc = new PVector(x, y);
  psList.push(new ParticleSystem(renderer, loc));
});

const repeller = new Repeller(renderer, width / 2, height / 2);

const g = new PVector(0, 0.1);

renderer.draw(() => {
  psList.forEach((ps) => {
    ps.applyForce(g);
    ps.applyRepeller(repeller);
    ps.addParticle();
    ps.run();
  });
});

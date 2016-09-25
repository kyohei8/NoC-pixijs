// import _ from 'lodash';
import PVector from '../../modules/pVector';
import PixiRenderer from '../../modules/pixiRenderer.js';
import Population from './population';

const renderer = new PixiRenderer();
const { width, height } = renderer.renderer;
const { stage } = renderer;

const lifetime = height / 4;
let lifeCounter = 0;
const target = new PVector(width / 2, 24);
const t = new PIXI.Graphics();
t.lineStyle(0)
  .beginFill(0x00ff00, 1)
  .drawCircle(0, 0, 20)
  .endFill();
renderer.append(t);
t.position.set(target.x, target.y);

const mutationRate = 0.01;
const population = new Population(renderer, mutationRate, 50, target);

renderer.draw(() => {
  if(lifeCounter < lifetime){
    population.live();
    lifeCounter++;
  }else{
    lifeCounter = 0;
    population.fitness();
    population.selection();
    population.reproduction();
  }
});


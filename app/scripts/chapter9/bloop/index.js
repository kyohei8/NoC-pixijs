import _ from 'lodash';
import PixiRenderer from '../../modules/pixiRenderer';
import PVector from '../../modules/pVector';
import Bloop from './bloop';
import Food from './food';
import DNA from './dna';
const renderer = new PixiRenderer();

const bloops = [];
const foods = [];
const { width, height } = renderer.renderer;
const { stage } = renderer;

_.range(10).forEach(() => {
  const dna = new DNA();
  const p = new PVector(_.random(width), _.random(height));
  bloops.push(new Bloop(renderer, p, dna));
});

_.range(80).forEach(() => {
  const p = new PVector(_.random(width), _.random(height));
  foods.push(new Food(renderer, p));
});

renderer.draw(() => {
  for (let i = bloops.length - 1; i >= 0; i--) {
    const b = bloops[i];
    b.update();
    b.eat(foods);
    if(b.dead()){
      bloops.splice(i, 1);
      foods.push(new Food(renderer, b.location));
    }

    const child = b.reproduce();
    if(child){
      bloops.push(child);
    }

  }
});


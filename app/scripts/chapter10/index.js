import _ from 'lodash';
import Percepron from './percepron';
import Trainer from './trainer';
import PixiRenderer from '../modules/pixiRenderer.js';
const renderer = new PixiRenderer();

const { width, height } = renderer.renderer;
const { stage } = renderer;


const training = _.range(300);
let count = 0;

const f = (x) => 0.3 * x + 1;

const ptron = new Percepron(3);

training.forEach((i) => {
  const x = _.random(0, width);
  const y = _.random(0, height);
  let answer = 1;
  if(y < f(x)){
    answer = -1;
  }
  training[i] = new Trainer(x, y, answer);
});

const line = new PIXI.Graphics();
line.lineStyle(1);
line.moveTo(0, f(0));
line.lineTo(width, f(width));
renderer.append(line);


const shape = new PIXI.Graphics();
renderer.append(shape);

renderer.draw(() => {
  shape.clear();
  ptron.train(training[count].inputs, training[count].answer);
  // 0〜2000へ繰り返す
  count = (count + 1) % training.length;
  for (let i = 0; i < count; i++) {
    const guess = ptron.feedforward(training[i].inputs);
    if(guess > 0){
      shape.beginFill(0xFF6666);
      shape.lineStyle(0);
    }else{
      shape.beginFill(0xFFCC66);
      shape.lineStyle(1);
    }
    const [ x, y ] = training[i].inputs;
    shape.drawCircle(x, y, 5);
  }
  shape.endFill();
});

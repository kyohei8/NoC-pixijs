import _ from 'lodash';
import DNA from './dna';
import PixiRenderer from '../modules/pixiRenderer.js';
const renderer = new PixiRenderer();

const { width, height } = renderer.renderer;
const { stage } = renderer;
renderer.renderer.backgroundColor = 0x111111;

// DNAの集団
let population = _.range(150).map(() => new DNA());

var text = new PIXI.Text('',{
  fontSize : 36,
  fontFamily: '"Courier New", Courier, monospace',
  fill : 0x13ad00,
  align : 'center'
});
var fitText = new PIXI.Text('xx',{
  font : '64px',
  fill : 0x13ad00,
  align : 'center'
});

text.position.set(width / 2, height / 2);
text.anchor.set(.5);
fitText.position.set(0, 30);

renderer.append(text);
// renderer.append(fitText);

let exit = false;

renderer.draw(() => {
  if(exit){
    return;
  }

  population.forEach((p) => {
    p.getFitness();
    if(p.fitness === 1){
      exit = true;
    }
  });
  const elite = _.last(_.sortBy(population, [(p) => p.fitness]));
  // console.log(elite.getPhrase());
  text.text = elite.getPhrase();
  // fitText.text = Math.floor(elite.fitness * 100);

  // 交配プールを生成
  const matingPool = [];
  population.forEach((p) => {
    const n = Math.floor(p.fitness * 100);
    for (var j = 0; j < n; j++) {
      matingPool.push(p);
    }
  });

  // 生殖：親を選択
  population = population.map((p) => {
    const a = _.random(matingPool.length - 1);
    const b = _.random(matingPool.length - 1);
    const parentA = matingPool[a];
    const parentB = matingPool[b];
    // console.log(parentA, parentB);

    const child = parentA.crossOver(parentB);
    child.mutate();
    return child;
  });

  // console.log(_.sample(population).getPhrase());

});

// import _ from 'lodash';
import PixiRenderer from '../../modules/pixiRenderer.js';
import Population from './population';
const renderer = new PixiRenderer();

const { width, height } = renderer.renderer;
const { stage } = renderer;

const population = new Population(renderer, 0.05, 10);
population.display();

const button = new PIXI.Graphics();
button.lineStyle(1).beginFill(0xCCCCCC).drawRect(50, 300, 142, 40).endFill();
const text = new PIXI.Text('Generate');
text.position.set(65, 305);
button.addChild(text);
renderer.append(button);

button.interactive = true;
button.on('click', (e) => {
  population.selection();
  population.reproduction();
  population.display();
});

renderer.draw(() => {
});



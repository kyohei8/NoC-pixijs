// import _ from 'lodash';
import Turtle from './Turtle';
import LSystem from './LSystem';
import Rule from './rule';
import PixiRenderer from '../../modules/pixiRenderer.js';
const renderer = new PixiRenderer();

const { width, height } = renderer.renderer;
const { stage } = renderer;

const ruleset = [];
ruleset[0] = new Rule('F', 'FF+[+F-F-F]-[-F+F+F]');

const lsys = new LSystem('F', ruleset);
const turtle = new Turtle(lsys.getSentence(), height / 3, Math.getRadian(25));

stage.interactive = true;
stage.hitArea = new PIXI.Rectangle(0, 0, width, height);
stage.on('click', (e) => {
  lsys.generate();
  console.log(lsys.getSentence());
  turtle.setTodo(lsys.getSentence());
  turtle.render();
  turtle.changeLen(0.5);
});
renderer.draw(() => {
});


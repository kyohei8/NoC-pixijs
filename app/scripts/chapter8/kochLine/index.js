// import _ from 'lodash';
import PixiRenderer from '../../modules/pixiRenderer.js';
import PVector from '../../modules/pVector.js';
const renderer = new PixiRenderer();
import KochLine from './kochLine';

const { width, height } = renderer.renderer;
const { stage } = renderer;

// コッホ曲線
let kochLines = [];
kochLines.push(
  new KochLine(
    renderer,
    new PVector(0, height / 2),
    new PVector(width, height / 2)
  )
);

const generate = () => {
  const next = [];
  kochLines.forEach((l) => {
    const a = l.kochA();
    const b = l.kochB();
    const c = l.kochC();
    const d = l.kochD();
    const e = l.kochE();
    next.push(new KochLine(renderer, a, b));
    next.push(new KochLine(renderer, b, c));
    next.push(new KochLine(renderer, c, d));
    next.push(new KochLine(renderer, d, e));
  });
  kochLines = next;
}

for (var i = 0, len = 5; i < len; i++) {
  generate();
}

kochLines.forEach((l) => {
  l.display();
});

renderer.draw(() => {
});


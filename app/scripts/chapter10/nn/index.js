// import _ from 'lodash';
import Network from './network';
import Neuron from './neuron';
import PixiRenderer from '../../modules/pixiRenderer.js';
const renderer = new PixiRenderer();

const { width, height } = renderer.renderer;
const { stage } = renderer;

const network = new Network(renderer, width / 2, height / 2);

const neuronA = new Neuron(-200, 0);
const neuronB = new Neuron(0, 100);
const neuronC = new Neuron(0, -100);
const neuronD = new Neuron(200, 0);

network.connect(neuronA, neuronB);
network.connect(neuronA, neuronC);
network.connect(neuronB, neuronD);
network.connect(neuronC, neuronD);

network.addNeuron(neuronA);
network.addNeuron(neuronB);
network.addNeuron(neuronC);
network.addNeuron(neuronD);
// フィードフォワード
setInterval(() => {
  network.feedforward(Math.random());
}, 500);

renderer.draw(() => {
  network.display();
});

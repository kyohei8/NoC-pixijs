import PVector from '../../modules/pVector';
import Connection from './connection';
/**
 * Network
 */
class Network{
  constructor(renderer, x, y){
    this.renderer = renderer;
    this.neurons = [];
    this.location = new PVector(x, y);

    this.container = new PIXI.Container();
    this.container.position.set(this.location.x, this.location.y);
    this.renderer.append(this.container);
  }

  addNeuron(n){
    this.container.addChild(n.shape);
    this.container.addChild(n.sumText);
    this.neurons.push(n);
  }

  connect(n1, n2){
    const c = new Connection(this.container, n1, n2, Math.random());
    n1.addConnection(c);
  }

  feedforward(input){
    const start = this.neurons[0];
    start.feedforward(input);
  }

  display(){
    this.neurons.forEach((n) => {
      n.display();
    });
  }
}

export default Network;

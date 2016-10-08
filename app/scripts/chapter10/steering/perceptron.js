import PVector from '../../modules/pVector';
/**
 * Perceptron
 */
class Perceptron{
  constructor(n, c){
    this.weights = _.range(n).map(() => Math.random());
    this.c = c;
  }

  train(forces, error){
    this.weights = this.weights.map((w, i) => {
      w += this.c * error.x * forces[i].x;
      w += this.c * error.y * forces[i].y;
      return Math.constrain(w, 0, 1);
    });
  }

  feedforward(forces){
    const sum = new PVector();
    this.weights.forEach((w, i) => {
      forces[i].mult(this.weights[i]);
      sum.add(forces[i]);
    });
    return sum;
  }
}

export default Perceptron;

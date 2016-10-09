import PVector from '../../modules/pVector';
/**
 * Neuron
 */
class Neuron{
  constructor(x, y){
    this.location = new PVector(x, y);
    this.connection = [];
    this.sum = 0;
    this.draw();
  }

  draw(){
    this.shape = new PIXI.Graphics();
    this.shape.beginFill(0x008000).drawCircle(0, 0, 10).endFill();
    this.sumText = new PIXI.Text('' + this.sum, {
      fontSize: 14,
      align : 'center'
    });
    this.sumText.position.set(this.location.x, this.location.y - 40);
  }

  addConnection(c){
    this.connection.push(c);
  }

  feedforward(input){
    this.sum += input;
    this.sumText.text = ('' + this.sum).slice(0, 5);
    if(this.sum > 1){
      this.fire();
      this.sum = 0;
    }
  }

  fire(){
    this.connection.forEach((c) => {
      c.feedforward(this.sum);
    });
  }

  display(){
    const { x, y } = this.location;
    this.shape.position.set(x, y);
    this.connection.forEach((c) => {
      c.update();
    });
  }
}

export default Neuron;

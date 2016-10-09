import PVector from '../../modules/pVector';
/**
 * Connection
 */
class Connection{
  constructor(renderer, from, to, w){
    this.renderer = renderer;
    this.a = from;
    this.b = to;
    this.weight = w;
    this.sending = false;
    this.draw();
  }

  draw(){
    this.line = new PIXI.Graphics();
    this.line.lineStyle(this.weight * 4)
      .moveTo(this.a.location.x, this.a.location.y)
      .lineTo(this.b.location.x, this.b.location.y);
    this.renderer.addChild(this.line);

    this.senderShape = new PIXI.Graphics();
    this.senderShape.lineStyle(1)
      .beginFill(0x004080)
      .drawCircle(0, 0, this.weight * 8)
      .endFill();

    this.renderer.addChild(this.senderShape);

  }

  feedforward(val){
    this.sending = true;
    this.sender = this.a.location.get();
    this.output = val * this.weight;
    // this.b.feedforward(val * this.weight);
  }

  update(){
    if(this.sending){
      this.sender.x = Math.lerp(this.sender.x, this.b.location.x, 0.1);
      this.sender.y = Math.lerp(this.sender.y, this.b.location.y, 0.1);
      const d = PVector.dist(this.sender, this.b.location);
      if(d < 1){
        this.b.feedforward(this.output);
        this.sending = false;
      }
      this.display();
    }
  }

  display(){
    // console.log(this.sender.x);
    this.senderShape.position.set(this.sender.x, this.sender.y);
  }
}

export default Connection;

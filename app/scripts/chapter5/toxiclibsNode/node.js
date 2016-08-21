import toxi from 'toxiclibsjs';
/**
 * Node
 */
class Node extends toxi.physics2d.VerletParticle2D{
  constructor(renderer, loc){
    super(loc);
    this.renderer = renderer;
    this.drawNode();

  }

  drawNode(){
    this.node = new PIXI.Graphics();
    const color = `0x${Math.random().toString(16).slice(2,8)}`;
    this.node.beginFill(color).drawCircle(0, 0, 16).endFill();
    this.node.position.set(this.x, this.y);
    this.renderer.append(this.node);
  }

  display(){
    this.node.position.set(this.x, this.y);
  }
}

export default Node;

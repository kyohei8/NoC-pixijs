import toxi from 'toxiclibsjs';
/**
 * Particle
 */
class Particle extends toxi.physics2d.VerletParticle2D{
  constructor(renderer, loc){
    super(loc);
    this.renderer = renderer;
    this.drawShape();
  }

  drawShape(){
    const { x, y } = this;
    this.box = new PIXI.Graphics();
    const color = `0x${Math.random().toString(16).slice(2,8)}`;
    this.box.beginFill(color).drawCircle(0, 0, 16).endFill();
    this.box.position.set(x, y);
    this.renderer.append(this.box);
  }

  display(){
    const { x, y } = this;
    this.box.position.set(x, y);
  }
}

export default Particle;

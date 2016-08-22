import toxi from 'toxiclibsjs';
/**
 * Particle
 */
class Particle extends toxi.physics2d.VerletParticle2D{
  constructor(renderer, physics, loc){
    super(loc);
    this.r = 16;
    this.renderer = renderer;
    this.physics = physics;
    this.physics.addParticle(this);
    this.addBehavior();
    this.drawShape();
  }

  addBehavior(){
    const behavior = new toxi.physics2d.behaviors.AttractionBehavior(this, this.r * 4, -1);
    this.physics.addBehavior(behavior);
  }

  drawShape(){
    const { x, y } = this;
    this.box = new PIXI.Graphics();
    const color = `0x${Math.random().toString(16).slice(2,8)}`;
    this.box.beginFill(color).drawCircle(0, 0, this.r).endFill();
    this.box.position.set(x, y);
    this.renderer.append(this.box);
  }

  display(){
    const { x, y } = this;
    this.box.position.set(x, y);
  }
}

export default Particle;

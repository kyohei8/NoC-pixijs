import Particle from './particle';
import toxi from 'toxiclibsjs';

/**
 * Attractor
 */
class Attractor extends toxi.physics2d.VerletParticle2D{
  constructor(renderer, physics, loc){
    super(loc);
    this.r = 30;
    this.renderer = renderer;
    this.physics = physics;
    this.physics.addParticle(this);
    this.addBehavior();
    this.drawShape();
  }

  addBehavior(){
    // 幅の半分が引力の効く「距離」となる
    const behavior = new toxi.physics2d.behaviors.AttractionBehavior(this, this.renderer.renderer.width / 2, 1);
    this.physics.addBehavior(behavior);
  }

  drawShape(){
    const { x, y } = this;
    this.box = new PIXI.Graphics();
    const color = `0x${Math.random().toString(16).slice(2,8)}`;
    this.box.beginFill(color).drawCircle(0, 0, this.r).endFill();
    this.box.position.set(x, y);
    this.renderer.append(this.box);
    // デバッグ線
    const c = new PIXI.Graphics();
    c.lineStyle(2, 0x000000, 0.3).drawCircle(0, 0, this.renderer.renderer.width / 4);
    c.position.set(x, y);
    this.renderer.append(c);
  }

  display(){
    const { x, y } = this;
    this.box.position.set(x, y);
  }
}

export default Attractor;

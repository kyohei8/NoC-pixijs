import _ from 'lodash';
import PVector from '../modules/pVector';
/**
 * Particle
 */
class Particle{
  /**
   * constructor
   * @param {PVector} location
   */
  constructor(renderer, location){
    this.renderer = renderer;
    this.mass = 10;
    this.location = location.get();
    this.acceleration = new PVector(0, 0);
    this.velocity = new PVector(_.random(-1, 1, true), _.random(-2, 0, true));
    // 存続時間
    this.lifespan = 255;
    this.createParticle();
  }

  createParticle(){
    this.p = new PIXI.Graphics();
    this.p.beginFill(0xff00ff).drawCircle(0, 0, 10).endFill();
    this.renderer.append(this.p);
  }

  update(){
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    this.lifespan -= 2;
  }

  applyForce(force){
    // 運動の法則
    const f = force.get();
    f.div(this.mass);
    this.acceleration.add(f);
  }

  display(){
    const { x, y } = this.location;
    this.p.alpha = Math.map(this.lifespan, 0, 255, 0, 1);
    this.p.position.x = x;
    this.p.position.y = y;
  }

  run(){
    this.update();
    this.display();
  }

  isDead(){
    return this.lifespan < 0;
  }
}

export default Particle;

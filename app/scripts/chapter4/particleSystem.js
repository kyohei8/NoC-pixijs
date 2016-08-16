import Particle from './particle';
import Confetti from './confetti';
import PVector from '../pVector';
/**
 * ParticleSystem
 */
class ParticleSystem{
  constructor(renderer, loc = new PVector(0, 0)){
    this.renderer = renderer;
    this.particles = [];
    this.origin = loc;
  }

  addParticle(){
    if(Math.random() > 0.5){
      this.particles.push(new Confetti(this.renderer, this.origin));
    } else {
      this.particles.push(new Particle(this.renderer, this.origin));
    }
  }

  applyForce(f){
    this.particles.forEach((p) => {
      p.applyForce(f);
    });
  }

  applyRepeller(r){
    this.particles.forEach((p) => {
      const f = r.repel(p);
      p.applyForce(f);
    });
  }

  run(){
    for (var i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.run();
      if(p.isDead()){
        this.particles.splice(i, 1);
      }
    }
  }
}

export default ParticleSystem;

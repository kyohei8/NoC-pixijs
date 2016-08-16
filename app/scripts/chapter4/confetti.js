import Particle from './particle';
/**
 * Confetti
 */
class Confetti extends Particle{
  createParticle(){
    this.p = new PIXI.Graphics();
    this.p.beginFill(0xff00ff).drawRect(0, 0, 10, 15).endFill();
    this.renderer.append(this.p);
  }

  display(){
    super.display();
    const theta = Math.map(this.location.x, 0, this.renderer.renderer.width, 0, Math.PI * 4);
    this.p.rotation = theta;
  }
}

export default Confetti;

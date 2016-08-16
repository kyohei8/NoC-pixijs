import PVector from '../pVector';
/**
 * Repeller
 */
class Repeller{
  constructor(renderer, x, y){
    this.renderer = renderer;
    this.location = new PVector(x, y);
    // 引き付ける強さ
    this.strength = 10;
    this._createRepeller();
  }

  _createRepeller(){
    this.rpl = new PIXI.Graphics();
    const { x, y } = this.location;
    this.rpl.beginFill(0xFF840B).drawCircle(x, y, 50).endFill();
    this.renderer.append(this.rpl);
  }

  repel(particle){
    const dir = PVector.sub(this.location, particle.location);
    const d = dir.mag();
    Math.constrain(d, 5, 100);
    dir.normalize();
    const force = -1 * this.strength / (d + d);
    dir.mult(force);
    return dir;
  }

}

export default Repeller;

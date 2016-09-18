import PVector from '../modules/pVector';
/**
 * Spring
 */
class Spring{
  constructor(renderer, x, y, l = 100){
    this.renderer = renderer;
    const { width, height } = this.renderer.renderer;
    this.center = new PVector(width / 2, height / 2);

    // 支点
    this.anchor = new PVector(x, y);
    // バネの長さ
    this.len = l;
    // バネの強さ
    this.k = 0.1;
    this.createAnchorGraphic();
  }

  createAnchorGraphic(){
    this.aGraphic = new PIXI.Graphics();
    this.aGraphic.beginFill(0xff00ff);
    this.aGraphic.lineStyle(2);
    this.aGraphic.drawRect(this.center.x, 0, 20, 20);
    this.aGraphic.endFill();
    this.renderer.append(this.aGraphic);
    // line
    this.line = new PIXI.Graphics();
    this.renderer.append(this.line);
  }

  /**
   * Bobと接続する
   */
  connect(bob){
    this.bob = bob;
    const force = PVector.sub(bob.location, this.anchor);
    const d = force.mag();
    // 伸びた量
    const stretch = d - this.len;

    force.normalize();
    force.mult(-1 * this.k * stretch);

    bob.applyForce(force);
  }

  display(){
    this.line.clear();
    this.line.lineStyle(2, 0x000000);
    this.line.beginFill();
    this.line.moveTo(this.anchor.x, this.anchor.y);
    this.line.lineTo(this.bob.location.x, this.bob.location.y);
    this.line.endFill();
  }
}

export default Spring;

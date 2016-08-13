import PVector from '../pVector';
/**
 * Bob
 */
class Bob{
  constructor(renderer, x, y, m){
    this.location = new PVector(x, y);
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0, 0);
    this.mass = m;

    this.graphics = new PIXI.Graphics();
    this.graphics.lineStyle(0);
    const color = `0x${Math.random().toString(16).slice(2,8)}`;
    this.graphics.beginFill(color, 1);
    this.graphics.drawCircle(0, 0, this.mass * 3);
    this.graphics.endFill();
    renderer.append(this.graphics);
  }

  /**
   * 力を加える
   * @param {PVector} force 力のベクトル
   */
  applyForce(force){
    const f = PVector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update(){
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    // 0にもどす
    this.acceleration.mult(0);
  }

  display(){
    this.update();
    this.graphics.position.x = this.location.x;
    this.graphics.position.y = this.location.y;
  }

}

export default Bob;

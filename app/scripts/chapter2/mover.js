import _ from 'lodash';
import PVector from '../chapter1/pVector';

/**
 * Mover
 */
class Mover{
  constructor(renderer, liquid, m, x, y){
    this.location = null;
    this.velocity = null;
    this.acceleration = null;
    this.liquid = liquid;
    this.renderer = renderer;
    const { width, height } = this.renderer.renderer;
    this.width = width;
    this.height = height;

    // 位置
    // this.location = new PVector(_.random(this.width), _.random(this.height));
    this.location = new PVector(x, y);
    // 速度
    // this.velocity = new PVector(_.random(-2, 2), _.random(-2, 2));
    this.velocity = new PVector(0, 0);
    // 加速度
    this.acceleration = new PVector(0, 0);
    // 質量
    this.mass = m;

    this.topspeed = 10;

    this.graphics = new PIXI.Graphics();
    this.graphics.lineStyle(0);
    const color = `0x${Math.random().toString(16).slice(2,8)}`;
    this.graphics.beginFill(color, 1);
    this.graphics.drawCircle(0, 0, this.mass * 3);
    this.graphics.endFill();
    renderer.append(this.graphics);

    renderer.draw(this.display.bind(this));

  }

  /**
   * 力を加える
   *
   * @param {PVector} force 力のベクトル
   */
  applyForce(force){
    const f = PVector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  display(){
    // 右向きの風
    const wind = new PVector(0.01, 0);
    // 重力
    const gravity = new PVector(0, 0.1);
    // 摩擦
    // 摩擦係数(μ)
    const c = 0.01;
    // 垂直抗力(N)
    const normal = 1;
    /// 摩擦の大きさ
    const frictionMag = c * normal;
    // 摩擦力
    const friction = this.velocity.get();
    friction.mult(-1);
    friction.normalize();
    friction.mult(frictionMag);
    this.applyForce(friction);
    if(this.liquid.contains(this)){
      this.applyForce(this.liquid.drag(this));
    }


    this.applyForce(wind);
    this.applyForce(gravity);
    this.update();
    this.checkEdges();
    this.graphics.position.x = this.location.x;
    this.graphics.position.y = this.location.y;
  }

  /**
   * 端を検出し、反対側にもどす
   */
  checkEdges(){
    if(this.location.x > this.width){
      this.location.x = this.width;
      this.velocity.x *= -1;
    } else if (this.location.x < 0) {
      this.location.x = 0;
      this.velocity.x *= -1;
    }

    if(this.location.y > this.height){
      this.location.y = this.height;
      this.velocity.y *= -1;
    } else if (this.location.y < 0) {
      this.location.y = 0;
      this.velocity.y *= -1;
    }
  }
}

export default Mover;

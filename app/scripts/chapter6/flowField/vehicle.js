import _ from 'lodash';
import PVector from '../../modules/pVector';

/**
 * Vehicle
 */
class Vehicle {
  constructor(renderer, m, x, y, flowField, ms = 2, mf = 0.1){
    this.renderer = renderer;
    const { width, height } = this.renderer.renderer;
    this.width = width;
    this.height = height;

    this.ff = flowField;

    // 位置
    this.location = new PVector(x, y);
    // 速度
    this.velocity = new PVector(0, 0);
    // 加速度
    this.acceleration = new PVector(0, 0);
    // 質量
    this.mass = m;

    this.maxspeed = ms;
    // 操舵力。低い程曲がりにくい
    this.maxforce = mf;
    this.r = 6;
    this.circlePos = null;

    this.drawShape();
    this.display();
  }

  drawShape(){
    this.graphics = new PIXI.Graphics();
    this.graphics.lineStyle(3);
    const color = `0x${Math.random().toString(16).slice(2,8)}`;
    this.graphics.beginFill(color)
      .moveTo(0, -this.mass * 2)
      .lineTo(-this.mass, this.mass * 2)
      .lineTo(this.mass, this.mass * 2)
      .lineTo(0, -this.mass * 2)
      .endFill();
    this.renderer.append(this.graphics);
  }

  /**
   * 力を加える
   *
   * @param {PVector} force 力のベクトル
   */
  applyForce(force){
    // const f = PVector.div(force, this.mass);
    this.acceleration.add(force);
  }

  update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    // 0にもどす
    this.acceleration.mult(0);
  }

  follow(){
    // 目的までの必要な速度
    const desired = this.ff.lookup(this.location);
    desired.normalize();
    desired.mult(this.maxspeed);
    // 操舵力
    const steer = PVector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }

  display(){
    const theta = this.velocity.heading() + Math.PI / 2;
    this.graphics.position.x = this.location.x;
    this.graphics.position.y = this.location.y;
    this.graphics.rotation = theta;
  }

  run(){
    this.follow();
    this.update();
    this.borders();
    this.display();
  }

  // 壁を通り抜ける
  borders() {
    if(this.location.x < -this.r) {
      this.location.x = this.width + this.r;
    }
    if(this.location.y < -this.r){
      this.location.y = this.height + this.r;
    }
    if(this.location.x > this.width + this.r){
      this.location.x = -this.r;
    }
    if(this.location.y > this.height + this.r){
      this.location.y = -this.r;
    }
  }
}
export default Vehicle;

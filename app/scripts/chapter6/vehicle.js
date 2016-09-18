import _ from 'lodash';
import PVector from '../modules/pVector';
// 壁からの距離
const d = 25;

/**
 * Vehicle
 */
class Vehicle {
  constructor(renderer, m, x, y, debug){
    this.renderer = renderer;
    const { width, height } = this.renderer.renderer;
    this.width = width;
    this.height = height;
    this.debug = debug;

    // 位置
    this.location = new PVector(x, y);
    // 速度
    this.velocity = new PVector(0, 0);
    // 加速度
    this.acceleration = new PVector(0, 0);
    // 質量
    this.mass = m;

    this.maxspeed = 3;
    // 操舵力。低い程曲がりにくい
    this.maxforce = 0.1;
    this.r = 6;
    this.wanderTheta = 0;
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
    if(this.debug){
      // debug line and circle
      this.line = new PIXI.Graphics();
      this.circle = new PIXI.Graphics();
      this.circle.lineStyle(2)
        .drawCircle(0, 0, 20);
      this.renderer.append(this.line);
      this.renderer.append(this.circle);
    }
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

  seek(target){
    // 目的までの必要な速度
    const desired = PVector.sub(target, this.location);
    desired.normalize();
    desired.mult(this.maxspeed);
    // 操舵力
    const steer = PVector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }

  arrive(target){
    // 目的までの必要な速度
    const desired = PVector.sub(target, this.location);
    const d = desired.mag();
    if(d < 100){
      const m = Math.map(d, 0, 100, 0, this.maxspeed);
      desired.mult(m);
    }else{
      desired.mult(this.maxspeed);
    }
    const steer = PVector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }

  display(){
    this.update();
    const theta = this.velocity.heading() + Math.PI / 2;
    this.graphics.position.x = this.location.x;
    this.graphics.position.y = this.location.y;
    this.graphics.rotation = theta;

    if(this.debug){
      if(this.circlePos){
        this.circle.position.set(this.circlePos.x, this.circlePos.y);
        this.line
          .clear()
          .lineStyle(2)
          .moveTo(this.location.x, this.location.y)
          .lineTo(this.circlePos.x, this.circlePos.y)
          .lineTo(
            this.circlePos.x + this.circleOffset.x,
            this.circlePos.y + this.circleOffset.y
          )
      }
    }
  }

  run(){
    this.update();
    this.borders();
    this.display();
  }

  run2(){
    this.update();
    this.boundaries();
    this.display();
  }

  wander(){
    // 半径
    const wanderR = 20;
    // 距離
    const wanderD = 80;
    const change = 0.3;
    this.wanderTheta += _.random(-change, change, true);
    // 円の場所
    this.circlePos = this.velocity.get();
    this.circlePos.normalize();
    this.circlePos.mult(wanderD);
    this.circlePos.add(this.location);
    const h = this.velocity.heading();

    this.circleOffset = new PVector(
      wanderR * Math.cos(this.wanderTheta + h),
      wanderR * Math.sin(this.wanderTheta + h)
    );
    const target = PVector.add(this.circlePos, this.circleOffset);
    this.seek(target);
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

  // 壁でバウンドする
  boundaries(){
    let desired = null;
    if(this.location.x > d){
      desired = new PVector(this.maxspeed, this.velocity.y);
    }
    if (this.location.x > (this.width - d)) {
      desired = new PVector(-this.maxspeed, this.velocity.y);
    }

    if (this.location.y < d) {
      desired = new PVector(this.velocity.x, this.maxspeed);
    }
    if (this.location.y > (this.height - d)) {
      desired = new PVector(this.velocity.x, -this.maxspeed);
    }

    if(desired){
      desired.normalize();
      desired.mult(this.maxspeed);
      const steer = PVector.sub(desired, this.velocity);
      steer.limit(this.maxforce);
      this.applyForce(steer);
    }
  }
}
export default Vehicle;

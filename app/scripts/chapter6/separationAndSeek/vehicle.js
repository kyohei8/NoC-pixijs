import _ from 'lodash';
import PVector from '../../modules/pVector';

/**
 * Vehicle
 */
class Vehicle {
  constructor(renderer, m, x, y, debug = false){
    this.renderer = renderer;
    const { width, height } = this.renderer.renderer;
    this.width = width;
    this.height = height;
    this.debug = debug;

    // 位置 / 速度 / 加速度
    this.position = new PVector(x, y);
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0, 0);
    // 質量
    this.m = m;
    // 最高速度
    this.maxspeed = 3;
    // 操舵力。低い程曲がりにくい
    this.maxforce = 0.1;

    this.drawShape();
    this.display();
  }

  drawShape(){
    this.graphics = new PIXI.Graphics();
    this.graphics.lineStyle(3);
    const color = `0x${Math.random().toString(16).slice(2,8)}`;
    this.graphics.beginFill(color).drawCircle(0, 0, this.m * 2).endFill();
    this.renderer.append(this.graphics);
    if(this.debug){
      this._c = new PIXI.Graphics()
        .lineStyle(1, 0xff0000, 0.5)
        .beginFill(0x990000, 0.1)
        .drawCircle(0, 0, this.m * 8)
        .endFill();
      this.renderer.append(this._c);
    }
  }

  /**
   * 力を加える
   * @param {PVector} force 力のベクトル
   */
  applyForce(force){
    this.acceleration.add(force);
  }

  applyBehaviors(vehicles, target){
    const separateForce = this.separate(vehicles);
    const seekForce = this.seek(target);
    separateForce.mult(2);
    seekForce.mult(1);
    this.applyForce(separateForce);
    this.applyForce(seekForce);
  }

  separate(vehicles){
    const desiredSeparation = this.m * 8;
    const sum = new PVector();
    let count = 0;
    vehicles.forEach((v) => {
      const d = PVector.dist(this.position, v.position);
      // 近づきすぎている場合
      if( d > 0 && d < desiredSeparation ){
        const diff = PVector.sub(this.position, v.position);
        diff.normalize();
        sum.add(diff);
        count++;
      }
    });
    if(count > 0){
      sum.div(count);
      sum.setMag(this.maxspeed);
      sum.sub(this.velocity);
      sum.limit(this.maxforce);
    }
    return sum;
  }

  update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // 0にもどす
    this.acceleration.mult(0);
  }

  seek(target){
    // 目的までの必要な速度
    const desired = PVector.sub(target, this.position);
    desired.normalize();
    desired.mult(this.maxspeed);
    // 操舵力
    const steer = PVector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    return steer;
  }

  display(){
    this.update();
    const theta = this.velocity.heading() + Math.PI / 2;
    this.graphics.position.x = this.position.x;
    this.graphics.position.y = this.position.y;
    this.graphics.rotation = theta;
    if(this.debug){
      this._c.position.set(this.position.x, this.position.y);
    }
  }

  // 壁を通り抜ける
  borders() {
    if(this.position.x < -this.r) {
      this.position.x = this.width + this.r;
    }
    if(this.position.y < -this.r){
      this.position.y = this.height + this.r;
    }
    if(this.position.x > this.width + this.r){
      this.position.x = -this.r;
    }
    if(this.position.y > this.height + this.r){
      this.position.y = -this.r;
    }
  }

  // 壁でバウンドする
  boundaries(){
    let desired = null;
    if(this.position.x > d){
      desired = new PVector(this.maxspeed, this.velocity.y);
    }
    if (this.position.x > (this.width - d)) {
      desired = new PVector(-this.maxspeed, this.velocity.y);
    }

    if (this.position.y < d) {
      desired = new PVector(this.velocity.x, this.maxspeed);
    }
    if (this.position.y > (this.height - d)) {
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


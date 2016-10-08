import _ from 'lodash';
import PVector from '../../modules/pVector';
import Perceptron from './perceptron';
// 壁からの距離
const d = 25;

/**
 * Vehicle
 */
class Vehicle {
  constructor(renderer, m, x, y){
    this.renderer = renderer;
    const { width, height } = this.renderer.renderer;
    this.width = width;
    this.height = height;

    this.brain = new Perceptron(10, 0.001);

    this.location = new PVector(x, y);
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0, 0);
    // 質量
    this.mass = m;

    this.maxspeed = 3;
    // 操舵力。低い程曲がりにくい
    this.maxforce = 0.1;
    this.r = 6;
    // this.wanderTheta = 0;
    // this.circlePos = null;

    this.drawShape();
    this.display();
  }

  drawShape(){
    this.graphics = new PIXI.Graphics();
    this.graphics.lineStyle(2);
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
    this.acceleration.add(force);
  }

  update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    // 0にもどす
    this.acceleration.mult(0);
  }

  steer(targets, desired){
    const forces = targets.map((target, i) => this.seek(target));
    const result = this.brain.feedforward(forces);
    this.applyForce(result);

    const error = PVector.sub(desired, this.location);
    this.brain.train(forces, error);
  }

  seek(target){
    // 目的までの必要な速度
    const desired = PVector.sub(target, this.location);
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
    this.graphics.position.x = this.location.x;
    this.graphics.position.y = this.location.y;
    this.graphics.rotation = theta;
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

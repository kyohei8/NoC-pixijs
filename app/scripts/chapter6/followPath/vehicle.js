import _ from 'lodash';
import PVector from '../../pVector';

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

  /**
   * follow
   *
   * @param {Path} p パス
   */
  follow(p){
    // 進行方向の予測値
    const predict = this.velocity.get();
    predict.normalize();
    predict.mult(25);
    const predictLoc = PVector.add(this.location, predict);

    // 法線を求める
    // const a = p.start;
    // const b = p.end;
    // const normalPoint = this.getNormalPoint(predictLoc, a, b);
    // 複数のパスに対応
    let worldRecord = 1000000;
    let target = null;
    let distance = null;
    p.points.forEach((p1, i) => {
      const a = p1;
      const b = p.points[i+1];
      if(b){
        let normalPoint = this.getNormalPoint(predictLoc, a, b);
        // 法線が実際のaとbの間にあるか
        if(normalPoint.x < a.x || normalPoint.x > b.x){
          normalPoint = b.get();
        }
        distance = PVector.dist(predictLoc, normalPoint);

        if(distance < worldRecord){
          worldRecord = distance;
          const dir = PVector.sub(b, a);
          dir.normalize();
          dir.mult(10);
          target = normalPoint.get();
          target.add(dir);
        }
      }
    });
    if(distance > p.r){
      this.seek(target);
    }
  }

  display(){
    const theta = this.velocity.heading() + Math.PI / 2;
    this.graphics.position.x = this.location.x;
    this.graphics.position.y = this.location.y;
    this.graphics.rotation = theta;
  }

  run(){
    this.update();
    this.borders();
    this.display();
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

  getNormalPoint(p, a, b){
    const a2p = PVector.sub(p, a);
    const a2b = PVector.sub(b, a);
    a2b.normalize();
    a2b.mult(a2p.dot(a2b));
    const normalPoint = PVector.add(a, a2b);
    return normalPoint;
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

  separate(vehicles){
    const desiredSeparation = 190;
    const sum = new PVector();
    let count = 0;
    vehicles.forEach((v) => {
      const d = PVector.dist(this.location, v.location);
      // 近づきすぎている場合
      if( d > 0 && d < desiredSeparation ){
        const diff = PVector.sub(this.location, v.location);
        diff.normalize();
        sum.add(diff);
        count++;
      }
    });
    if(count > 0){
      sum.div(count);
      sum.setMag(this.maxspeed);
      const steer = PVector.sub(sum, this.velocity);
      steer.limit(this.maxforce);
      this.applyForce(steer);
    }
  }

  // 壁を通り抜ける
  borders() {
    if(this.location.x < -this.r) {
      this.location.x = this.width + this.r;
    }
    if(this.location.y < -this.r){
      // this.location.y = this.height + this.r;
    }
    if(this.location.x > this.width + this.r){
      this.location.x = -this.r;
    }
    if(this.location.y > this.height + this.r){
      // this.location.y = -this.r;
    }
  }
}
export default Vehicle;

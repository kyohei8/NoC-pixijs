import PVector from '../../pVector';
/**
 * Boid
 */
class Boid{
  constructor(renderer, x, y, m = 5, ms = 3, mf = 0.05){
    this.renderer = renderer;
    const { width, height } = this.renderer.renderer;
    this.width = width;
    this.height = height;

    // 位置
    this.position = new PVector(x, y);
    // 速度
    this.velocity = new PVector();
    // 加速度
    this.acceleration = new PVector();
    // 質量
    this.mass = m;
    this.r = 6;

    this.maxspeed = ms;
    // 操舵力。低い程曲がりにくい
    this.maxforce = mf;

    this.drawShape();
    this.display();
  }

  drawShape(){
    this.graphics = new PIXI.Graphics();
    this.graphics.lineStyle(1);
    const color = `0x${Math.random().toString(16).slice(2,8)}`;
    this.graphics.beginFill(color)
      .moveTo(0, -this.mass * 2)
      .lineTo(-this.mass, this.mass * 2)
      .lineTo(this.mass, this.mass * 2)
      .lineTo(0, -this.mass * 2)
      .endFill();
    this.renderer.append(this.graphics);
  }

  run(boids, target){
    this.flock(boids, target);
    this.update();
    this.borders();
    this.display();
  }

  display(){
    const theta = this.velocity.heading() + Math.PI / 2;
    this.graphics.position.x = this.position.x;
    this.graphics.position.y = this.position.y;
    this.graphics.rotation = theta;
    if(this.debug){
      this._c.position.set(this.position.x, this.position.y);
    }
  }

  /**
   * 力を加える
   * @param {PVector} force 力のベクトル
   */
  applyForce(force){
    this.acceleration.add(force);
  }

  update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // 0にもどす
    this.acceleration.mult(0);
  }

  flock(boids){
    // 分離・整列・結合
    const sep = this.separate(boids);
    const ali = this.align(boids);
    const coh = this.cohesion(boids);

    // それぞれの重み
    sep.mult(1.5);
    ali.mult(1.0);
    coh.mult(1.0);

    // this.applyForce(target);
    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);

  }

  separate(boids){
    const desiredSeparation = this.mass * 8;
    const sum = new PVector();
    let count = 0;
    boids.forEach((v) => {
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

  align(boids){
    // 範囲を指定
    const neighborDist = 100;
    const sum = new PVector();
    // 平均速度を求める
    let cnt = 0;
    boids.forEach((b) => {
      const d = PVector.dist(this.position, b.position);
      // 周囲のboidのみ反応
      if(d < neighborDist){
        sum.add(b.velocity)
        cnt++;
      }
    });
    if(cnt > 0){
      sum.div(cnt);
      //最高速度でその方向に移動
      sum.setMag(this.maxspeed);
      // 操舵
      const steer = PVector.sub(sum, this.velocity);
      steer.limit(this.maxforce);
      return steer;
    }else{
      // 周囲のboidがいない場合は何もしない
      return new PVector();
    }
  }

  cohesion(boids){
    const neighborDist = 100;
    const sum = new PVector();
    // 平均速度を求める
    let cnt = 0;
    boids.forEach((b) => {
      const d = PVector.dist(this.position, b.position);
      // 周囲のboidのみ反応
      if(d > 0 && d < neighborDist){
        sum.add(b.position)
        cnt++;
      }
    });
    if(cnt > 0){
      sum.div(cnt);
      return this.seek(sum);
    } else {
      return new PVector();
    }
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
}

export default Boid;

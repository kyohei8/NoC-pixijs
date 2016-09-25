import PVector from '../../modules/pVector';
import DNA from './dna';

/**
 * Rocket
 */
class Rocket{
  constructor(renderer, x, y, dna, target, obstacles, color){
    this.renderer = renderer;
    // 位置
    this.location = new PVector(x, y);
    // 速度
    this.velocity = new PVector(0, 0);
    // 加速度
    this.acceleration = new PVector(0, 0);
    this.r = 4;

    this._fitness = 0;
    this.dna = dna;
    this.target = target;
    this.hitTarget = false;
    this.geneCounter = 0;
    this.obstacles = obstacles;
    this.stopped = false;
    this.color = color || `0x${Math.random().toString(16).slice(2,8)}`;
    this.draw(color);
    // 最短距離：初期値は適当に大きい数値
    this.recordDist = 1000;
    // 到達までにかかった時間
    this.finishTime = 0;
  }

  draw(c){
    this.graphics = new PIXI.Graphics();
    this.graphics.lineStyle(0);
    this.graphics.beginFill(this.color, 1)
      .drawCircle(0, 0, 10)
      .endFill();
    this.renderer.append(this.graphics);
    this.display();
  }

  /**
   * 力を加える
   * @param {PVector} force 力のベクトル
   */
  applyForce(force){
    // const f = PVector.div(force, this.mass);
    this.acceleration.add(force);
  }

  /**
   * 適応度を求める
   */
  fitness(){
    // 距離の割合を適応度とする
    // const d = PVector.dist(this.location, this.target);
    // this._fitness = Math.pow(1 / d, 2);

    // 終了時間と最短距離を適応度とする
    const fn = 1 / (this.finishTime * this.recordDist);
    this._fitness = Math.pow(fn, 2);

    if(this.stopped){
      this._fitness *= 0.1;
    }
    if(this.hitTarget){
      this._fitness *= 2;
    }
  }

  // 障害物への当たり判定
  checkObstacles(){
    this.obstacles.forEach((o) => {
      if(o.contains(this.location)){
        this.stopped = true;
      }
    });
  }

  update(){
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  run(){
    this.checkTarget();
    if(!this.hitTarget && !this.stopped){
      this.applyForce(this.dna.genes[this.geneCounter]);
      this.geneCounter = (this.geneCounter + 1) % this.dna.genes.length;
      this.update();
      this.checkObstacles();
    }
    this.display();
  }

  display(){
    // this.checkEdges();
    this.graphics.position.x = this.location.x;
    this.graphics.position.y = this.location.y;
  }

  checkTarget(){
    const d = PVector.dist(this.location, this.target);
    if(d < this.recordDist){
      this.recordDist = d;
    }
    if(d < 12){
      this.hitTarget = true;
    }else{
      this.finishTime++;
    }
  }

  getDNA(){
    return this.dna;
  }
}

export default Rocket;

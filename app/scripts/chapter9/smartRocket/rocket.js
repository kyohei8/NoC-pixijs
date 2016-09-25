import PVector from '../../modules/pVector';
import DNA from './dna';

/**
 * Rocket
 */
class Rocket{
  constructor(renderer, x, y, dna, target){
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
    this.draw();
  }

  draw(){
    this.graphics = new PIXI.Graphics();
    this.graphics.lineStyle(0);
    const color = `0x${Math.random().toString(16).slice(2,8)}`;
    this.graphics.beginFill(color, 1)
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
    const d = PVector.dist(this.location, this.target);
    // 距離の割合を適応度とする
    this._fitness = Math.pow(1 / d, 2);
  }

  update(){
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  run(){
    this.checkTarget();
    if(!this.hitTarget){
      this.applyForce(this.dna.genes[this.geneCounter]);
      this.geneCounter = (this.geneCounter + 1) % this.dna.genes.length;
      this.update();
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
    if(d < 12){
      this.hitTarget = true;
    }
  }

  getDNA(){
    return this.dna;
  }
}

export default Rocket;

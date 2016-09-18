import PVector from '../modules/pVector';
/**
 * Pendulum
 */
const G = 0.4;

class Pendulum{
  constructor(renderer, r = 100){
    this.renderer = renderer;
    const { width, height } = this.renderer.renderer;
    // 支点
    this.origin = new PVector(width / 2, 10);
    // アームの長さ
    this.r = r;
    // アームの角度
    this.angle = 45;
    // アームの角速度
    this.aVelocity = 0;
    // 角加速度
    this.aAcceleration = 0;

    this.location = new PVector(this.r * Math.sin(this.angle), this.r * Math.cos(this.angle));
    this.location.add(this.origin);

    // 減速値
    this.dumping = 0.9999;

    this.createGraphic();
  }

  createGraphic(){
    this.graphics = new PIXI.Graphics();
    this.graphics.lineStyle(3);
    this.graphics.moveTo(this.origin.x, this.origin.y);
    this.graphics.lineTo(300, 300);
    this.graphics.drawCircle(this.origin.x, this.origin.y, 30);
    this.graphics.endFill();
    this.renderer.append(this.graphics);
  }


  update(){
    // 加速度を計算
    this.aAcceleration = (-1 * G * Math.sin(this.angle)) / this.r;
    // 速度を追加
    this.aVelocity += this.aAcceleration;
    this.angle += this.aVelocity;
    // 振り子の位置を計算
    this.location = new PVector(this.r * Math.sin(this.angle), this.r * Math.cos(this.angle));
    this.location.add(this.origin);

    this.aVelocity *= this.dumping;

  }

  display(){
    this.graphics.clear();
    this.graphics.lineStyle(3);
    this.graphics.moveTo(this.origin.x, this.origin.y);
    const { x, y } = this.location;
    this.graphics.lineTo(x, y);
    this.graphics.drawCircle(x, y, 30);
  }
}

export default Pendulum;

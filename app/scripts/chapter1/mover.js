import _ from 'lodash';
import PVector from './pVector';
import { Noise } from 'noisejs';
const noise = new Noise(Math.random);
/**
 * Mover
 */
class Mover{
  constructor(renderer){
    this.renderer = renderer;
    const { width, height } = this.renderer.renderer;
    this.width = width;
    this.height = height;

    // 位置
    this.location = new PVector(_.random(this.width), _.random(this.height));
    // 速度
    this.velocity = new PVector(_.random(-2, 2), _.random(-2, 2));
    this.acceleration = new PVector(-0.001, 0.01);

    this.topspeed = 10;

    this.graphics = new PIXI.Graphics();
    this.graphics.lineStyle(0);
    const color = `0x${Math.random().toString(16).slice(2,8)}`;
    this.graphics.beginFill(color, 1);
    this.graphics.drawCircle(0, 0, 10);
    this.graphics.endFill();
    renderer.append(this.graphics);

    renderer.draw(this.display.bind(this));

    renderer.stage.interactive = true;
    renderer.stage.on('mousemove', (e) => {
      const { x, y } = e.data.global;
      this.mousePoint = new PVector(x, y);
    });

    this.cnt = 0;
  }

  update(){
    if(this.mousePoint){
      // マウスポインタとの差分
      this.dir = PVector.sub(this.mousePoint, this.location);
      // 正規化
      this.dir.normalize();
      // スケーリング
      this.dir.mult(Math.random());
    }
    let acceleration = this.acceleration;
    // ランダムな加速度
    // const acceleration = PVector.random2D();
    // acceleration.mult(_.random(2));

    // パーリンノイズの加速度
    // this.cnt++;
    // const x = noise.perlin2(this.cnt / 100, 0);
    // const y = noise.perlin2(this.cnt / 1000, 0);
    // const acceleration = new PVector(x, y);

    // マウスポインタとの差分
    if(this.dir){
      acceleration = this.dir;
    }

    this.velocity.add(acceleration);
    this.velocity.limit(this.topspeed);
    this.location.add(this.velocity);
  }

  /**
   * 端を検出し、反対側にワープするようにする
   */
  checkEdges(){
    if(this.location.x > this.width){
      this.location.x = 0;
    } else if (this.location.x < 0) {
      this.location.x = this.width;
    }

    if(this.location.y > this.height){
      this.location.y = 0;
    } else if (this.location.y < 0) {
      this.location.y = this.height;
    }
  }

  display(){
    this.update();
    this.checkEdges();
    this.graphics.position.x = this.location.x;
    this.graphics.position.y = this.location.y;
  }
}

export default Mover;

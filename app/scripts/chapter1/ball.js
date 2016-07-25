import PVector from './pVector';

/**
 * Ballクラス
 */
class Ball{
  constructor(renderer){
    const { width, height } = renderer.renderer;
    this.width = width;
    this.height = height;

    this.location = new PVector(width / 2, height / 2);
    this.velocity = new PVector(2, 3.5);

    this.graphics = new PIXI.Graphics();
    this.graphics.lineStyle(0);
    this.graphics.beginFill(0x000000, 1);
    this.graphics.drawCircle(0, 0, 10);
    this.graphics.endFill();
    renderer.append(this.graphics);

    renderer.draw(this.draw.bind(this));
  }

  draw(){
    this.location.add(this.velocity);

    if((this.location.x > this.width) || (this.location.x < 0)){
      this.velocity.x *= -1;
    }
    if((this.location.y > this.height) || (this.location.y < 0)){
      this.velocity.y *= -1;
    }
    this.graphics.position.x = this.location.x;
    this.graphics.position.y = this.location.y;
  }
}

export default Ball;

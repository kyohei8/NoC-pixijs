import PVector from '../modules/pVector';
import _ from 'lodash';

/**
 * Oscillator(発振器)クラス
 */
class Oscillator{
  constructor(renderer){
    this.mass = 10;
    this.renderer = renderer;
    const { width, height } = this.renderer.renderer;
    this.center = new PVector(width / 2, height / 2);
    this.angle = new PVector(0, 0);
    this.velocity = new PVector(_.random(-0.05, 0.05, true), _.random(-0.05, 0.05, true));
    this.amplitude = new PVector(_.random(width / 2), _.random(height / 2));

    this.createGraphic();

    this.display();
  }

  createGraphic(){
    this.graphics = new PIXI.Graphics();
    this.graphics.lineStyle(3);
    this.graphics.moveTo(this.center.x, this.center.y);
    this.graphics.lineTo(300, 300);
    this.graphics.drawCircle(this.center.x, this.center.y, this.mass * 3);
    this.graphics.endFill();
    this.renderer.append(this.graphics);
  }

  oscillate(){
    this.angle.add(this.velocity);
  }

  display(){
    this.oscillate();
    const x = this.center.x + Math.sin(this.angle.x) * this.amplitude.x;
    const y = this.center.y + Math.sin(this.angle.y) * this.amplitude.y;

    this.graphics.clear();
    this.graphics.lineStyle(3);
    this.graphics.moveTo(this.center.x, this.center.y);
    this.graphics.lineTo(x, y);
    this.graphics.drawCircle(x, y, this.mass * 3);

  }
}

export default Oscillator;

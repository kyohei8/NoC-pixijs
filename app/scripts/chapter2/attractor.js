import { clamp } from 'lodash';
import PVector from '../chapter1/pVector';
// 万有引力定数
const G = 1;

/**
 * Attractor
 */
class Attractor{
  constructor(renderer, x = 0, y = 0, m = 20){
    this.mass = m;
    this.location = new PVector(x, y);

    this.graphics = new PIXI.Graphics();
    this.graphics.lineStyle(0);
    const color = `0x${Math.random().toString(16).slice(2,8)}`;
    this.graphics.beginFill(color, 1);
    this.graphics.drawCircle(0, 0, this.mass * 3);
    this.graphics.endFill();
    this.graphics.position.x = this.location.x;
    this.graphics.position.y = this.location.y;
    renderer.append(this.graphics);
  }

  /**
   * 重力を返す
   *
   * @param {Mover} m Moverオブジェクト
   * @returns {PVector} 重力を表すベクトル
   */
  attract(m){
    let force = PVector.sub(this.location, m.location);
    const distance = clamp(force.mag(),5 ,25);
    force.normalize();
    // 力の大きさ
    const strength = (G * this.mass * m.mass) / (distance * distance);
    force.mult(strength);
    return force;
  }
}

export default Attractor;

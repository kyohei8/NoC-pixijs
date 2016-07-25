/**
 * Liquid
 */
class Liquid{
  constructor(x, y, w, h, c){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
  }

  /**
   * Moverオブジェクトが矩形内にあるかどうか
   *
   * @param {Mover} m Moverオブジェクト
   * @returns {boolean} 矩形内であればtrue
   */
  contains(m){
    const l = m.location;
    const { x, y, w, h } = this;
    return l.x > x && l.x < x + w && l.y > y && l.y < y + h;
  }

  /**
   * 抗力を計算する
   * @param {Mover} m Moverオブジェクト
   * @returns {PVector} 抗力ベクトル
   */
  drag(m){
    // 空気抵抗
    // 抗力係数（空気抵抗の大きさ）
    const _c = this.c;
    // 物体が移動する速さ(v^2)
    const speed = m.velocity.mag();
    const dragMag = _c * speed * speed;
    // 逆向きの表す
    const drag = m.velocity.get();
    drag.mult(-1);
    drag.normalize();
    drag.mult(dragMag);
    return drag;
  }
}

export default Liquid;

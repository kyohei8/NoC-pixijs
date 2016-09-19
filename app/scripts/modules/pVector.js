import _ from 'lodash';
/**
 * PVector
 */
class PVector{
  constructor(x = 0, y = 0){
    this.x = x;
    this.y = y;
  }

  /**
   * ベクトルを加算する
   * @param {PVector} v ベクトルクラス
   */
  add(pVector){
    this.x += pVector.x;
    this.y += pVector.y;
  }

  /**
   * ベクトルの加算
   *
   * @static
   * @param {PVector} v1 ベクトル
   * @param {PVector} v2 ベクトル2
   * @returns {PVector} 加算されたベクトル
   */
  static add(v1, v2){
    return new PVector(v1.x + v2.x, v1.y + v2.y);
  }

  /**
   * ベクトルを減算する
   * @param {PVector} v ベクトルクラス
   */
  sub(pVector){
    this.x -= pVector.x;
    this.y -= pVector.y;
  }

  /**
   * ベクトルの減算
   *
   * @static
   * @param {PVector} v1 ベクトル
   * @param {PVector} v2 ベクトル2
   * @returns {PVector} 減算されたベクトル
   */
  static sub(v1, v2){
    return new PVector(v1.x - v2.x, v1.y - v2.y);
  }

  /**
   * ベクトルを乗算する
   * @param {number} n
   */
  mult(n){
    this.x *= n;
    this.y *= n;
  }

  /**
   * ベクトルの乗算
   *
   * @static
   * @param {PVector} v1 ベクトル
   * @param {number} n
   * @returns {PVector} 乗算されたベクトル
   */
  static mult(v1, n){
    return new PVector(v1.x * n, v1.y * n);
  }

  /**
   * ベクトルを除算する
   * @param {number} n
   */
  div(n){
    this.x /= n;
    this.y /= n;
  }

  /**
   * ベクトルの除算
   *
   * @static
   * @param {PVector} v1 ベクトル
   * @param {number} n 数値
   * @returns {PVector} 除算されたベクトル
   */
  static div(v1, n){
    return new PVector(v1.x / n, v1.y / n);
  }

  /**
   * ベクトルの大きさを返す
   */
  mag(){
    const { x, y } = this;
    return Math.sqrt(x * x + y * y);
  }

  /**
   * ベクトルの大きさを設定
   * @param {number} n 大きさの値
   * @returns {PVector} 更新されたPVector
   */
  setMag(n){
    return this.normalize().mult(n);
  }

  /**
   * ベクトルの正規化
   */
  normalize(){
    const m = this.mag();
    if(m !== 0){
      this.div(m);
    }
    return this;
  }

  limit(max){
    if(this.mag() > max){
      this.normalize();
      this.mult(max);
    }
  }

  /**
   * 向きを求める
   *
   * @returns {number} 角度（ラジアン）
   */
  heading(){
    return Math.atan2(this.y, this.x);
  }

  /**
   * 自身のコピーしたオブジェクトを返す
   * @returns {PVector}
   */
  get(){
    return new PVector(this.x, this.y);
  }

  /**
   * ランダムな方向をさす長さ1のベクトルを生成
   *
   * @static
   * @returns {PVector} 長さ1のベクトル
   */
  static random2D(){
    const angle = _.random(360);
    return new PVector(Math.cos(angle),Math.sin(angle));
  }

  /**
   * 内積(dot product)を計算
   *
   * @param {PVector} v1 ベクトル
   * @returns {number} 内積の値
   */
  dot(v1){
    return this.x * v1.x + this.y * v1.y;
  }

  /**
   * 2つのベクトルの角度を求める
   *
   * @param {PVector} v1 ベクトル１
   * @param {PVector} v2 ベクトル２
   * @returns {number} 角度（θ）
   */
  static angleBetween(v1, v2){
    const dot = v1.dot(v2);
    const theta = Math.acos(dot / (v1.mag() * v2.mag()));
    return theta;
  }

  dist(v){
    const v2 = v.get();
    v2.sub(this);
    return v2.mag();
  }

  static dist(v1, v2){
    return v1.dist(v2);
  }

  rotate(angle) {
    const prev_x = this.x;
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    this.x = c * this.x - s * this.y;
    this.y = s * prev_x + c * this.y;
  }
}

export default PVector;

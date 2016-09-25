import PVector from '../../modules/pVector';
/**
 * Obstacle
 */
class Obstacle{
  constructor(renderer, x, y, w, h){
    this.renderer = renderer;
    this.location = new PVector(x, y);
    this.w = w;
    this.h = h;
    this.draw();
  }

  draw(){
    const block = new PIXI.Graphics();
    const { location, w, h } = this;
    block.lineStyle(1).beginFill(0x671f22)
      .drawRect(location.x, location.y, w, h).endFill();
    this.renderer.append(block);
  }

  /**
   * 衝突判定
   *
   * @param {PVector} v 対象のベクトル
   * @return {Boolean}
   */
  contains(v){
    const { location, w, h } = this;
    const r = (v.x > location.x && v.x < location.x + w
      && v.y > location.y && v.y < location.y + h);
    return r;
  }
}

export default Obstacle;

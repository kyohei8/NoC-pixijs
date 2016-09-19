import PVector from '../../modules/pVector';
/**
 * KochLine
 */
class KochLine{
  constructor(renderer, start, end){
    this.renderer = renderer;
    this.start = start.get();
    this.end = end.get();
    this.draw();
  }

  draw(){
    const { start, end } = this;
    this.line = new PIXI.Graphics();
    this.renderer.append(this.line);
  }

  kochA(){
    return this.start.get();
  }

  kochB(){
    const { start, end } = this;
    const v = PVector.sub(end, start);
    v.div(3);
    v.add(start);
    return v;
  }

  kochC(){
    const { start, end } = this;
    const a = start.get();
    const v = PVector.sub(end, start);
    v.div(3);
    a.add(v);
    v.rotate(-Math.getRadian(60));
    a.add(v);
    return a;
  }

  kochD(){
    const { start, end } = this;
    const v = PVector.sub(end, start);
    v.mult(2 / 3);
    v.add(start);
    return v;
  }

  kochE(){
    return this.end.get();
  }

  display(){
    const { start, end } = this;
    this.line.clear().lineStyle(2).moveTo(start.x, start.y).lineTo(end.x, end.y);
  }
}

export default KochLine;

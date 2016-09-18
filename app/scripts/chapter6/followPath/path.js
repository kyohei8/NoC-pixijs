import PVector from '../../modules/pVector';
/**
 * Path
 */
class Path{
  constructor(renderer){
    this.renderer = renderer;
    const { width, height } = this.renderer.renderer;
    this.start = new PVector(0, height / 3);
    this.end = new PVector(width, 2 * height / 3);
    this.r = 20;

    this.line = new PIXI.Graphics()
      .lineStyle(1)
      .moveTo(this.start.x, this.start.y)
      .lineTo(this.end.x, this.end.y);
    this.radius = new PIXI.Graphics()
      .lineStyle(this.r * 2, 0xCC0000, 0.3)
      .moveTo(this.start.x, this.start.y)
      .lineTo(this.end.x, this.end.y);
    this.renderer.append(this.radius);
    this.renderer.append(this.line);
    this.points = [
      this.start,
      this.end
    ];
  }

  addPoint(x, y){
    const point = new PVector(x, y);
    const index = this.points.length - 1;
    this.points.splice(index, 0, point);
    this.display();
  }

  display(){
    this.line.clear().lineStyle(1);
    this.radius.clear().lineStyle(this.r * 2, 0xCC0000, 0.3);
    this.points.forEach((p, i) => {
      if(i === 0){
        this.line.moveTo(p.x, p.y);
        this.radius.moveTo(p.x, p.y);
      }else{
        this.line.lineTo(p.x, p.y);
        this.radius.lineTo(p.x, p.y);
      }
    });
  }
}

export default Path;

/**
 * Arrow
 */
class Arrow{
  constructor(renderer, v){
    this.renderer = renderer;
    const { width, height } = this.renderer.renderer;
    this.width = width;
    this.height = height;
    v.mult(20);
    this.v = v;
    this.drawArrow();
  }

  drawArrow(){
    // draw
    this.line = new PIXI.Graphics();
    this.line.lineStyle(3).moveTo(0, 0)
      .lineTo(this.v.x, -this.v.y);
      // .lineTo(this.v.x - 5, this.v.y - 5 )
      // .lineTo(this.v.x + 5, this.v.y - 5)
      // .lineTo(this.v.x, this.v.y);

    this.line.position.set(this.width / 2, this.height / 2);
    // line.pivot.set(0, this.resolution / 2);
    // line.rotation = -f.heading() + Math.PI;
    this.renderer.append(this.line);
  }

  display(){
    this.line.clear().lineStyle(3).moveTo(0, 0).lineTo(this.v.x, -this.v.y);
  }
}

export default Arrow;

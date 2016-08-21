import _ from 'lodash';
import toxi from 'toxiclibsjs';
/**
 * Rope
 */
class Rope{
  constructor(renderer, physics, len){
    this.renderer = renderer;
    this.points = _.range(len).map((i) => {
      return new toxi.physics2d.VerletParticle2D(
        new toxi.geom.Vec2D(100 + i * 10, 20)
      );
    });

    this.points.forEach((p) => {
      physics.addParticle(p);
    });

    this.points[0].lock();

    this.physics = physics;

    this.createSpring();
    this.drawRope();
  }

  createSpring(){
    this.points.forEach((p, i) => {
      const prev = this.points[i - 1];
      if(prev){
        const spring = new toxi.physics2d.VerletSpring2D(p, prev, 10, 0.01);
        this.physics.addSpring(spring);
      }
    });
  }

  drawRope(){
    this.line = new PIXI.Graphics();
    this.line.beginFill(0x000000)
      .moveTo(0, 0)
      .lineTo(0, 0)
      .endFill();
    this.renderer.append(this.line);
  }

  display(){
    this.line.clear();
    this.line.lineStyle(3);
    const p0 = this.points[0];
    this.line.moveTo(p0.x, p0.y);
    this.points.forEach((p, i) => {
      // toxi.geom.mesh.Vertex(p.x, p.y);
      if(i > 0){
        this.line.lineTo(p.x, p.y);
      }
    });
  }
}

export default Rope;

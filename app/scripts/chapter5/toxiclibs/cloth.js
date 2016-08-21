import _ from 'lodash';
import toxi from 'toxiclibsjs';
/**
 * Cloth
 */
class Cloth{
  constructor(renderer, physics, len){
    this.renderer = renderer;
    this.len = len;
    const lineSize = 20;

    this.lines = [];
    // ロープ分のループ
    for (let i = 0; i < len; i++) {
      const line = [];
      // 1ロープ分のループ
      for (let j = 0; j < lineSize; j++) {
        const l = new toxi.physics2d.VerletParticle2D(
          new toxi.geom.Vec2D(300 + i * 20, 20)
        );
        if(i === 0 && j === 0 || i === len - 1 && j === 0){
          l.lock();
        }
        physics.addParticle(l);
        line.push(l);
      }
      this.lines.push(line);
    }

    this.physics = physics;

    this.lineShapes = [];
    this.rowShapes = [];
    this.createSpring();
    this.drawRope();
  }

  createSpring(){
    this.lines.forEach((line, j) => {
      line.forEach((l, i) =>{
        const prevLine = line[i - 1];
        if(prevLine){
          const spring = new toxi.physics2d.VerletSpring2D(l, prevLine, 10, 0.1);
          // console.log(l, prevLine, spring);
          this.physics.addSpring(spring);
        }
      });

      if(j !== 0){
        const leftLines = this.lines[j - 1];
        line.forEach((l, i) =>{
          const prev = leftLines[i];
          const spring = new toxi.physics2d.VerletSpring2D(l, prev, 10, 0.1);
          this.physics.addSpring(spring);
        });
      }
    });
  }

  drawRope(){
    this.lines.forEach(() => {
      const line = new PIXI.Graphics();
      line.beginFill(0xff00f0).moveTo(0, 0).lineTo(0, 0).endFill();
      this.renderer.append(line);
      this.lineShapes.push(line);

      this.rowShape = new PIXI.Graphics();
      this.rowShape.beginFill(0x00ff00).moveTo(0, 0).lineTo(0, 0).endFill();
      this.renderer.append(this.rowShape);
    });
  }

  display(){
    this.lineShapes.forEach((line, i) => {
      line.clear();
      line.lineStyle(3, 0xff0ff0);
      this.lines[i].forEach((p, i) => {
        if(i === 0){
          line.moveTo(p.x, p.y);
        } else {
          line.lineTo(p.x, p.y);
        }
      });
    });

    const line = this.rowShape;
    line.clear();
    line.lineStyle(3, 0xff0ff0);
    _.range(20).forEach((j) => {
      this.lines.forEach((_line, i) => {
        const p = _line[j];
        if(i === 0){
          line.moveTo(p.x, p.y);
        } else {
          line.lineTo(p.x, p.y);
        }
      });
    });
  }
}

export default Cloth;

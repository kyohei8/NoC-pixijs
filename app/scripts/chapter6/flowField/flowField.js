import {Noise} from 'noisejs';
import PVector from '../../modules/pVector';
const noise = new Noise(Math.random());
/**
 * FlowField
 */
class FlowField{
  constructor(renderer, resolution){
    this.renderer = renderer;
    const { width, height } = this.renderer.renderer;
    this.width = width;
    this.height = height;
    this.resolution = resolution;

    this.field = [];
    this.cols = Math.round(this.width / this.resolution);
    this.rows = Math.round(this.height / this.resolution);
    this.init();
  }

  init(){
    let xoff = 0;
    for (let i = 0; i < this.cols; i++) {
      let yoff = 0;
      const rowsFields = [];
      for (let j = 0; j < this.rows; j++) {
        const theta = Math.map(noise.perlin2(xoff, yoff), 0, 1, 0, Math.PI * 2);
        const f = new PVector(Math.cos(theta), Math.sin(theta));
        rowsFields.push(f);
        yoff += 0.1;
        // draw
        const line = new PIXI.Graphics();
        line.lineStyle(1).moveTo(0, 0)
          .lineTo(0, this.resolution)
          .lineTo(-5, this.resolution - 5)
          .lineTo(5, this.resolution - 5)
          .lineTo(0, this.resolution);

        line.position.set(i * this.resolution + this.resolution / 2, j * this.resolution + this.resolution / 2);
        line.pivot.set(0, this.resolution / 2);
        line.rotation = -f.heading() + Math.PI;
        this.renderer.append(line);
      }
      xoff += 0.1;
      this.field.push(rowsFields);
    }
  }

  lookup(loc){
    const col = Math.floor(Math.constrain(loc.x / this.resolution, 0, this.cols - 1));
    const row = Math.floor(Math.constrain(loc.y / this.resolution, 0, this.rows - 1));
    return this.field[col][row];
  }
}

export default FlowField;

import PixiRenderer from '../../modules/pixiRenderer.js';
const renderer = new PixiRenderer();
import PVector from '../../modules/pVector';

class VectorSubtraction{
  constructor(){
    this.mouse = new PVector(0, 0);
    console.log(renderer, this.mouse);
    this.center = new PVector(renderer.renderer.width / 2, renderer.renderer.height / 2);

    this.graphics = new PIXI.Graphics();
    this.graphics.lineStyle(4, 0xFF0033, 1);
    renderer.append(this.graphics);

    renderer.stage.interactive = true;
    renderer.stage.on('mousemove', (e) => {
      this.mouse.x = e.data.global.x;
      this.mouse.y = e.data.global.y;
      this.mouse.mult(0.5);
      // console.log(this.mouse);
    });

    renderer.draw(this.draw.bind(this));
  }

  draw() {
    this.graphics.beginFill(0x000000, 1);
    this.graphics.moveTo(this.center.x, this.center.y);
    this.graphics.lineTo(this.mouse.x, this.mouse.y);
    this.graphics.endFill();
  }
}

new VectorSubtraction();

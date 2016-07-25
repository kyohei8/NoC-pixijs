import _ from 'lodash';
import { Noise } from 'noisejs';
const flies = 12;
const noises = [];
for (let i = 0; i < flies; i++) {
  noises.push({
    t : _.random(10000),
    t2 : _.random(10000),
    stepX: _.random(0.0075, 0.01, true),
    stepY: _.random(0.0075, 0.01, true),
    noiseX: new Noise(Math.random() * 1000),
    noiseY: new Noise(Math.random() * 1000)
  });
}
/**
 * Walker
 */
class Walker{
  constructor(renderer){
    this.graphicsList = [];
    const { width, height } = renderer.renderer;
    this.width = width;
    this.height = height;
    this.x = width / 2;
    this.y = height / 2;

    for (let i = 0; i < flies; i++) {
      this.graphics = new PIXI.Graphics();
      this.graphics.lineStyle(0);
      this.graphics.beginFill(0x000000, 1);
      this.graphics.drawCircle(0, 0, 1);
      this.graphics.endFill();
      renderer.append(this.graphics);
      this.graphicsList.push(this.graphics);
    }
    renderer.draw(this.step.bind(this));
    renderer.stage.interactive = true;
    renderer.stage.on('mousemove', (e) => {
      this.mousePoint = e.data.global;
    });
  }

  draw(){
    // this.graphics.position.x = this.x;
    // this.graphics.position.y = this.y;
  }

  /**
   * 指定の範囲に値を変換する。processingのmap()と同じ
   * TODO outofboundsになるとおかしくなるので直す
   * @param {Number} value 指定の値
   * @param {Number} low1 元の最低値
   * @param {Number} high1 元の最高値
   * @param {Number} low2 変換後の最低値
   * @param {Number} high2 変換後の最大値
   * @return {Number} 変換後の値
   */
  mapRange(value, low1, high1, low2, high2){
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
  }

  step(){
    for (let i = 0; i < flies; i++) {
      const _noise = noises[i];
      _noise.t += _noise.stepX;
      _noise.t2 += _noise.stepY;
      const nx = _noise.noiseX.perlin2(_noise.t, _noise.t);
      const ny = _noise.noiseY.perlin2(_noise.t2, _noise.t2);
      this.graphicsList[i].position.x = this.mapRange(nx, -1, 1, 0, this.width);
      this.graphicsList[i].position.y = this.mapRange(ny, -1, 1, 0, this.height);
      // console.log(nx);
    }
    this.draw();
  }
}

export default Walker;

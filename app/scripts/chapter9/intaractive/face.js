/**
 * Face
 */
class Face{
  constructor(renderer, dna, x, y){
    this.renderer = renderer;
    this.dna = dna;
    this.x = x;
    this.y = y;
    this._fitness = 0;
  }

  display(){
    const { genes } = this.dna;
    const { x, y } = this;
    const r = Math.map(genes[0], 0, 1, 0, 70);
    const c = this._color(genes[1], genes[2], genes[3]);
    const eyeY = Math.map(genes[4], 0, 1, 0, 5);
    const eyeX = Math.map(genes[5], 0, 1, 0, 10);
    const eyeSize = Math.map(genes[6], 0, 1, 0, 10);
    const eyeColor = this._color(genes[7], genes[8],  genes[9]);
    const mouthColor = this._color(genes[10], genes[11],  genes[12]);
    const mouthY = Math.map(genes[13], 0, 1, 0, 25);
    const mouthX = Math.map(genes[14], 0, 1, -25, 25);
    const mouthW = Math.map(genes[15], 0, 1, 0, 50);
    const mouthH = Math.map(genes[16], 0, 1, 0, 10);

    this.shape = new PIXI.Graphics();
    this.shape.position.set(x, y);
    // 輪郭
    this.shape.lineStyle(0)
      .beginFill(c)
      .drawCircle(0, 0, r)
      .endFill()
      .beginFill(eyeColor)
      .drawCircle(-eyeX, -eyeY, eyeSize)
      .drawCircle(eyeX, -eyeY, eyeSize)
      .endFill();
    this.mouth = new PIXI.Graphics()
      .beginFill(mouthColor)
      .drawRect(x + mouthX, y + mouthY, mouthW, mouthH)
      .endFill()
    this.mouth.pivot.set(mouthW / 2, mouthH / 2);
    this.container = new PIXI.Container();

    this.container.addChild(this.shape);
    this.container.addChild(this.mouth);
    const bounds = this.container.getBounds();
    this.container.hitArea = new PIXI.Rectangle(bounds.x, 30, 140, 140);
    const h = new PIXI.Graphics();
    h.beginFill(0xff0000, 0.3).drawRect(x - 130 / 2, 30, 130, 130).endFill();
    h.alpha = 0;
    this.container.addChild(h);

    this.container.interactive = true;
    this.container.on('mouseover', (e) => { h.alpha = 1; });
    this.container.on('mouseout', (e) => { h.alpha = 0; });

    this.container.on('click', (e) => {
      this._fitness += 0.25;
    });
    this.renderer.append(this.container);
  }

  destroy(){
    this.renderer.remove(this.container);
  }

  getDNA(){
    return this.dna;
  }

  _color(r, g, b){
    const _r = r.toString(16).slice(2, 4);
    const _g = g.toString(16).slice(2, 4);
    const _b = b.toString(16).slice(2, 4);
    return `0x${_r}${_g}${_b}`;
  }
}

export default Face;

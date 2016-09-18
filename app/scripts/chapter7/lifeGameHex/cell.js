import _ from 'lodash';
/**
 * Cell
 */
class Cell{
  constructor(renderer, x, y, edge, state, size){
    this.renderer = renderer;
    this.x = x;
    this.y = y;
    this.edge = edge;
    this.state = state;
    this.previous = state;
    this.size = size;
    this.draw();
  }

  draw(){
    const { size, x, y } = this;
    // xが奇数、yが偶数もしくはxが偶数かつyが奇数のみ
    if(x % 2 === 1 && y % 2 === 0 || x % 2 === 0 && y % 2 === 1){
      this.cell = new PIXI.Graphics();
      this.cell.lineStyle(1, 0x000000).beginFill(this.state === 0 ? 0xaaaaaa : 0x666666);
      const points = [];
      for (let i = 0, len = 7; i < len; i++) {
        const radian = 60 * i * Math.PI / 180;
        const x2 = Math.cos(radian) * size;
        const y2 = Math.sin(radian) * size;
        points.push(x2, y2);
      }

      this.cell.drawPolygon(points).endFill();
      this.cell.position.set(x * size * 1.5,  Math.sqrt(3) / 2 * size * y);
      this.renderer.append(this.cell);
    }
  }

  display(){
    const { size, x, y, state, previous, cell } = this;
    if(!cell){
      return;
    }
    let color = 0;
    if(previous === 0 && state === 1){
      color = 0x0000cc;
    }else if(state === 1){
      color = 0x000000;
    }else if(previous === 1 && state === 0){
      color = 0xcc0000;
    }else{
      color = 0xcccccc;
    }
    cell.clear()
      .lineStyle(1, 0x000000)
      .beginFill(color);
    const points = [];
    for (let i = 0, len = 7; i < len; i++) {
      const radian = 60 * i * Math.PI / 180;
      const x2 = Math.cos(radian) * size;
      const y2 = Math.sin(radian) * size;
      points.push(x2, y2);
    }

    this.cell.drawPolygon(points).endFill();
  }
}

export default Cell;

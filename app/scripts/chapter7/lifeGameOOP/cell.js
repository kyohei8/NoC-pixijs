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
    this.cell = new PIXI.Graphics();
    this.cell.beginFill(this.state === 0 ? 0xaaaaaa : 0x000000)
      .drawRect(x * size, y * size, size, size)
      .endFill();
    this.renderer.append(this.cell);
  }

  display(){
    const { size, x, y, state, previous, cell } = this;
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
    this.cell.clear().beginFill(color)
      .drawRect(x * size, y * size, size, size)
      .endFill();
  }
}

export default Cell;

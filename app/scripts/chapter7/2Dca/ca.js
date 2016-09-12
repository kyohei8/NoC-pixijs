import _ from 'lodash';
/**
 * CA
 */
class CA{
  constructor(renderer){
    this.renderer = renderer;
    const { width, height } = this.renderer.renderer;
    this.height = height;
    // セルのサイズ
    this.size = 4;
    // 中央が1の配列を作成（１次元のCA)
    this.rows = [];
    this.rowSize = parseInt(height / this.size);
    this.colSize = parseInt(width / this.size);
    _.range(this.rowSize).map(() => {
      const row = _.range(width / this.size).map(() => _.random(0, 1));
      this.rows.push(row);
    });
    // 世代
    this.generation = 0;
    this.draw();
  }

  generate(){
    const nextGen = [];
    nextGen.push(this.rows[0]);
    for (let y = 1; y < this.rows.length - 1; y++) {
      const row = this.rows[y];
      // 端っこを追加
      const rowGen = [this.rows[y][0]];
      for (let x = 1; x < row.length - 1; x++) {
        let neighbors = 0;
        const currnet = this.rows[y][x];
        // 上下左右のセルをチェック
        for (let i = - 1; i <= 1; i++) {
          for (let j = - 1; j <= 1; j++) {
            neighbors += this.rows[y + i][x + j];
          }
        }
        neighbors -= this.rows[y][x];
        // 生か死か
        let _currnet = currnet;
        if(currnet === 1 && neighbors < 2){
          _currnet = 0;
        }
        if(currnet === 1 && neighbors > 3){
          _currnet = 0;
        }
        if(currnet === 0 && neighbors === 3){
          _currnet = 1;
        }
        rowGen.push(_currnet);
      }
      rowGen.push(this.rows[y][row.length - 1]);
      nextGen.push(rowGen);
    }
    nextGen.push(this.rows[this.rows.length - 1]);
    this.rows = nextGen;
    this.generation++;
  }

  draw(){
    const { size } = this;
    this.shapes = [];
    this.rows.forEach((r, y) => {
      const row = r.map((c, x) => {
        const cell = new PIXI.Graphics();
        cell.beginFill(c === 0 ? 0xaaaaaa : 0x000000)
          .drawRect(x * size, y * size, size, size)
          .endFill();
        this.renderer.append(cell);
        return cell;
      });
      this.shapes.push(row);
    });
  }

  display(){
    const { size } = this;
    this.rows.forEach((r, y) => {
      r.forEach((c, x) => {
        const cell = this.shapes[y][x];
        cell.clear().beginFill(c === 0 ? 0xaaaaaa : 0x000000)
          .drawRect(x * size, y * size, size, size)
          .endFill();
      });
    });
  }
}

export default CA;


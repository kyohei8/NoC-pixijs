import _ from 'lodash';
import Cell from './cell';
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

    _.range(this.rowSize).map((i) => {
      const row = _.range(this.colSize).map((j) => {
        if(i === 0 || i === this.rowSize - 1 || j === 0 || j === this.colSize - 1){
          return new Cell(this.renderer, j, i, true, 0, this.size);
        }
        return new Cell(this.renderer, j, i, false, _.random(0, 1), this.size);
      });
      this.rows.push(row);
    });
    // 世代
    this.generation = 0;
  }

  generate(){
    for (let y = 1; y < this.rows.length - 1; y++) {
      const row = this.rows[y];
      for (let x = 1; x < row.length - 1; x++) {
        let neighbors = 0;
        const currnet = this.rows[y][x];
        // 上下左右のセルをチェック
        for (let i = - 1; i <= 1; i++) {
          for (let j = - 1; j <= 1; j++) {
            neighbors += this.rows[y + i][x + j].previous;
          }
        }
        neighbors -= currnet.previous;
        // 生か死か
        let _currnet = currnet.state;
        if(currnet.state === 1 && neighbors < 2){
          _currnet = 0;
        }
        if(currnet.state === 1 && neighbors > 3){
          _currnet = 0;
        }
        if(currnet.state === 0 && neighbors === 3){
          _currnet = 1;
        }
        currnet.previous = currnet.state;
        currnet.state = _currnet;
      }
    }
    this.generation++;
  }

  display(){
    const { size } = this;
    this.rows.forEach((r, y) => {
      r.forEach((c, x) => {
        const cell = this.rows[y][x];
        cell.display();
      });
    });
  }
}

export default CA;


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
    this.cells = _.range(width / this.size).map(() => 0);
    this.cells[(this.cells.length / 2)] = 1;
    // ルール
    const ruleset = (101).toString(2).split('').map((n) => +n).reverse();
    this.ruleset = _.range(8).map((n, i) => ruleset[i] || 0);
    // 世代
    this.generation = 0;

  }

  generate(){
    const nextGen = [];
    for (let i = 0, len = this.cells.length; i < len; i++) {
      const left = this.cells[i - 1] || 0;
      const me = this.cells[i];
      const right = this.cells[i + 1] || 0;
      nextGen[i] = this.rules(left, me, right);
    }
    this.cells = nextGen;
    this.generation++;
  }

  rules(l, c, r){
    const s = `${l}${c}${r}`;
    const index = parseInt(s, 2);
    return this.ruleset[index];
  }

  display(){
    if(this.generation > this.height / this.size){
      return;
    }
    this.cells.forEach((c, i) => {
      const cell = new PIXI.Graphics();
      const { size } = this;
      cell.beginFill(c === 0 ? 0xaaaaaa : 0x000000)
        .drawRect(i * size, this.generation * size, size, size)
        .endFill();
      this.renderer.append(cell);
    });

  }
}

export default CA;

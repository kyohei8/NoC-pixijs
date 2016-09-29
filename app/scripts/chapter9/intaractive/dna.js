import _ from 'lodash';
/**
 * DNA
 */
class DNA{
  constructor(){
    // 遺伝子：0-1のランダムな少数の値
    this.genes = _.range(20).map(() => Math.random());
    this.fitness = 0;
    this.mutationRate = 0.01;
  }

  /**
   * 適応度を求める
   */
  getFitness(){
    let score = 0;
    this.genes.forEach((c, i) => {
      if(c === this.target.charAt(i)){
        score++;
      }
    });
    this.fitness = score / this.target.length;
  }

  /**
   * 交配
   * @param {DNA} partner 別のDNAインスタンス
   */
  crossOver(partner){
    const child = new DNA();
    // 区切りをランダムに設定
    const midpoint = _.random(this.genes.length);
    this.genes.forEach((c, i) => {
      if(i > midpoint){
        child.genes[i] = this.genes[i];
      }else{
        child.genes[i] = partner.genes[i];
      }
    });
    return child;
  }

  /**
   * 突然変異
   * 稀な確率で文字を変更する
   */
  mutate(){
    this.genes.forEach((c, i) => {
      if(Math.random() < this.mutationRate){
        this.genes[i] = Math.random;
      }
    });
  }

}

export default DNA;


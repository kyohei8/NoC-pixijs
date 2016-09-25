import _ from 'lodash';
import PVector from '../../modules/pVector';
const MAXFORCE = 1;
const LIFETIME = window.innerHeight;
/**
 * DNA
 */
class DNA{
  constructor(){
    // 遺伝子：ランダムな文字の配列(文字列）
    this.genes = _.range(LIFETIME).map(() => {
      const p = new PVector.random2D();
      p.mult(_.random(0, MAXFORCE, true));
      return p;
    });
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
  mutate(mutationRate){
    this.genes.forEach((c, i) => {
      if(Math.random() < mutationRate){
        const p = new PVector.random2D();
        p.mult(_.random(0, MAXFORCE, true));
        this.genes[i] = p;
      }
    });
  }

}

export default DNA;

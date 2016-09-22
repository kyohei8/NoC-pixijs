/**
 * LSystem
 */
class LSystem{

  /**
   * constructor
   *
   * @param {string} axiom 公理
   * @param {Rule[]} r ruleの配列
   */
  constructor(axiom, r){
    this.sentence = axiom;
    this.ruleset = r;
    this.generation = 0;
  }

  generate(){
    let nextgen = '';
    [...this.sentence].forEach((c) => {
      let replace = '' + c;
      for(const rule of this.ruleset){
        const a = rule.getA();
        if(a === c){
          replace = rule.getB();
          break;
        }
      }
      nextgen += replace;
    });

    this.sentence = nextgen;
    this.generation++;
  }

  getSentence(){
    return this.sentence;
  }
}

export default LSystem;

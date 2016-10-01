import _ from 'lodash';
/**
 * DNA
 */
class DNA{
  constructor(){
    this.genes = _.range(1).map(() => Math.random());
  }

  mutate(mr){
  }

  copy(){
    const d = new DNA();
    d.genes = this.genes.slice(0);
    return d;
  }
}

export default DNA;

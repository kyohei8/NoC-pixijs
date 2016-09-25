import DNA from './dna';
import Rocket from './rocket';
/**
 * Population
 */
class Population{
  constructor(renderer, mutationRate, num, target){
    this.mutationRate = mutationRate;
    this.population = [];
    this.matingPool = [];
    this.generation = 0;
    this.renderer = renderer;
    this.target = target;
    const { width, height } = this.renderer.renderer;

    // DNAの集団
    this.population = _.range(num).map(() => {
      return new Rocket(renderer, width / 2, height - 20, new DNA(), target);
    });

  }

  live(){
    this.population.forEach((r) => r.run());
  }

  fitness(){
    this.population.forEach((r) => {
      r.fitness();
    });
  }

  selection(){
    // プールをクリア
    this.matingPool = [];

    // 適応度が最大のものをチョイス
    const maxFitness = this.getMaxFitness();
    this.population.forEach((r) => {
      const fitnessNormal = Math.map(r._fitness, 0, maxFitness, 0, 1);
      const n = fitnessNormal * 100;
      for (let j = 0; j < n; j++) {
        this.matingPool.push(r);
      }
    });
  }

  reproduction(){
    const { width, height } = this.renderer.renderer;
    // console.log(this.population[0].dna.genes[450].x);
    this.population = this.population.map((r) => {
      r.graphics.clear();
      // 到着できたのもは交配しない
      if(r.hitTarget){
        return new Rocket(this.renderer, width / 2, height - 20, r.dna, this.target);
      }
      const a = _.random(this.matingPool.length - 1);
      const b = _.random(this.matingPool.length - 1);
      const rocketA = this.matingPool[a];
      const rocketB = this.matingPool[b];
      // console.log(parentA, parentB);

      const child = rocketA.getDNA().crossOver(rocketB.getDNA());
      child.mutate(this.mutationRate);
      return new Rocket(this.renderer, width / 2, height - 20, child, this.target);
    });
    // console.log(this.population[0].dna.genes[450].x);
    this.generation++;
  }

  getMaxFitness(){
    return _.last(_.sortBy(this.population, [(r) => r._fitness]))._fitness;
  }
}
export default Population;

/**
 * Flock
 */
class Flock{
  constructor(){
    this.boids = [];
  }

  run(){
    this.boids.forEach((boid) => {
      boid.run(this.boids);
    });
  }

  add(boid){
    this.boids.push(boid);
  }
}

export default Flock;

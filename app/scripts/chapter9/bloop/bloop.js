import _ from 'lodash';
import { Noise } from 'noisejs';
import PVector from '../../modules/pVector';

/**
 * Bloop
 */
class Bloop{
  /**
   * constructor
   *
   * @param {PixiRenderer} renderer
   * @param {PVector} location 位置データ
   * @param {DNA} dna dnaデータ
   */
  constructor(renderer, location, dna){
    this.renderer = renderer;
    this.location = location;
    const { width, height } = this.renderer;
    this.width = width;
    this.height = height;
    this.dna = dna;
    this.r = Math.map(this.dna.genes[0], 0, 1, 15, 0);
    this.maxspeed = Math.map(this.dna.genes[0], 0, 1, 0, 50);

    this.noiseX = new Noise(Math.random());
    this.noiseY = new Noise(Math.random());
    this.xoff = _.random(10000, true);
    this.yoff = _.random(10000, true);

    this.health = 200;
    this.isDead = false;

    this.draw();
  }

  draw(){
    this.shape = new PIXI.Graphics();
    this.shape.beginFill().drawCircle(0, 0, this.r).endFill();
    this.renderer.append(this.shape);
  }

  eat(foods){
    for (let i = foods.length - 1; i >= 0; i--) {
      const f = foods[i];
      const d = PVector.dist(this.location, f.location);
      if(d < this.r){
        this.health += 100;
        f.remove();
        foods.splice(i, 1);
      }
    }
  }

  reproduce(){
    if(Math.random() < 0.0005){
      // 無性生殖
      const child = this.dna.copy();
      child.mutate(0.01);
      return new Bloop(this.renderer, this.location, child);
    } else {
      return null;
    }

  }

  // 壁を通り抜ける
  borders() {
    if(this.location.x < -this.r) {
      this.location.x = this.width + this.r;
    }
    if(this.location.y < -this.r){
      this.location.y = this.height + this.r;
    }
    if(this.location.x > this.width + this.r){
      this.location.x = -this.r;
    }
    if(this.location.y > this.height + this.r){
      this.location.y = -this.r;
    }
  }

  update(){
    if(this.isDead){
      return;
    }
    const vx = Math.map(this.noiseX.perlin2(this.xoff, this.xoff), -1, 1, -this.maxspeed, this.maxspeed);
    const vy = Math.map(this.noiseY.perlin2(this.yoff, this.yoff), -1, 1, -this.maxspeed, this.maxspeed);
    const velocity = new PVector(vx, vy);
    this.location.add(velocity);
    this.xoff += 0.01;
    this.yoff += 0.01;
    this.health -= 1;
    if(this.dead()){
      this.shape.destroy();
      this.isDead = true;
    }else{
      this.borders();
      this.display();
    }
  }

  dead(){
    return this.health < 0;
  }

  display(){
    const { x, y } = this.location;
    this.shape.position.set(x, y);
  }
}

export default Bloop;

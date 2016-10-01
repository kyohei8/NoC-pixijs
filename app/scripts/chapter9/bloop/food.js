/**
 * Food
 */
class Food{
  constructor(renderer, location){
    this.renderer = renderer;
    this.location = location;
    this.draw();
  }

  draw(){
    this.shape = new PIXI.Graphics();
    this.shape.beginFill(0x008000).drawRect(0, 0, 5, 5).endFill();
    this.shape.pivot.set(2.5, 2.5);
    this.renderer.append(this.shape);
    this.shape.position.set(this.location.x, this.location.y);
  }

  remove(){
    this.gone = true;
    this.shape.alpha = 0;
    this.shape.destroy();
    this.renderer.remove(this.shape);
  }
}

export default Food;

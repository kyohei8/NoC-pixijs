const width = window.innerWidth;
const height = window.innerHeight;
/**
 * PixiRenderer
 */
class PixiRenderer{
  constructor(){
    this.renderer = null;
    this.drawFunc = [];
    this.init();
    this.stage = new PIXI.Container();
    // start animating
    this.animate = this.animate.bind(this);
    this.animate();
  }

  init(){
    this.renderer = PIXI.autoDetectRenderer(width, height, {
      backgroundColor : 0xDDDDDD,
      view: document.querySelector('#app'),
      transparent: false,
      antialias: false,
      resolution: 1
    });
  }

  append(pixiDisplayObject){
    this.stage.addChild(pixiDisplayObject);
  }

  remove(pixiDisplayObject){
    this.stage.removeChild(pixiDisplayObject);
  }

  draw(func){
    this.drawFunc.push(func);
  }

  animate(){
    this.renderer.render(this.stage);
    this.drawFunc.forEach((f) => f());
    requestAnimationFrame(this.animate);
  }
}

export default PixiRenderer;

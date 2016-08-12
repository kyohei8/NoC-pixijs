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

    /*
    var texture = PIXI.Texture.fromImage('./assets/images/_sprites.png');
    var bunny = new PIXI.Sprite(texture);

    // center the sprite's anchor point
    bunny.anchor.x = 0.5;
    bunny.anchor.y = 0.5;

    // move the sprite to the center of the screen
    bunny.position.x = 200;
    bunny.position.y = 150;

    this.stage.addChild(bunny);
    */

  }

  init(){
    this.renderer = PIXI.autoDetectRenderer(800, 600, {
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

import _ from 'lodash';
/**
 * Box
 */
class Box{
  constructor(renderer, world, x, y, w = 16, h = 16, lock = false){
    this.renderer = renderer;
    this.world = world;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.lock = lock;
    this.createBody();
    this.drawShape();
  }

  createBody(){
    // bodyを生成
    const bd = new Box2D.b2BodyDef();
    if(this.lock){
      bd.set_type(Box2D.b2_staticBody);
    } else {
      bd.set_type(Box2D.b2_dynamicBody);
    }
    const pos = new Box2D.b2Vec2(this.x, this.y);
    bd.set_position(pos);
    this.body = this.world.CreateBody(bd);
    // shapeを生成
    const ps = new Box2D.b2PolygonShape();
    ps.SetAsBox(this.w / 2, this.h / 2);

    // fixtureを生成
    const fd = new Box2D.b2FixtureDef();
    fd.set_shape(ps);
    fd.set_density(1);
    fd.set_friction(0.3);
    fd.set_restitution(0.5);
    this.body.CreateFixture(fd);
  }

  drawShape(){
    const pos = this.body.GetPosition();
    const x = pos.get_x();
    const y = pos.get_y();
    const { w, h } = this;
    this.box = new PIXI.Graphics();
    const color = `0x${Math.random().toString(16).slice(2,8)}`;
    this.box.beginFill(color).drawRect(0, 0, w, h).endFill();
    this.box.pivot.set(w / 2, h / 2);
    this.box.position.set(x, y);
    this.renderer.append(this.box);
  }

  display(){
    const pos = this.body.GetPosition();
    const x = pos.get_x();
    const y = pos.get_y();
    const a = this.body.GetAngle();
    this.box.position.x = x;
    this.box.position.y = y;
    this.box.rotation = a;
  }

  isDead(){
    const y = this.body.GetPosition().get_y();
    return y > this.renderer.renderer.height + this.h;
  }

  destroy(){
    this.renderer.remove(this.box);
    this.world.DestroyBody(this.body);
  }

}

export default Box;

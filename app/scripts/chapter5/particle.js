import _ from 'lodash';
/**
 * Particle
 */
class Particle{
  constructor(renderer, world, x, y, r){
    this.renderer = renderer;
    this.world = world;
    this.x = x;
    this.y = y;
    this.r = r;
    this.col = 0xff0000;
    this.createBody();
    this.drawShape();
  }

  createBody(){
    const bd = new Box2D.b2BodyDef();
    bd.set_type(Box2D.b2_dynamicBody);
    bd.set_position(new Box2D.b2Vec2(this.x, this.y));
    this.body = this.world.CreateBody(bd);
    // create shape
    const cs = new Box2D.b2CircleShape();
    cs.set_m_radius(this.r);

    const fd = new Box2D.b2FixtureDef();
    fd.set_shape(cs);
    fd.set_density(1);
    fd.set_friction(0.01);
    fd.set_restitution(0.3);

    this.body.CreateFixture(fd);

    this.body.SetAngularVelocity(_.random(-10, 10));
    this.body.userData = this;
  }

  drawShape(){
    const pos = this.body.GetPosition();
    const x = pos.get_x();
    const y = pos.get_y();
    this.box = new PIXI.Graphics();
    this.box.beginFill(this.col).drawCircle(0, 0, this.r).endFill();
    this.box.position.set(x, y);
    this.renderer.append(this.box);
  }

  display(){
    const pos = this.body.GetPosition();
    const x = pos.get_x();
    const y = pos.get_y();
    const a = this.body.GetAngle();
    this.box.clear();
    this.box.beginFill(this.col).drawCircle(0, 0, this.r).endFill();

    this.box.position.x = x;
    this.box.position.y = y;
    this.box.rotation = -a;
  }

  done(){
    const { height } = this.renderer.renderer;
    const pos = this.body.GetPosition();
    if(pos.get_y() > height + this.r * 2){
      this.killBody();
      return true;
    }
    return false;
  }

  killBody(){
    this.world.DestroyBody(this.body);
  }

  change(){
    this.col = 0x00ff00;
  }

  restore(){
    this.col = 0xff0000;
  }

}

export default Particle;

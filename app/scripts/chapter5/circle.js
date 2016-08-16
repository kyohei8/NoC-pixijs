import Box from './box';
/**
 * Circle extends Box
 */
class Circle extends Box{
  createBody(){
    // bodyを生成
    const bd = new Box2D.b2BodyDef();
    bd.set_type(Box2D.b2_dynamicBody);
    const pos = new Box2D.b2Vec2(this.x, this.y);
    bd.set_position(pos);
    this.body = this.world.CreateBody(bd);
    // shapeを生成
    const ps = new Box2D.b2CircleShape();
    ps.set_m_radius(this.w / 2);

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
    const { w } = this;
    this.box = new PIXI.Graphics();
    const color = `0x${Math.random().toString(16).slice(2,8)}`;
    this.box.beginFill(color).drawCircle(0, 0, w / 2).endFill();
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
    this.box.rotation = -a;
  }
}

export default Circle;

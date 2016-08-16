import Box from './box';

function createPolygonShape(vertices) {
  var shape = new Box2D.b2PolygonShape();
  var buffer = Box2D.allocate(vertices.length * 8, 'float', Box2D.ALLOC_STACK);
  var offset = 0;
  for (var i=0;i<vertices.length;i++) {
    Box2D.setValue(buffer+(offset), vertices[i].get_x(), 'float'); // x
    Box2D.setValue(buffer+(offset+4), vertices[i].get_y(), 'float'); // y
    offset += 8;
  }
  var ptr_wrapped = Box2D.wrapPointer(buffer, Box2D.b2Vec2);
  shape.Set(ptr_wrapped, vertices.length);
  return shape;
}

/**
 * MultiShape extends Box
 */
class MultiShape extends Box{
  createBody(){
    // bodyを生成
    const bd = new Box2D.b2BodyDef();
    bd.set_type(Box2D.b2_dynamicBody);
    const pos = new Box2D.b2Vec2(this.x, this.y);
    bd.set_position(pos);
    this.body = this.world.CreateBody(bd);
    // 長方形のshapeを生成
    const ps = new Box2D.b2PolygonShape();
    ps.SetAsBox(this.w / 2, this.h);

    const cs = new Box2D.b2CircleShape();
    cs.set_m_radius(this.w * 0.75);
    cs.set_m_p(new Box2D.b2Vec2(0, -this.h));

    this.body.CreateFixture(ps, 1.0);
    this.body.CreateFixture(cs, 1.0);
  }

  drawShape(){
    const pos = this.body.GetPosition();
    const x = pos.get_x();
    const y = pos.get_y();
    const { w, h } = this;
    this.box = new PIXI.Graphics();
    const color = `0x${Math.random().toString(16).slice(2,8)}`;
    this.box.lineStyle(3, 0x000000);
    this.box.beginFill(color)
      .drawRect(-this.w / 2, -this.h, w, h * 2)
      .endFill();
    this.box.beginFill(color).drawCircle(0, -this.h, w * 0.75).endFill();
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

export default MultiShape;


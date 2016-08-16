import Box from './box';
// 時計回りで、凸型のみ
const points = [
  { x: -15, y: -5 },
  { x: 15, y: -5 },
  { x: 15, y: 0 },
  { x: 0, y: 9 },
  { x: -11.5, y: 9 }
]
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
 * Polygon extends Box
 */
class Polygon extends Box{
  createBody(){
    // bodyを生成
    const bd = new Box2D.b2BodyDef();
    bd.set_type(Box2D.b2_dynamicBody);
    const pos = new Box2D.b2Vec2(this.x, this.y);
    bd.set_position(pos);
    this.body = this.world.CreateBody(bd);
    // shapeを生成
    const vertices = points.map((p) => new Box2D.b2Vec2(p.x, p.y));
    const shape = new createPolygonShape(vertices);
    this.body.CreateFixture(shape, 1);

  }

  drawShape(){
    const pos = this.body.GetPosition();
    const x = pos.get_x();
    const y = pos.get_y();
    const { w } = this;
    this.box = new PIXI.Graphics();
    const color = `0x${Math.random().toString(16).slice(2,8)}`;
    // const { w, h } = this;
    const rPoints = points.slice(0);
    rPoints.reverse();
    this.box.beginFill(color).moveTo(-rPoints[0].x, rPoints[0].y);
    for(let i = 1, len = rPoints.length; i < len; i++) {
      const p = rPoints[i];
      this.box.lineTo(-p.x, p.y);
    }
    // points.forEach((p) => { });
    this.box.endFill();
    // this.box.pivot.set(17.5, 20);
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

export default Polygon;

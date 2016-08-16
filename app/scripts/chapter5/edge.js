function createChainShape(vertices, closedLoop) {
  var shape = new Box2D.b2ChainShape();
  var buffer = Box2D.allocate(vertices.length * 8, 'float', Box2D.ALLOC_STACK);
  var offset = 0;
  for (var i=0;i<vertices.length;i++) {
    Box2D.setValue(buffer+(offset), vertices[i].get_x(), 'float'); // x
    Box2D.setValue(buffer+(offset+4), vertices[i].get_y(), 'float'); // y
    offset += 8;
  }
  var ptr_wrapped = Box2D.wrapPointer(buffer, Box2D.b2Vec2);
  if ( closedLoop )
    shape.CreateLoop(ptr_wrapped, vertices.length);
  else
    shape.CreateChain(ptr_wrapped, vertices.length);
  return shape;
}
/**
 *
 * Edge
 */
class Edge{
  constructor(renderer, world){
    this.renderer = renderer;
    this.world = world;
    const { width, height } = this.renderer.renderer;

    // bodyを生成
    const bd = new Box2D.b2BodyDef();
    this.body = this.world.CreateBody(bd);

    this.points = [
      { x:0, y: height / 2 + 150 },
      { x:width / 2, y: height / 2 + 150 },
      { x:width, y: height / 2 },
      { x:width, y: height },
      { x:0, y: height }
    ];
    const vertices = this.points.map((p) => new Box2D.b2Vec2(p.x, p.y));
    const chain = createChainShape(vertices);
    // chain.CreateChain(vertices, vertices.length);
    // fixtureでshapeをattach
    const fd = new Box2D.b2FixtureDef();
    fd.set_shape(chain);
    fd.set_density(1);
    fd.set_friction(0.3);
    fd.set_restitution(0.5);
    this.body.CreateFixture(fd);

    this.drawEdge();
  }

  drawEdge(){
    // const { w, h } = this;
    this.edge = new PIXI.Graphics();
    this.edge.beginFill(0x260A0E).moveTo(0, 0);

    this.points.forEach((p) => {
      this.edge.lineTo(p.x, p.y);
    });
    this.edge.endFill();
    // this.edge.pivot.set(w / 2, h / 2);
    this.renderer.append(this.edge);
  }
}

export default Edge;

/**
 * Board
 */
class Board{
  constructor(renderer, world, x, y, w, h){
    this.renderer = renderer;
    this.world = world;
    this.w = w;
    this.h = h;
    console.log(x, y);
    // body, shape, fixtureを生成
    const bd = new Box2D.b2BodyDef();
    bd.set_type(Box2D.b2_staticBody);
    bd.set_position(new Box2D.b2Vec2(x, y));
    this.body = this.world.CreateBody(bd);
    const ps = new Box2D.b2PolygonShape();
    ps.SetAsBox(this.w / 2, this.h / 2);
    this.body.CreateFixture(ps, 1);
    this.createBoard();
  }

  createBoard(){
    const pos = this.body.GetPosition();
    const x = pos.get_x();
    const y = pos.get_y();
    const { w, h } = this;
    this.board = new PIXI.Graphics();
    this.board.beginFill(0x745D37).drawRect(0, 0, w, h).endFill();
    this.board.pivot.set(w / 2, h / 2);
    this.board.position.set(x, y);
    this.renderer.append(this.board);
  }
}

export default Board;

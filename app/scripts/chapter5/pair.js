import _ from 'lodash';
import Circle from './circle';

function copyVec2(vec) {
  return new Box2D.b2Vec2(vec.get_x(), vec.get_y());
}

/**
 * Pair
 */
class Pair{
  constructor(renderer, world, x, y){
    this.renderer = renderer;
    this.world = world;
    this.x = x;
    this.y = y;
    this.p1 = new Circle(renderer, world, x, y);
    this.p2 = new Circle(renderer, world, x + _.random(-50, 50), y + _.random(-50, 50));
    const djd = new Box2D.b2DistanceJointDef();
    djd.set_bodyA(this.p1.body);
    djd.set_bodyB(this.p2.body);
    const wpA = copyVec2(this.p1.body.GetWorldPoint(djd.get_localAnchorA()));
    const wpB = copyVec2(this.p2.body.GetWorldPoint(djd.get_localAnchorB()));
    const d = new Box2D.b2Vec2( wpB.get_x() - wpA.get_x(), wpB.get_y() - wpA.get_y() );
    djd.set_length(d.Length());
    djd.set_frequencyHz(0);
    djd.set_dampingRatio(0);
    const dj = this.world.CreateJoint(djd);
    this.createLine();
  }

  createLine(){
    this.line = new PIXI.Graphics();
    this.line.beginFill(0x000000)
      .moveTo(0, 0)
      .lineTo(0, 0)
      .endFill();
    this.renderer.append(this.line);
  }

  display(){
    const p1Pos = this.p1.body.GetPosition();
    const p2Pos = this.p2.body.GetPosition();
    this.line.clear();
    this.line.lineStyle(3);
    this.line.moveTo(p1Pos.get_x(), p1Pos.get_y())
      .lineTo(p2Pos.get_x(), p2Pos.get_y());
    this.p1.display();
    this.p2.display();
  }
}

export default Pair;

/**
 * Spring
 */
class Spring{
  constructor(renderer, world){
    this.renderer = renderer;
    this.world = world;
    this.mouseJoint = null;
    this.drawLine();
  }

  drawLine(){
    this.line = new PIXI.Graphics();
    this.line.beginFill(0x000000)
      .moveTo(0, 0)
      .lineTo(0, 0)
      .endFill();
    this.renderer.append(this.line);
  }

  // マウスポインタの位置を設定
  update(x, y){
    if(this.mouseJoint){
      const mouseWorld = new Box2D.b2Vec2(x, y);
      this.mouseJoint.SetTarget(mouseWorld);
    }
  }

  display(){
    if(this.mouseJoint){
      const v1 = this.mouseJoint.GetAnchorA();
      // const v2 = this.mouseJoint.GetAnchorB();
      const v2 = this.box.body.GetPosition();
      this.line.clear();
      this.line.lineStyle(3)
        .moveTo(v1.get_x(), v1.get_y())
        .lineTo(v2.get_x(), v2.get_y());
    }
  }

  bind(x, y, box){
    this.box = box;
    const md = new Box2D.b2MouseJointDef();
    const mouseJointGroundBody = this.world.CreateBody(new Box2D.b2BodyDef());
    md.set_bodyA(mouseJointGroundBody);
    md.set_bodyB(box.body);
    md.set_target(new Box2D.b2Vec2(x, y));
    md.set_maxForce(1000.0 * box.body.GetMass());
    md.set_frequencyHz(5.0);
    md.set_dampingRatio(0.9);
    this.mouseJoint = Box2D.castObject(this.world.CreateJoint(md), Box2D.b2MouseJoint);
  }

  destroy(){
    if(this.mouseJoint){
      this.world.DestroyJoint(this.mouseJoint);
      this.mouseJoint = null;
      this.line.clear();
    }
  }
}

export default Spring;

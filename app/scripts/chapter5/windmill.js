import Box from './box';
/**
 * Windmill
 */
class Windmill{
  constructor(renderer, world, x, y){
    this.renderer = renderer;
    this.world = world;
    this.x = x;
    this.y = y;

    this.box1 = new Box(renderer, world, x, y - 20, 120, 10, false);
    this.box2 = new Box(...arguments, 10, 40, true);
    const rjd = new Box2D.b2RevoluteJointDef();
    rjd.Initialize(this.box1.body, this.box2.body, this.box1.body.GetWorldCenter());
    // rjd.set_enableMotor(false);
    // rjd.set_motorSpeed(Math.PI);
    // rjd.set_maxMotorTorque(0.0);
    rjd.set_enableLimit(true);
    rjd.set_lowerAngle(-Math.PI/8);
    rjd.set_upperAngle(Math.PI/8);
    this.joint = this.world.CreateJoint(rjd);

    const anchor = this.box1.body.GetWorldCenter();
    this.anchor = new PIXI.Graphics();
    this.anchor.beginFill(0x000000).drawCircle(anchor.get_x(), anchor.get_y(), 5).endFill();
    this.renderer.append(this.anchor);
  }

  toggleMotor(){
  }

  motorOn(){
    return this.joint.IsMotorEnabled();
  }

  display(){
    this.box1.display();
    this.box2.display();
  }
}

export default Windmill;

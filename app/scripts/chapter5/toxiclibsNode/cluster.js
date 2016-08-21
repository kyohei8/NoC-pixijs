import toxi from 'toxiclibsjs';
import Node from './node';
/**
 * Cluster
 */
class Cluster{
  constructor(renderer, physics, n, diameter, center){
    this.renderer = renderer;
    this.physics = physics;
    this.nodes = [];
    this.diameter = diameter;
    for (var i = 0; i < n; i++) {
      this.nodes.push(
        new Node(renderer, center.add(toxi.geom.Vec2D.randomVector()))
      );
    }

    this.lines = [];
    this.nodes.forEach((n, i) => {
      const innerLine = [];
      for(let j = 0; j < i; j++){
        const prev = this.nodes[j];
        this.physics.addSpring(
          new toxi.physics2d.VerletSpring2D(n, prev, this.diameter, 0.01)
        );
        const line = new PIXI.Graphics();
        line.alpha = 0.2;
        this.renderer.append(line);
        innerLine.push(line);
      }
      this.lines.push(innerLine);
    });
  }

  display(){

    this.nodes.forEach((n, i) => {
      for(let j = 0; j < i; j++){
        const prev = this.nodes[j];
        const line = this.lines[i][j];
        line.clear().lineStyle(2, 0x666666).moveTo(n.x, n.y).lineTo(prev.x, prev.y);
      }
    });
    this.nodes.forEach((n) => {
      n.display();
    });
  }

}

export default Cluster;

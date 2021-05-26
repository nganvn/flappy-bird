import Action from '../action/action';
import { v2, Vec2 } from '../utils';
export default abstract class Subject {
  protected position: Vec2;
  protected color: string;
  protected action: Action;
  protected velocity: Vec2;
  protected force: Vec2;

  constructor() {
    this.position = v2(0,0);
    this.color = 'black';
    this.action = null;
    this.velocity = v2(0,0);
    this.force = v2(0,0);
  }

  setPosition(position: Vec2): void {
    this.position = position;
  }

  getPosition(): Vec2 {
    return this.position;
  }

  setColor(color: string): void {
    this.color = color;
  }

  getColor(): string {
    return this.color;
  }

  update(dt: number): void {
    this.position.y += this.velocity.y*dt + this.force.y*dt*dt/2; 
    this.velocity.y += this.force.y*dt;
  }

  render(): void {

  }

  runAction(dt: number) {
    if (!this.action || this.action.isEndAction()) {
      this.action = null;
      return;
    }
    this.position.add(this.action.getDtv2(dt));
  }

  addAction(action: Action) {
    this.action = action;
  }

  setVelocity(velocity: Vec2) {
    this.velocity = velocity;
  }

  addVelocity(velocity: Vec2) {
    this.velocity.add(velocity);
  }
  
  getVelocity(): Vec2 {
    return this.velocity;
  }

  addForce(f: Vec2) {
    this.force.add(f);
  }

  getForce(): Vec2 {
    return this.force;
  }
}


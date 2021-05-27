import Action from '../action/action';
import { v2, Vec2 } from '../utils';
export default abstract class Subject {
  protected name: string;
  protected position: Vec2;
  protected angle: number;
  protected color: string;
  protected action: Action;
  protected velocity: Vec2;
  protected force: Vec2;

  constructor() {
    this.name = "";
    this.position = v2(0,0);
    this.color = 'black';
    this.action = null;
    this.velocity = v2(0,0);
    this.force = v2(0,0);
    this.angle = 0;
  }

  checkClick(vec: Vec2): boolean {
    return false;
  }

  setName(name: string) {
    this.name = name;
  }

  getName(): string {
    return this.name;
  }

  setPosition(position: Vec2): void {
    this.position = position;
  }

  getPosition(): Vec2 {
    return this.position;
  }

  translate(vec: Vec2) {
    this.position.x += vec.x;
    this.position.y += vec.y;
  }

  setColor(color: string): void {
    this.color = color;
  }

  getColor(): string {
    return this.color;
  }

  update(dt: number): void {
    this.position.x += this.velocity.x*dt;
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

  setForce(f: Vec2) {
    this.force = f;
  }

  getForce(): Vec2 {
    return this.force;
  }
}


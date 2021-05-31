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

  public addAction(action: Action): void {
    this.action = action;
  }
  
  public checkClick(vec: Vec2): boolean {
    return false;
  }

  public translate(vec: Vec2) {
    this.position.x += vec.x;
    this.position.y += vec.y;
  }

  public update(dt: number): void {
    this.position.x += this.velocity.x*dt;
    this.position.y += this.velocity.y*dt + this.force.y*dt*dt/2; 
    this.velocity.y += this.force.y*dt;
  }

  public render(): void {

  }

  public runAction(dt: number): void {
    if (!this.action || this.action.isEndAction()) {
      this.action = null;
      return;
    }
    
    
    if (this.action.isRotation()) {
      this.angle += this.action.getDtAngle(dt);
    } else {
      this.position.add(this.action.getDtv2(dt));
    }
  }
  
  // get, set
  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getPosition(): Vec2 {
    return this.position;
  }

  public setPosition(position: Vec2): void {
    this.position = position;
  }

  public getAngle(): number {
    return this.angle;
  }

  public setAngle(angle: number): void {
    this.angle = angle;
  }

  public getColor(): string {
    return this.color;
  }

  public setColor(color: string): void {
    this.color = color;
  }

  public getVelocity(): Vec2 {
    return this.velocity;
  }

  public setVelocity(velocity: Vec2): void {
    this.velocity = velocity;
  }

  public addVelocity(velocity: Vec2): void {
    this.velocity.add(velocity);
  }
  
  public addForce(f: Vec2): void {
    this.force.add(f);
  }

  public getForce(): Vec2 {
    return this.force;
  }
  
  public setForce(f: Vec2): void {
    this.force = f;
  }

}


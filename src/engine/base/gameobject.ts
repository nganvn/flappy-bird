import Action from '../action/action';
import { Vec2, v2 } from '../utils';

export default abstract class GameObject {
  protected name: string = '';

  protected position: Vec2 = v2(0,0);
  protected angle: number = 0;
  
  protected velocity: Vec2 = v2(0,0);
  protected force: Vec2 = v2(0,0);
  protected action: Action = null;
  private visible: boolean = true;

  
  public translate(x: number, y: number) {
    this.position.x += x;
    this.position.y += y;
  }

  public rotate(angle: number) {
    this.angle += angle;
  }

  public update(dt: number): void {
    this.position.x += this.velocity.x*dt;
    this.position.y += this.velocity.y*dt + this.force.y*dt*dt/2; 
    this.velocity.y += this.force.y*dt;
    // this.runAction(dt);
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
  
  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getPosition(): Vec2 {
    return this.position;
  }

  public setPosition(x: number, y: number): void {
    this.position.x = x;
    this.position.y = y;
  }

  public getAngle(): number {
    return this.angle;
  }

  public setAngle(angle: number): void {
    this.angle = angle;
  }

  public getVelocity(): Vec2 {
    return this.velocity;
  }

  public setVelocity(x: number, y: number): void {
    this.velocity.x = x;
    this.velocity.y = y;
  }

  public addVelocity(x: number, y: number): void {
    this.velocity.add(v2(x, y));
  }

  public getForce(): Vec2 {
    return this.force;
  }  

  public setForce(x: number, y: number): void {
    this.force.x = x;
    this.force.y = y;
  }
  
  public addForce(x: number, y: number): void {
    this.force.add(v2(x, y));
  }

  public addAction(action: Action): void {
    this.action = action;
  }

  public removeAction(): void {
    this.action = null;
  }
  
  public isVisible(): boolean {
    return this.visible;
  }
  
  public setVisible(value: boolean) {
    this.visible = value;
  }
}
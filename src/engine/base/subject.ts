import { Vec2, v2 } from '../utils';
import Action from '../action/action';
export default abstract class Subject {
  position: Vec2;
  color: string;
  action: Action;

  constructor() {
    this.position = v2(0,0);
    this.color = 'black';
    this.action = null;
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


  abstract update(dt: number): void;
  abstract render(): void;

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

}


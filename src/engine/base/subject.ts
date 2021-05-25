import { Vec2, v2 } from '../ultis';
export default abstract class Subject {
  position: Vec2;
  color: string;

  constructor() {
    this.position = v2(0,0);
    this.color = 'black';
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
  
}


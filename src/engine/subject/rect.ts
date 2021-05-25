import Subject from '../base/subject';
import Game from '../game';
import { Vec2, Size} from '../ultis';
export default class Rectangle extends Subject {
  size: Size;
  
  constructor(size: Size) {
    super();
    this.size = size;
  }

  setColor(color: string): void {
    this.color = color;
  }

  getColor(): string {
    return this.color;
  }

  update(dt: number): void {

  }

  render(): void {
    let ctx = Game.getInstance().getCtx();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
  } 

}
import Subject from '../base/subject';
import Game from '../game';
import { Vec2, Size} from '../utils';
export default class Rectangle extends Subject {
  size: Size;
  
  constructor(size: Size) {
    super();
    this.size = size;
  }

  setSize(size: Size) {
    this.size = size;
  }

  getSize(): Size {
    return this.size;
  }

  // update(dt: number): void {

  // }

  render(): void {
    let ctx = Game.getInstance().getCtx();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
  } 

}
import Subject from '../base/subject';
import Game from '../game';
import { Vec2, Size, size} from '../utils';
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

  scale(s: number) {
    this.setSize(size(this.getSize().width * s, this.getSize().height * s));
  }

  // update(dt: number): void {

  // }

  render(): void {
    let ctx = Game.getInstance().getCtx();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
  }

  checkClick(vec: Vec2): boolean {
    let x = vec.x - this.position.x;
    let y = vec.y - this.position.y;
    if (x >= 0 && y >= 0 && x <= this.size.width && y <= this.size.height ) {
      return true;
    }
    return false;
  }

}
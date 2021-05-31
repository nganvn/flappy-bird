import Subject from '../base/subject';
import Game from '../game';
import { Vec2, Size, size} from '../utils';
export default class Rectangle extends Subject {
  protected size: Size;
  
  constructor(size: Size) {
    super();
    this.size = size;
  }


  public scale(s: number): void {
    this.setSize(size(this.getSize().width * s, this.getSize().height * s));
  }

  public render(): void {
    let ctx = Game.getInstance().getCtx();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
  }

  public checkClick(vec: Vec2): boolean {
    let x = vec.x - this.position.x;
    let y = vec.y - this.position.y;
    if (x >= 0 && y >= 0 && x <= this.size.width && y <= this.size.height ) {
      return true;
    }
    return false;
  }

  public getSize(): Size {
    return this.size;
  }

  public setSize(size: Size): void {
    this.size = size;
  }
}
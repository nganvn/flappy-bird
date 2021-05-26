import Subject from '../base/subject';
import Game from '../game';
import { Vec2, Size } from '../utils';
export default class Label extends Subject {
  text: string;
  font: string;
  
  constructor(text: string) {
    super();
    this.text = text;
    this.font = '40px Gotham, Helvetica Neue, sans-serif';
  }

  setFont(font: string) {
    this.font = font;
  }

  setText(text: string) {
    this.text = text;
  }

  update(dt: number): void {
  }

  render(): void {
    let ctx = Game.getInstance().getCtx();
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(this.text, this.position.x, this.position.y);
  } 

}
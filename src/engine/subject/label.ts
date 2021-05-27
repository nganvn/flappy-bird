import Subject from '../base/subject';
import Game from '../game';
export default class Label extends Subject {
  text: string;
  font: string;
  align: string;
  
  constructor(text: string) {
    super();
    this.text = text;
    this.font = '40px Gotham, Helvetica Neue, sans-serif';
    this.align = 'left';
  }

  setFont(font: string) {
    this.font = font;
  }
  
  setAlign(align: string) {
    this.align = align;
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
    
    ctx.textAlign = <CanvasTextAlign>this.align;
    ctx.fillText(this.text, this.position.x, this.position.y);
  } 

}
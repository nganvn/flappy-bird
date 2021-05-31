import Subject from '../base/subject';
import Game from '../game';
export default class Label extends Subject {
  protected text: string;
  protected font: string;
  protected align: string;
  
  constructor(text: string) {
    super();
    this.text = text;
    this.font = '40px Gotham, Helvetica Neue, sans-serif';
    this.align = 'left';
  }

  public setFont(font: string) {
    this.font = font;
  }
  
  public setAlign(align: string) {
    this.align = align;
  }

  public setText(text: string) {
    this.text = text;
  }

  public update(dt: number): void {

  }

  public render(): void {
    let ctx = Game.getInstance().getCtx();
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    
    ctx.textAlign = <CanvasTextAlign>this.align;
    ctx.fillText(this.text, this.position.x, this.position.y);
  } 

}
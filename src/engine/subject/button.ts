import Game from '../game';
import { size, v2 } from '../utils';
import Rectangle from './rect';
export default class Button extends Rectangle{
  private text: string;
  private font: string;

  constructor(text: string) {
    super(size(text.length*20, 60));
    this.text = text;
    this.font = '40px Gotham, Helvetica Neue, sans-serif';
  }

  public setFont(font: string): void {
    this.font = font;
  }

  public setText(text: string): void {
    this.text = text;
  }
  
  public render(): void {
    super.render();
    let ctx = Game.getInstance().getCtx();
    ctx.font = this.font;
    ctx.fillStyle = 'white';
    ctx.textAlign = "center";
    ctx.fillText(this.text, this.position.x + this.size.width/2 - 5, this.position.y + 45);
  } 
}
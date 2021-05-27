import Game from '../game';
import { size, v2 } from '../utils';
import Rectangle from './rect';
export default class Button extends Rectangle{
  text: string;
  font: string;

  constructor(text: string) {
    super(size(text.length*20, 60));
    this.text = text;
    this.font = '40px Gotham, Helvetica Neue, sans-serif';
  }

  setFont(font: string) {
    this.font = font;
  }

  setText(text: string) {
    this.text = text;
  }
  
  render(): void {
    super.render();
    let ctx = Game.getInstance().getCtx();
    ctx.font = this.font;
    ctx.fillStyle = 'white';
    ctx.textAlign = "center";
    ctx.fillText(this.text, this.position.x + this.size.width/2 - 5, this.position.y + 45);

  } 


}
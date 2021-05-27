import Subject from '../base/subject';
import Game from '../game';
import { size } from '../utils';
import Rectangle from './rect';
export default class Sprite extends Rectangle {
  image: HTMLImageElement;
  constructor(src: string) {
    super(size(0,0));

    this.image = new Image();
    this.image.src = src
    this.setSize(size(this.image.width, this.image.height));
  }

  render(): void {
    let ctx = Game.getInstance().getCtx();
    ctx.drawImage(this.image, this.position.x, this.position.y, this.getSize().width, this.getSize().height);
  }
}
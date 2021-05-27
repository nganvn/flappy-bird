import Subject from '../base/subject';
import Game from '../game';
import { size, Size } from '../utils';
import Rectangle from './rect';
import Animation from '../action/animation';
export default class Sprite extends Rectangle {
  image: HTMLImageElement;
  animation: Animation;

  constructor(src: string, size: Size) {
    super(size);

    this.image = new Image();
    this.image.src = src;
    this.animation = null;
  }

  addAnimation(ani: Animation) {
    this.animation = ani;
  }

  render(): void {
    let ctx = Game.getInstance().getCtx();
    if (this.animation && this.animation.isRunning()) {
      ctx.drawImage(this.animation.getFrame(), this.position.x, this.position.y, this.getSize().width, this.getSize().height);
    } else {
      ctx.drawImage(this.image, this.position.x, this.position.y, this.getSize().width, this.getSize().height);
    }
  }

  update(dt: number): void{
    super.update(dt);
    if (this.animation &&  this.animation.isRunning()) {
      this.animation.update(dt);
    }
  }
}
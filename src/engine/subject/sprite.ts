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
    ctx.save();
    
    ctx.translate(this.getPosition().x + this.getSize().width/2, this.getPosition().y + this.getSize().height/2);
    ctx.rotate(Math.PI * this.angle / 180);

    if (this.animation && this.animation.isRunning()) {
      ctx.drawImage(this.animation.getFrame(), -this.getSize().width/2, -this.getSize().height/2, this.getSize().width, this.getSize().height);
    } else {
      ctx.drawImage(this.image, -this.getSize().width/2, -this.getSize().height/2, this.getSize().width, this.getSize().height);
    }
    

    ctx.restore();
  }

  update(dt: number): void{
    super.update(dt);
    if (this.animation &&  this.animation.isRunning()) {
      this.animation.update(dt);
    }
  }
}
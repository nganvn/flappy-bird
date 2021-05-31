import Subject from '../base/subject';
import Game from '../game';
import { size, Size, Vec2 } from '../utils';
import Rectangle from './rect';
import Animation from '../action/animation';
export default class Sprite extends Rectangle {
  protected image: HTMLImageElement;
  protected animation: Animation;

  constructor(image: HTMLImageElement) {
    super(size(image.width, image.height));
    this.image = image;
    this.animation = null;
  }

  public addAnimation(ani: Animation) {
    this.animation = ani;
  }

  public getSize(): Size {
    return size(this.image.width, this.image.height);
  }

  public render(): void {

    let ctx = Game.getInstance().getCtx();
    ctx.save();
    
    ctx.translate(this.getPosition().x + this.image.width/2, this.getPosition().y + this.image.height/2);
    ctx.rotate(Math.PI * this.angle / 180);

    if (this.animation && this.animation.isRunning()) {
      ctx.drawImage(this.animation.getFrame(), -this.image.width/2, -this.image.height/2, this.image.width, this.image.height);
    } else {  
      ctx.drawImage(this.image, -this.image.width/2, -this.image.height/2, this.image.width, this.image.height);
    }
  
    ctx.restore();
  }

  public update(dt: number): void{
    super.update(dt);
    if (this.animation &&  this.animation.isRunning()) {
      this.animation.update(dt);
    }
  }
}
import RenderableObject from '../base/renderableobject';
import { size, Size } from '../utils';
export default class Sprite extends RenderableObject {
  public type: string = Sprite.name;;

  protected image: HTMLImageElement = null;
  protected animation: Animation = null;

  // method
  public getImage(): HTMLImageElement {
    return this.image;
  }

  public setImage(image: HTMLImageElement): void {
    this.image = image;
  }

  public getSize(): Size {
    return size(this.image.width, this.image.height);
  }

  public static create(image: HTMLImageElement): Sprite {
    let sprite = new Sprite();
    sprite.image = image;
    return sprite;
  }
}
import RenderableObject from '../base/renderableobject';
import Rectangle from '../gameobject/rectangle';
import { Size } from '../utils';
import Label from '../gameobject/label';
import Sprite from '../gameobject/sprite';

export default class Renderer {
  private ctx: CanvasRenderingContext2D;
  private fontDefault: string;

  private static _instance: Renderer;

  private constructor() {
    let canvas = <HTMLCanvasElement>document.getElementById('canvas');
    this.ctx = canvas.getContext("2d");;
    this.fontDefault = '30px Arial';
  }

  public setCtx(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  public static getInstance(): Renderer{
    if (!Renderer._instance) {
      Renderer._instance = new Renderer();
    }
    return Renderer._instance;
  }

  public draw(objects: Array<RenderableObject>) {
    objects.forEach((object) => {
      this.drawOne(object);
    });
  }

  public drawOne(object: RenderableObject): void {
    if (!object) {
      return;
    }

    let ctx = this.ctx;
    ctx.save();
    ctx.translate(object.getPosition().x, object.getPosition().y);

    if (object.getAngle() != 0) {
      ctx.rotate(Math.PI * object.getAngle() / 180);
    }

    switch (object.type) {
      case Rectangle.name:
        let rect = object as Rectangle;
        this.drawRectangle(rect.getColor(), rect.getSize());
        break;
      case Sprite.name:
        let sprite = object as Sprite;
        this.drawImage(sprite.getImage());
        break;
      case Label.name:
        let text = object as Label;
        this.drawText(text.getText(), text.getColor(), text.getFont(), text.getAlign());
        break;
      default:     
    }

    ctx.restore();
  }

  public drawImage(image: HTMLImageElement): void {
    this.ctx.drawImage(image, - image.width / 2, - image.height / 2);
  }

  public drawRectangle(color: string, size: Size): void {
    this.ctx.fillStyle = color; 
    this.ctx.fillRect(- size.width / 2, - size.height / 2, size.width, size.height);
  }

  public drawText(text: string, color: string, font: string, align: string): void {
    this.ctx.font = font;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = <CanvasTextAlign>align;
    this.ctx.fillText(text, 0, 0);
  }
}
import RenderableObject from '../base/renderableobject';
import { Size, size } from '../utils';
export default class Rectangle extends RenderableObject {
  public readonly type: string = Rectangle.name;

  protected color: string = 'black';
  protected size: Size = size(0, 0);

  // method
  public static create(width: number, height: number) {
    let rectangle = new Rectangle();
    rectangle.setSize(width, height);
    return rectangle;
  }

  public scale(x: number, y: number): void {
    this.setSize(this.getSize().width * x, this.getSize().height * y);
  }

  // getter, setter
  public getSize(): Size {
    return this.size;
  }

  public setSize(width: number, height: number): void {
    this.size.width = width;
    this.size.height = height;
  }

  public getColor(): string {
    return this.color;
  }

  public setColor(color: string): void {
    this.color = color;
  }
}
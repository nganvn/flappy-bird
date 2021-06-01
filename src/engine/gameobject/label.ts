import RenderableObject from '../base/renderableobject';
export default class Label extends RenderableObject {
  public readonly type: string = Label.name; 
  protected text: string = '';
  protected color: string = 'black';
  protected font: string = '24px Arial';
  protected align: string = 'left';
  
  
  public static create(text: string) {
    let label = new Label();
    label.text = text;
    return label;
  }


  // getter, setter
  public getText(): string {
    return this.text;
  }

  public setText(text: string) {
    this.text = text;
  }

  public getColor(): string {
    return this.color;
  }

  public setColor(color: string): void {
    this.color = color;
  }

  public getFont(): string {
    return this.font;
  }
  
  public setFont(font: string) {
    this.font = font;
  }
  
  public getAlign(): string {
    return this.align;
  }
  
  public setAlign(align: string) {
    this.align = align;
  }
}
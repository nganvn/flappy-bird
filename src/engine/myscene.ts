import Action from './action/action';
import game from './game';
import Game from './game';
import Scene from './scene';
import { size, v2 } from './utils';
import Rectangle from './subject/rect';
import Label from './subject/label';
import Subject from './base/subject';
export default class MyScene extends Scene {
  hello: Label;
  rect: Rectangle;

  private isKeydown = false;

  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;

  private isRunning: boolean;

  constructor() {
    
    super();
  }

  setup() {
    let game = Game.getInstance();
    
    this.ctx = game.getCtx();
    this.canvas = game.getCanvas()

    let screenSize = game.getCanvas();
 
  
    let rectSize = size(40,40);
    let rect = new Rectangle(rectSize);
    rect.setPosition(v2(screenSize.width/2 - rectSize.width/2, screenSize.height/2 - rectSize.height/2));
    
    let jumpAction = Action.jumpBy(v2(0, -200), 2);
    let moveAction = Action.moveBy(v2(0, -200), 0.5);
    // rect.addAction(new Sequence(jumpAction, moveAction));
    rect.setVelocity(v2(0,-400));
    rect.addForce(v2(0, 1200));
  
    let hello = new Label("Hello World");
    hello.setPosition(rect.getPosition().plus(v2(-48, 200)));
    hello.setColor('red');
    
    this.add(rect);
    this.add(hello);

    this.rect = rect;

    this.hello = hello;
    this.canvas.addEventListener('mousedown', this.clickEvent, false);
  }

  private clickEvent = (event: any) : void => {
    console.log("Click");
    // if (Game.getInstance().getCanvas().height < this.rect.getPosition().y - this.rect.getSize().height) {
      this.rect.setVelocity(v2(0,-400));
    // } 
  }


  update(dt: number) {
    
    if (Game.getInstance().getCanvas().height <= this.rect.getPosition().y + this.rect.getSize().height) {
      this.rect.setForce(v2(0,0));
      this.rect.setVelocity(v2(0,0));
    }

    super.update(dt);
  }




}
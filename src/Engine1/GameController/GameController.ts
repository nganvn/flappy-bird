import Scene from '../Scene';
import Renderer from '../Renderer/Renderer';
import EventHandler from '../EventHandler/EventHandler';
export default class GameController{
  private static _instance: GameController;
  
  private canvas: HTMLCanvasElement;

  private renderer: Renderer;
  private eventHandler: EventHandler;
  
  private scene: Scene;

  private previous: Date;
  private loopEvent: any;

  private constructor() {
    this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
    this.renderer = Renderer.getInstance();
    this.eventHandler = EventHandler.getInstance();
    this.previous = new Date();
  }

  public runWithScene(scene: Scene): void {
    this.scene = scene;
  }

  public start(): void {
    this.loopEvent = window.requestAnimationFrame(() => this.gameLoop());
  }

  public pause(): void {
    window.cancelAnimationFrame(this.loopEvent);
  }

  private gameLoop(): void {
    let current = new Date();
    let elapsed = (current.getTime() - this.previous.getTime()) / 1000;
    this.previous = current;

    // loop process
    this.eventHandler.handle();
    this.scene.update(elapsed);
    this.renderer.draw(this.scene.getAllVisibleObjects());

    this.loopEvent = window.requestAnimationFrame(() => this.gameLoop());
  }

  public static getInstance(): GameController{
    if (!GameController._instance) {
      GameController._instance = new GameController();
    }
    return this._instance;
  }

  public getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

}
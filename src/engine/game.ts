import Scene from './scene';

export default class Game{
  private static instance: Game;

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private constructor(width:number, height:number) {
    this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext("2d");
  }

  public static getInstance(): Game{
    if (!Game.instance) {
      Game.instance = new Game(288, 512);
    }
    return this.instance;
  }

  public runWithSence(scene: Scene): void {
    setTimeout(() => self.requestAnimationFrame(() => scene.start()), 500);
  }

  public getCtx(): CanvasRenderingContext2D{
    return this.ctx;
  }

  public getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

}
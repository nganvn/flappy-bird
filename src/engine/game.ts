import Scene from './scene';

export default class Game{
  
  private readonly _node: Array<Node> = new Array<Node>();
  private static instance: Game;

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private opacity: number = 100;
  private opacityInc: boolean = false;

  private isKeydown = false;
  public readonly scale = 800/512;

  private constructor(width:number, height:number) {
    this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext("2d");
  }

  public static getInstance(): Game{
    if (!Game.instance) {
      Game.instance = new Game(450, 800);
    }
    return this.instance;
  }

  private getRandomInt = (max: number): number => {
    return Math.floor(Math.random() * max);
  }

  runWithSence(scene: Scene): void {
    setTimeout(() => self.requestAnimationFrame(() => scene.start()), 500);
  }

  getCtx() {
    return this.ctx;
  }

  getCanvas() {
    return this.canvas;
  }

}
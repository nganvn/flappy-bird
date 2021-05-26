import Scene from './scene';

export default class Game{
  
  private readonly _node: Array<Node> = new Array<Node>();
  private static instance: Game;

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private opacity: number = 100;
  private opacityInc: boolean = false;

  private isKeydown = false;

  private constructor(width:number, height:number) {
    this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    console.log(this.canvas.width, this.canvas.height);
    
		this.canvas.addEventListener('click', this.clickEvent, false);
		window.addEventListener('keydown', this.keydown, false);
		window.addEventListener('keyup', this.keyup, false);
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

  private clickEvent = (event: any) : void => {
    console.log("Click");
    let r = this.getRandomInt(255);
    let g = this.getRandomInt(255);
    let b = this.getRandomInt(255);

    this.ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private keydown = (event: any) : void => {
    if (this.isKeydown) {
      return;
    }

    if (event.key != ' ') {
      return;
    }

    

    this.isKeydown = true;
    console.log("keydown", event);
    let r = this.getRandomInt(255);
    let g = this.getRandomInt(255);
    let b = this.getRandomInt(255);

    this.ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
  private keyup = (event: any) : void => {
    if (event.key != ' ') {
      return;
    }
    this.isKeydown = false;
    console.log("keyup", event);
    let r = this.getRandomInt(255);
    let g = this.getRandomInt(255);
    let b = this.getRandomInt(255);

    this.ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  runWithSence(scene: Scene): void {
    self.requestAnimationFrame(() => scene.update());
  }
  
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  getCtx() {
    return this.ctx;
  }

  getCanvas() {
    return this.canvas;
  }

}
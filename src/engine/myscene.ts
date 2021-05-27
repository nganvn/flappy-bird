import Action from './action/action';
import game from './game';
import Game from './game';
import Scene from './scene';
import { size, v2, Vec2 } from './utils';
import Rectangle from './subject/rect';
import Label from './subject/label';
import Sprite from './subject/sprite';

enum GameState {
	Await = 0,
	Playing,
	GameOver
}

class CONSTANT {
  public static readonly PIPEDELAY = 1600;
}


export default class MyScene extends Scene {
  private background: Rectangle;
  private ground: Rectangle;
  private ground1: Rectangle;

  private helper: Label;

  private score: Label;
  private bird: Rectangle;
  private intScore: number;
  private highScore: number;
  private isKeydown = false;

  private _pipes: Array<{pipeUp: Rectangle, pipeDown: Rectangle}>;
  private _cloud: Array<Rectangle>;

  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private gameState: GameState;

  private _appPipe: NodeJS.Timeout;
  private _addScore: NodeJS.Timeout;
  private _addCloud: NodeJS.Timeout;
  private _play: () => void;
  private _endGame: () => void;
  private scale: number = 800/512;

  constructor() {
    super();
    this.gameState = GameState.Await;
    this.intScore = 0;
    this.highScore = 0;
    this._pipes = new Array<{pipeUp: Rectangle, pipeDown: Rectangle}>();
    this._cloud = new Array<Rectangle>();
    
    let game = Game.getInstance();
    
    this.ctx = game.getCtx();
    this.canvas = game.getCanvas()
    this.gameState = GameState.Await;

  }

  initAwaitScreen() {
    let canvas = this.canvas;
    this.background = new Sprite('./sprites/background-day.png');
    this.background.scale(this.scale);

    this.ground = new Sprite('./sprites/base.png');
    this.ground.scale(this.scale);
    this.ground.setPosition(v2(0, canvas.height - this.ground.getSize().height));
    this.ground1 = new Sprite('./sprites/base.png');
    this.ground1.scale(this.scale);
    this.ground1.setPosition(v2(this.ground.getSize().width, canvas.height - this.ground.getSize().height));

    this.bird = new Sprite('./sprites/bluebird-upflap.png');
    this.bird.scale(this.scale);
    this.bird.setPosition(v2(canvas.width/4, canvas.height/2 - this.bird.getSize().height/2));


    this.helper = new Label("Tap to play");
    this.helper.setFont('60px Gotham, Helvetica Neue, sans-serif');
    this.helper.setPosition(v2(this.canvas.width/2, 200));
    this.helper.setColor('red');
    this.helper.setName("helper");
    this.helper.setAlign('center');


    this.add(this.background, 0);
    this.add(this.ground, 10);
    this.add(this.ground1, 10);
    this.add(this.bird, 20);
    this.add(this.helper, 60);
    
    // this._play = (): void => {this.play()};
    this.canvas.addEventListener('mousedown', this.play);
    this.gameState = GameState.Await;
    this.intScore = 0;
  }

  private play = (event: any) : void => {
    this.score = new Label("0");
    this.score.setFont('80px Gotham, Helvetica Neue, sans-serif');
    this.score.setPosition(v2(this.canvas.width/2, 140));
    this.score.setColor('red');
    this.score.setAlign('center');
    this.add(this.score, 30); 


    this.bird.setVelocity(v2(0,-400));
    this.bird.setForce(v2(0, 1200));

    this.ground.setVelocity(v2(-150, 0));
    this.ground1.setVelocity(v2(-150, 0));
    

    this.canvas.removeEventListener('mousedown', this.play);
    this._addScore = setTimeout(this.addScore, 3300);
    this._appPipe = setTimeout(() => this.addpipe(), 1000);
    // this._addCloud = setTimeout(() => this.addCloud(), 100);
    this.canvas.addEventListener('mousedown', this.clickEvent);
    this.gameState = GameState.Playing;
    this.removeByName('helper');
  }

  private replay = (event: any) : void => {
    this.removeAll();
    this.initAwaitScreen();
    this._pipes.splice(0, this._pipes.length);
    this._cloud.splice(0, this._cloud.length);
    this.canvas.removeEventListener('mousedown', this.replay);
  }

  private endGame = () : void => {
    this._pipes.forEach((item) => {
      item.pipeUp.setVelocity(v2(0,0));
      item.pipeDown.setVelocity(v2(0,0));
    });
    this._cloud.forEach((item) => {
      item.setVelocity(v2(0,0));
    });

    this.ground.setVelocity(v2(0,0));
    this.ground1.setVelocity(v2(0,0));

    clearTimeout(this._appPipe);
    clearTimeout(this._addScore);
    clearTimeout(this._addCloud);
    this.gameState = GameState.GameOver;
    
    this.canvas.removeEventListener('mousedown', this.clickEvent);
    setTimeout(() => this.canvas.addEventListener('mousedown', this.replay), 1500);

    let gameOver = new Label("Game Over");
    gameOver.setFont('60px Gotham, Helvetica Neue, sans-serif');
    gameOver.setPosition(v2(this.canvas.width/2, 200));
    gameOver.setColor('blue');
    gameOver.setName("helper");
    gameOver.setAlign('center');

    let highScoreLabel = new Label("Highscore: " + this.highScore);

    if (this.intScore > this.highScore) {
      this.highScore = this.intScore;
      highScoreLabel.setText("New Highscore: " + this.highScore)
    }

    highScoreLabel.setFont('50px Gotham, Helvetica Neue, sans-serif');
    highScoreLabel.setPosition(v2(this.canvas.width/2, 280));
    highScoreLabel.setColor('red');
    highScoreLabel.setName("helper");
    highScoreLabel.setAlign('center');

    let replayLable = new Label("Tap to replay");
    replayLable.setFont('60px Gotham, Helvetica Neue, sans-serif');
    replayLable.setPosition(v2(this.canvas.width/2, 400));
    replayLable.setColor('blue');
    replayLable.setName("helper");
    replayLable.setAlign('center');

    setTimeout(() => this.add(gameOver, 100), 200);
    setTimeout(() =>  this.add(highScoreLabel, 100), 600);
    setTimeout(() =>  this.add(replayLable, 100), 1000);

  }

  private addScore = () => {
    this.intScore++;
    this.score.setText("" + this.intScore);
    this._addScore = setTimeout(this.addScore, CONSTANT.PIPEDELAY);
  }

  private addpipe() {
    let randx = this.randomInt(220);

    let r = this.randomInt(100) + 50;
    let g = this.randomInt(100) + 50;
    let b = this.randomInt(100) + 50;
    
    // let pipeDown = new Rectangle(size(50, 500));
    // pipeDown.setColor(`rgb(${r}, ${g}, ${b})`);
    // pipeDown.setPosition(v2(450, -380 + randx ));
    // pipeDown.setVelocity(v2(-150, 0));

    // let pipeUp = new Rectangle(size(50, 500));
    // pipeUp.setColor(`rgb(${r}, ${g}, ${b})`);
    // pipeUp.setPosition(v2(450, 300 + randx));
    // pipeUp.setVelocity(v2(-150, 0));

    
    let pipeDown = new Sprite('./sprites/pipe-green-down.png');
    pipeDown.scale(this.scale);
    pipeDown.setPosition(v2(450, -380 + randx ));
    pipeDown.setVelocity(v2(-150, 0));

    let pipeUp = new Sprite('./sprites/pipe-green-up.png');
    pipeUp.scale(this.scale);
    pipeUp.setPosition(v2(450, 300 + randx));
    pipeUp.setVelocity(v2(-150, 0));

    // let action = Action.moveBy(v2(-600, 0), 4);

    // pipeDown.addAction(action);
    // pipeUp.addAction(action.clone());

    this.add(pipeDown, 2);
    this.add(pipeUp, 2);

    this._pipes.push({pipeUp:pipeUp, pipeDown:pipeDown});

    this._appPipe = setTimeout(() => this.addpipe(), CONSTANT.PIPEDELAY);
  }

  private addCloud() {
    let randx = this.randomInt(150);
    let cloud = new Sprite('./sprites/cloud.png');
    cloud.scale(Math.random() + 0.8)
    // cloud.setColor('rgb(222, 227, 226)');
    cloud.setPosition(v2(450, randx ))
    
    cloud.setVelocity(v2(-75, 0));
    this.add(cloud, 1);

    this._cloud.push(cloud);
    this._addCloud = setTimeout(() => this.addCloud(), CONSTANT.PIPEDELAY*2);

  }

  isRectCollieRect(rec1: Rectangle, rec2: Rectangle): boolean {
    let rec1Pos = rec1.getPosition();
    let rec1Size = rec1.getSize();

    let rec2Pos = rec2.getPosition();
    let rec2Size = rec2.getSize();

    if (Math.abs(rec1Pos.x - rec2Pos.x + (rec1Size.width - rec2Size.width) / 2) <= (rec1Size.width + rec2Size.width) / 2 
      && Math.abs(rec1Pos.y - rec2Pos.y + (rec1Size.height - rec2Size.height) / 2) <= (rec1Size.height + rec2Size.height) / 2
    ) {
      return true;
    }
    return false;

  }

  isCollisionWithPipe(): boolean {
    let result = this._pipes.filter((pipe) => this.isRectCollieRect(this.bird, pipe.pipeDown) || this.isRectCollieRect(this.bird, pipe.pipeUp));
    return result.length > 0;
  }

  private clickEvent = (event: any) : void => {
    if (!this.gameState) {
      let canvas = this.canvas;
      this.bird.setPosition(v2(canvas.width/4, canvas.height/2 - this.bird.getSize().height/2 ))
      this.gameState = GameState.Playing;
      this.intScore = 0;
      return;
    }
    if (this.bird.getPosition().y >= 40) {
      this.bird.setVelocity(v2(0,-400));
      this.bird.setForce(v2(0, 1200));
    }

    this.gameState = GameState.Playing;
    let x = event.x - this.canvas.offsetLeft;
    let y = event.y - this.canvas.offsetTop;

    let subject = this.checkClick(v2(x,y));
    // console.log(subject);
  }


  update(dt: number) {
    if (this.gameState == GameState.Playing) {
      if (this.ground.getPosition().x < -this.ground.getSize().width) {
        this.ground.translate(v2(this.ground.getSize().width*2, -0));
        let tmp = this.ground1;
        this.ground1 = this.ground;
        this.ground = tmp;
      }

      if (this._cloud.length > 0 && this._cloud[0].getPosition().x < -400) {
        this.remove(this._cloud[0]);
        delete this._cloud[0];
        this._cloud.splice(0,1);
      }
      if (this._pipes.length > 0 && this._pipes[0].pipeUp.getPosition().x < -200) {
        this.remove(this._pipes[0].pipeUp);
        this.remove(this._pipes[0].pipeDown);
        delete this._pipes[0].pipeUp;
        delete this._pipes[0].pipeDown;
        this._pipes.splice(0,1);
      }
      if (this.isCollisionWithPipe() || Game.getInstance().getCanvas().height <= this.bird.getPosition().y + 220) {
        this.endGame();
      }
    }
    if (this.gameState == GameState.GameOver && Game.getInstance().getCanvas().height <= this.bird.getPosition().y + 205) {
      this.bird.setForce(v2(0,0));
      this.bird.setVelocity(v2(0,0));
      
    }

    super.update(dt);
  }

  private randomInt(max: number): number {
    return Math.round(Math.random() * max); 
  }

}
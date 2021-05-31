import Action from './action/action';
import Game from './game';
import Scene from './scene';
import { size, v2, Vec2, Size } from './utils';
import Rectangle from './subject/rect';
import Label from './subject/label';
import Sprite from './subject/sprite';
import Animation from './action/animation';
import Sequence from './action/sequence';
import ImageLoading from './imageloading';
import { CONSTANT } from './constant';

enum GameState {
	Await = 0,
	Playing,
	GameOver
}

export default class MyScene extends Scene {
  private gameState: GameState;

  private background: Sprite;
  private ground: Array<Sprite>;

  private helper: Label;

  private score: Label;
  private bird: Sprite;
  private birdAni: Animation;
  private intScore: number;
  private highScore: number;

  private _pipes: Array<{pipeUp: Sprite, pipeDown: Sprite}>;
  private _cloud: Array<Sprite>;

  private canvas: HTMLCanvasElement;
  private imageLoading: ImageLoading;

  private _appPipe: NodeJS.Timeout;
  private _addScore: NodeJS.Timeout;
  private _addCloud: NodeJS.Timeout;
  private _birdDelay: NodeJS.Timeout;

  constructor() {
    super();
    this.gameState = GameState.Await;
    this.intScore = 0;
    this.highScore = 0;
    this.ground = new Array<Sprite>();
    this._pipes = new Array<{pipeUp: Sprite, pipeDown: Sprite}>();
    this._cloud = new Array<Sprite>();
    
    let game = Game.getInstance();
    
    this.canvas = game.getCanvas()
    this.gameState = GameState.Await;
    this.imageLoading = ImageLoading.getInstance();

  }

  public initAwaitScreen(): void {
    let imageLoading = this.imageLoading;
    let canvas = this.canvas;

    this.background = new Sprite(imageLoading.getByName(CONSTANT.BACKGROUND).image);

    var ground = new Sprite(imageLoading.getByName(CONSTANT.GROUND).image);
    ground.setPosition(v2(0, canvas.height - ground.getSize().height));
    this.ground.push(ground);

    ground = new Sprite(imageLoading.getByName(CONSTANT.GROUND).image);
    ground.setPosition(v2(ground.getSize().width, canvas.height - ground.getSize().height));
    this.ground.push(ground);

    this.bird = new Sprite(imageLoading.getByName(CONSTANT.BLUEBIRD).image);
    this.bird.setPosition(v2(canvas.width/4, canvas.height/2 - this.bird.getSize().height/2));

    let birdAnimation = new Animation();
    let blueBirdFrame = imageLoading.getAllByPreName(CONSTANT.BLUEBIRDFRAME)
    blueBirdFrame.forEach( (frame) => birdAnimation.addFrame(frame.image));
    birdAnimation.setTimer(0.1);

    this.bird.addAnimation(birdAnimation);
    this.birdAni = birdAnimation;
    setTimeout(() => this.birdAni.start(), 1000);

    this.helper = new Label("Tap to play");
    this.helper.setFont('30px Gotham, Helvetica Neue, sans-serif');
    this.helper.setPosition(v2(this.canvas.width/2, 200));
    this.helper.setColor('red');
    this.helper.setName("helper");
    this.helper.setAlign('center');


    this.add(this.background, 0);
    this.add(this.ground[0], 10);
    this.add(this.ground[1], 10);
    this.add(this.bird, 5);
    this.add(this.helper, 60);

    this.canvas.addEventListener('mousedown', this.play);
    this.gameState = GameState.Await;
    this.intScore = 0;
  }

  private addpipe(): void {
    let imageLoading = this.imageLoading;
    let randx = this.randomInt(160);

    let pipeDown = new Sprite(imageLoading.getByName(CONSTANT.GREENPIPEDOWN).image);

    pipeDown.setPosition(v2(this.canvas.width, -250 + randx ));
    pipeDown.setVelocity(v2(-CONSTANT.SPEED, 0));

    let pipeUp = new Sprite(imageLoading.getByName(CONSTANT.GREENPIPEUP).image);

    pipeUp.setPosition(v2(this.canvas.width, 180 + randx));
    pipeUp.setVelocity(v2(-CONSTANT.SPEED, 0));

    this.add(pipeDown, 2);
    this.add(pipeUp, 2);

    this._pipes.push({pipeUp:pipeUp, pipeDown:pipeDown});

    this._appPipe = setTimeout(() => this.addpipe(), CONSTANT.PIPEDELAY);
  }

  private addCloud(): void {
    let imageLoading = ImageLoading.getInstance();

    let randx = this.randomInt(150);
    let cloud = new Sprite(imageLoading.getByName(CONSTANT.CLOUD).image);
    cloud.scale(Math.random() + 0.8)
    cloud.setPosition(v2(450, randx))
    
    cloud.setVelocity(v2(- CONSTANT.SPEED / 2, 0));
    this.add(cloud, 1);

    this._cloud.push(cloud);
    this._addCloud = setTimeout(() => this.addCloud(), CONSTANT.PIPEDELAY*2);

  }

  private isRectCollieRect(rec1: Rectangle, rec2: Rectangle): boolean {
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

  private isCollisionWithPipe(): boolean {
    let result = this._pipes.filter((pipe) => this.isRectCollieRect(this.bird, pipe.pipeDown) || this.isRectCollieRect(this.bird, pipe.pipeUp));
    return result.length > 0;
  }

  private fly(): void {
    this.birdAni.start();
    this.bird.setVelocity(v2(0,-300));
    this.bird.setForce(v2(0, 1000));
    let angle = this.bird.getAngle();

    let rotate = Action.rotate(-20 - angle, 0.25);
    let rotateAwait = Action.rotate(0, 0.15);
    let rotateBack = Action.rotate(110, 0.5);
    clearTimeout(this._birdDelay);
    this._birdDelay = setTimeout(() => this.birdAni.stop(), 500);

    this.bird.addAction(new Sequence(rotate, rotateAwait, rotateBack));
  }

  public update(dt: number): void {
    if (this.gameState == GameState.Playing) {
      if (this.ground[0].getPosition().x < -this.ground[0].getSize().width) {
        this.ground[0].translate(v2(this.ground[0].getSize().width*2, -0));
        let tmp = this.ground[1];
        this.ground[1] = this.ground[0];
        this.ground[0] = tmp;
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
      if (this.isCollisionWithPipe() || Game.getInstance().getCanvas().height <= this.bird.getPosition().y + 134) {
        this.endGame();
      }
    }
    if (this.gameState == GameState.GameOver && Game.getInstance().getCanvas().height <= this.bird.getPosition().y + 134) {
      this.bird.setPosition(v2(this.bird.getPosition().x, Game.getInstance().getCanvas().height - 134))
      this.bird.setForce(v2(0,0));
      this.bird.setVelocity(v2(0,0));
    }
    super.update(dt);
  }

  private play = (event: any) : void => {
    this.score = new Label("0");
    this.score.setFont('40px Gotham, Helvetica Neue, sans-serif');
    this.score.setPosition(v2(this.canvas.width/2, 140));
    this.score.setColor('red');
    this.score.setAlign('center');
    this.add(this.score, 30); 

    this.fly();

    this.ground[0].setVelocity(v2(- CONSTANT.SPEED, 0));
    this.ground[1].setVelocity(v2(- CONSTANT.SPEED, 0));
    
    this.canvas.removeEventListener('mousedown', this.play);
    this._addScore = setTimeout(this.addScore, 3200);
    this._appPipe = setTimeout(() => this.addpipe(), 1000);
    this._addCloud = setTimeout(() => this.addCloud(), 100);
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

    this.ground[0].setVelocity(v2(0,0));
    this.ground[1].setVelocity(v2(0,0));
    this.birdAni.stop();

    clearTimeout(this._appPipe);
    clearTimeout(this._addScore);
    clearTimeout(this._addCloud);
    this.gameState = GameState.GameOver;
    
    this.canvas.removeEventListener('mousedown', this.clickEvent);
    setTimeout(() => this.canvas.addEventListener('mousedown', this.replay), 1500);

    let gameOver = new Label("Game Over");
    gameOver.setFont('40px Gotham, Helvetica Neue, sans-serif');
    gameOver.setPosition(v2(this.canvas.width/2, 200));
    gameOver.setColor('blue');
    gameOver.setAlign('center');

    let highScoreLabel = new Label("Highscore: " + this.highScore);

    if (this.intScore > this.highScore) {
      this.highScore = this.intScore;
      highScoreLabel.setText("New Highscore: " + this.highScore)
    }

    highScoreLabel.setFont('30px Gotham, Helvetica Neue, sans-serif');
    highScoreLabel.setPosition(v2(this.canvas.width/2, 250));
    highScoreLabel.setColor('red');
    highScoreLabel.setAlign('center');

    let replayLable = new Label("Tap to replay");
    replayLable.setFont('40px Gotham, Helvetica Neue, sans-serif');
    replayLable.setPosition(v2(this.canvas.width/2, 300));
    replayLable.setColor('blue');
    replayLable.setAlign('center');

    setTimeout(() => this.add(gameOver, 100), 200);
    setTimeout(() =>  this.add(highScoreLabel, 100), 600);
    setTimeout(() =>  this.add(replayLable, 100), 1000);

  }  
  
  private addScore = (): void => {
    this.intScore++;
    this.score.setText("" + this.intScore);
    this._addScore = setTimeout(this.addScore, CONSTANT.PIPEDELAY);
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
      this.fly();
    }

    this.gameState = GameState.Playing;
    let x = event.x - this.canvas.offsetLeft;
    let y = event.y - this.canvas.offsetTop;

    let subject = this.checkClick(v2(x,y));
  }

  private randomInt(max: number): number {
    return Math.round(Math.random() * max); 
  }

}
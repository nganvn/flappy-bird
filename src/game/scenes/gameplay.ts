import Scene from '../../engine/scene';
import Bird from '../objects/bird';
import Background from '../objects/background';
import Ground from '../objects/ground';
import Score from '../objects/score';
import EventHandler from '../../engine/eventhandler/eventhandler';
import PipeUp from '../objects/pipeup';
import PipeDown from '../objects/pipedown';
import Sprite from '../../engine/gameobject/sprite';
import { CONSTANT } from '../constant';
import GameController from '../../engine/gamecontroller/gamecontroller';

enum GameState {
	Await = 0,
	Playing,
  BirdDying,
	GameOver
}

export default class GameplayScene extends Scene {
  private gameState: GameState = GameState.Await;

  private bird: Bird;
  private background: Background;
  private ground: [Ground, Ground];
  private score: Score;
  private pipes: Array<[PipeUp, PipeDown]>;

  private _appPipe: NodeJS.Timeout;
  private _increaseScore: NodeJS.Timeout;

  public static create(): GameplayScene {
    let gameplayScene = new GameplayScene();

    let canvas = <HTMLCanvasElement>document.getElementById('canvas');

    gameplayScene.pipes = new Array<[PipeUp, PipeDown]>();

    gameplayScene.background = Background.create();
    gameplayScene.ground = [Ground.create(), Ground.create()];
    gameplayScene.bird = Bird.create();
    gameplayScene.score = Score.create();
    
    gameplayScene.addObject(gameplayScene.background, 1);
    gameplayScene.addObject(gameplayScene.ground[0], 15);
    gameplayScene.addObject(gameplayScene.ground[1], 15);
    gameplayScene.addObject(gameplayScene.bird, 11);
    gameplayScene.addObject(gameplayScene.score, 20);

    let groundBack = gameplayScene.ground[1];
    groundBack.setPosition(groundBack.getPosition().x + groundBack.getSize().width, groundBack.getPosition().y);

    EventHandler.addEventListener('mousedown', gameplayScene.startGame)
    return gameplayScene;
  }

  private startGame = (event: any): void => {
    this.gameState = GameState.Playing;
    this.bird.fly();
    this.ground[0].move();
    this.ground[1].move();
    EventHandler.removeEventListener('mousedown', this.startGame);
    EventHandler.addEventListener('mousedown', this.bird.fly);
    this._appPipe = setTimeout(() => this.addPipes(), 1000);
  }

  private gameOver = (): void => {
    this.gameState = GameState.BirdDying;
    this.pipes.forEach((item) => {
      item[0].stop();
      item[1].stop();
    });
    // this.bird.setPosition(this.bird.getPosition().x, 390);
    this.ground[0].stop();
    this.ground[1].stop();
    clearTimeout(this._appPipe);
    clearTimeout(this._increaseScore);
    EventHandler.removeEventListener('mousedown', this.bird.fly);
    EventHandler.addEventListener('mousedown', this.restart);

  }

  private restart = (): void => {
    let gamePlay = GameplayScene.create();
    EventHandler.removeEventListener('mousedown', this.restart);
    GameController.getInstance().runWithScene(gamePlay);
  }

  private addPipes() {
    let randx = this.randomInt(150);
    let pipeUp = PipeUp.create();
    let pipeUpPos = pipeUp.getPosition();
    pipeUp.setPosition(pipeUpPos.x, pipeUpPos.y - randx);

    let pipeDown = PipeDown.create();
    let pipeDownPos = pipeDown.getPosition();
    pipeDown.setPosition(pipeDownPos.x, pipeDownPos.y - randx);

    pipeUp.move();
    pipeDown.move();
    this.addObject(pipeUp, 10);
    this.addObject(pipeDown, 10);
    this.pipes.push([pipeUp, pipeDown]);

    
    this._appPipe = setTimeout(() => {
      this.addPipes();
      this._increaseScore = setTimeout(() => this.score.increaseScore(), 700);
    }, CONSTANT.PIPEDELAY);
  }

  private randomInt(max: number): number {
    return Math.round(Math.random() * max); 
  }

  public update(dt: number): void {
    super.update(dt);
    if (this.gameState == GameState.Playing && this.isGameOver()) {
      this.gameOver();
    }
    if (this.gameState == GameState.BirdDying) {
      if (this.bird.getPosition().y > 390) {
        this.bird.stop();
        this.bird.setPosition(this.bird.getPosition().x, 390);
        this.gameState = GameState.GameOver;
      }
    }
  }

  private isCollisionWithPipe(): boolean {
    let result = this.pipes.filter((pipe) => this.isRectCollieRect(this.bird, pipe[0]) || this.isRectCollieRect(this.bird, pipe[1]));
    return result.length > 0;
  }

  private isGameOver() {
    return this.isCollisionWithPipe() == true || this.bird.getPosition().y > 385;
  }
  
  private isRectCollieRect(rec1: Sprite, rec2: Sprite): boolean {
    let rec1Pos = rec1.getPosition();
    let rec1Size = rec1.getSize();

    let rec2Pos = rec2.getPosition();
    let rec2Size = rec2.getSize();

    if (Math.abs(rec1Pos.x - rec2Pos.x) <= (rec1Size.width + rec2Size.width) / 2 
      && Math.abs(rec1Pos.y - rec2Pos.y) <= (rec1Size.height + rec2Size.height) / 2
    ) {
      return true;
    }
    return false;
  }
}
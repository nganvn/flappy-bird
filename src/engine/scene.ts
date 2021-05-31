import Subject from './base/subject';
import Game from './game';
import { Vec2 } from './utils';

export default class Scene {
  private readonly _subject: Array<{subject: Subject, index:number}>;
  private previous: Date;
  private loopEvent: any;

  constructor() {
    this._subject = new Array<{subject: Subject, index:number}>()
    this.previous = new Date();
  }
  
  private render(): void {
    this._subject.forEach((subject) => subject.subject.render());
  }

  private clear(): void {
    let canvas = Game.getInstance().getCanvas();
    Game.getInstance().getCtx().clearRect(0, 0, canvas.width, canvas.height);
  }

  public add(subject: Subject, index: number): void {
    let insertIndex = this._subject.findIndex((subject) => subject.index > index);
    if (insertIndex == -1) {
      this._subject.push({subject: subject, index: index});
    } else {
      let splice = this._subject.splice(insertIndex, this._subject.length - insertIndex);
      this._subject.push({subject: subject, index: index});
      this._subject.push(...splice);
    }
  }

  public remove(subject: Subject): void {
    const index = this._subject.findIndex((ele) => {
      return ele.subject == subject});
    if (index > -1) {
      this._subject.splice(index, 1);
    }
  }

  public removeByName(name: String): void {
    const index = this._subject.findIndex((ele) => {
      return ele.subject.getName() == name});
    if (index > -1) {
      this._subject.splice(index, 1);
    }
  }

  public removeAll(): void {
    this._subject.splice(0, this._subject.length);
  }

  public processInput(): void {

  }

  public start() {
    this.update(0);
  }

  public update(dt: number): void {
    let current = new Date();
    let elapsed = (current.getTime() - this.previous.getTime()) / 1000;
    this.previous = current;

    this.processInput();
    this._subject.forEach((subject) => {
      subject.subject.update(elapsed);
      subject.subject.runAction(elapsed);
    } );
    this.clear();
    this.render();
    this.loopEvent = window.requestAnimationFrame(() => this.update(dt));
  }

  public stop(): void {
    window.cancelAnimationFrame(this.loopEvent);
  }


  public checkClick(vec: Vec2): Subject {
    for (let i = this._subject.length - 1; i >=0 ; i--) {
      if (this._subject[i].subject.checkClick(vec)) {
        return this._subject[i].subject;
      }
    }
    return null;
  } 
}

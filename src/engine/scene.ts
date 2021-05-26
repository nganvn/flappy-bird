import Subject from './base/subject'
import Game from './game';

export default class Scene {
  
  private readonly _subject: Array<Subject>;
  private previous: Date;

  constructor() {
    this._subject = new Array<Subject>()
    this.previous = new Date();
  }

  add(subject: Subject): void {
    this._subject.push(subject);
  }

  remove(subject: Subject): void {
    const index = this._subject.indexOf(subject);
    if (index > -1) {
      this._subject.splice(index, 1);
    }
  }

  processInput(): void {

  }

  update(dt: number): void {
    let current = new Date();
    let elapsed = (current.getTime() - this.previous.getTime()) / 1000;
    this.previous = current;

    this.processInput();
    this._subject.forEach((subject) => {
      subject.update(elapsed);
      subject.runAction(elapsed);
    } );
    this.clear();
    this.render();
    window.requestAnimationFrame(() => this.update(dt));
  }

  private render(): void {
    this._subject.forEach((subject) => subject.render());
  }

  private clear(): void {
    let canvas = Game.getInstance().getCanvas();
    Game.getInstance().getCtx().clearRect(0, 0, canvas.width, canvas.height);
  }
}
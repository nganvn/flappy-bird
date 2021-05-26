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

  update(): void {
    let current = new Date();
    let elapsed = (current.getTime() - this.previous.getTime()) / 1000;
    this.previous = current;

    this.processInput();
    this._subject.forEach((subject) => {
      subject.update(elapsed);
      subject.runAction(elapsed);
    } );
    Game.getInstance().clear();
    this.render();
    window.requestAnimationFrame(() => this.update());
  }

  render(): void {
    this._subject.forEach((subject) => subject.render());
  }
}
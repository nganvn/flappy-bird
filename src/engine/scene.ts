import Subject from './base/subject'
import Game from './game';

export default class Scene {
  
  private readonly _subject: Array<Subject> = new Array<Subject>();

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
    this.processInput();
    this._subject.forEach((subject) => subject.update(dt));
    this.render();
    Game.getInstance().clear();
    window.requestAnimationFrame(() => this.update(dt));
  }

  render(): void {
    this._subject.forEach((subject) => subject.render());
  }
}
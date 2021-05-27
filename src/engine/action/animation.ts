import { Queue } from 'queue-typescript';
import { size, Size } from '../utils';
export default class Animation {
  frame: Array<HTMLImageElement>;
  iFrame: number;
  timer: number;
  timeCount: number;
  _isRunning: boolean;
  constructor() {
    this.frame = new Array<HTMLImageElement>();
    this.timeCount = 0;
    this.timer = 0;
    this._isRunning = false;
    this.iFrame = 0;
  }

  addFrame(src: string): void {
    let image = new Image();
    image.src = src;
    this.frame.push(image);
  }

  getFrame(): HTMLImageElement {
    return this.frame[this.iFrame];
  }

  start() {
    this._isRunning = true;
    this.timeCount = 0;
    this.iFrame = 0;
  }

  stop() {
    this._isRunning = false;
  }

  isRunning(): boolean {
    return this._isRunning;
  }

  update(dt: number) {
    this.timeCount += dt;
    if (this.timeCount >= this.timer) {
      this.timeCount -= this.timer;
      this.iFrame += 1;
      if (this.iFrame == this.frame.length) {
        this.iFrame = 0;
      }
    }
  }
}
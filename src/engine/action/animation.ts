import { Queue } from 'queue-typescript';
import { size, Size } from '../utils';
export default class Animation {
  private frame: Array<HTMLImageElement>;
  private iFrame: number;
  private timer: number;
  private timeCount: number;
  private _isRunning: boolean;
  constructor() {
    this.frame = new Array<HTMLImageElement>();
    this.timeCount = 0;
    this.timer = 0;
    this._isRunning = false;
    this.iFrame = 0;
  }

  public setTimer(timer: number): void {
    this.timer = timer;
  }

  public addFrame(image: HTMLImageElement): void {
    this.frame.push(image);
  }

  public getFrame(): HTMLImageElement {
    return this.frame[this.iFrame];
  }

  public start(): void {
    this._isRunning = true;
    this.timeCount = 0;
    this.iFrame = 0;
  }

  public stop(): void {
    this._isRunning = false;
  }

  public isRunning(): boolean {
    return this._isRunning;
  }

  public update(dt: number): void {
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
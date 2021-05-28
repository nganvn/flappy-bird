import { Vec2, v2 } from '../utils';
export default class Action {
  protected vec: Vec2;
  protected timer: number;
  protected a: number;
  protected angle = 0;
  timeCount: number;
  protected cal: () => number;

  _isRotation: boolean;

  constructor() {
    this.vec = v2(0,0);
    this.timer = 0;
    this.a = 0;
    this.timeCount = 0;
    this.cal = null;
    this._isRotation = false;
  }

  protected copy(action: Action) {
    this.vec = action.vec;
    this.timer = action.timer;
    this.a = action.a;
    this.cal = action.cal;
    this.timeCount = 0;
    this.angle = action.angle;
    this.isRotation = this.isRotation
  }

  isRotation(): boolean {
    return true;
  }

  isEndAction(): boolean {
    if (this.timer <= this.timeCount) {
      return true;
    }
    return false;
  }

  getDtAngle(dt: number): number {
    let cur = this.timeCount;
    if (dt + this.timeCount > this.timer) {
      this.timeCount = this.timer;
    } else {
      this.timeCount += dt;
    }
    return (this.timeCount - cur) * this.angle / this.timer;
  }

  getDtv2(dt: number): Vec2 {
    let curDist = this.cal();
    if (dt + this.timeCount > this.timer) {
      this.timeCount = this.timer;
    } else {
      this.timeCount += dt;
    }
    let nextDist = this.cal();

    return this.vec.scale(nextDist - curDist);
  }

  clone(): Action {
    let action = new Action();
    action.vec = this.vec;
    action.timer = this.timer;
    action.a = this.a;
    action.cal = this.cal;
    return action;
  }

  static moveBy(vec: Vec2, timer: number): Action{
    let action = new Action();
    action.vec = vec;
    action.timer = timer;
    action.cal = action.linear;
    return action;
  }

  static jumpBy(vec: Vec2, timer: number): Action{
    let action = new Action();
    action.vec = vec;
    action.timer = timer;
    action.cal = action.quadratic;
    return action;
  }

  static rotate(angle: number, timer: number): Action {
    let action = new Action();
    action.angle = angle;
    action.timer = timer;
    action._isRotation = true;
    return action;
  }

  private quadratic(): number {
    return 4 * (this.timeCount / this.timer) * (1 - this.timeCount / this.timer);
  }

  private linear(): number {
    return this.timeCount / this.timer;
  } 

  private easeIn(): number {
    return 2 * (this.timeCount / this.timer) * (1 - this.timeCount / this.timer / 2);
  }

  static moveByEaseIn(vec: Vec2){
    
  }

}
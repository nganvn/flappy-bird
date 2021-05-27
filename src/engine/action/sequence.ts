import Action from './action';
import { Vec2, size } from '../utils';
export default class Sequence extends Action {

  private readonly _actions: Array<Action>;

  constructor(...actions: Action[]) {
    super();
    this._actions = actions;
    let action = this._actions.splice(0,1)[0];
    this.copy(action);
  }

  isEndAction(): boolean {
    if (this._actions.length) {
      return false;
    }
    return super.isEndAction();
  }

  getDtv2(dt: number): Vec2 {
    if (super.isEndAction()) {
      let action = this._actions.splice(0,1)[0];
      this.copy(action);
    }
    return super.getDtv2(dt);
  }
}
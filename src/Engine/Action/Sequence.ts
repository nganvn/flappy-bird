import Action from './Action';
import { Vec2, size } from '../Utils';
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
      if (super.isEndAction()) {
        let action = this._actions.splice(0,1)[0];
        this.copy(action);
      }
      return false;
    }
    return super.isEndAction();
  }

  getDtv2(dt: number): Vec2 {
    return super.getDtv2(dt);
  }
}
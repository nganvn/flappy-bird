import Sprite from '../../engine/gameobject/sprite';
import ImageLoading from '../imageloading';
import { CONSTANT } from '../constant';
export default class PipeDown extends Sprite {
  
  public static create(): PipeDown {
    let canvas = <HTMLCanvasElement>document.getElementById('canvas');
    let pipe = new PipeDown();
    pipe.image = ImageLoading.getInstance().getByName(CONSTANT.GREENPIPEDOWN).image;
    pipe.setPosition(canvas.width + pipe.getSize().width / 2, 68);
    return pipe;
  }
  
  public move(): void {
    this.setVelocity(- CONSTANT.SPEED, 0);
  }

  public stop(): void {
    this.setVelocity(0, 0);
  }
}
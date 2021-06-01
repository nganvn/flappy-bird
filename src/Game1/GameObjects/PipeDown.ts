import Sprite from '../../Engine1/GameObject/Sprite';
import ImageLoading from '../ImageLoading';
import { CONSTANT } from '../CONSTANT';
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
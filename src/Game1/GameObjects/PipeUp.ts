import Sprite from '../../Engine1/GameObject/Sprite';
import ImageLoading from '../ImageLoading';
import { CONSTANT } from '../CONSTANT';
export default class PipeUp extends Sprite {
  
  public static create(): PipeUp {
    let canvas = <HTMLCanvasElement>document.getElementById('canvas');
    let pipe = new PipeUp();
    pipe.image = ImageLoading.getInstance().getByName(CONSTANT.GREENPIPEUP).image;
    pipe.setPosition(canvas.width + pipe.getSize().width / 2, canvas.height - 18);

    return pipe;
  }
  
  public move(): void {
    this.setVelocity(- CONSTANT.SPEED, 0);
  }

  public stop(): void {
    this.setVelocity(0, 0);
  }
}
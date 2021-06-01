import Sprite from '../../Engine1/GameObject/Sprite';
import ImageLoading from '../ImageLoading';
import { CONSTANT } from '../CONSTANT';
export default class Bird extends Sprite {
  
  public static create(): Bird {
    let canvas = <HTMLCanvasElement>document.getElementById('canvas');
    let bird = new Bird();
    bird.image = ImageLoading.getInstance().getByName(CONSTANT.BLUEBIRD).image;
    bird.setPosition(canvas.width / 3 - bird.getSize().width / 2, canvas.height / 2);
    return bird;
  }

  public fly = (): void => {
    this.setVelocity(0, -300);
    this.setForce(0, 1100);
  }
  
  public stop = (): void => {
    this.setVelocity(0, 0);
    this.setForce(0, 0);
  }
  
}
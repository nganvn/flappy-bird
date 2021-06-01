import Sprite from '../../Engine1/GameObject/Sprite';
import ImageLoading from '../ImageLoading';
import { CONSTANT } from '../CONSTANT';
export default class Background extends Sprite {
  
  public static create(): Background {
    let canvas = <HTMLCanvasElement>document.getElementById('canvas');
    let background = new Background();
    background.image = ImageLoading.getInstance().getByName(CONSTANT.BACKGROUND).image;
    background.setPosition(canvas.width / 2, canvas.height / 2);
    return background;
  }
}
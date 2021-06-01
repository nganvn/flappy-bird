import Sprite from '../../engine/gameobject/sprite';
import ImageLoading from '../imageloading';
import { CONSTANT } from '../constant';
export default class Background extends Sprite {
  
  public static create(): Background {
    let canvas = <HTMLCanvasElement>document.getElementById('canvas');
    let background = new Background();
    background.image = ImageLoading.getInstance().getByName(CONSTANT.BACKGROUND).image;
    background.setPosition(canvas.width / 2, canvas.height / 2);
    return background;
  }
}
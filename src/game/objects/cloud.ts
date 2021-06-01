
import Sprite from '../../engine/gameobject/sprite';
import { CONSTANT } from '../constant';
import ImageLoading from '../imageloading';
export default class Cloud extends Sprite {
  public static create(): Cloud {
    let cloud = new Cloud();
    cloud.image = ImageLoading.getInstance().getByName(CONSTANT.CLOUD).image;
    return cloud;
  }

  public move(): void {

  }

  public stop(): void {
    
  }
}
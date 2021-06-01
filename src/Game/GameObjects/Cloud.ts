
import Sprite from '../../Engine/GameObject/Sprite';
import { CONSTANT } from '../CONSTANT';
import ImageLoading from '../ImageLoading';
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
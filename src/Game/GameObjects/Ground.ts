import Sprite from '../../Engine/GameObject/Sprite';
import ImageLoading from '../ImageLoading';
import { CONSTANT } from '../CONSTANT';
export default class Ground extends Sprite {
  
  public static create(): Ground {
    let canvas = <HTMLCanvasElement>document.getElementById('canvas');
    let ground = new Ground();
    ground.image = ImageLoading.getInstance().getByName(CONSTANT.GROUND).image;
    ground.setPosition( canvas.width / 2, canvas.height - ground.getSize().height / 2);
    return ground;
  }

  public move(): void {
    this.setVelocity(- CONSTANT.SPEED, 0);
  }

  public stop(): void {
    this.setVelocity(0, 0);
  }

  public resetPosition(): void {
    
  }

  public update(dt: number): void {
    if (this.getPosition().x < - this.getSize().width / 2) {
      this.setPosition(this.getPosition().x + this.getSize().width * 2, this.getPosition().y);
    }
    super.update(dt);
  }

}
import { Size } from './utils';

export default class ImageLoading {
  private static instance: ImageLoading;

  private _images: Array<{name: string, image: HTMLImageElement}>;

  private constructor() {
    this._images = new Array<{name: string, image: HTMLImageElement}>();
  }

  public getByName(name: string): {name: string, image: HTMLImageElement} {
    return this._images.find( (image) => image.name == name );
  }

  public getAllByName(name: string): Array<{name: string, image: HTMLImageElement}> {
    return this._images.filter( (image) => image.name.includes(name));
  }

  public getAllByPreName(name: string): Array<{name: string, image: HTMLImageElement}> {
    return this._images.filter( (image) => image.name.includes(name) );
  }

  public removeByName(name: string) {
    const index = this._images.findIndex((image) => {
      return image.name == name});
    if (index > -1) {
      this._images.splice(index, 1);
    }
  }

  public push(name: string, src: string) {
    let image = new Image()
    image.src = src;
    this._images.push({
        name: name, 
        image: image
      }); 
  }

  public static getInstance(): ImageLoading{
    if (!ImageLoading.instance) {
      ImageLoading.instance = new ImageLoading();
    }
    return this.instance;
  }

}
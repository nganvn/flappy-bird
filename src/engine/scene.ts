import GameObject from './base/gameobject';

export default class Scene {
  private readonly _objects: Array<{object: GameObject, index:number}>;
  private _active: boolean;
  private _visible: boolean;

  constructor() {
    this._objects = new Array<{object: GameObject, index:number}>()
    this._active = true;
  }

  public addObject(object: GameObject, index: number): void {
    this._objects.push({object: object, index: index});
  }

  public remove(object: GameObject): void {
    const index = this._objects.findIndex((ele) => {
      return ele.object == object});
    if (index > -1) {
      this._objects.splice(index, 1);
    }
  }

  public removeByName(name: String): void {
    const index = this._objects.findIndex((ele) => {
      return ele.object.getName() == name});
    if (index > -1) {
      this._objects.splice(index, 1);
    }
  }

  public removeAll(): void {
    this._objects.splice(0, this._objects.length);
  }

  public getAllVisibleObjects(): Array<any> {
    let visibleObjects = this._objects.filter((ele) => {
      return ele.object.isVisible();
    });

    let sortedObjects = visibleObjects.sort((a, b) => {
      return a.index < b.index ? -1 : 0;
    });

    let sortedObjetsReduce: Array<GameObject> = sortedObjects.map((ele) : GameObject => ele.object);

    return sortedObjetsReduce;
  }

  public update(dt: number): void {
    this._objects.forEach(element => {
      element.object.update(dt);
    });
  }
  
  public isActive(): boolean {
    return this._active;
  }
  public setActive(value: boolean) {
    this._active = value;
  }
  
  public isVisible(): boolean {
    return this._visible;
  }
  
  public setVisible(value: boolean) {
    this._visible = value;
  }

}

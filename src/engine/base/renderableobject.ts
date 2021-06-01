import GameObject from './gameobject';
export default abstract class RenderableObject extends GameObject {
  public abstract readonly type: string;
}
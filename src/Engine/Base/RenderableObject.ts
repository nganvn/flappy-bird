import GameObject from './GameObject';
export default abstract class RenderableObject extends GameObject {
  public abstract readonly type: string;
}
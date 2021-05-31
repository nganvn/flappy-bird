export class Vec2 {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public neg(): Vec2 {
    return new Vec2(-this.x, -this.y);
  }
  
  public add(v2: Vec2) {
    this.x += v2.x;
    this.y += v2.y;
  }

  public plus(v2: Vec2): Vec2 {
    return new Vec2(this.x + v2.x, this.y + v2.y);
  }

  public sqrt(): number{
    return Math.sqrt(this.x*this.x + this.y*this.y);
  }

  public scale(s: number): Vec2 {
    return new Vec2(this.x*s, this.y*s);
  }

}

export class Size {
  public width: number;
  public height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
}

export function v2(x: number, y:number) : Vec2 {
  return new Vec2(x,y);
}

export function size(width:number, height:number) : Size {
  return new Size(width, height);
}
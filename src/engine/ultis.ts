export class Vec2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  neg(): Vec2 {
    return new Vec2(-this.x, -this.y);
  }
  
  plus(v2: Vec2): Vec2 {
    return new Vec2(this.x + v2.x, this.y + v2.y);
  }

  sqrt(v2: Vec2): number{
    return Math.sqrt(this.x*this.x + this.y*this.y);
  }

}

export class Size {
  width: number;
  height: number;
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
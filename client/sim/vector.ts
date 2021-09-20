export class vector {

  constructor(
    public x: number,
    public y: number,
    public z?: number,
    public w?: number) {
  }

  public static get ZERO(): vector { return new vector(0, 0); }

  public clone(): vector {
    return new vector(this.x, this.y, this.z, this.w);
  }

  public get length(): number {
    return Math.sqrt(this.sqrLength);
  }

  public get sqrLength(): number {
    let sum = this.x*this.x + this.y*this.y;
    if (this.z) sum += this.z*this.z;
    if (this.w) sum += this.w*this.w;
    return sum;
  }

  public add(other: vector): vector {
    this.x += other.x;
    this.y += other.y;
    this.z ? this.z += other.z : this.z = other.z;
    this.w ? this.w += other.w : this.w = other.w;
    return this;
  }

  public diff(other: vector): vector {
    this.x -= other.x;
    this.y -= other.y;
    this.z ? this.z -= other.z : this.z = -other.z;
    this.w ? this.w -= other.w : this.w = -other.w;
    return this;
  }

  public mul(other: number | vector): vector {
    if (typeof(other) === 'number') {
      this.x *= other;
      this.y *= other;
      this.z *= other;
      this.w *= other;
    }
    return this;
  }
}
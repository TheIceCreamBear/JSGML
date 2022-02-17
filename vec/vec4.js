import Vector2 from './vec2.js';
import Vector3 from './vec3.js';

class Vector4 {
  /**
   * Constructs a new vector with the given arguments.
   * If no arguments are passed in, x, y, z are 0 and w is 1.
   * If one argument is passed in, x, y, z, and w are the value of that argument.
   * If two arguments are passed in, x is treated as a Vector3, and y is the w value, or if x and y are instances of Vector2, x holds the values for x and y, and y holds the values for z and w.
   * If three arguments are passed in, x is treated as a Vector3, y is z, and z is w.
   * If four arguments are passed in, x, y, z, and w are their respective value.
   * @param {number | Vector2 | Vector3} x the x value of the vector, or if this is the only argument present, the x and y value of the vector
   * @param {number | Vector2} y the y value of the vector, of if x is a vec2, the z and w value of the vector, or if x is a vec3 the w value
   * @param {number} z the z value of the vector
   * @param {number} w the w value of the vector
   */
  constructor(x, y, z, w) {
    switch (arguments.length) {
      // no args, default
      case 0:
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.w = 1;
        break;
      // treat x as one value for all components
      case 1:
        this.x = x;
        this.y = x;
        this.z = x;
        this.w = x;
        break;
      // only x and y are present
      case 2:
        if (x instanceof Vector2 && y instanceof Vector2) {
          this.x = x.x;
          this.y = x.y;
          this.z = y.x;
          this.w = y.y;
        } else if (x instanceof Vector3 && (typeof y) === 'number') {
          this.x = x.x;
          this.y = x.y;
          this.z = x.z;
          this.w = y;
        } else {
          throw new Error('Invalid argument types');
        }
        break;
      // x y and z are present
      case 3:
        if (!(x instanceof Vector2 && (typeof y) === 'number' && (typeof z) === 'number')) {
          throw new Error('Invalid argument types');
        }
        this.x = x.x;
        this.y = x.y;
        this.z = y;
        this.w = z;
        break;
      case 4:
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        break;
      default:
        throw new Error('Invalid number of arguments');
    }
  }

  /**
   * Sets this vector's components to be the given arguments. 
   * If no arguments are passed in, x, y, z, and w are 0.
   * If one argument is passed in, x, y, z, and w are the value of that argument, or it is treated as a Vector4.
   * If two arguments are passed in, x is treated as a Vector3, and y is the w value, or if x and y are instances of Vector2, x holds the values for x and y, and y holds the values for z and w.
   * If three arguments are passed in, x is treated as a Vector3, y is z, and z is w.
   * If four arguments are passed in, x, y, z, and w are their respective value.
   * @param {number | Vector2 | Vector3 | Vector4} x the x value of the vector, or if this is the only argument present, the x and y value of the vector
   * @param {number | Vector2} y the y value of the vector, of if x is a vec2, the z and w value of the vector, or if x is a vec3 the w value
   * @param {number} z the z value of the vector
   * @param {number} w the w value of the vector
   * @returns {Vector4} this object with the new values
   */
  set(x, y, z, w) {
    switch (arguments.length) {
      // no args, default
      case 0:
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.w = 0;
        break;
      // treat x as one value for all components
      case 1:
        if (x instanceof Vector4) {
          this.x = x.x;
          this.y = x.y;
          this.z = x.z;
          this.w = x.w;
          break;
        }
        this.x = x;
        this.y = x;
        this.z = x;
        this.w = x;
        break;
      // only x and y are present
      case 2:
        if (x instanceof Vector2 && y instanceof Vector2) {
          this.x = x.x;
          this.y = x.y;
          this.z = y.x;
          this.w = y.y;
        } else if (x instanceof Vector3 && (typeof y) === 'number') {
          this.x = x.x;
          this.y = x.y;
          this.z = x.z;
          this.w = y;
        } else {
          throw new Error('Invalid argument types');
        }
        break;
      // x y and z are present
      case 3:
        if (!(x instanceof Vector2 && (typeof y) === 'number' && (typeof z) === 'number')) {
          throw new Error('Invalid argument types');
        }
        this.x = x.x;
        this.y = x.y;
        this.z = y;
        this.w = z;
        break;
      case 4:
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        break;
      default:
        throw new Error('Invalid number of arguments');
    }
    return this;
  }

  /**
   * Sets the components of this vector to 0
   * @returns {Vector4} this object with the new values
   */
  zero() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.w = 0;
    return this;
  }

  /**
   * Returns this vector in an array form, ordered x then y then z.
   * @returns {Float32Array} the components of this vector as an array
   */
  getArray() {
    return new Float32Array([this.x, this.y, this.z, this.w]);
  }

  /**
   * Adds the given x and y value to this vector, and stores it in dest if dest is present.
   * @param {number} x the x value to add to the value of the current object
   * @param {number} y the y value to add to the value of the current object
   * @param {number} z the z value to add to the value of the current object
   * @param {number} w the w value to add to the value of the current object
   * @param {Vector4} dest optional vector to store the results in
   * @returns {Vector4} this, or if dest is present, dest
   */
  add(x, y, z, w, dest) {
    if (dest) {
      dest.x = this.x + x;
      dest.y = this.y + y;
      dest.z = this.z + z;
      dest.w = this.w + w;
      return dest;
    }

    this.x += x;
    this.y += y;
    this.z += z;
    this.w += w;
    return this;
  }

  /**
   * Adds the given vector component values to this vector, and stores it in dest if dest is present.
   * @param {Vector4} vec4 the vector to add to the value of the current object
   * @param {Vector4} dest optional vector to store the results in
   * @returns {Vector4} this, or if dest is present, dest
   */
  addVec(vec4, dest) {
    if (dest) {
      dest.x = this.x + vec4.x;
      dest.y = this.y + vec4.y;
      dest.z = this.z + vec4.z;
      dest.w = this.w + vec4.w;
      return dest;
    }

    this.x += vec4.x;
    this.y += vec4.y;
    this.z += vec4.z;
    this.w += vec4.w;
    return this;
  }

  /**
   * Adds the given x and y value to this vector, and stores it in dest if dest is present.
   * @param {number} x the x value to subtract from the value of the current object
   * @param {number} y the y value to subtract from the value of the current object
   * @param {number} z the z value to subtract from the value of the current object
   * @param {Vector4} dest optional vector to store the results in
   * @returns {Vector4} this, or if dest is present, dest
   */
  sub(x, y, z, w, dest) {
    if (dest) {
      dest.x = this.x - x;
      dest.y = this.y - y;
      dest.z = this.z - z;
      dest.w = this.w - w;
      return dest;
    }

    this.x -= x;
    this.y -= y;
    this.z -= z;
    this.w -= w;
    return this;
  }

  /**
   * Subtracts the given vector component values to this vector, and stores it in dest if dest is present.
   * @param {Vector4} vec4 the vector to subtract from the value of the current object
   * @param {Vector4} dest optional vector to store the results in
   * @returns {Vector4} this, or if dest is present, dest
   */
  subVec(vec4, dest) {
    if (dest) {
      dest.x = this.x - vec4.x;
      dest.y = this.y - vec4.y;
      dest.z = this.z - vec4.z;
      dest.w = this.w - vec4.w;
      return dest;
    }

    this.x -= vec4.x;
    this.y -= vec4.y;
    this.z -= vec4.z;
    this.w -= vec4.w;
    return this;
  }

  /**
   * Multiplies this vector's components by the given components
   * @param {number} x the x value to multiply this vector's x component by
   * @param {number} y the y value to multiply this vector's y component by
   * @param {number} z the z value to multiply this vector's z component by
   * @param {number} w the w value to multiply this vector's w component by
   * @param {Vector4} dest optional vector to store the results in
   * @returns {Vector4} this, or if dest is present, dest
   */
  mul(x, y, z, w, dest) {
    if (dest) {
      dest.x = this.x * x;
      dest.y = this.y * y;
      dest.z = this.z * z;
      dest.w = this.w * w;
      return dest;
    }

    this.x *= x;
    this.y *= y;
    this.z *= z;
    this.w *= w;
    return this;
  }

  /**
   * Multiplies this vector by the given scalar
   * @param {number} scalar the scalar to multiply the components by
   * @param {Vector4} dest optional vector to store the results in
   * @returns {Vector4} this, or if dest is present, dest
   */
  mulScalar(scalar, dest) {
    return this.mul(scalar, scalar, scalar, scalar, dest);
  }

  /**
   * Multiplies this vector's components by the given vector's components
   * @param {Vector4} vec4 the vector who's components will multiply this vectors components
   * @param {Vector4} dest Option destination vector
   * @returns {Vector4} this, or if dest is present, dest
   */
  mulVec(vec4, dest) {
    return this.mul(vec4.x, vec4.y, vec4.z, vec4.w, dest);
  }

  /**
   * Divides this vector's components by the given components
   * @param {number} x the x value to divide this vector's x component by
   * @param {number} y the y value to divide this vector's y component by
   * @param {number} z the z value to divide this vector's z component by
   * @param {number} w the w value to divide this vector's w component by
   * @param {Vector4} dest optional vector to store the results in
   * @returns {Vector4} this, or if dest is present, dest
   */
  div(x, y, z, w, dest) {
    if (dest) {
      dest.x = this.x / x;
      dest.y = this.y / y;
      dest.z = this.z / z;
      dest.w = this.w / w;
      return dest;
    }

    this.x /= x;
    this.y /= y;
    this.z /= z;
    this.w /= w;
    return this;
  }

  /**
   * Divides this vector by the given scalar
   * @param {number} scalar the scalar to divide the components by
   * @param {Vector4} dest optional vector to store the results in
   * @returns {Vector4} this, or if dest is present, dest
   */
  divScalar(scalar, dest) {
    return this.div(scalar, scalar, scalar, scalar, dest);
  }

  /**
   * Divides this vector's components by the given vector's components
   * @param {Vector4} vec4 the vector who's components will divide this vectors components
   * @param {Vector4} dest Option destination vector
   * @returns {Vector4} this, or if dest is present, dest
   */
  divVec(vec4, dest) {
    return this.div(vec4.x, vec4.y, vec4.z, vec4.w, dest);
  }

  /**
   * Calculates and returns the length of this vector pre square root (length squared)
   * @returns {number} the length squared of this vector
   */
  lengthSquared() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }

  /**
   * Calculates and returns the length of this vector
   * @returns {number} the length of this vector
   */
  length() {
    return Math.sqrt(this.lengthSquared());
  }

  /**
   * Calculates the distance squared between this vector and a given point in 2d space
   * @param {number} x the x position to calculate the distance from
   * @param {number} y the y position to calculate the distance from
   * @param {number} z the z position to calculate the distance from
   * @param {number} w the w position to calculate the distance from
   * @returns {number} the distance squared between this vector and the given point
   */
  distanceSquared(x, y, z, w) {
    const dx = this.x - x;
    const dy = this.y - y;
    const dz = this.z - z;
    const dw = this.w - w;
    return dx * dx + dy * dy + dz * dz + dw * dw;
  }

  /**
   * Calculates the distance between this vector and a given point in 2d space
   * @param {number} x the x position to calculate the distance from
   * @param {number} y the y position to calculate the distance from
   * @param {number} z the z position to calculate the distance from
   * @param {number} w the w position to calculate the distance from
   * @returns {number} the distance between this vector and the given point
   */
  distance(x, y, z, w) {
    return Math.sqrt(this.distanceSquared(x, y, z, w));
  }

  /**
   * Calculates the distance squared between this vector and another vector
   * @param {Vector4} vec4 the vector to calculate the distance from
   * @returns {number} the distance squared between this vector and the other
   */
  distanceSquaredVec(vec4) {
    const dx = this.x - vec4.x;
    const dy = this.y - vec4.y;
    const dz = this.z - vec4.z;
    const dw = this.w - vec4.w;
    return dx * dx + dy * dy + dz * dz + dw * dw;
  }

  /**
   * Calculates the distance between this vector and another vector
   * @param {Vector4} vec4 the vector to calculate the distance from
   * @returns {number} the distance between this vector and the other
   */
  distanceVec(vec4) {
    return Math.sqrt(this.distanceSquaredVec(vec4));
  }

  /**
   * Normalize the components of this vector to make their combined length equal to len
   * @param {number} len the resultant length of this vector
   * @param {Vector4} dest optional vector to store the results in
   * @returns {Vector4} this, or if dest is present, dest
   */
  normalizeToLen(len, dest) {
    const invLen = (1 / this.length()) * len;
    const x = this.x * invLen;
    const y = this.y * invLen;
    const z = this.z * invLen;
    const w = this.w * invLen;

    if (dest) {
      dest.x = x;
      dest.y = y;
      dest.z = z;
      dest.w = w;
      return dest;
    }

    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    return this;
  }

  /**
   * Normalize the components of this vector to make their combined length equal to 1
   * @param {Vector4} dest optional vector to store the results in
   * @returns {Vector4} this, or if dest is present, dest
   */
  normalize(dest) {
    return this.normalizeToLen(1, dest);
  }

  /**
   * Calculates the dot product between two vectors, this and the passed in vector
   * @param {Vector4} vec4 The other vector to calculate the dot on
   * @returns {number} the dot product between this vector and the passed in vector
   */
  dot(vec4) {
    return this.x * vec4.x + this.y * vec4.y + this.z * vec4.z;
  }

  /**
   * Calculates the linear interpolation between this and the other vector
   * @param {Vector4} other the other vector to interpolate from
   * @param {number} t the progress (0-1) of the lerp
   * @param {Vector4} dest optional vector to store the results in
   * @returns the resultant vector, stored in this, or if dest is present, dest
   */
  lerp(other, t, dest) {
    const x = this.x + (other.x - this.x) * t;
    const y = this.y + (other.y - this.y) * t;
    const z = this.z + (other.z - this.z) * t;

    if (dest) {
      dest.x = x;
      dest.y = y;
      dest.z = z;
      return dest;
    }

    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  /**
   * Negates this vector by individual components, and stores it in dest if present
   * @param {Vector4} dest optional vector to store the results in
   * @returns {Vector4} this, or if dest is present, dest
   */
  negate(dest) {
    if (dest) {
      dest.x = -this.x;
      dest.y = -this.y;
      dest.z = -this.z;
      dest.w = -this.w;
      return dest;
    }

    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    this.w = -this.w;
    return this;
  }

  /**
   * Calculates and returns the min components between this and the passed in vector. Optionally stores the result in dest
   * @param {Vector4} vec4 the other vector to find the min component of
   * @param {Vector4} dest Option destination vector
   * @returns {Vector4} stores the min components between this and vec4 and stores in this, or if dest is present, dest
   */
  min(vec4, dest) {
    const x = this.x < vec4.x ? this.x : vec4.x;
    const y = this.y < vec4.y ? this.y : vec4.y;
    const z = this.z < vec4.z ? this.z : vec4.z;
    const w = this.w < vec4.w ? this.w : vec4.w;

    if (dest) {
      dest.x = x;
      dest.y = y;
      dest.z = z;
      dest.w = w;
      return dest;
    }

    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    return this;
  }

  /**
   * Calculates and returns the max components between this and the passed in vector. Optionally stores the result in dest
   * @param {Vector4} vec4 the other vector to find the max component of
   * @param {Vector4} dest Option destination vector
   * @returns {Vector4} stores the max components between this and vec4 and stores in this, or if dest is present, dest
   */
  max(vec4, dest) {
    const x = this.x > vec4.x ? this.x : vec4.x;
    const y = this.y > vec4.y ? this.y : vec4.y;
    const z = this.z > vec4.z ? this.z : vec4.z;
    const w = this.w > vec4.w ? this.w : vec4.w;

    if (dest) {
      dest.x = x;
      dest.y = y;
      dest.z = z;
      dest.w = w;
      return dest;
    }

    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    return this;
  }

  /**
   * Rounds the components of this vector to their floor, and stores it in dest if dest is present
   * @param {Vector4} dest Option destination vector
   * @returns {Vector4} this, or if dest is present, dest
   */
  floor(dest) {
    if (dest) {
      dest.x = Math.floor(this.x);
      dest.y = Math.floor(this.y);
      dest.z = Math.floor(this.z);
      dest.w = Math.floor(this.w);
      return dest;
    }

    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    this.z = Math.floor(this.z);
    this.w = Math.floor(this.w);
    return this;
  }

  /**
   * Rounds the components of this vector to their ceiling, and stores it in dest if dest is present
   * @param {Vector4} dest Option destination vector
   * @returns {Vector4} this, or if dest is present, dest
   */
  ceil(dest) {
    if (dest) {
      dest.x = Math.ceil(this.x);
      dest.y = Math.ceil(this.y);
      dest.z = Math.ceil(this.z);
      dest.w = Math.ceil(this.w);
      return dest;
    }

    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    this.z = Math.ceil(this.z);
    this.w = Math.ceil(this.w);
    return this;
  }

  /**
   * Rounds the components of this vector, and stores it in dest if dest is present
   * @param {Vector4} dest Option destination vector
   * @returns {Vector4} this, or if dest is present, dest
   */
  round(dest) {
    if (dest) {
      dest.x = Math.round(this.x);
      dest.y = Math.round(this.y);
      dest.z = Math.round(this.z);
      dest.w = Math.round(this.w);
      return dest;
    }

    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    this.z = Math.round(this.z);
    this.w = Math.round(this.w);
    return this;
  }

  /**
   * Calculates the absolute value of the components of this vector, and stores it in dest if dest is present
   * @param {Vector4} dest Option destination vector
   * @returns {Vector4} this, or if dest is present, dest
   */
  abs(dest) {
    if (dest) {
      dest.x = Math.abs(this.x);
      dest.y = Math.abs(this.y);
      dest.z = Math.abs(this.z);
      dest.w = Math.abs(this.w);
      return dest;
    }

    this.x = Math.abs(this.x);
    this.y = Math.abs(this.y);
    this.z = Math.abs(this.z);
    this.w = Math.abs(this.w);
    return this;
  }

  /**
   * Clones this Vector3 into a new instance
   * @returns {Vector4} a new Vector3 instance with the x and y values of this
   */
  clone() {
    return new Vector4(this.x, this.y, this.z, this.w);
  }
}

// TODO: matrix multiplications, FMA, orthogonalize?, half?, reflect, angle

export default Vector4;

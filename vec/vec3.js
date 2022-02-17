import Vector2 from './vec2.js';
import Vector4 from './vec4.js';

class Vector3 {
  /**
   * Constructs a new vector with the given arguments.
   * If no arguments are passed in, x and y are 0.
   * If one argument is passed in, x, y, and z are the value of that argument.
   * If two arguments are passed in, x is treated as a Vector2, and y is the z value
   * If three arguments are passed in, x, y, and z are their respective values
   * @param {number | Vector2} x the x value of the vector, or if this is the only argument present, the x and y value of the vector
   * @param {number} y the y value of the vector, of if x is a vec2, the z value of the vector
   * @param {number} z the z value of the vector
   */
  constructor(x, y, z) {
    switch (arguments.length) {
      // no args, default
      case 0:
        this.x = 0;
        this.y = 0;
        this.z = 0;
        break;
      // treat x as one value for all components
      case 1:
        this.x = x;
        this.y = x;
        this.z = x;
        break;
      // only x and y are present
      case 2:
        this.x = x.x;
        this.y = x.y;
        this.z = y;
        break;
      // x y and z are present
      case 3:
        this.x = x;
        this.y = y;
        this.z = z;
        break;
      default:
        throw new Error('Invalid number of arguments');
    }
  }

  /**
   * Sets this vector's components to be the given arguments. 
   * If no arguments are passed in, x, y, and z are 0.
   * If one argument is passed in, x, y, and z are the value of that argument, or it is treated as a Vector3.
   * If two arguments are passed in, x is treated as a Vector2, and y is the z value.
   * If three arguments are passed in, x, y, and z are their respective values.
   * @param {number | Vector2 | Vector3} x the x value of the vector, or if this is the only argument present, the x and y value of the vector
   * @param {number} y the y value of the vector, of if x is a vec2, the z value of the vector
   * @param {number} z the z value of the vector
   * @returns {Vector3} this object with the new values
   */
  set(x, y, z) {
    switch (arguments.length) {
      // treat x as one value for all components
      case 1:
        if (x instanceof Vector3) {
          this.x = x.x;
          this.y = x.y;
          this.z = x.z;
          break;
        }
        this.x = x;
        this.y = x;
        this.z = x;
        break;
      // only x and y are present
      case 2:
        if (!(x instanceof Vector2 && (typeof y) === 'number')) {
          throw new Error('Invalid argument types');
        }
        this.x = x.x;
        this.y = x.y;
        this.z = y;
        break;
      // x y and z are present
      case 3:
        this.x = x;
        this.y = y;
        this.z = z;
        break;
      default:
        throw new Error('Invalid number of arguments');
    }
    return this;
  }

  /**
   * Sets the components of this vector to 0
   * @returns {Vector3} this object with the new values
   */
  zero() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    return this;
  }

  /**
   * Returns this vector in an array form, ordered x then y then z.
   * @returns {Float32Array} the components of this vector as an array
   */
  getArray() {
    return new Float32Array([this.x, this.y, this.z]);
  }

  /**
   * Extends this vector to a Vector3 by adding the supplied z value as the z component.
   * @param {number} w the w component to extend onto this vector
   * @param {Vector4} dest optional vector to store the results in
   * @returns {Vector4} a new vector with the x, y, and z components set to the x, y, and z of this,
   *     stored in this, or dest if present, dest
   */
  extend(w, dest) {
    if (dest) {
      dest.x = this.x;
      dest.y = this.y;
      dest.z = this.z;
      dest.w = w;
      return dest;
    }

    return new Vector4(this.x, this.y, this.z, w);
  }

  /**
   * Adds the given x and y value to this vector, and stores it in dest if dest is present.
   * @param {number} x the x value to add to the value of the current object
   * @param {number} y the y value to add to the value of the current object
   * @param {number} z the z value to add to the value of the current object
   * @param {Vector3} dest optional vector to store the results in
   * @returns {Vector3} this, or if dest is present, dest
   */
  add(x, y, z, dest) {
    if (dest) {
      dest.x = this.x + x;
      dest.y = this.y + y;
      dest.z = this.z + z;
      return dest;
    }

    this.x += x;
    this.y += y;
    this.z += z;
    return this;
  }

  /**
   * Adds the given vector component values to this vector, and stores it in dest if dest is present.
   * @param {Vector3} vec3 the vector to add to the value of the current object
   * @param {Vector3} dest optional vector to store the results in
   * @returns {Vector3} this, or if dest is present, dest
   */
  addVec(vec3, dest) {
    if (dest) {
      dest.x = this.x + vec3.x;
      dest.y = this.y + vec3.y;
      dest.z = this.z + vec3.z;
      return dest;
    }

    this.x += vec3.x;
    this.y += vec3.y;
    this.z += vec3.z;
    return this;
  }

  /**
   * Adds the given x and y value to this vector, and stores it in dest if dest is present.
   * @param {number} x the x value to subtract from the value of the current object
   * @param {number} y the y value to subtract from the value of the current object
   * @param {number} z the z value to subtract from the value of the current object
   * @param {Vector3} dest optional vector to store the results in
   * @returns {Vector3} this, or if dest is present, dest
   */
  sub(x, y, z, dest) {
    if (dest) {
      dest.x = this.x - x;
      dest.y = this.y - y;
      dest.z = this.z - z;
      return dest;
    }

    this.x -= x;
    this.y -= y;
    this.z -= z;
    return this;
  }

  /**
   * Subtracts the given vector component values to this vector, and stores it in dest if dest is present.
   * @param {Vector3} vec3 the vector to subtract from the value of the current object
   * @param {Vector3} dest optional vector to store the results in
   * @returns {Vector3} this, or if dest is present, dest
   */
  subVec(vec3, dest) {
    if (dest) {
      dest.x = this.x - vec3.x;
      dest.y = this.y - vec3.y;
      dest.z = this.z - vec3.z;
      return dest;
    }

    this.x -= vec3.x;
    this.y -= vec3.y;
    this.z -= vec3.z;
    return this;
  }

  /**
   * Multiplies this vector's components by the given components
   * @param {number} x the x value to multiply this vector's x component by
   * @param {number} y the y value to multiply this vector's y component by
   * @param {number} z the z value to multiply this vector's z component by
   * @param {Vector3} dest optional vector to store the results in
   * @returns {Vector3} this, or if dest is present, dest
   */
  mul(x, y, z, dest) {
    if (dest) {
      dest.x = this.x * x;
      dest.y = this.y * y;
      dest.z = this.z * z;
      return dest;
    }

    this.x *= x;
    this.y *= y;
    this.z *= z;
    return this;
  }

  /**
   * Multiplies this vector by the given scalar
   * @param {number} scalar the scalar to multiply the components by
   * @param {Vector3} dest optional vector to store the results in
   * @returns {Vector3} this, or if dest is present, dest
   */
  mulScalar(scalar, dest) {
    return this.mul(scalar, scalar, scalar, dest);
  }

  /**
   * Multiplies this vector's components by the given vector's components
   * @param {Vector3} vec3 the vector who's components will multiply this vectors components
   * @param {Vector3} dest Option destination vector
   * @returns {Vector3} this, or if dest is present, dest
   */
  mulVec(vec3, dest) {
    return this.mul(vec3.x, vec3.y, vec3.z, dest);
  }

  /**
   * Divides this vector's components by the given components
   * @param {number} x the x value to divide this vector's x component by
   * @param {number} y the y value to divide this vector's y component by
   * @param {number} z the z value to divide this vector's z component by
   * @param {Vector3} dest optional vector to store the results in
   * @returns {Vector3} this, or if dest is present, dest
   */
  div(x, y, z, dest) {
    if (dest) {
      dest.x = this.x / x;
      dest.y = this.y / y;
      dest.z = this.z / z;
      return dest;
    }

    this.x /= x;
    this.y /= y;
    this.z /= z;
    return this;
  }

  /**
   * Divides this vector by the given scalar
   * @param {number} scalar the scalar to divide the components by
   * @param {Vector3} dest optional vector to store the results in
   * @returns {Vector3} this, or if dest is present, dest
   */
  divScalar(scalar, dest) {
    return this.div(scalar, scalar, scalar, dest);
  }

  /**
   * Divides this vector's components by the given vector's components
   * @param {Vector3} vec3 the vector who's components will divide this vectors components
   * @param {Vector3} dest Option destination vector
   * @returns {Vector3} this, or if dest is present, dest
   */
  divVec(vec3, dest) {
    return this.div(vec3.x, vec3.y, vec3.z, dest);
  }

  /**
   * Calculates and returns the length of this vector pre square root (length squared)
   * @returns {number} the length squared of this vector
   */
  lengthSquared() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
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
   * @returns {number} the distance squared between this vector and the given point
   */
  distanceSquared(x, y, z) {
    const dx = this.x - x;
    const dy = this.y - y;
    const dz = this.z - z;
    return dx * dx + dy * dy + dz * dz;
  }

  /**
   * Calculates the distance between this vector and a given point in 2d space
   * @param {number} x the x position to calculate the distance from
   * @param {number} y the y position to calculate the distance from
   * @param {number} z the z position to calculate the distance from
   * @returns {number} the distance between this vector and the given point
   */
  distance(x, y, z) {
    return Math.sqrt(this.distanceSquared(x, y, z));
  }

  /**
   * Calculates the distance squared between this vector and another vector
   * @param {Vector3} vec3 the vector to calculate the distance from
   * @returns {number} the distance squared between this vector and the other
   */
  distanceSquaredVec(vec3) {
    const dx = this.x - vec3.x;
    const dy = this.y - vec3.y;
    const dz = this.z - vec3.z;
    return dx * dx + dy * dy + dz * dz;
  }

  /**
   * Calculates the distance between this vector and another vector
   * @param {Vector3} vec3 the vector to calculate the distance from
   * @returns {number} the distance between this vector and the other
   */
  distanceVec(vec3) {
    return Math.sqrt(this.distanceSquaredVec(vec3));
  }

  /**
   * Normalize the components of this vector to make their combined length equal to len
   * @param {number} len the resultant length of this vector
   * @param {Vector3} dest optional vector to store the results in
   * @returns {Vector3} this, or if dest is present, dest
   */
  normalizeToLen(len, dest) {
    const invLen = (1 / this.length()) * len;
    const x = this.x * invLen;
    const y = this.y * invLen;
    const z = this.z * invLen;

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
   * Normalize the components of this vector to make their combined length equal to 1
   * @param {Vector3} dest optional vector to store the results in
   * @returns {Vector3} this, or if dest is present, dest
   */
  normalize(dest) {
    return this.normalizeToLen(1, dest);
  }

  /**
   * Calculates the cross produced between this vector and a vector represented by x y z
   * @param {number} x the x value of the other vector to cross this vector with
   * @param {number} y the y value of the other vector to cross this vector with
   * @param {number} z the z value of the other vector to cross this vector with
   * @param {Vector3} dest optional vector to store the results in
   * @returns {Vector3} the cross produced stored in this, or if dest is present, dest
   */
  cross(x, y, z, dest) {
    const rx = this.y * z - this.z * y;
    const ry = this.z * x - this.x * z;
    const rz = this.x * y - this.y * x;

    if (dest) {
      dest.x = rx;
      dest.y = ry;
      dest.z = rz;
      return dest;
    }

    this.x = rx;
    this.y = ry;
    this.z = rz;
    return this;
  }

  /**
   * Calculates the cross produced between this vector and a given value
   * @param {Vector3} vec3 the other vector to calculate the cross product on
   * @param {Vector3} dest optional vector to store the results in
   * @returns {Vector3} the cross produced stored in this, or if dest is present, dest
   */
  crossVec(vec3, dest) {
    return this.cross(vec3.x, vec3.y, vec3.z, dest);
  }

  /**
   * Calculates the dot product between two vectors, this and the passed in vector
   * @param {Vector3} vec3 The other vector to calculate the dot on
   * @returns {number} the dot product between this vector and the passed in vector
   */
  dot(vec3) {
    return this.x * vec3.x + this.y * vec3.y + this.z * vec3.z;
  }

  /**
   * Calculates the linear interpolation between this and the other vector
   * @param {Vector3} other the other vector to interpolate from
   * @param {number} t the progress (0-1) of the lerp
   * @param {Vector3} dest optional vector to store the results in
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
   * @param {Vector3} dest optional vector to store the results in
   * @returns {Vector3} this, or if dest is present, dest
   */
  negate(dest) {
    if (dest) {
      dest.x = -this.x;
      dest.y = -this.y;
      dest.z = -this.z;
      return dest;
    }

    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this;
  }

  /**
   * Calculates and returns the min components between this and the passed in vector. Optionally stores the result in dest
   * @param {Vector3} vec3 the other vector to find the min component of
   * @param {Vector3} dest Option destination vector
   * @returns {Vector3} stores the min components between this and vec3 and stores in this, or if dest is present, dest
   */
  min(vec3, dest) {
    const x = this.x < vec3.x ? this.x : vec3.x;
    const y = this.y < vec3.y ? this.y : vec3.y;
    const z = this.z < vec3.z ? this.z : vec3.z;

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
   * Calculates and returns the max components between this and the passed in vector. Optionally stores the result in dest
   * @param {Vector3} vec3 the other vector to find the max component of
   * @param {Vector3} dest Option destination vector
   * @returns {Vector3} stores the max components between this and vec3 and stores in this, or if dest is present, dest
   */
  max(vec3, dest) {
    const x = this.x > vec3.x ? this.x : vec3.x;
    const y = this.y > vec3.y ? this.y : vec3.y;
    const z = this.z > vec3.z ? this.z : vec3.z;

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
   * Rounds the components of this vector to their floor, and stores it in dest if dest is present
   * @param {Vector3} dest Option destination vector
   * @returns {Vector3} this, or if dest is present, dest
   */
  floor(dest) {
    if (dest) {
      dest.x = Math.floor(this.x);
      dest.y = Math.floor(this.y);
      dest.z = Math.floor(this.z);
      return dest;
    }

    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    this.z = Math.floor(this.z);
    return this;
  }

  /**
   * Rounds the components of this vector to their ceiling, and stores it in dest if dest is present
   * @param {Vector3} dest Option destination vector
   * @returns {Vector3} this, or if dest is present, dest
   */
  ceil(dest) {
    if (dest) {
      dest.x = Math.ceil(this.x);
      dest.y = Math.ceil(this.y);
      dest.z = Math.ceil(this.z);
      return dest;
    }

    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    this.z = Math.ceil(this.z);
    return this;
  }

  /**
   * Rounds the components of this vector, and stores it in dest if dest is present
   * @param {Vector3} dest Option destination vector
   * @returns {Vector3} this, or if dest is present, dest
   */
  round(dest) {
    if (dest) {
      dest.x = Math.round(this.x);
      dest.y = Math.round(this.y);
      dest.z = Math.round(this.z);
      return dest;
    }

    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    this.z = Math.round(this.z);
    return this;
  }

  /**
   * Calculates the absolute value of the components of this vector, and stores it in dest if dest is present
   * @param {Vector3} dest Option destination vector
   * @returns {Vector3} this, or if dest is present, dest
   */
  abs(dest) {
    if (dest) {
      dest.x = Math.abs(this.x);
      dest.y = Math.abs(this.y);
      dest.z = Math.abs(this.z);
      return dest;
    }

    this.x = Math.abs(this.x);
    this.y = Math.abs(this.y);
    this.z = Math.abs(this.z);
    return this;
  }

  /**
   * Clones this Vector3 into a new instance
   * @returns {Vector3} a new Vector3 instance with the x and y values of this
   */
  clone() {
    return new Vector3(this.x, this.y, this.z);
  }
}

// TODO: matrix multiplications, FMA, orthogonalize?, half?, reflect, angle

export default Vector3;

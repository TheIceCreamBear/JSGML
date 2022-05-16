import Vector3 from './vec3.js';

class Vector2 {
  /**
   * Constructs a new vector with the given arguments.
   * If no arguments are passed in, x and y are 0.
   * If one argument is passed in, x and y are the value of that argument.
   * If two arguments are passed in, x and y are the values of their respective arguments.
   * @param {number} x the x value of the vector, or if this is the only argument present, the x and y value of the vector
   * @param {number} y the y value of the vector
   */
  constructor(x, y) {
    switch (arguments.length) {
      // no args, default
      case 0:
        this.x = 0;
        this.y = 0;
        break;
      // treat x as one
      case 1:
        this.x = x;
        this.y = x;
        break;
      // both x and y are present
      case 2:
        this.x = x;
        this.y = y;
        break;
      default:
        throw new Error('Invalid number of arguments');
    }
  }

  /**
   * Sets this vector's components to be the given arguments.
   * If one argument is passed in, x and y are the value of that argument, or it is treated as a Vector2.
   * If two arguments are passed in, x and y are the values of their respective arguments.
   * @param {number | Vector2} x the x value of the vector, or if this is the only argument present, the x and y value of the vector
   * @param {number} y the y value of the vector
   * @returns {Vector2} this object with the new values
   */
  set(x, y) {
    switch (arguments.length) {
      // treat x as one value for both components
      case 1:
        if (x instanceof Vector2) {
          this.x = x.x;
          this.y = x.y;
          break;
        }
        this.x = x;
        this.y = x;
        break;
      // both x and y are present
      case 2:
        this.x = x;
        this.y = y;
        break;
      default:
        throw new Error('Invalid number of arguments');
    }
    return this;
  }

  /**
   * Sets the components of this vector to 0
   * @returns {Vector2} this object with the new values
   */
  zero() {
    this.x = 0;
    this.y = 0;
    return this;
  }

  /**
   * Returns this vector in an array form, ordered x then y.
   * @returns {Float32Array} the components of this vector as an array
   */
  getArray() {
    return new Float32Array([this.x, this.y]);
  }

  /**
   * Extends this vector to a Vector3 by adding the supplied z value as the z component.
   * @param {number} z the z component to extend onto this vector
   * @param {Vector3} dest optional vector to store the results in
   * @returns {Vector3} a new vector with the x and y components set to the x and y of this, or dest if present
   */
  extend(z, dest) {
    if (dest) {
      dest.x = this.x;
      dest.y = this.y;
      dest.z = z;
      return dest;
    }

    return new Vector3(this.x, this.y, z);
  }

  /**
   * Adds the given x and y value to this vector, and stores it in dest if dest is present.
   * @param {number} x the x value to add to the value of the current object
   * @param {number} y the y value to add to the value of the current object
   * @param {Vector2} dest optional vector to store the results in
   * @returns {Vector2} this, or if dest is present, dest
   */
  add(x, y, dest = this) {
    dest.x = this.x + x;
    dest.y = this.y + y;
    return dest;
  }

  /**
   * Adds the given vector component values to this vector, and stores it in dest if dest is present.
   * @param {Vector2} vec2 the vector to add to the value of the current object
   * @param {Vector2} dest optional vector to store the results in
   * @returns {Vector2} this, or if dest is present, dest
   */
  addVec(vec2, dest = this) {
    dest.x = this.x + vec2.x;
    dest.y = this.y + vec2.y;
    return dest;
  }

  /**
   * Subtracts the given x and y value to this vector, and stores it in dest if dest is present.
   * @param {number} x the x value to subtract from the value of the current object
   * @param {number} y the y value to subtract from the value of the current object
   * @param {Vector2} dest optional vector to store the results in
   * @returns {Vector2} this, or if dest is present, dest
   */
  sub(x, y, dest = this) {
    dest.x = this.x - x;
    dest.y = this.y - y;
    return dest;
  }

  /**
   * Subtracts the given vector component values to this vector, and stores it in dest if dest is present.
   * @param {Vector2} vec2 the vector to subtract from the value of the current object
   * @param {Vector2} dest optional vector to store the results in
   * @returns {Vector2} this, or if dest is present, dest
   */
  subVec(vec2, dest = this) {
    dest.x = this.x - vec2.x;
    dest.y = this.y - vec2.y;
    return dest;
  }

  /**
   * Multiplies this vector's components by the given components
   * @param {number} x the x value to multiply this vector's x component by
   * @param {number} y the y value to multiply this vector's y component by
   * @param {Vector2} dest optional vector to store the results in
   * @returns {Vector2} this, or if dest is present, dest
   */
  mul(x, y, dest = this) {
    dest.x = this.x * x;
    dest.y = this.y * y;
    return dest;
  }

  /**
   * Multiplies this vector by the given scalar
   * @param {number} scalar the scalar to multiply the components by
   * @param {Vector2} dest optional vector to store the results in
   * @returns {Vector2} this, or if dest is present, dest
   */
  mulScalar(scalar, dest) {
    return this.mul(scalar, scalar, dest);
  }

  /**
   * Multiplies this vector's components by the given vector's components
   * @param {Vector2} vec2 the vector who's components will multiply this vectors components
   * @param {Vector2} dest optional vector to store the results in
   * @returns {Vector2} this, or if dest is present, dest
   */
  mulVec(vec2, dest) {
    return this.mul(vec2.x, vec2.y, dest);
  }

  /**
   * Multiplies the given matrix by this vector, and store the result in this, or dest if present
   * @typedef {import('../mat/mat2.js').default} Matrix2
   * @param {Matrix2} mat2 the matrix to multiply this vector by
   * @param {Vector2} dest optional vector to store the results in
   * @returns {Vector2} this, or if dest is present, dest
   */
  mulMat(mat2, dest = this) {
    const x = mat2.m00 * this.x + mat2.m10 * this.y;
    const y = mat2.m01 * this.x + mat2.m11 * this.y;

    dest.x = x;
    dest.y = y;

    return dest;
  }

  /**
   * Multiplies the transpose of the given matrix by this vector, and store the result in this, or dest if present
   * @typedef {import('../mat/mat2.js').default} Matrix2
   * @param {Matrix2} mat2 the matrix to multiply this vector by
   * @param {Vector2} dest optional vector to store the results in
   * @returns {Vector2} this, or if dest is present, dest
   */
  mulMatTranspose(mat2, dest = this) {
    const x = mat2.m00 * this.x + mat2.m01 * this.y;
    const y = mat2.m10 * this.x + mat2.m11 * this.y;

    dest.x = x;
    dest.y = y;

    return dest;
  }

  /**
   * Divides this vector's components by the given components
   * @param {number} x the x value to divide this vector's x component by
   * @param {number} y the y value to divide this vector's y component by
   * @param {Vector2} dest optional vector to store the results in
   * @returns {Vector2} this, or if dest is present, dest
   */
  div(x, y, dest = this) {
    dest.x = this.x / x;
    dest.y = this.y / y;
    return dest;
  }

  /**
   * Divides this vector by the given scalar
   * @param {number} scalar the scalar to divide the components by
   * @param {Vector2} dest optional vector to store the results in
   * @returns {Vector2} this, or if dest is present, dest
   */
  divScalar(scalar, dest) {
    return this.div(scalar, scalar, dest);
  }

  /**
   * Divides this vector's components by the given vector's components
   * @param {Vector2} vec2 the vector who's components will divide this vectors components
   * @param {Vector2} dest optional vector to store the results in
   * @returns {Vector2} this, or if dest is present, dest
   */
  divVec(vec2, dest) {
    return this.div(vec2.x, vec2.y, dest);
  }

  /**
   * Calculates the dot product between two vectors, this and the passed in vector
   * @param {Vector2} vec2 The other vector to calculate the dot on
   * @returns {number} the dot product between this vector and the passed in vector
   */
  dot(vec2) {
    return this.x * vec2.x + this.y * vec2.y;
  }

  /**
   * Calculates the angle in radians from the X axis between this vector and the passed in vector
   * @param {Vector2} vec2 the other vector to calculate the angle between
   * @returns {number} the angle (in radians) from the X axis between this vector and the passed in vector
   * @see {@link Math.atan2}
   */
  angle(vec2) {
    const dot = this.x * vec2.x + this.y * vec2.y;
    const det = this.x * vec2.x - this.y * vec2.y;
    return Math.atan2(det, dot);
  }

  /**
   * Calculates and returns the length of this vector pre square root (length squared)
   * @returns {number} the length squared of this vector
   */
  lengthSquared() {
    return this.x * this.x + this.y * this.y;
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
   * @returns {number} the distance squared between this vector and the given point
   */
  distanceSquared(x, y) {
    const dx = this.x - x;
    const dy = this.y - y;
    return dx * dx + dy * dy;
  }

  /**
   * Calculates the distance between this vector and a given point in 2d space
   * @param {number} x the x position to calculate the distance from
   * @param {number} y the y position to calculate the distance from
   * @returns {number} the distance between this vector and the given point
   */
  distance(x, y) {
    return Math.sqrt(this.distanceSquared(x, y));
  }

  /**
   * Calculates the distance squared between this vector and another vector
   * @param {Vector2} vec2 the vector to calculate the distance from
   * @returns {number} the distance squared between this vector and the other
   */
  distanceSquaredVec(vec2) {
    const dx = this.x - vec2.x;
    const dy = this.y - vec2.y;
    return dx * dx + dy * dy;
  }

  /**
   * Calculates the distance between this vector and another vector
   * @param {Vector2} vec2 the vector to calculate the distance from
   * @returns {number} the distance between this vector and the other
   */
  distanceVec(vec2) {
    return Math.sqrt(this.distanceSquaredVec(vec2));
  }

  /**
   * Normalize the components of this vector to make their combined length equal to len
   * @param {number} len the resultant length of this vector
   * @param {Vector2} dest optional vector to store the results in
   * @returns {Vector2} this, or if dest is present dest
   */
  normalizeToLen(len, dest = this) {
    const invLen = (1 / this.length()) * len;
    const x = this.x * invLen;
    const y = this.y * invLen;

    dest.x = x;
    dest.y = y;
    return dest;
  }

  /**
   * Normalize the components of this vector to make their combined length equal to 1
   * @param {Vector2} dest optional vector to store the results in
   * @returns {Vector2} this, or if dest is present dest
   */
  normalize(dest) {
    return this.normalizeToLen(1, dest);
  }

  /**
   * Negates this vector by individual components, and stores it in dest if present
   * @param {Vector2} dest optional vector to store the results in
   * @returns {Vector2} this, or if dest is present dest
   */
  negate(dest = this) {
    dest.x = -this.x;
    dest.y = -this.y;
    return dest;
  }

  /**
   * Calculates the linear interpolation between this and the other vector
   * @param {Vector2} other the other vector to interpolate from
   * @param {number} t the progress (0-1) of the lerp
   * @param {Vector2} dest optional vector to store the results in
   * @returns {Vector2} the resultant vector, stored in this, or if dest is present, dest
   */
  lerp(other, t, dest = this) {
    const x = this.x + (other.x - this.x) * t;
    const y = this.y + (other.y - this.y) * t;

    dest.x = x;
    dest.y = y;
    return dest;
  }

  /**
   * Calculates and returns the min components between this and the passed in vector. Optionally stores the result in dest
   * @param {Vector2} vec2 the other vector to find the min component of
   * @param {Vector2} dest optional vector to store the results in
   * @returns {Vector2} stores the min components between this and vec2 and stores in this, or if dest is present, dest
   */
  min(vec2, dest = this) {
    const x = this.x < vec2.x ? this.x : vec2.x;
    const y = this.y < vec2.y ? this.y : vec2.y;

    dest.x = x;
    dest.y = y;
    return dest;
  }

  /**
   * Calculates and returns the max components between this and the passed in vector. Optionally stores the result in dest
   * @param {Vector2} vec2 the other vector to find the max component of
   * @param {Vector2} dest optional vector to store the results in
   * @returns {Vector2} stores the max components between this and vec2 and stores in this, or if dest is present, dest
   */
  max(vec2, dest = this) {
    const x = this.x > vec2.x ? this.x : vec2.x;
    const y = this.y > vec2.y ? this.y : vec2.y;

    dest.x = x;
    dest.y = y;
    return dest;
  }

  /**
   * Rounds the components of this vector to their floor, and stores it in dest if dest is present
   * @param {Vector2} dest optional vector to store the results in
   * @returns {Vector2} this, or if dest is present, dest
   */
  floor(dest = this) {
    dest.x = Math.floor(this.x);
    dest.y = Math.floor(this.y);
    return dest;
  }

  /**
   * Rounds the components of this vector to their ceiling, and stores it in dest if dest is present
   * @param {Vector2} dest optional vector to store the results in
   * @returns {Vector2} this, or if dest is present, dest
   */
  ceil(dest = this) {
    dest.x = Math.ceil(this.x);
    dest.y = Math.ceil(this.y);
    return dest;
  }

  /**
   * Rounds the components of this vector, and stores it in dest if dest is present
   * @param {Vector2} dest optional vector to store the results in
   * @returns {Vector2} this, or if dest is present, dest
   */
  round(dest = this) {
    dest.x = Math.round(this.x);
    dest.y = Math.round(this.y);
    return dest;
  }

  /**
   * Calculates the absolute value of the components of this vector, and stores it in dest if dest is present
   * @param {Vector2} dest optional vector to store the results in
   * @returns {Vector2} this, or if dest is present, dest
   */
  abs(dest = this) {
    dest.x = Math.abs(this.x);
    dest.y = Math.abs(this.y);
    return dest;
  }

  /**
   * Clones this vector2 into a new instance
   * @returns {Vector2} a new Vector2 instance with the x and y values of this
   */
  clone() {
    return new Vector2(this.x, this.y);
  }
}

export default Vector2;

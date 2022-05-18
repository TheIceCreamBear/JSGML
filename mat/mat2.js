import { Vector2 } from '../index.js';

/**
 * Column-major 2x2 matrix. Elements are:
 *  m00 m10
 *  m01 m11
 */
class Matrix2 {
  /**
   * Constructs a new 2x2 matrix in column major order. Behavior changes based on # of arguments.
   * If no arguments are passed in, this matrix is set to an identity. (m00 and m11 are set to 1, with the rest being 0)
   * If one argument is passed in, there are three options:
   *    If it is an Array, the elements of the matrix are filled in with the elements of the array, with the order being m00, m01, m10, and m11
   *    If it is a Matrix2, the elements of that matrix are copied to this matrix.
   *    If it is a Matrix3, the upper left corner of that matrix will be copied to this matrix.
   * If two arguments are passed in, m00 is a Vector2 with x being m00 and y being m01, and m01 is also a Vector2 with x being this.m10 and y being this.m11
   * @param {number | Float32Array | Matrix2 | Vector2} m00 the element in the 0th col and 0th row
   * @param {number | Vector2} m01 the the element in the 0th col and 1st row
   * @param {number} m10 the element in the 1st col and 0th row
   * @param {number} m11 the element in the 1st col and 1st row
   */
  constructor(m00, m01, m10, m11) {
    switch (arguments.length) {
      // nothing, use the identity
      case 0:
        this.identity();
        break;
      // first argument is an array, another matrix2, or a matrix3 TODO
      case 1:
        if (m00 instanceof Array) {
          if (m00.length != 4) {
            throw new Error('Invlaid array matrix');
          }
          this.m00 = m00[0];
          this.m01 = m00[1];
          this.m10 = m00[2];
          this.m11 = m00[3];
        } else if (m00 instanceof Matrix2) {
          this.m00 = m00.m00;
          this.m01 = m00.m01;
          this.m10 = m00.m10;
          this.m11 = m00.m11;
          // } else if (m00 instanceof ) {
          // TODO: matrix3
        } else {
          throw new Error('Invalid argument types');
        }
        break;
      // first two args are Vector2s
      case 2:
        if (!(m00 instanceof Vector2 && m01 instanceof Vector2)) {
          throw new Error('Invalid argument types');
        }
        this.m00 = m00.x;
        this.m01 = m00.y;
        this.m10 = m01.x;
        this.m11 = m01.y;
        break;
      // each argument is its own type
      case 4:
        this.m00 = m00;
        this.m01 = m01;
        this.m10 = m10;
        this.m11 = m11;
        break;
      default:
        throw new Error('Invalid number of arguments');
    }
  }

  /**
   * Sets this matrix to its identity, with the diagonal being 1 and the rest being 0
   * @returns {Matrix2} this set to an identity
   */
  identity() {
    this.m00 = 1;
    this.m11 = 1;
    this.m01 = 0;
    this.m10 = 0;

    return this;
  }

  /**
   * Sets this matrix to contain all zeros
   * @returns {Matrix2} this set to zero
   */
  zero() {
    this.m00 = 0;
    this.m11 = 0;
    this.m01 = 0;
    this.m10 = 0;

    return this;
  }

  /**
   * Sets the values of this 2x2 matrix in column major order. Behavior changes based on # of arguments.
   * If no arguments are passed in, this matrix is set to an identity. (m00 and m11 are set to 1, with the rest being 0)
   * If one argument is passed in, there are three options:
   *    If it is an Array, the elements of the matrix are filled in with the elements of the array, with the order being m00, m01, m10, and m11
   *    If it is a Matrix2, the elements of that matrix are copied to this matrix.
   *    If it is a Matrix3, the upper left corner of that matrix will be copied to this matrix.
   * If two arguments are passed in, m00 is a Vector2 with x being this.m00 and y being this.m01, and m01 is also a Vector2 with x being this.m10 and y being this.m11
   * @param {number | Float32Array | Matrix2 | Vector2} m00 the element in the 0th col and 0th row
   * @param {number | Vector2} m01 the the element in the 0th col and 1st row
   * @param {number} m10 the element in the 1st col and 0th row
   * @param {number} m11 the element in the 1st col and 1st row
   * @returns {Matrix2} this object with the new values
   */
  set(m00, m01, m10, m11) {
    switch (arguments.length) {
      // first argument is an array, another matrix2, or a matrix3 TODO
      case 1:
        if (m00 instanceof Array) {
          if (m00.length != 4) {
            throw new Error('Invlaid array matrix');
          }
          this.m00 = m00[0];
          this.m01 = m00[1];
          this.m10 = m00[2];
          this.m11 = m00[3];
        } else if (m00 instanceof Matrix2) {
          this.m00 = m00.m00;
          this.m01 = m00.m01;
          this.m10 = m00.m10;
          this.m11 = m00.m11;
          // } else if (m00 instanceof ) {
          // TODO: matrix3
        } else {
          throw new Error('Invalid argument types');
        }
        break;
      // first two args are Vector2s
      case 2:
        if (!(m00 instanceof Vector2 && m01 instanceof Vector2)) {
          throw new Error('Invalid argument types');
        }
        this.m00 = m00.x;
        this.m01 = m00.y;
        this.m10 = m01.x;
        this.m11 = m01.y;
        break;
      // each argument is its own type
      case 4:
        this.m00 = m00;
        this.m01 = m01;
        this.m10 = m10;
        this.m11 = m11;
        break;
      default:
        throw new Error('Invalid number of arguments');
    }

    return this;
  }

  /**
   * Creates and returns a new array representing this matrix in a column major format
   * @returns {Float32Array} this matrix as an array, in column major order
   */
  getArray() {
    return [this.m00, this.m01, this.m10, this.m11];
  }

  /**
   * Calculates the determinate of this matrix
   * @returns {number} the determinate of this matrix
   */
  determinate() {
    return this.m00 * this.m11 - this.m01 * this.m10;
  }

  /**
   * Inverts this matrix, and optionally stores it in dest
   * @param {Matrix2} dest optional matrix to store the results in
   * @returns {Matrix2} this, or if dest is present, dest
   */
  invert(dest) {
    const det = this.determinate();
    const nm00 = this.m00 / det;
    const nm01 = this.m01 / det;
    const nm10 = this.m10 / det;
    const nm11 = this.m11 / det;

    if (!dest) {
      dest = this;
    }
    
    dest.m00 = nm00;
    dest.m01 = nm01;
    dest.m10 = nm10;
    dest.m11 = nm11;

    return dest;
  }

  /**
   * Calculates the transpose of this matrix, stores the result in dest if present
   * @param {Matrix2} dest optional matrix to store the results in
   * @returns {Matrix2} this, or if dest is present, dest
   */
  transpose(dest) {
    if (!dest) {
      dest = this;
    }

    dest.m00 = this.m00;
    dest.m10 = this.m01;
    dest.m01 = this.m10;
    dest.m11 = this.m11;

    return dest;
  }

  /**
   * Adds the other matrix to this matrix, stores the result in dest if present
   * @param {Matrix2} other the matrix to add to this matrix
   * @param {Matrix2} dest optional matrix to store the results in
   * @returns {Matrix2} this, or if dest is present, dest
   */
  add(other, dest) {
    if (!dest) {
      dest = this;
    }

    dest.m00 = this.m00 + other.m00;
    dest.m01 = this.m01 + other.m01;
    dest.m10 = this.m10 + other.m10;
    dest.m11 = this.m11 + other.m11;

    return dest;
  }

  /**
   * Subtracts the other matrix to this matrix, stores the result in dest if present
   * @param {Matrix2} other the matrix to subtract to this matrix
   * @param {Matrix2} dest optional matrix to store the results in
   * @returns {Matrix2} this, or if dest is present, dest
   */
  sub(other, dest) {
    if (!dest) {
      dest = this;
    }

    dest.m00 = this.m00 - other.m00;
    dest.m01 = this.m01 - other.m01;
    dest.m10 = this.m10 - other.m10;
    dest.m11 = this.m11 - other.m11;

    return dest;
  }

  /**
   * Multiplies this matrix by the other matrix, and stores the result in this, or dest if present
   * 
   * If this matrix is T, and the other matrix is O, then the result will be R = T x O
   * @param {Matrix2} right the matrix to multiply on the right of this
   * @param {Matrix2} dest optional matrix to store the results in
   * @returns {Matrix2} this, or if dest is present, dest
   */
  mul(right, dest) {
    const nm00 = this.m00 * right.m00 + this.m10 * right.m01;
    const nm01 = this.m01 * right.m00 + this.m11 * right.m01;
    const nm10 = this.m00 * right.m10 + this.m10 * right.m11;
    const nm11 = this.m01 * right.m10 + this.m11 * right.m11;

    if (!dest) {
      dest = this;
    }

    dest.m00 = nm00;
    dest.m01 = nm01;
    dest.m10 = nm10;
    dest.m11 = nm11;

    return dest;
  }

  /**
   * Multiplies the other matrix by this matrix, and stores the result in this, or dest if present
   * 
   * If this matrix is T, and the other matrix is O, then the result will be R = O x T
   * @param {Matrix2} left the matrix to multiply on the left of this
   * @param {Matrix2} dest optional matrix to store the results in
   * @returns {Matrix2} this, or if dest is present, dest
   */
  mulLeft(left, dest) {
    const nm00 = left.m00 * this.m00 + left.m10 * this.m01;
    const nm01 = left.m01 * this.m00 + left.m11 * this.m01;
    const nm10 = left.m00 * this.m10 + left.m10 * this.m11;
    const nm11 = left.m01 * this.m10 + left.m11 * this.m11;

    if (!dest) {
      dest = this;
    }

    dest.m00 = nm00;
    dest.m01 = nm01;
    dest.m10 = nm10;
    dest.m11 = nm11;

    return dest;
  }

  /**
   * Multiplies this Matrix's components by the other's components, stores the result in dest if present
   * @param {Matrix2} other the matrix to multiply on the left of this
   * @param {Matrix2} dest optional matrix to store the results in
   * @returns {Matrix2} this, or if dest is present, dest
   */
  mulComponentWise(other, dest) {
    if (!dest) {
      dest = this;
    }

    dest.m00 = this.m00 * other.m00;
    dest.m01 = this.m01 * other.m01;
    dest.m10 = this.m10 * other.m10;
    dest.m11 = this.m11 * other.m11;

    return dest;
  }

  /**
   * Scale this matrix by the given values in each direction
   * @param {number} x the x value to scale by
   * @param {number} y the y value to scale by
   * @param {Matrix2} dest optional matrix to store the results in
   * @returns {Matrix2} this, or if dest is present, dest
   */
  scale(x, y, dest) {
    const nm00 = this.m00 * x;
    const nm01 = this.m01 * x;
    const nm10 = this.m10 * y;
    const nm11 = this.m11 * y;

    if (!dest) {
      dest = this;
    }

    dest.m00 = nm00;
    dest.m01 = nm01;
    dest.m10 = nm10;
    dest.m11 = nm11;

    return dest;
  }

  /**
   * Scale this matrix by the given values in the vector in each direction
   * @param {Vector2} vec2 the vector containing the x and y values to scale this matrix by
   * @param {Matrix2} dest optional matrix to store the results in
   * @returns {Matrix2} this, or if dest is present, dest
   */
  scaleVec(vec2, dest) {
    return this.scale(vec2.x, vec2.y, dest);
  }

  /**
   * Scales this matrix by the given value in both directions
   * @param {number} scalar the number uniformly to scale this matrix by
   * @param {Matrix2} dest optional matrix to store the results in
   * @returns {Matrix2} this, or if dest is present, dest
   */
  scaleScalar(scalar, dest) {
    return this.scale(scalar, scalar, dest);
  }

  /**
   * Sets this matrix to represent a scaling matrix with the given values
   * @param {number} x the x value to scale by
   * @param {number} y the y value to scale by
   * @returns {Matrix2} this
   */
  scaling(x, y) {
    this.zero();

    this.m00 = x;
    this.m11 = y;

    return this;
  }

  /**
   * Sets this matrix to represent a scaling based on the values in the vec
   * @param {Vector2} vec2 the vector containing the values to scale by
   * @returns {Matrix2} this
   */
  scalingVec(vec2) {
    return this.scaling(vec2.x, vec2.y);
  }

  /**
   * Sets this matrix to represent a uniform scaling
   * @param {number} scalar the value to scale by
   * @returns {Matrix2} this
   */
  scalingUniform(scalar) {
    return this.scaling(scalar, scalar);
  }

  /**
   * Rotates this matrix about the origin by the given angle
   * @param {number} angle the angle to rotate, defined in radians
   * @param {Matrix2} dest optional matrix to store the results in
   * @returns {Matrix2} this, or if dest is present, dest
   */
  rotate(angle, dest) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    const nm00 = this.m00 * cos + this.m10 * sin;
    const nm01 = this.m01 * cos + this.m11 * sin;
    const nm10 = this.m10 * cos - this.m00 * sin;
    const nm11 = this.m11 * cos - this.m01 * sin;

    if (!dest) {
      dest = this;
    }

    dest.m00 = nm00;
    dest.m01 = nm01;
    dest.m10 = nm10;
    dest.m11 = nm11;

    return dest;
  }

  /**
   * Rotates this matrix about the origin by the given angle. This takes place on the
   * left side of the matrix, and will be applied after a scaling operation
   * @param {number} angle the angle to rotate, defined in radians
   * @param {Matrix2} dest optional matrix to store the results in
   * @returns {Matrix2} this, or if dest is present, dest
   */
  rotateLeft(angle, dest) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    const nm00 = cos * this.m00 - sin * this.m01;
    const nm01 = sin * this.m00 + cos * this.m01;
    const nm10 = cos * this.m10 - sin * this.m11;
    const nm11 = sin * this.m10 + cos * this.m11;

    if (!dest) {
      dest = this;
    }

    dest.m00 = nm00;
    dest.m01 = nm01;
    dest.m10 = nm10;
    dest.m11 = nm11;

    return dest;
  }

  /**
   * Sets this matrix to represent a rotation around the origin of the given angle
   * @param {number} angle the angle to rotate, defined in radians
   * @returns {Matrix2} this
   */
  rotation(angle) {
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    this.m00 = cos;
    this.m01 = sin;
    this.m10 = -sin;
    this.m11 = cos;

    return this;
  }

  /**
   * Transforms the given vector by this matrix
   * @see {@link Vector2.mulMat}
   * @param {Vector2} vec2 the vector to transform
   * @param {Vector2} dest optional vector to store the results in
   * @returns {Vector2} vec2, or if dest is present, dest
   */
  transform(vec2, dest) {
    return vec2.mulMat(this, dest);
  }

  /**
   * Transforms the given x and y values by this matrix and stores the result in dest
   * @param {number} x the x value to transform
   * @param {number} y the y value to transform
   * @param {Vector2} dest required vector to store the results in
   * @returns {Vector2} vec2, or if dest is present, dest
   */
  transformXY(x, y, dest) {
    if (!dest) {
      throw new Error('Dest must be present');
    }

    const nx = this.m00 * x + this.m10 * y;
    const ny = this.m01 * y + this.m11 * y;

    return dest.set(nx, ny);
  }

  /**
   * Transforms the given vector by the transpose of this matrix
   * @see {@link Vector2.mulMat}
   * @param {Vector2} vec2 the vector to transform
   * @param {Vector2} dest optional vector to store the results in
   * @returns {Vector2} vec2, or if dest is present, dest
   */
  transformTranspose(vec2, dest) {
    return vec2.mulMatTranspose(this, dest);
  }

  /**
   * Transforms the given x and y values by the transpose of this matrix and stores the result in dest
   * @param {number} x the x value to transform
   * @param {number} y the y value to transform
   * @param {Vector2} dest required vector to store the results in
   * @returns {Vector2} vec2, or if dest is present, dest
   */
  transformXYTranspose(x, y, dest) {
    if (!dest) {
      throw new Error('Dest must be present');
    }

    const nx = this.m00 * x + this.m01 * y;
    const ny = this.m10 * y + this.m11 * y;

    return dest.set(nx, ny);
  }

  /**
   * Calculates the normal matrix of this matrix, and stores it in this, or dest if present
   * @param {Matrix2} dest optional matrix to store the results in
   * @returns {Matrix2} this, or if dest is present, dest
   */
  normal(dest) {
    const scalar = 1 / this.determinate();
    const nm00 = this.m11 * scalar;
    const nm01 = this.m10 * scalar;
    const nm10 = this.m01 * scalar;
    const nm11 = this.m00 * scalar;

    if (!dest) {
      dest = this;
    }

    dest.m00 = nm00;
    dest.m01 = nm01;
    dest.m10 = nm10;
    dest.m11 = nm11;

    return dest;
  }

  /**
   * Calculates the linter interpolation between this matrix and the other
   * @param {Matrix2} other the other matrix to interpolate between
   * @param {number} t the progress of the lerp
   * @param {Matrix2} dest optional matrix to store the results in
   * @returns {Matrix2} this, or if dest is present, dest
   */
  lerp(other, t, dest) {
    if (!dest) {
      dest = this;
    }

    dest.m00 = (other.m00 - this.m00) * t + this.m00;
    dest.m01 = (other.m01 - this.m01) * t + this.m01;
    dest.m10 = (other.m10 - this.m10) * t + this.m10;
    dest.m11 = (other.m11 - this.m11) * t + this.m11;

    return dest;
  }
}

export default Matrix2;

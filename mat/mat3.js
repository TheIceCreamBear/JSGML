import { Vector3, Matrix2 } from '..';

/**
 * Column-major 3x3 matrix. Elements are:
 *  m00 m10 m20
 *  m01 m11 m21
 *  m02 m12 m22
 */
class Matrix3 {
  /**
   * Constructs a new 3x3 matrix in column major order. Behavior changes based on # of arguments.
   * If no arguments are passed in, this matrix is set to an identity. (m00, m11, and m22 are set to 1, with the rest being 0)
   * If one argument is passed in, there are NUMBER options:
   *    If it is an Array, the elements of the matrix are filled in with the elements of the array, with the order being m00, m01, m02, m10, m11, m12, m20, m21, m22
   *    If it is a Matrix2, the elements of that matrix are copied to the upper left corner of this matrix.
   *    If it is a Matrix3, the that matrix will be copied to this matrix.
   *    If it is a Matrix3, the upper left corner of that matrix will be copied to this matrix.
   * If three arguments are passed in, m00 is a Vector3 with x y z being m00 m01 and m02, m01 is a Vector3 with x y z being m10 m11 and m12, m02 is a Vector3 with x y z being m20 m21 and m22
   * @param {number | Array | Matrix2 | Matrix3 | Vector3} m00 the element in the 0th col and 0th row
   * @param {number | Vector3} m01 the the element in the 0th col and 1st row
   * @param {number | Vector3} m02 the element in the 0th col and 2nd row
   * @param {number} m10 the element in the 1st col and 0th row
   * @param {number} m11 the element in the 1st col and 1st row
   * @param {number} m12 the element in the 1st col and 2nd row
   * @param {number} m20 the element in the 2nd col and 0th row
   * @param {number} m20 the element in the 2nd col and 1st row
   * @param {number} m20 the element in the 2nd col and 2nd row
   */
  constructor(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    switch (arguments.length) {
      // nothing, use the identity
      case 0:
        this.identity();
        break;
      // first argument is an array, a matrix2, a matrix3, or a matrix4 TODO
      case 1:
        if (m00 instanceof Array) {
          if (m00.length != 9) {
            throw new Error('Invlaid array matrix');
          }
          this.m00 = m00[0];
          this.m01 = m00[1];
          this.m02 = m00[2];
          this.m10 = m00[3];
          this.m11 = m00[4];
          this.m12 = m00[5];
          this.m20 = m00[6];
          this.m21 = m00[7];
          this.m22 = m00[8];
        } else if (m00 instanceof Matrix2) {
          this.zero();
          this.m00 = m00.m00;
          this.m01 = m00.m01;
          this.m10 = m00.m10;
          this.m11 = m00.m11;
        } else if (m00 instanceof Matrix3) {
          this.m00 = m00.m00;
          this.m01 = m00.m01;
          this.m02 = m00.m02;
          this.m10 = m00.m10;
          this.m11 = m00.m11;
          this.m12 = m00.m12;
          this.m20 = m00.m20;
          this.m21 = m00.m21;
          this.m22 = m00.m22;
          // TODO: matrix4
        } else {
          throw new Error('Invalid argument types');
        }
        break;
      // first three args are Vector3s
      case 3:
        if (!(m00 instanceof Vector3 && m01 instanceof Vector3 && m02 instanceof Vector3)) {
          throw new Error('Invalid argument types');
        }
        this.m00 = m00.x;
        this.m01 = m00.y;
        this.m02 = m00.z;
        this.m10 = m01.x;
        this.m11 = m01.y;
        this.m12 = m01.z;
        this.m20 = m02.x;
        this.m21 = m02.y;
        this.m22 = m02.z;
        break;
      // each argument is its own type
      case 9:
        this.m00 = m00;
        this.m01 = m01;
        this.m02 = m02;
        this.m10 = m10;
        this.m11 = m11;
        this.m12 = m12;
        this.m20 = m20;
        this.m21 = m21;
        this.m22 = m22;
        break;
      default:
        throw new Error('Invalid number of arguments');
    }
  }

  /**
   * Sets this matrix to its identity, with the diagonal being 1 and the rest being 0
   * @returns {Matrix3} this set to an identity
   */
  identity() {
    this.zero();
    this.m00 = 1;
    this.m11 = 1;
    this.m22 = 1;

    return this;
  }

  /**
   * Sets this matrix to contain all zeros
   * @returns {Matrix3} this set to zero
   */
  zero() {
    this.m00 = 0;
    this.m01 = 0;
    this.m02 = 0;
    this.m10 = 0;
    this.m11 = 0;
    this.m12 = 0;
    this.m20 = 0;
    this.m21 = 0;
    this.m22 = 0;

    return this;
  }

  /**
   * Sets the values of this 3x3 matrix in column major order. Behavior changes based on # of arguments.
   * If no arguments are passed in, this matrix is set to an identity. (m00, m11, and m22 are set to 1, with the rest being 0)
   * If one argument is passed in, there are NUMBER options:
   *    If it is an Array, the elements of the matrix are filled in with the elements of the array, with the order being m00, m01, m02, m10, m11, m12, m20, m21, m22
   *    If it is a Matrix2, the elements of that matrix are copied to the upper left corner of this matrix.
   *    If it is a Matrix3, the that matrix will be copied to this matrix.
   *    If it is a Matrix3, the upper left corner of that matrix will be copied to this matrix.
   * If three arguments are passed in, m00 is a Vector3 with x y z being m00 m01 and m02, m01 is a Vector3 with x y z being m10 m11 and m12, m02 is a Vector3 with x y z being m20 m21 and m22
   * @param {number | Array | Matrix2 | Matrix3 | Vector3} m00 the element in the 0th col and 0th row
   * @param {number | Vector3} m01 the the element in the 0th col and 1st row
   * @param {number | Vector3} m02 the element in the 0th col and 2nd row
   * @param {number} m10 the element in the 1st col and 0th row
   * @param {number} m11 the element in the 1st col and 1st row
   * @param {number} m12 the element in the 1st col and 2nd row
   * @param {number} m20 the element in the 2nd col and 0th row
   * @param {number} m20 the element in the 2nd col and 1st row
   * @param {number} m20 the element in the 2nd col and 2nd row
   * @returns {Matrix3} this object with the new values
   */
  set(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    switch (arguments.length) {
      // nothing, use the identity
      case 0:
        this.identity();
        break;
      // first argument is an array, a matrix2, a matrix3, or a matrix4 TODO
      case 1:
        if (m00 instanceof Array) {
          if (m00.length != 9) {
            throw new Error('Invlaid array matrix');
          }
          this.m00 = m00[0];
          this.m01 = m00[1];
          this.m02 = m00[2];
          this.m10 = m00[3];
          this.m11 = m00[4];
          this.m12 = m00[5];
          this.m20 = m00[6];
          this.m21 = m00[7];
          this.m22 = m00[8];
        } else if (m00 instanceof Matrix2) {
          this.zero();
          this.m00 = m00.m00;
          this.m01 = m00.m01;
          this.m10 = m00.m10;
          this.m11 = m00.m11;
        } else if (m00 instanceof Matrix3) {
          this.m00 = m00.m00;
          this.m01 = m00.m01;
          this.m02 = m00.m02;
          this.m10 = m00.m10;
          this.m11 = m00.m11;
          this.m12 = m00.m12;
          this.m20 = m00.m20;
          this.m21 = m00.m21;
          this.m22 = m00.m22;
          // TODO: matrix4
        } else {
          throw new Error('Invalid argument types');
        }
        break;
      // first three args are Vector3s
      case 3:
        if (!(m00 instanceof Vector3 && m01 instanceof Vector3 && m02 instanceof Vector3)) {
          throw new Error('Invalid argument types');
        }
        this.m00 = m00.x;
        this.m01 = m00.y;
        this.m02 = m00.z;
        this.m10 = m01.x;
        this.m11 = m01.y;
        this.m12 = m01.z;
        this.m20 = m02.x;
        this.m21 = m02.y;
        this.m22 = m02.z;
        break;
      // each argument is its own type
      case 9:
        this.m00 = m00;
        this.m01 = m01;
        this.m02 = m02;
        this.m10 = m10;
        this.m11 = m11;
        this.m12 = m12;
        this.m20 = m20;
        this.m21 = m21;
        this.m22 = m22;
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
    return [this.m00, this.m01, this.m02, this.m10, this.m11, this.m12, this.m20, this.m21, this.m22];
  }

  /**
   * Calculates the determinate of this matrix
   * @returns {number} the determinate of this matrix
   */
  determinate() {
    return (
      (this.m00 * this.m11 - this.m01 * this.m10) * this.m22 -
      (this.m02 * this.m10 - this.m00 * this.m12) * this.m21 +
      (this.m01 * this.m12 - this.m02 * this.m11) * this.m20
    );
  }

  /**
   * Inverts this matrix, and optionally stores it in dest
   * @param {Matrix3} dest optional matrix to store the results in
   * @returns {Matrix3} this, or if dest is present, dest
   */
  invert(dest) {
    const a = this.m00 * this.m11 - this.m01 * this.m10;
    const b = this.m02 * this.m10 - this.m00 * this.m12;
    const c = this.m01 * this.m12 - this.m02 * this.m11;
    const det = a * this.m22 + b * this.m21 + c * this.m20;

    const nm00 = (this.m11 * this.m22 - this.m21 * this.m12) / det;
    const nm01 = (this.m21 * this.m02 - this.m01 * this.m22) / det;
    const nm02 = c / det;
    const nm10 = (this.m20 * this.m12 - this.m10 * this.m22) / det;
    const nm11 = (this.m00 * this.m22 - this.m20 * this.m02) / det;
    const nm12 = b / det;
    const nm20 = (this.m10 * this.m21 - this.m20 * this.m11) / det;
    const nm21 = (this.m20 * this.m01 - this.m00 * this.m21) / det;
    const nm22 = a / det;

    if (!dest) {
      dest = this;
    }

    dest.m00 = nm00;
    dest.m01 = nm01;
    dest.m02 = nm02;
    dest.m10 = nm10;
    dest.m11 = nm11;
    dest.m12 = nm12;
    dest.m20 = nm20;
    dest.m21 = nm21;
    dest.m22 = nm22;

    return dest;
  }

  /**
   * Calculates the transpose of this matrix, stores the result in dest if present
   * @param {Matrix3} dest optional matrix to store the results in
   * @returns {Matrix3} this, or if dest is present, dest
   */
  transpose(dest) {
    if (!dest) {
      dest = this;
    }

    dest.set(this.m00, this.m10, this.m20, this.m01, this.m11, this.m21, this.m02, this.m12, this.m22);

    return dest;
  }

  /**
   * Adds the other matrix to this matrix, stores the result in dest if present
   * @param {Matrix3} other the matrix to add to this matrix
   * @param {Matrix3} dest optional matrix to store the results in
   * @returns {Matrix3} this, or if dest is present, dest
   */
  add(other, dest) {
    if (!dest) {
      dest = this;
    }

    dest.m00 = this.m00 + other.m00;
    dest.m01 = this.m01 + other.m01;
    dest.m02 = this.m02 + other.m02;
    dest.m10 = this.m10 + other.m10;
    dest.m11 = this.m11 + other.m11;
    dest.m12 = this.m12 + other.m12;
    dest.m20 = this.m20 + other.m20;
    dest.m21 = this.m21 + other.m21;
    dest.m22 = this.m22 + other.m22;

    return dest;
  }

  /**
   * Subtracts the other matrix to this matrix, stores the result in dest if present
   * @param {Matrix3} other the matrix to subtract to this matrix
   * @param {Matrix3} dest optional matrix to store the results in
   * @returns {Matrix3} this, or if dest is present, dest
   */
  subtract(other, dest) {
    if (!dest) {
      dest = this;
    }

    dest.m00 = this.m00 - other.m00;
    dest.m01 = this.m01 - other.m01;
    dest.m02 = this.m02 - other.m02;
    dest.m10 = this.m10 - other.m10;
    dest.m11 = this.m11 - other.m11;
    dest.m12 = this.m12 - other.m12;
    dest.m20 = this.m20 - other.m20;
    dest.m21 = this.m21 - other.m21;
    dest.m22 = this.m22 - other.m22;

    return dest;
  }

  /**
   * Multiplies this matrix by the other matrix, and stores the result in this, or dest if present
   *
   * If this matrix is T, and the other matrix is O, then the result will be R = T x O
   * @param {Matrix3} right the matrix to multiply on the right of this
   * @param {Matrix3} dest optional matrix to store the results in
   * @returns {Matrix3} this, or if dest is present, dest
   */
  mul(right, dest) {
    const nm00 = this.m00 * right.m00 + this.m10 * right.m01 + this.m20 * right.m02;
    const nm01 = this.m01 * right.m00 + this.m11 * right.m01 + this.m21 * right.m02;
    const nm02 = this.m02 * right.m00 + this.m12 * right.m01 + this.m22 * right.m02;
    const nm10 = this.m00 * right.m10 + this.m10 * right.m11 + this.m20 * right.m12;
    const nm11 = this.m01 * right.m10 + this.m11 * right.m11 + this.m21 * right.m12;
    const nm12 = this.m02 * right.m10 + this.m12 * right.m11 + this.m22 * right.m12;
    const nm20 = this.m00 * right.m20 + this.m10 * right.m21 + this.m20 * right.m22;
    const nm21 = this.m01 * right.m20 + this.m11 * right.m21 + this.m21 * right.m22;
    const nm22 = this.m02 * right.m20 + this.m12 * right.m21 + this.m22 * right.m22;

    if (!dest) {
      dest = this;
    }

    dest.m00 = nm00;
    dest.m01 = nm01;
    dest.m02 = nm02;
    dest.m10 = nm10;
    dest.m11 = nm11;
    dest.m12 = nm12;
    dest.m20 = nm20;
    dest.m21 = nm21;
    dest.m22 = nm22;

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
    const nm00 = left.m00 * this.m00 + left.m10 * this.m01 + left.m20 * this.m02;
    const nm01 = left.m01 * this.m00 + left.m11 * this.m01 + left.m21 * this.m02;
    const nm02 = left.m02 * this.m00 + left.m12 * this.m01 + left.m22 * this.m02;
    const nm10 = left.m00 * this.m10 + left.m10 * this.m11 + left.m20 * this.m12;
    const nm11 = left.m01 * this.m10 + left.m11 * this.m11 + left.m21 * this.m12;
    const nm12 = left.m02 * this.m10 + left.m12 * this.m11 + left.m22 * this.m12;
    const nm20 = left.m00 * this.m20 + left.m10 * this.m21 + left.m20 * this.m22;
    const nm21 = left.m01 * this.m20 + left.m11 * this.m21 + left.m21 * this.m22;
    const nm22 = left.m02 * this.m20 + left.m12 * this.m21 + left.m22 * this.m22;

    if (!dest) {
      dest = this;
    }

    dest.m00 = nm00;
    dest.m01 = nm01;
    dest.m02 = nm02;
    dest.m10 = nm10;
    dest.m11 = nm11;
    dest.m12 = nm12;
    dest.m20 = nm20;
    dest.m21 = nm21;
    dest.m22 = nm22;

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
    dest.m02 = this.m02 * other.m02;
    dest.m10 = this.m10 * other.m10;
    dest.m11 = this.m11 * other.m11;
    dest.m12 = this.m12 * other.m12;
    dest.m20 = this.m20 * other.m20;
    dest.m21 = this.m21 * other.m21;
    dest.m22 = this.m22 * other.m22;

    return dest;
  }

  /**
   * Scale this matrix by the given values in each direction
   * @param {number} x the x value to scale by
   * @param {number} y the y value to scale by
   * @param {number} z the z value to scale by
   * @param {Matrix3} dest optional matrix to store the results in
   * @returns {Matrix3} this, or if dest is present, dest
   */
  scale(x, y, z, dest) {
    const nm00 = this.m00 * x;
    const nm01 = this.m01 * x;
    const nm02 = this.m02 * x;
    const nm10 = this.m10 * y;
    const nm11 = this.m11 * y;
    const nm12 = this.m12 * y;
    const nm20 = this.m20 * z;
    const nm21 = this.m21 * z;
    const nm22 = this.m22 * z;

    if (!dest) {
      dest = this;
    }

    dest.m00 = nm00;
    dest.m01 = nm01;
    dest.m02 = nm02;
    dest.m10 = nm10;
    dest.m11 = nm11;
    dest.m12 = nm12;
    dest.m20 = nm20;
    dest.m21 = nm21;
    dest.m22 = nm22;

    return dest;
  }

  /**
   * Scale this matrix by the given values in the vector in each direction
   * @param {Vector3} vec3 the vector containing the x, y, and z values to scale this matrix by
   * @param {Matrix3} dest optional matrix to store the results in
   * @returns {Matrix3} this, or if dest is present, dest
   */
  scaleVec(vec3, dest) {
    return this.scale(vec3.x, vec3.y, vec3.z, dest);
  }

  /**
   * Scales this matrix by the given value in both directions
   * @param {number} scalar the number uniformly to scale this matrix by
   * @param {Matrix3} dest optional matrix to store the results in
   * @returns {Matrix3} this, or if dest is present, dest
   */
  scaleScalar(scalar, dest) {
    return this.scale(scalar, scalar, scalar, dest);
  }

  /**
   * Sets this matrix to represent a scaling matrix with the given values
   * @param {number} x the x value to scale by
   * @param {number} y the y value to scale by
   * @param {number} z the z value to scale by
   * @returns {Matrix3} this
   */
  scaling(x, y, z) {
    this.zero();

    this.m00 = x;
    this.m11 = y;
    this.m22 = z;

    return this;
  }

  /**
   * Sets this matrix to represent a uniform scaling
   * @param {number} scalar the value to scale by
   * @returns {Matrix3} this
   */
  scalingUniform(scalar) {
    return this.scaling(scalar, scalar, scalar);
  }

  /**
   * Sets this matrix to represent a scaling based on the values in the vec
   * @param {Vector3} vec3 the vector containing the values to scale by
   * @returns {Matrix3} this
   */
  scalingVec(vec3) {
    return this.scaling(vec3.x, vec3.y, vec3.z);
  }

  // TODO: rotates, allowing for axis angles and all the other jazz

  /**
   * Transform the given vector by this matrix
   * @param {Vector3} vec the vector to transform
   * @param {Vector3} dest Optional destination vector
   * @returns {Vector3} this, or if dest is present, dest
   */
  transform(vec, dest) {
    return vec.mulMat(this, dest);
  }

  /**
   * Transform the given x y z value by this matrix and store it in dest
   * @param {number} x the x value to transform
   * @param {number} y the y value to transform
   * @param {number} z the z value to transform
   * @param {Vector3} dest Required destination vector
   * @returns {Vector3} this, or if dest is present, dest
   */
  transformXYZ(x, y, z, dest) {
    if (!dest) {
      throw new Error('Dest must be present');
    }

    const nx = this.m00 * x + this.m10 * y + this.m20 * z;
    const ny = this.m01 * x + this.m11 * y + this.m21 * z;
    const nz = this.m02 * x + this.m12 * y + this.m22 * z;

    dest.set(nx, ny, nz);
  }

  /**
   * Transform the given vector by the transpose this matrix
   * @param {Vector3} vec the vector to transform
   * @param {Vector3} dest Optional destination vector
   * @returns {Vector3} this, or if dest is present, dest
   */
  transformTranspose(vec, dest) {
    return vec.mulMatTranspose(this, dest);
  }

  /**
   * Transform the given x y z value by the transpose of this matrix and store it in dest
   * @param {number} x the x value to transform
   * @param {number} y the y value to transform
   * @param {number} z the z value to transform
   * @param {Vector3} dest Required destination vector
   * @returns {Vector3} this, or if dest is present, dest
   */
  transformXYZTranspose(x, y, z, dest) {
    if (!dest) {
      throw new Error('Dest must be present');
    }

    const nx = this.m00 * x + this.m01 * y + this.m02 * z;
    const ny = this.m10 * x + this.m11 * y + this.m12 * z;
    const nz = this.m20 * x + this.m21 * y + this.m22 * z;

    dest.set(nx, ny, nz);
  }
  

  /**
   * Calculates the normal matrix of this matrix, and stores it in this, or dest if present
   * @param {Matrix2} dest optional matrix to store the results in
   * @returns {Matrix2} this, or if dest is present, dest
   */
  normal(dest) {
    const scalar = 1 / this.determinate();
    const nm00 = (this.m11 * this.m22 - this.m21 * this.m12) * scalar;
    const nm01 = (this.m20 * this.m12 - this.m10 * this.m22) * scalar;
    const nm02 = (this.m20 * this.m21 - this.m20 * this.m11) * scalar;
    const nm10 = (this.m21 * this.m02 - this.m01 * this.m22) * scalar;
    const nm11 = (this.m00 * this.m22 - this.m20 * this.m02) * scalar;
    const nm12 = (this.m20 * this.m01 - this.m00 * this.m21) * scalar;
    const nm20 = (this.m01 * this.m12 - this.m02 * this.m11) * scalar;
    const nm21 = (this.m02 * this.m10 - this.m00 * this.m12) * scalar;
    const nm22 = (this.m00 * this.m11 - this.m10 * this.m01) * scalar;

    if (!dest) {
      dest = this;
    }

    dest.m00 = nm00;
    dest.m01 = nm01;
    dest.m02 = nm02;
    dest.m10 = nm10;
    dest.m11 = nm11;
    dest.m12 = nm12;
    dest.m20 = nm20;
    dest.m21 = nm21;
    dest.m22 = nm22;

    return dest;
  }

  /**
   * Calculates the cofactor matrix of this matrix, and stores it in this, or dest if present
   * @param {Matrix2} dest optional matrix to store the results in
   * @returns {Matrix2} this, or if dest is present, dest
   */
  cofactor(dest) {
    const nm00 = this.m11 * this.m22 - this.m21 * this.m12;
    const nm01 = this.m20 * this.m12 - this.m10 * this.m22;
    const nm02 = this.m20 * this.m21 - this.m20 * this.m11;
    const nm10 = this.m21 * this.m02 - this.m01 * this.m22;
    const nm11 = this.m00 * this.m22 - this.m20 * this.m02;
    const nm12 = this.m20 * this.m01 - this.m00 * this.m21;
    const nm20 = this.m01 * this.m12 - this.m02 * this.m11;
    const nm21 = this.m02 * this.m10 - this.m00 * this.m12;
    const nm22 = this.m00 * this.m11 - this.m10 * this.m01;

    if (!dest) {
      dest = this;
    }

    dest.m00 = nm00;
    dest.m01 = nm01;
    dest.m02 = nm02;
    dest.m10 = nm10;
    dest.m11 = nm11;
    dest.m12 = nm12;
    dest.m20 = nm20;
    dest.m21 = nm21;
    dest.m22 = nm22;

    return dest;
  }

  /**
   * Calculates the linter interpolation between this matrix and the other
   * @param {Matrix3} other the other matrix to interpolate between
   * @param {number} t the progress of the lerp
   * @param {Matrix3} dest optional matrix to store the results in
   * @returns {Matrix3} this, or if dest is present, dest
   */
  lerp(other, t, dest) {
    if (!dest) {
      dest = this;
    }

    dest.m00 = (other.m00 - this.m00) * t + this.m00;
    dest.m01 = (other.m01 - this.m01) * t + this.m01;
    dest.m02 = (other.m02 - this.m02) * t + this.m02;
    dest.m10 = (other.m10 - this.m10) * t + this.m10;
    dest.m11 = (other.m11 - this.m11) * t + this.m11;
    dest.m12 = (other.m12 - this.m12) * t + this.m12;
    dest.m20 = (other.m20 - this.m20) * t + this.m20;
    dest.m21 = (other.m21 - this.m21) * t + this.m21;
    dest.m22 = (other.m22 - this.m22) * t + this.m22;

    return dest;
  }

  // TODO: look along?
}

export default Matrix3;

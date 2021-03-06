import { Vector4, Matrix3 } from '../index.js';

/**
 * Column-major 4x4 matrix. Elements are:
 *  m00 m10 m20 m30
 *  m01 m11 m21 m31
 *  m02 m12 m22 m32
 *  m03 m13 m23 m33
 */
class Matrix4 {
  /**
   * Constructs a new 3x3 matrix in column major order. Behavior changes based on # of arguments.
   * If no arguments are passed in, this matrix is set to an identity. (m00, m11, and m22 are set to 1, with the rest being 0)
   * If one argument is passed in, there are NUMBER options:
   *    If it is an Array, the elements of the matrix are filled in with the elements of the array, with the order being m00, m01, m02, m10, m11, m12, m20, m21, m22
   *    If it is a Matrix3, the that matrix will be copied to the upper left corner of this matrix.
   *    If it is a Matrix4, the elements of that matrix are copied to this matrix.
   * If four arguments are passed in, each argument is a Vector4 representing an individual column
   * @param {number | Float32Array | Matrix3 | Matrix4 | Vector4} m00 the element in the 0th col and 0th row
   * @param {number | Vector4} m01 the the element in the 0th col and 1st row
   * @param {number | Vector4} m02 the element in the 0th col and 2nd row
   * @param {number | Vector4} m03 the element in the 0th col and 3rd row
   * @param {number} m10 the element in the 1st col and 0th row
   * @param {number} m11 the element in the 1st col and 1st row
   * @param {number} m12 the element in the 1st col and 2nd row
   * @param {number} m13 the element in the 1st col and 3rd row
   * @param {number} m20 the element in the 2nd col and 0th row
   * @param {number} m21 the element in the 2nd col and 1st row
   * @param {number} m22 the element in the 2nd col and 2nd row
   * @param {number} m23 the element in the 2nd col and 3rd row
   * @param {number} m30 the element in the 3nd col and 0th row
   * @param {number} m31 the element in the 3nd col and 1st row
   * @param {number} m32 the element in the 3nd col and 2nd row
   * @param {number} m33 the element in the 3nd col and 3rd row
   */
  constructor(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    switch (arguments.length) {
      // nothing, use the identity
      case 0:
        this.identity();
        break;
      // first argument is an array, a matrix2, a matrix3, or a matrix4 TODO
      case 1:
        if (m00 instanceof Array) {
          if (m00.length != 16) {
            throw new Error('Invlaid array matrix');
          }
          this.m00 = m00[0];
          this.m01 = m00[1];
          this.m02 = m00[2];
          this.m03 = m00[3];
          this.m10 = m00[4];
          this.m11 = m00[5];
          this.m12 = m00[6];
          this.m13 = m00[7];
          this.m20 = m00[8];
          this.m21 = m00[9];
          this.m22 = m00[10];
          this.m23 = m00[11];
          this.m30 = m00[12];
          this.m31 = m00[13];
          this.m32 = m00[14];
          this.m33 = m00[15];
        } else if (m00 instanceof Matrix3) {
          this.m00 = m00.m00;
          this.m01 = m00.m01;
          this.m02 = m00.m02;
          this.m03 = 0;
          this.m10 = m00.m10;
          this.m11 = m00.m11;
          this.m12 = m00.m12;
          this.m13 = 0;
          this.m20 = m00.m20;
          this.m21 = m00.m21;
          this.m22 = m00.m22;
          this.m30 = 0;
          this.m31 = 0;
          this.m32 = 0;
          this.m33 = 1;
        } else if (m00 instanceof Matrix4) {
          this.m00 = m00.m00;
          this.m01 = m00.m01;
          this.m02 = m00.m02;
          this.m03 = m00.m03;
          this.m10 = m00.m10;
          this.m11 = m00.m11;
          this.m12 = m00.m12;
          this.m13 = m00.m13;
          this.m20 = m00.m20;
          this.m21 = m00.m21;
          this.m22 = m00.m22;
          this.m23 = m00.m23;
          this.m30 = m00.m30;
          this.m31 = m00.m31;
          this.m32 = m00.m32;
          this.m33 = m00.m33;
        } else {
          throw new Error('Invalid argument types');
        }
        break;
      // first four args are Vector4s
      case 4:
        if (!(m00 instanceof Vector4 && m01 instanceof Vector4 && m02 instanceof Vector4)) {
          throw new Error('Invalid argument types');
        }
        this.m00 = m00.x;
        this.m01 = m00.y;
        this.m02 = m00.z;
        this.m03 = m00.w;
        this.m10 = m01.x;
        this.m11 = m01.y;
        this.m12 = m01.z;
        this.m13 = m01.w;
        this.m20 = m02.x;
        this.m21 = m02.y;
        this.m22 = m02.z;
        this.m23 = m02.w;
        this.m30 = m03.x;
        this.m31 = m03.y;
        this.m32 = m03.z;
        this.m33 = m03.w;
        break;
      // each argument is its own type
      case 16:
        this.m00 = m00;
        this.m01 = m01;
        this.m02 = m02;
        this.m03 = m03;
        this.m10 = m10;
        this.m11 = m11;
        this.m12 = m12;
        this.m13 = m13;
        this.m20 = m20;
        this.m21 = m21;
        this.m22 = m22;
        this.m23 = m23;
        this.m30 = m30;
        this.m31 = m31;
        this.m32 = m32;
        this.m33 = m33;
        break;
      default:
        throw new Error('Invalid number of arguments');
    }
  }

  /**
   * Sets this matrix to its identity, with the diagonal being 1 and the rest being 0
   * @returns {Matrix4} this set to an identity
   */
  identity() {
    this.m00 = 1;
    this.m01 = 0;
    this.m02 = 0;
    this.m03 = 0;
    this.m10 = 0;
    this.m11 = 1;
    this.m12 = 0;
    this.m13 = 0;
    this.m20 = 0;
    this.m21 = 0;
    this.m22 = 1;
    this.m23 = 0;
    this.m30 = 0;
    this.m31 = 0;
    this.m32 = 0;
    this.m33 = 1;

    return this;
  }

  /**
   * Sets this matrix to be all zeros
   * @returns {Matrix4} this set to zero
   */
  zero() {
    this.m00 = 0;
    this.m01 = 0;
    this.m02 = 0;
    this.m03 = 0;
    this.m10 = 0;
    this.m11 = 0;
    this.m12 = 0;
    this.m13 = 0;
    this.m20 = 0;
    this.m21 = 0;
    this.m22 = 0;
    this.m23 = 0;
    this.m30 = 0;
    this.m31 = 0;
    this.m32 = 0;
    this.m33 = 0;

    return this;
  }

  /**
   * Sets the values of this 3x3 matrix in column major order. Behavior changes based on # of arguments.
   * If no arguments are passed in, this matrix is set to an identity. (m00, m11, and m22 are set to 1, with the rest being 0)
   * If one argument is passed in, there are NUMBER options:
   *    If it is an Array, the elements of the matrix are filled in with the elements of the array, with the order being m00, m01, m02, m10, m11, m12, m20, m21, m22
   *    If it is a Matrix3, the that matrix will be copied to the upper left corner of this matrix.
   *    If it is a Matrix4, the elements of that matrix are copied to this matrix.
   * If four arguments are passed in, each argument is a Vector4 representing an individual column
   * @param {number | Float32Array | Matrix3 | Matrix4 | Vector4} m00 the element in the 0th col and 0th row
   * @param {number | Vector4} m01 the the element in the 0th col and 1st row
   * @param {number | Vector4} m02 the element in the 0th col and 2nd row
   * @param {number | Vector4} m03 the element in the 0th col and 3rd row
   * @param {number} m10 the element in the 1st col and 0th row
   * @param {number} m11 the element in the 1st col and 1st row
   * @param {number} m12 the element in the 1st col and 2nd row
   * @param {number} m13 the element in the 1st col and 3rd row
   * @param {number} m20 the element in the 2nd col and 0th row
   * @param {number} m21 the element in the 2nd col and 1st row
   * @param {number} m22 the element in the 2nd col and 2nd row
   * @param {number} m23 the element in the 2nd col and 3rd row
   * @param {number} m30 the element in the 3nd col and 0th row
   * @param {number} m31 the element in the 3nd col and 1st row
   * @param {number} m32 the element in the 3nd col and 2nd row
   * @param {number} m33 the element in the 3nd col and 3rd row
   */
  set(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    switch (arguments.length) {
      // nothing, use the identity
      case 0:
        this.identity();
        break;
      // first argument is an array, a matrix2, a matrix3, or a matrix4 TODO
      case 1:
        if (m00 instanceof Array) {
          if (m00.length != 16) {
            throw new Error('Invlaid array matrix');
          }
          this.m00 = m00[0];
          this.m01 = m00[1];
          this.m02 = m00[2];
          this.m03 = m00[3];
          this.m10 = m00[4];
          this.m11 = m00[5];
          this.m12 = m00[6];
          this.m13 = m00[7];
          this.m20 = m00[8];
          this.m21 = m00[9];
          this.m22 = m00[10];
          this.m23 = m00[11];
          this.m30 = m00[12];
          this.m31 = m00[13];
          this.m32 = m00[14];
          this.m33 = m00[15];
        } else if (m00 instanceof Matrix3) {
          this.m00 = m00.m00;
          this.m01 = m00.m01;
          this.m02 = m00.m02;
          this.m03 = 0;
          this.m10 = m00.m10;
          this.m11 = m00.m11;
          this.m12 = m00.m12;
          this.m13 = 0;
          this.m20 = m00.m20;
          this.m21 = m00.m21;
          this.m22 = m00.m22;
          this.m30 = 0;
          this.m31 = 0;
          this.m32 = 0;
          this.m33 = 1;
        } else if (m00 instanceof Matrix4) {
          this.m00 = m00.m00;
          this.m01 = m00.m01;
          this.m02 = m00.m02;
          this.m03 = m00.m03;
          this.m10 = m00.m10;
          this.m11 = m00.m11;
          this.m12 = m00.m12;
          this.m13 = m00.m13;
          this.m20 = m00.m20;
          this.m21 = m00.m21;
          this.m22 = m00.m22;
          this.m23 = m00.m23;
          this.m30 = m00.m30;
          this.m31 = m00.m31;
          this.m32 = m00.m32;
          this.m33 = m00.m33;
        } else {
          throw new Error('Invalid argument types');
        }
        break;
      // first four args are Vector4s
      case 4:
        if (!(m00 instanceof Vector4 && m01 instanceof Vector4 && m02 instanceof Vector4)) {
          throw new Error('Invalid argument types');
        }
        this.m00 = m00.x;
        this.m01 = m00.y;
        this.m02 = m00.z;
        this.m03 = m00.w;
        this.m10 = m01.x;
        this.m11 = m01.y;
        this.m12 = m01.z;
        this.m13 = m01.w;
        this.m20 = m02.x;
        this.m21 = m02.y;
        this.m22 = m02.z;
        this.m23 = m02.w;
        this.m30 = m03.x;
        this.m31 = m03.y;
        this.m32 = m03.z;
        this.m33 = m03.w;
        break;
      // each argument is its own type
      case 16:
        this.m00 = m00;
        this.m01 = m01;
        this.m02 = m02;
        this.m03 = m03;
        this.m10 = m10;
        this.m11 = m11;
        this.m12 = m12;
        this.m13 = m13;
        this.m20 = m20;
        this.m21 = m21;
        this.m22 = m22;
        this.m23 = m23;
        this.m30 = m30;
        this.m31 = m31;
        this.m32 = m32;
        this.m33 = m33;
        break;
      default:
        throw new Error('Invalid number of arguments');
    }
  }

  /**
   * Creates and returns a new array representing this matrix in a column major format
   * @returns {Float32Array} this matrix as an array, in column major order
   */
  getArray() {
    return [this.m00, this.m01, this.m02, this.m03, this.m10, this.m11, this.m12, this.m13, this.m20, this.m21, this.m22, this.m23, this.m30, this.m31, this.m32, this.m33];
  }

  /**
   * Adds the other matrix to this matrix, stores the result in dest if present
   * @param {Matrix4} other the matrix to add to this matrix
   * @param {Matrix4} dest optional matrix to store the results in
   * @returns {Matrix4} this, or if dest is present, dest
   */
  add(other, dest = this) {
    dest.m00 = this.m00 + other.m00;
    dest.m01 = this.m01 + other.m01;
    dest.m02 = this.m02 + other.m02;
    dest.m03 = this.m03 + other.m03;
    dest.m10 = this.m10 + other.m10;
    dest.m11 = this.m11 + other.m11;
    dest.m12 = this.m12 + other.m12;
    dest.m13 = this.m13 + other.m13;
    dest.m20 = this.m20 + other.m20;
    dest.m21 = this.m21 + other.m21;
    dest.m22 = this.m22 + other.m22;
    dest.m23 = this.m23 + other.m23;
    dest.m30 = this.m30 + other.m30;
    dest.m31 = this.m31 + other.m31;
    dest.m32 = this.m32 + other.m32;
    dest.m33 = this.m33 + other.m33;

    return dest;
  }

  /**
   * Subtracts the other matrix to this matrix, stores the result in dest if present
   * @param {Matrix4} other the matrix to subtract to this matrix
   * @param {Matrix4} dest optional matrix to store the results in
   * @returns {Matrix4} this, or if dest is present, dest
   */
  sub(other, dest = this) {
    dest.m00 = this.m00 - other.m00;
    dest.m01 = this.m01 - other.m01;
    dest.m02 = this.m02 - other.m02;
    dest.m03 = this.m03 - other.m03;
    dest.m10 = this.m10 - other.m10;
    dest.m11 = this.m11 - other.m11;
    dest.m12 = this.m12 - other.m12;
    dest.m13 = this.m13 - other.m13;
    dest.m20 = this.m20 - other.m20;
    dest.m21 = this.m21 - other.m21;
    dest.m22 = this.m22 - other.m22;
    dest.m23 = this.m23 - other.m23;
    dest.m30 = this.m30 - other.m30;
    dest.m31 = this.m31 - other.m31;
    dest.m32 = this.m32 - other.m32;
    dest.m33 = this.m33 - other.m33;

    return dest;
  }

  // mul

  // mulLeft

  /**
   * Multiplies this Matrix's components by the other's components, stores the result in dest if present
   * @param {Matrix4} other the matrix to multiply on the left of this
   * @param {Matrix4} dest optional matrix to store the results in
   * @returns {Matrix4} this, or if dest is present, dest
   */
  mulComponentWise(other, dest = this) {
    dest.m00 = this.m00 * other.m00;
    dest.m01 = this.m01 * other.m01;
    dest.m02 = this.m02 * other.m02;
    dest.m03 = this.m03 * other.m03;
    dest.m10 = this.m10 * other.m10;
    dest.m11 = this.m11 * other.m11;
    dest.m12 = this.m12 * other.m12;
    dest.m13 = this.m13 * other.m13;
    dest.m20 = this.m20 * other.m20;
    dest.m21 = this.m21 * other.m21;
    dest.m22 = this.m22 * other.m22;
    dest.m23 = this.m23 * other.m23;
    dest.m30 = this.m30 * other.m30;
    dest.m31 = this.m31 * other.m31;
    dest.m32 = this.m32 * other.m32;
    dest.m33 = this.m33 * other.m33;

    return dest;
  }

  // ============================================================================

  // scale

  // scaling

  // ============================================================================

  // rotate

  // rotation

  // ============================================================================

  // transform

  // transformation

  // ============================================================================

  // determinate

  // invert

  /**
   * Calculates the transpose of this matrix, stores the result in dest if present
   * @param {Matrix4} dest optional matrix to store the results in
   * @returns {Matrix4} this, or if dest is present, dest
   */
  transpose(dest = this) {
    dest.set(this.m00, this.m10, this.m20, this.m30, this.m01, this.m11, this.m21, this.m31, this.m02, this.m12, this.m22, this.m32, this.m03, this.m13, this.m23, this.m33);

    return dest;
  }

  // normal

  // cofactor

  /**
   * Calculates the linter interpolation between this matrix and the other
   * @param {Matrix4} other the other matrix to interpolate between
   * @param {number} t the progress of the lerp
   * @param {Matrix4} dest optional matrix to store the results in
   * @returns {Matrix4} this, or if dest is present, dest
   */
  lerp(other, t, dest = this) {
    dest.m00 = (other.m00 - this.m00) * t + this.m00;
    dest.m01 = (other.m01 - this.m01) * t + this.m01;
    dest.m02 = (other.m02 - this.m02) * t + this.m02;
    dest.m03 = (other.m03 - this.m03) * t + this.m03;
    dest.m10 = (other.m10 - this.m10) * t + this.m10;
    dest.m11 = (other.m11 - this.m11) * t + this.m11;
    dest.m12 = (other.m12 - this.m12) * t + this.m12;
    dest.m13 = (other.m13 - this.m13) * t + this.m13;
    dest.m20 = (other.m20 - this.m20) * t + this.m20;
    dest.m21 = (other.m21 - this.m21) * t + this.m21;
    dest.m22 = (other.m22 - this.m22) * t + this.m22;
    dest.m23 = (other.m23 - this.m23) * t + this.m23;
    dest.m30 = (other.m30 - this.m30) * t + this.m30;
    dest.m31 = (other.m31 - this.m31) * t + this.m31;
    dest.m32 = (other.m32 - this.m32) * t + this.m32;
    dest.m33 = (other.m33 - this.m33) * t + this.m33;

    return dest;
  }
}

export default Matrix4;

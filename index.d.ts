declare class Vector2 {
  x: number;
  y: number;

  constructor(x?: number, y?: number);

  set(x?: number | Vector2, y?: number): Vector2;
  zero(): Vector2;
  getArray(): Float32Array;
  extend(z: number, dest?: Vector3): Vector3;

  add(x: number, y: number, dest?: Vector2): Vector2;
  addVec(vec2: Vector2, dest?: Vector2): Vector2;
  sub(x: number, y: number, dest?: Vector2): Vector2;
  subVec(vec2: Vector2, dest?: Vector2): Vector2;

  mul(x: number, y: number, dest?: Vector2): Vector2;
  mulScalar(scalar: number, dest?: Vector2): Vector2;
  mulVec(vec2: Vector2, dest?: Vector2): Vector2;
  mulMat(mat2: Matrix2, dest?: Vector2): Vector2;
  mulMatTranspose(mat2: Matrix2, dest?: Vector2): Vector2;

  div(x: number, y: number, dest?: Vector2): Vector2;
  divScalar(scalar: number, dest?: Vector2): Vector2;
  divVec(vec2: Vector2, dest?: Vector2): Vector2;

  dot(vec2: Vector2): number;
  angle(vec2: Vector2): number;

  lengthSquared(): number;
  length(): number;
  distanceSquared(): number;
  distance(): number;
  distanceSquaredVec(vec2: Vector2): number;
  distanceVec(vec2: Vector2): number;

  normalizeToLen(len: number, dest?: Vector2): Vector2;
  normalize(dest?: Vector2): Vector2;

  lerp(other: Vector2, t: number, dest?: Vector2): Vector2;
  negate(dest?: Vector2): Vector2;
  min(vec2: Vector2, dest?: Vector2): Vector2;
  max(vec2: Vector2, dest?: Vector2): Vector2;
  floor(dest?: Vector2): Vector2;
  ceil(dest?: Vector2): Vector2;
  round(dest?: Vector2): Vector2;
  abs(dest?: Vector2): Vector2;

  clone(): Vector2;
}

declare class Vector3 {
  x: number;
  y: number;
  z: number;

  constructor(x?: number | Vector2, y?: number, z?: number);

  set(x?: number | Vector2 | Vector3, y?: number, z?: number): Vector3;
  zero(): Vector3;
  getArray(): Float32Array;
  extend(w: number, dest?: Vector4): Vector4;
  
  add(x: number, y: number, z: number, dest?: Vector3): Vector3;
  addVec(vec3: Vector3, dest?: Vector3): Vector3;
  sub(x: number, y: number, z: number, dest?: Vector3): Vector3;
  subVec(vec3: Vector3, dest?: Vector3): Vector3;

  mul(x: number, y: number, z: number, dest?: Vector3): Vector3;
  mulScalar(scalar: number, dest?: Vector3): Vector3;
  mulVec(vec3: Vector3, dest?: Vector3): Vector3;
  mulMat(mat3: Matrix3, dest?: Vector3): Vector3;
  mulMatTranspose(mat2: Matrix3, dest?: Vector3): Vector3;

  div(x: number, y: number, z: number, dest?: Vector3): Vector3;
  divScalar(scalar: number, dest?: Vector3): Vector3;
  divVec(vec3: Vector3, dest?: Vector3): Vector3;

  dot(vec3: Vector3): number;
  // angle(vec3: Vector3): number;

  lengthSquared(): number;
  length(): number;
  distanceSquared(): number;
  distance(): number;
  distanceSquaredVec(vec3: Vector3): number;
  distanceVec(vec3: Vector3): number;

  normalizeToLen(len: number, dest?: Vector3): Vector3;
  normalize(dest?: Vector3): Vector3;
  cross(x: number, y: number, z: number, dest?: Vector3): Vector3;
  crossVec(vec3: Vector3, dest?: Vector3): Vector3;

  lerp(other: Vector3, t: number, dest?: Vector3): Vector3;
  negate(dest?: Vector3): Vector3;
  min(vec3: Vector3, dest?: Vector3): Vector3;
  max(vec3: Vector3, dest?: Vector3): Vector3;
  floor(dest?: Vector3): Vector3;
  ceil(dest?: Vector3): Vector3;
  round(dest?: Vector3): Vector3;
  abs(dest?: Vector3): Vector3;

  clone(): Vector3;
}

declare class Vector4 {
  x: number;
  y: number;
  z: number;
  w: number;

  constructor(x?: number | Vector2 | Vector3, y?: number | Vector2, z?: number, w?: number);

  set(x?: number | Vector2 | Vector3 | Vector4, y?: number | Vector2, z?: number, w?: number): Vector4;
  zero(): Vector4;
  getArray(): Float32Array;
  
  add(x: number, y: number, z: number, w: number, dest?: Vector4): Vector4;
  addVec(vec4: Vector4, dest?: Vector4): Vector4;
  sub(x: number, y: number, z: number, w: number, dest?: Vector4): Vector4;
  subVec(vec4: Vector4, dest?: Vector4): Vector4;

  mul(x: number, y: number, z: number, w: number, dest?: Vector4): Vector4;
  mulScalar(scalar: number, dest?: Vector4): Vector4;
  mulVec(vec3: Vector4, dest?: Vector4): Vector4;
  // mulMat(mat3: Matrix3, dest?: Vector3): Vector3;
  // mulMatTranspose(mat2: Matrix3, dest?: Vector3): Vector3;

  div(x: number, y: number, z: number, w: number, dest?: Vector4): Vector4;
  divScalar(scalar: number, dest?: Vector4): Vector4;
  divVec(vec4: Vector4, dest?: Vector4): Vector4;

  dot(vec4: Vector4): number;

  lengthSquared(): number;
  length(): number;
  distanceSquared(): number;
  distance(): number;
  distanceSquaredVec(vec4: Vector4): number;
  distanceVec(vec4: Vector4): number;

  normalizeToLen(len: number, dest?: Vector4): Vector4;
  normalize(dest?: Vector4): Vector4;

  lerp(other: Vector4, t: number, dest?: Vector4): Vector4;
  negate(dest?: Vector4): Vector4;
  min(vec3: Vector4, dest?: Vector4): Vector4;
  max(vec3: Vector4, dest?: Vector4): Vector3;
  floor(dest?: Vector3): Vector3;
  ceil(dest?: Vector3): Vector3;
  round(dest?: Vector3): Vector3;
  abs(dest?: Vector3): Vector3;

  clone(): Vector3;
}

declare class Matrix2 {
  m00: number;
  m01: number;
  m10: number;
  m11: number;

  constructor(m00?: number | Float32Array | Matrix2 | Vector2, m01?: number | Vector2, m10?: number, m11?: number);

  identity(): Matrix2;
  zero(): Matrix2;
  set(m00?: number | Float32Array | Matrix2 | Vector2, m01?: number | Vector2, m10?: number, m11?: number): Matrix2;
  getArray(): Float32Array;

  determinate(): number;
  invert(dest?: Matrix2): Matrix2;
  transpose(dest?: Matrix2): Matrix2;

  add(other: Matrix2, dest?: Matrix2): Matrix2;
  sub(other: Matrix2, dest?: Matrix2): Matrix2;

  mul(right: Matrix2, dest?: Matrix2): Matrix2;
  mulLeft(left: Matrix2, dest?: Matrix2): Matrix2;
  mulComponentWise(other: Matrix2, dest?: Matrix2): Matrix2;

  scale(x: number, y: number, dest?: Matrix2): Matrix2;
  scaleVec(vec2: Vector2, dest?: Matrix2): Matrix2;
  scaleScalar(scalar: number, dest?: Matrix2): Matrix2;
  scaling(x: number, y: number): Matrix2;
  scalingVec(vec2: Vector2): Matrix2;
  scalingUniform(scalar: number): Matrix2;

  rotate(angle: number, dest?: Matrix2): Matrix2;
  rotateLeft(angle: number, dest?: Matrix2): Matrix2;
  rotation(angle: number): Matrix2;

  transform(vec2: Vector2, dest?: Vector2): Vector2;
  transformXY(x: number, y: number, dest: Vector2): Vector2;
  transformTranspose(vec2: Vector2, dest?: Vector2): Vector2;
  transformXYTranspose(x: number, y: number, dest: Vector2): Vector2;

  normal(dest?: Matrix2): Matrix2;
  lerp(other: Matrix2, t: number, dest?: Matrix2): Matrix2;
}

declare class Matrix3 {
  m00: number;
  m01: number;
  m02: number;
  m10: number;
  m11: number;
  m12: number;
  m20: number;
  m21: number;
  m22: number;

  constructor(m00?: number | Float32Array | Matrix2 | Matrix3 | Vector3, m01?: number | Vector3, m02?: number | Vector3, m10?: number, m11?: number, m12?: number, m20?: number, m21?: number, m22?: number);

  identity(): Matrix3;
  zero(): Matrix3;
  set(m00?: number | Float32Array | Matrix2 | Matrix3 | Vector3, m01?: number | Vector3, m02?: number | Vector3, m10?: number, m11?: number, m12?: number, m20?: number, m21?: number, m22?: number): Matrix3;
  getArray(): Float32Array;

  determinate(): number;
  invert(dest?: Matrix3): Matrix3;
  transpose(dest?: Matrix3): Matrix3;

  add(other: Matrix3, dest?: Matrix3): Matrix3;
  sub(other: Matrix3, dest?: Matrix3): Matrix3;
  mul(right: Matrix3, dest?: Matrix3): Matrix3;
  mulLeft(left: Matrix3, dest?: Matrix3): Matrix3;
  mulComponentWise(other: Matrix3, dest?: Matrix3): Matrix3;

  scale(x: number, y: number, z: number, dest?: Matrix3): Matrix3;
  scaleVec(vec3: Vector3, dest?: Matrix3): Matrix3;
  scaleScalar(scalar: number, dest?: Matrix3): Matrix3;
  scaling(x: number, y: number, z: number): Matrix3;
  scalingVec(vec3: Vector3): Matrix3;
  scalingUniform(scalar: number): Matrix3;

  transform(vec: Vector3, dest: Vector3): Vector3;
  transformXYZ(x: number, y: number, z: number, dest: Vector3): Vector3;
  transformTranspose(vec: Vector3, dest: Vector3): Vector3;
  transformXYZTranspose(x: number, y: number, z: number, dest: Vector3): Vector3;
  
  normal(dest?: Matrix3): Matrix3;
  cofactor(dest?: Matrix3): Matrix3;
  lerp(other: Matrix3, t: number, dest?: Matrix3): Matrix3;
}

declare class Matrix4 {
  m00: number;
  m01: number;
  m02: number;
  m03: number;
  m10: number;
  m11: number;
  m12: number;
  m13: number;
  m20: number;
  m21: number;
  m22: number;
  m23: number;
  m30: number;
  m31: number;
  m32: number;
  m33: number;

  constructor(m00?: number | Float32Array | Matrix3 | Matrix4 | Vector4, m01?: number | Vector4, m02?: number | Vector4, m03?: number | Vector4, m10?: number, m11?: number, m12?: number, m13?: number, m20?: number, m21?: number, m22?: number, m23?: number, m30?: number, m31?: number, m32?: number, m33?: number);

  identity(): Matrix4;
  zero(): Matrix4;
  set(m00?: number | Float32Array | Matrix3 | Matrix4 | Vector4, m01?: number | Vector4, m02?: number | Vector4, m03?: number | Vector4, m10?: number, m11?: number, m12?: number, m13?: number, m20?: number, m21?: number, m22?: number, m23?: number, m30?: number, m31?: number, m32?: number, m33?: number): Matrix3;
  getArray(): Float32Array;

}

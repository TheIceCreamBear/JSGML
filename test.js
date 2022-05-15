import { Vector3 } from './index.js';

function getRandomInt(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const array = [];
const array2 = [];
const resultArray = [];
for (let i = 0; i < 1_000_000; i++) {
    const x = getRandomInt(10000, 1);
    const y = getRandomInt(10000, 1);
    const z = getRandomInt(10000, 1);
    array.push(new Vector3(x, y, z));
    array2.push(new Vector3(y * 5, z * 10, x * 3));
    resultArray.push(array[i]);
    if (i % 2 == 0) {
    } else {
        // resultArray.push(new Vector3());
    }
}
const resultArray2 = [...resultArray];

console.time('Test Loop');
for (let i = 0; i < 1_000_000; i++) {
    if (i % 2 == 0) {

    } else {

    }
}
console.timeEnd('Test Loop');

console.time('Regular Add');
for (let i = 0; i < 1_000_000; i++) {
    resultArray[i].addVec(array2[i]);
    if (i % 2 == 0) {
    } else {
        // array[i].addVec(array2[i], resultArray[i]);
    }
}
console.timeEnd('Regular Add');

console.time('New Add');
for (let i = 0; i < 1_000_000; i++) {
    resultArray2[i].addVecNew(array2[i]);
    if (i % 2 == 0) {
    } else {
        // array[i].addVecNew(array2[i], resultArray2[i]);
    }
}
console.timeEnd('New Add');

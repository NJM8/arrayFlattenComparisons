// function steamrollArray(arr) {
//   return arr.every(element => !Array.isArray(element)) ? arr :
//     steamrollArray(arr.reduce((result, element) => {
//       Array.isArray(element) ? element.forEach(element => result.push(element)) : result.push(element);
//       return result;
//     }, []));
// }

// attempting to make it more efficient, regular for loops, storing array length, exiting first loop immediately if sub-array is found to flatten it.

function steamrollArray(arr){
  let arrL = arr.length;
  for (let i = 0; i < arrL; i++) {
    if (Array.isArray(arr[i])) {
      let newArr = [];
      for (let j = 0; j < arrL; j++) {
        if (Array.isArray(arr[j])) {
          let subArr = arr[j];
          let subArrL = subArr.length;
          for (k = 0; k < subArrL; k++) {
            newArr.push(subArr[k]);
          }
        } else {
          newArr.push(arr[j]);
        }
      }
      return steamrollArray(newArr);
    }
  }

  return arr;
}

// function from arr-flatten npm package claims to be fastest ;)
function flat(arr, res) {
  var i = 0, cur;
  var len = arr.length;
  for (; i < len; i++) {
    cur = arr[i];
    Array.isArray(cur) ? flat(cur, res) : res.push(cur);
  }
  return res;
}


function verifyFlat(arr){
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      return false;
    }
  }
  return true;
}

function createShallowArr(){
  let arr = [];
  for (let i = 0; i < 50000; i++) {
    let firstLevelStart = Math.floor(Math.random() * 9) + 1;
    let firstLevelLength = Math.floor(Math.random() * 9) + 1;
    if (i % firstLevelStart === 0) {
      let firstSub = [i];
      for (let j = 0; j < firstLevelLength; j++) {
        firstSub.push(j);
      }
      arr.push(firstSub);
    } else {
      arr.push[i];
    }
  }
  return arr;
}

function createDeepArr(){
  let arr = [];
  for (let i = 0; i < 50000; i++) {
    let firstLevelStart = Math.floor(Math.random() * 9) + 1;
    let firstLevelLength = Math.floor(Math.random() * 9) + 1;
    let secondLevelStart = Math.floor(Math.random() * 9) + 1;
    let secondLevelLength = Math.floor(Math.random() * 9) + 1;
    let thirdLevelStart = Math.floor(Math.random() * 9) + 1;
    let thirdLevelLength = Math.floor(Math.random() * 9) + 1;
    let fourthLevelStart = Math.floor(Math.random() * 9) + 1;
    let fourthLevelLength = Math.floor(Math.random() * 9) + 1;
    let fifthLevelStart = Math.floor(Math.random() * 9) + 1;
    let fifthLevelLength = Math.floor(Math.random() * 9) + 1;
    let sixthLevelStart = Math.floor(Math.random() * 9) + 1;
    let sixthLevelLength = Math.floor(Math.random() * 9) + 1;
    let seventhLevelStart = Math.floor(Math.random() * 9) + 1;
    let seventhLevelLength = Math.floor(Math.random() * 9) + 1;
    if (i % firstLevelStart === 0) {
      let firstSub = [i];
      for (let j = 0; j < firstLevelLength; j++) {
        if (j % secondLevelStart === 0) {
          let secondSub = [i];
          for (let k = 0; k < secondLevelLength; k++){
            if (k % thirdLevelStart === 0) {
              let thirdSub = [i];
              for (let l = 0; l < thirdLevelLength; l++){
                if (l % fourthLevelStart === 0) {
                  let fourthSub = [i];
                  for (let m = 0; m < fourthLevelLength; m++){
                    if (m % fifthLevelLength === 0) {
                      let fifthSub = [i];
                      for (let n = 0; n < fifthLevelStart; n++){
                        if (n % sixthLevelStart === 0) {
                          let sixthSub = [i];
                          for (let o = 0; o < sixthLevelLength; o++){
                            if (o % seventhLevelStart === 0) {
                              let seventhSub = [i];
                              for (let p = 0; p < seventhLevelLength; p++){
                                seventhSub.push(p);  
                              }
                              sixthSub.push(seventhSub);
                            } else {
                              sixthSub.push(o);
                            }
                          }
                          fifthSub.push(sixthSub);
                        } else {
                          fifthSub.push(n);
                        }
                      }
                      fourthSub.push(fifthSub);
                    } else {
                      fourthSub.push(m);
                    }
                  }
                  fourthSub.push(fourthSub);
                } else {
                  thirdSub.push(l);
                }
              }
              secondSub.push(thirdSub);
            } else {
              secondSub.push(k);
            }
          }
          firstSub.push(secondSub);
        } else {
          firstSub.push(j);
        }
      }
      arr.push(firstSub);
    } else {
      arr.push[i];
    }
  }
  return arr;
}


function runTest(func, array){
  const timeStart = performance.now();
  let flattened;
  if (func === flat) {
    flattened = func(array, []);
  } else {
    flattened = func(array);
  }
  const timeEnd = performance.now();
  const testTime = timeEnd - timeStart;
  const isFlat = verifyFlat(flattened);
  if (!isFlat) {
    console.log('failed');
    console.log(newArr);
    console.log(func);
    console.log(flattened);
  }
  return testTime;
}

let myDeepTests = [];
let lodashDeepTests = [];
let flatDeepTests = [];

for (let i = 0; i < 100; i++) {
  let array = createDeepArr();
  let myTest = runTest(steamrollArray, array);
  myDeepTests.push(myTest);
  let lodashTest = runTest(_.flattenDeep, array);
  lodashDeepTests.push(lodashTest);
  let flatTest = runTest(flat, array);
  flatDeepTests.push(flatTest);
}

const myDeepAverage = myDeepTests.reduce((sum, num) => {
  sum += num;
  return sum;
}, 0) / myDeepTests.length;

const lodashDeepAverage = lodashDeepTests.reduce((sum, num) => {
  sum += num;
  return sum;
}, 0) / lodashDeepTests.length;

const flatDeepAverage = flatDeepTests.reduce((sum, num) => {
  sum += num;
  return sum;
}, 0) / flatDeepTests.length;

console.log(`steamrollArray deep test average: ${myDeepAverage}msecs`);
console.log(`lodash flattenDeep deep test average: ${lodashDeepAverage}msecs`);
console.log(`flat deep test average: ${flatDeepAverage}msecs`);

let myShallowTests = [];
let lodashShallowTests = [];
let flatShallowTests = [];

for (let i = 0; i < 100; i++) {
  let array = createShallowArr();
  let myTest = runTest(steamrollArray, array);
  myShallowTests.push(myTest);
  let lodashTest = runTest(_.flatten, array);
  lodashShallowTests.push(lodashTest);
  let flatShallowTest = runTest(flat, array);
  flatShallowTests.push(flatShallowTest);
}

const myShallowAverage = myShallowTests.reduce((sum, num) => {
  sum += num;
  return sum;
}, 0) / myShallowTests.length;

const lodashShallowAverage = lodashShallowTests.reduce((sum, num) => {
  sum += num;
  return sum;
}, 0) / lodashShallowTests.length;

const flatShallowAverage = flatShallowTests.reduce((sum, num) => {
  sum += num;
  return sum;
}, 0) / flatShallowTests.length;

console.log(`steamrollArray shallow test average: ${myShallowAverage}msecs`);
console.log(`lodash flatten shallow test average: ${lodashShallowAverage}msecs`);
console.log(`flat shallow test average: ${flatShallowAverage}msecs`);


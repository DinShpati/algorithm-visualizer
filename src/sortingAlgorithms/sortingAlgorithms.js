export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }





  
  //Quicksort algirithm
  export function getQuickSortAnimation(array) {
    const animations = [];
    if (array.length <= 1) return array;
    if (array === undefined) return array;
    //quicksort(array, 0, array.length-1, animations);
    console.log(quicksortLomuto(array, 0, array.length - 1, animations));
    
    return animations;
  }

  // First write the swap function, which is just a helper function to swap values of the array.
function swap(array, i, j, animations) {
  animations.push([i, j, array[i], array[j], true, 'secondary']);
  animations.push([i, j, array[i], array[j], true, 'primary']);
  var temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

function quicksortLomuto(array, left, right, animations) {
  // left-pointer would be the index of the first element which is 0 and right-pointer would be the index of the last element which would be (length -1).
  left = left || 0;
  right = right || array.length - 1;

  var pivot = partitionLomuto(array, left, right, animations);
  animations.push([pivot, 'pivot', 0, 0, false, 'secondary']);
  animations.push([pivot, 'pivot', 0, 0, false, 'primary']);

  if (left < pivot - 1) {
      quicksortLomuto(array, left, pivot - 1, animations);
  }

  if (right > pivot) {
      quicksortLomuto(array, pivot - 1, right, animations)
  }

  return array;
}

function partitionLomuto(array, left, right, animations) {
  // Lomuto algorithm always uses the last element, array[right], for the pivot.
  var pivot = right;
  animations.push([pivot, 'pivot', 0, 0, false, 'secondary']);
  animations.push([pivot, 'pivot', 0, 0, false, 'primary']);
  var i = left;

  /*The logic under Lomuto is, we start from the leftmost element and keep track of index of smaller (or equal to) elements as j. While traversing, if we find a smaller element, we swap current element with arr[j]. Otherwise we ignore current element.*/
  for (var j = left; j < right; j++) {
      if (array[j] <= array[pivot]) {
          swap(array, i, j, animations);
          i++
      }else{
        animations.push([i, j, array[i], array[j], false, 'secondary']);
        animations.push([i, j, array[i], array[j], false, 'primary']);
      }
  }
  swap(array, i, j, animations);
  return i;
}

//another version of the quick sort function that runs at a better runtime but cant be aimated
  /*function quicksort(array, animations) {
    if (array.length <= 1) {
      return array;
    }
  
    var pivot = array[0];
    
    var left = []; 
    var right = [];
  
    for (var i = 1; i < array.length; i++) {
      if(array[i] < pivot){
        left.push(array[i])
      }else{
        right.push(array[i])
      }
      //array[i] < pivot ? left.push(array[i]) : right.push(array[i]);
    }
    
    return quicksort(left).concat(pivot, quicksort(right));
  };*/


//Bubble Sort Algorithm
export function getBubbleSortAnimation(array) {
  const animations = [];
    if (array.length <= 1) return array;
    if (array === undefined) return array;
    //quicksort(array, 0, array.length-1, animations);
    console.log(bubbleSort(array, animations));
    
    return animations;
}
let bubbleSort = (inputArr, animations) => {
  let len = inputArr.length;
  let swapped;
  do {
      swapped = false;
      for (let i = 0; i < len; i++) {
          if (inputArr[i] > inputArr[i + 1]) {
              animations.push([i, i+1, inputArr[i], inputArr[i+1], true, 'secondary']);
              animations.push([i, i+1, inputArr[i], inputArr[i+1], true, 'primary']);
              let tmp = inputArr[i];
              inputArr[i] = inputArr[i + 1];
              inputArr[i + 1] = tmp;
              swapped = true;
          }else{
            if(inputArr[i+1]){
              animations.push([i, i+1, inputArr[i], inputArr[i+1], false, 'secondary']);
              animations.push([i, i+1, inputArr[i], inputArr[i+1], false, 'primary']);
            }else{
              animations.push([i, null, inputArr[i], null, false, 'secondary']);
              animations.push([i, null, inputArr[i], null, false, 'primary']);
            }
            
          }
      }
  } while (swapped);
  return inputArr;
};


//Heap Sort Algorithm

export function getHeapSortAnimation(array) {
  const animations = [];
    if (array.length <= 1) return array;
    if (array === undefined) return array;
    //quicksort(array, 0, array.length-1, animations);
    console.log(heapSort(array, array.length, animations));
    
    return animations;
}
 // main function to do heap sort 
 const heapSort = (arr, n, animations) => { 
  // Build heap (rearrange array) 
  for (let i = parseInt(n / 2 - 1); i >= 0; i--) {
      maxHeapify(arr, n, i, animations); 
  }

  // One by one extract an element from heap 
  for (let i = n - 1; i >= 0; i--) { 
     // Move current root to end 
     animations.push([i, 0, arr[i], arr[0], true, 'secondary']);
      animations.push([i, 0, arr[i], arr[0], true, 'primary']);
     let temp = arr[0]; 
     arr[0] = arr[i]; 
     arr[i] = temp; 

     // call max heapify on the reduced heap 
     maxHeapify(arr, i, 0, animations); 
  } 
}
const maxHeapify = (arr, n, i, animations) => {
  let largest = i;
  let l = 2 * i + 1; //left child index
  let r = 2 * i + 2; //right child index
  
  //If left child is smaller than root
   if (l < n && arr[l] > arr[largest]) {
         largest = l; 
   }
  
   // If right child is smaller than smallest so far 
   if (r < n && arr[r] > arr[largest]) {
        largest = r; 
   }
  
   // If smallest is not root 
   if (largest != i) { 
      animations.push([i, largest, arr[i], arr[largest], true, 'secondary']);
      animations.push([i, largest, arr[i], arr[largest], true, 'primary']);
        let temp = arr[i]; 
        arr[i] = arr[largest]; 
        arr[largest] = temp; 
  
      // Recursively heapify the affected sub-tree 
      maxHeapify(arr, n, largest, animations); 
    } 
}


export class sortingAlgos {
  constructor(time) {
    this.time = time;
    this.array = [8, 4, 3, 1, 2, 0, 6, 5];
    this.help = new Supporter(this.time, this.list);
  }

  //Insertion Sort
  InsertionSort = (arr) => {
    for (let j = 1; j < arr.length; j++) {
      // Temporary variable to hold the value of arr[j]
      let temp = arr[j];
      let k = j - 1;

      // Shift elements of the sorted portion to the right
      while (k >= 0 && arr[k] > temp) {
        arr[k + 1] = arr[k];
        k--;
      }

      // Place temp in its correct position
      arr[k + 1] = temp;
    }
    return arr;
  };

  //Selection Sort
  SelectionSort = async (arr) => {
    let i = 0;
    while (i < arr.length) {
      let min = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[min]) {
          min = j;
        }
      }
      this.Swap(arr, i, min);
      i++;
    }
    return arr;
  };

  //Merge Sort
  MergeSort = async (arr) => {
    if (arr.length <= 1) return arr;

    let middle = Math.floor(arr.length / 2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle);

    let sortedLeft = this.MergeSort(left);
    let sortedRight = this.MergeSort(right);

    this.Merge(sortedLeft, sortedRight);
  };

  Merge = async (left, right) => {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex <= left.length && rightIndex <= right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  };

  //Quick Sort Without using extra space
  QuickSort = async (arr, low = 0, high = arr.length - 1) => {
    if (low < high) {
      let pivot = this.Partition(arr, low, high);
      this.QuickSort(arr, low, pivot - 1);
      this.QuickSort(arr, pivot + 1, high);
    }
    return arr;
  };

  Partition = async (arr, low, high) => {
    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        this.Swap(arr, i, j);
      }
    }

    this.Swap(arr, i + 1, high);

    return i + 1; //return index of pivot
  };

  Swap = (arr, i, j) => {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };
}

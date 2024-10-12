import React, { useState, useEffect } from "react";

// Candle component to represent each bar/candle
const Candle = ({ height, size, width, color, enableRandomColor }) => {
  return (
    <div
      style={{
        height: `${height * 3.8}px`, // Scaling height for better visibility
        width: `${width}px`,
        margin: `0 ${width/4}px`,
        backgroundColor: enableRandomColor ? color : "#17BF68",
        display: "inline-block",
        transition: "all 0.3s ease",
      }}
    ></div>
  );
};

// Main CandleChart component that accepts an array as prop
const CandleChart = ({
  heightsArray,
  colorArray,
  enableRandomColor,
  triggerAction,
  setTriggerAction,
  speed,
}) => {
  const [heights, setHeights] = useState(heightsArray);
  const [color, setColor] = useState(colorArray);

  // Use effect to update heights when heightsArray prop changes
  useEffect(() => {
    setHeights(heightsArray);
    setColor(colorArray);
  }, [heightsArray, colorArray]);

  useEffect(() => {
    if (triggerAction == "Quick Sort" && heights && heights.length > 0) {
      QuickSort(heights);
    } else if(triggerAction == "Merge Sort") {
      MergeSort(heights);
    }else if(triggerAction == "Selection Sort"){
        SelectionSort(heights);
    }else if(triggerAction == "Insertion Sort"){
        InsertionSort(heights);
    }
    setTriggerAction("");
  }, [triggerAction]);

  const containerWidth = 400; // Fixed container width
  const candleWidth = containerWidth / heights.length;

  //Merge Sort
// Merge Sort
const MergeSort = async (arr, leftStart = 0) => {
    // Base case: arrays with 1 or 0 elements are already sorted
    if (arr.length <= 1) return arr;
  
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);  // Left half of the array
    const right = arr.slice(middle);    // Right half of the array
  
    // Recursively sort both halves and await the result
    const sortedLeft = await MergeSort(left, leftStart); 
    const sortedRight = await MergeSort(right, leftStart + middle);
  
    // Merge both sorted halves back together and await the result
    return await Merge(sortedLeft, sortedRight, leftStart);
  };
  
  // Merge function to merge two sorted arrays
  const Merge = async (left, right, start) => {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;
  
    // Merge arrays by comparing the elements
    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        // Simulate a "swap" visually by placing elements in their correct place
        await swapAndVisualize(start + result.length - 1, start + leftIndex);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        await swapAndVisualize(start + result.length - 1, start + left.length + rightIndex);
        rightIndex++;
      }
    }
  
    // Copy remaining elements of left and right arrays
    while (leftIndex < left.length) {
      result.push(left[leftIndex]);
      await swapAndVisualize(start + result.length - 1, start + leftIndex);
      leftIndex++;
    }
  
    while (rightIndex < right.length) {
      result.push(right[rightIndex]);
      await swapAndVisualize(start + result.length - 1, start + left.length + rightIndex);
      rightIndex++;
    }
  
    console.log('result: ' + result)
    setHeights(result);
    return result;
  };

  //Insertion Sort
  const InsertionSort = async(arr) => {
    for (let j = 1; j < arr.length; j++) {
      // Temporary variable to hold the value of arr[j]
      let temp = arr[j];
      let k = j - 1;

      // Shift elements of the sorted portion to the right
      while (k >= 0 && arr[k] > temp) {
        arr[k + 1] = arr[k];
        swap(arr, k+1, k);
        await pause();
        k--;
      }

      // Place temp in its correct position
      arr[k + 1] = temp;
    }
    return arr;
  };

  const SelectionSort = async (arr) => {
    let i = 0;
    while (i < arr.length) {
      let min = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[min]) {
          min = j;
        }
      }
      swap(arr, i, min);
      await pause();
      i++;
    }
    return arr;
  };
  
  // Swap and visualize the changes
  const swapAndVisualize = async (i, j) => {
    if (i === j) return;
  
    let newHeights = [...heights]; // Copy the array to avoid direct mutation
    let newColors = [...color];    // Copy the array to avoid direct mutation
  
    // Simulate swapping by copying the values visually
    [newHeights[i], newHeights[j]] = [newHeights[j], newHeights[i]];
    [newColors[i], newColors[j]] = [newColors[j], newColors[i]];
  
    // Update the visual states
    setHeights(newHeights);
    setColor(newColors);
    console.log(newHeights);
  
    await pause(); // Pause to allow visualization of the swap
  };

  

  //Quick Sort Without using extra space
  // Main sorting function
  const QuickSort = async (
    arr: string | any[],
    low = 0,
    high = arr.length - 1
  ) => {
    if (low < high) {
      let pivot = await Partition(arr, low, high); // Await the partitioning step
      await QuickSort(arr, low, pivot - 1); // Await recursive call for left part
      await QuickSort(arr, pivot + 1, high); // Await recursive call for right part
    }
    return arr;
  };

  // Partitioning function
  const Partition = async (arr, low, high) => {
    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        swap(arr, i, j);
        await pause(); // Pause between swaps for visualization
      }
    }

    swap(arr, i + 1, high); // Move pivot to its correct place
    await pause(); // Pause after swapping pivot
    return i + 1; // Return pivot index
  };

  // Pause for visualization delay
  const pause = () => {
    return new Promise((resolve) => setTimeout(resolve, 400 / speed)); // Adjust time as needed
  };

  // Swap function to swap two indexes in the array
  const swap = (arr, i, j) => {
    if (i < 0 || j < 0 || i >= heights.length || j >= heights.length) {
      console.error("Invalid index for swap");
      return;
    }
    let newHeights = [...heights]; // Copy the array to avoid direct mutation
    let newColors = [...color]; // Copy the array to avoid direct mutation
    // Swap logic

    [arr[i], arr[j]] = [arr[j], arr[i]];
    [newHeights[i], newHeights[j]] = [newHeights[j], newHeights[i]];
    [newColors[i], newColors[j]] = [newColors[j], newColors[i]];
    setColor(newColors);
    setHeights(newHeights); // Update state with the swapped array

    console.log("Swapped heights:", newHeights);
  };
  
  const shuffleArray = () => {
    let newHeights = [...heights];
    let newColors = [...color]; 
    for (let i = newHeights.length - 1; i > 0; i--) {
      // Generate a random index from 0 to i
      const j = Math.floor(Math.random() * (i + 1));
  
      // Swap elements at indices i and j
      [newHeights[i], newHeights[j]] = [newHeights[j], newHeights[i]];
      [newColors[i], newColors[j]] = [newColors[j], newColors[i]];
    }
    setHeights(newHeights);
    setColor(newColors);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          height: "400px",
          border: "1px solid black",
        }}
      >
        {heights.map((height, index) => (
          <div>
            <div className="justify-center flex text-sm">{height}</div>
            <div>
              <Candle
                key={index}
                height={height}
                color={color[index]}
                size={heightsArray.length}
                width={candleWidth}
                enableRandomColor={enableRandomColor}
              />
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "20px" }} className="justify-center flex">
        {/* Buttons to trigger swaps */}
        <button
          type="button"
          className="text-[#0D091C] bg-[#17BF69] hover:bg-[#27ac67] font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2"
          onClick={() => shuffleArray()}
        >
            Randomize Array
        </button>
        <button
          type="button"
          className="text-[#0D091C] bg-[#17BF69] hover:bg-[#27ac67] font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2"
          onClick={() => swap(heights, 1, 2)}
        >
          Swap Index 1 and 2
        </button>
        <button
          type="button"
          className="text-[#0D091C] bg-[#17BF69] hover:bg-[#27ac67] font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2"
          onClick={() => swap(heights, 2, 3)}
        >
          Swap Index 2 and 3
        </button>
      </div>
    </div>
  );
};

export default CandleChart;

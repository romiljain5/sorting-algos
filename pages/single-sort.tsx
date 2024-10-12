"use strict";
import { CopyBlock, dracula } from "react-code-blocks";
import "../src/app/globals.css";
import BarChart from "../components/BarChart/bar-chart";
import { useEffect, useState } from "react";

function selectionSort(arr: any) {
  const n = arr.length;
  const allArrays = [];
  
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    
    allArrays.push([...arr]);
    // Find the index of the minimum element in the unsorted portion of the array
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    
    // Swap the minimum element with the first element of the unsorted portion
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  allArrays.push([...arr]);
  
  return allArrays;
}

function SingleSort() {
  
  const code = `function selectionSort(arr) {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      
      // Find the index of the minimum element in the unsorted portion of the array
      for (let j = i + 1; j < n; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
      
      // Swap the minimum element with the first element of the unsorted portion
      if (minIndex !== i) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      }
    }
    
    return arr;
  }
  
  // Example usage:
  const arr = [64, 25, 12, 22, 11];
  console.log("Original array:", arr);
  console.log("Sorted array:", selectionSort(arr));`;

  const allNumbers = [20, 100, 10, 30, 5, 300, 200];
  const sortedArray: any = selectionSort(allNumbers);

  // const [numbers, setNumbers] = useState([]);

  // let count=0;
  // useEffect(() => {
  //   const updateNumbers = async () => {
  //     for (let i = 0; i < sortedArray.length; i++) {
  //       console.log(sortedArray);
  //       await new Promise(resolve => setTimeout(resolve, 10000)); // Wait for 1 second
  //       setNumbers(sortedArray[i]);
  //       count++;
  //     }
  //   };

  //   if (count < sortedArray.length) { // Check if sortedArray has elements
  //    updateNumbers();
  //   }
  // }, [numbers]); // Run this effect whenever sortedArray changes


  return (
    <div className="container mx-auto px-5">
      <div style={{ padding: '100px 0 0 0' }}>
        <BarChart sortedArray={sortedArray}/>
      </div>
      <div className="flex text-3xl font-semibold my-9 justify-center">Single Sort</div>
      <div>
        demo
      </div>
      
    </div>
  );
}

export default SingleSort;

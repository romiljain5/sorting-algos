"use strict";
import { sortingAlgos as sortAlgorithms } from "./algorithms";

export const start = async () => {
  let algoValue = Number(document.querySelector(".algo-menu").value);
  let speedValue = Number(document.querySelector(".speed-menu").value);

  if (speedValue === 0) {
    speedValue = 1;
  }
  if (algoValue === 0) {
    alert("No Algorithm Selected");
    return;
  }

  let algorithm = new sortAlgorithms(speedValue);
  if (algoValue === 1) await algorithm.BubbleSort();
  if (algoValue === 2) await algorithm.SelectionSort();
  if (algoValue === 3) await algorithm.InsertionSort();
  if (algoValue === 4) await algorithm.MergeSort();
  if (algoValue === 5) await algorithm.QuickSort();
};

export const RenderScreen = async (algoValue, arrSize) => {
  await RenderList(algoValue, arrSize);
};

export const RenderList = async (algoValue, arrSize) => {
  let sizeValue = Number(arrSize);
  await clearScreen();

  let list = await randomList(sizeValue);
  const arrayNode = document.querySelector(".array");
  console.log(arrayNode);
  console.log(list);
  for (const element of list) {
    const node = document.createElement("div");
    node.className = "cell";
    node.setAttribute("value", String(element));
    node.style.height = `${3.8 * element}px`;
    arrayNode.appendChild(node);
  }
};

export const RenderArray = async (sorted) => {
  let sizeValue = Number(document.querySelector(".size-menu").value);
  await clearScreen();

  let list = await randomList(sizeValue);
  if (sorted) list.sort((a, b) => a - b);

  const arrayNode = document.querySelector(".array");
  const divnode = document.createElement("div");
  divnode.className = "s-array";

  for (const element of list) {
    const dnode = document.createElement("div");
    dnode.className = "s-cell";
    dnode.innerText = element;
    divnode.appendChild(dnode);
  }
  arrayNode.appendChild(divnode);
};

export const randomList = async (Length) => {
    let list = [];
    const lowerBound = 1;
    const upperBound = 100;
  
    for (let counter = 0; counter < Length; ++counter) {
      const randomNumber = Math.floor(
        Math.random() * (upperBound - lowerBound + 1) + lowerBound
      );
      list.push(parseInt(randomNumber));
    }

    console.log('Arr', list)
    return list; // Ensure this returns an array
  };
  export const randomLightColorList = async (length) => {
    const list = [];
    
    for (let i = 0; i < length; i++) {
        // Generate random RGB values ensuring they are light
        const r = Math.floor(Math.random() * 156) + 100; // Values between 100 and 255
        const g = Math.floor(Math.random() * 156) + 100; // Values between 100 and 255
        const b = Math.floor(Math.random() * 156) + 100; // Values between 100 and 255
        
        // Convert RGB to HEX format
        const color = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
        
        list.push(color);
    }

    console.log('Light Colors:', list);
    return list; // Return the array of light shade colors
};

export const clearScreen = async () => {
  document.querySelector(".array").innerHTML = "";
};

export const response = () => {
  let Navbar = document.querySelector(".navbar");
  if (Navbar.className === "navbar") {
    Navbar.className += " responsive";
  } else {
    Navbar.className = "navbar";
  }
};

// document.querySelector(".icon").addEventListener("click", response);
// document.querySelector(".start").addEventListener("click", start);
// document.querySelector(".size-menu").addEventListener("change", RenderScreen);
// document.querySelector(".algo-menu").addEventListener("change", RenderScreen);
// window.onload = RenderScreen;

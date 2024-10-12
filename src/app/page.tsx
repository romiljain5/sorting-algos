"use client";

import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from "react";
import {clearScreen, randomLightColorList, randomList, RenderScreen, response, start} from "../../services/app"
import CandleChart from "./candle";

export default function Home() {
  const [array, setArray] = useState([]);
  const [colorArray, setColorArray] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [arrDropdownVisible, setArrDropdownVisible] = useState(false);
  const [speedDropdown, setSpeedDropdown] = useState(false);
  const [sorting, setSorting] = useState("Quick Sort");
  const [arrSize, setSize] = useState(10);
  const [speed, setSpeed] = useState(1);
  const [triggerAction, setTriggerAction] = useState("Select Sorting Algorithm");

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const toggleSpeedDropdown = () => {
    setSpeedDropdown((prev) => !prev);
  };

  const toggleArrDropdown = () => {
    setArrDropdownVisible((prev) => !prev);
  };

  const sortingAlgos = [
    "Selection Sort",
    "Merge Sort",
    "Quick Sort",
    "Insertion Sort",
  ];

  useEffect(() => {
    RenderScreen();
    RenderList(arrSize);
  }, [])
  

  const generateArrSizes = (n = 5) => {
    let arr = [];
    for (let i = 1; i < n; i++) {
      arr.push(i * 5);
    }
    return arr;
  };

  const RenderList = async (arrSize: number) => {
    const list: any = await randomList(arrSize);
    const randomColor: any = await randomLightColorList(arrSize)
    setArray(list);
    setColorArray(randomColor);
  };
  
  const triggerSort = async () => {
    try {
      setTriggerAction(sorting);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-[#0D091C] min-h-screen">
   
      {/* Apply background and full-screen height */}
      <Head>
        <title>Sorting Visualizer</title> {/* Fix title tag */}
      </Head>
      <div className="flex flex-col items-center py-6">
        <h2
          className="text-3xl font-bold text-white mb-6 cursor-pointer"
          onClick={() => window.location.reload()}
        >
          Sorting Visualizer
        </h2>
        <div className="flex space-x-4 relative">
          {/* Toggle random colors */}
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              checked={toggle}
              onClick={() => setToggle(!toggle)}
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#17BF69]"></div>
            <span className="ms-3 text-sm font-medium text-white">
              Random Colors
            </span>
          </label>

          {/* Generate array */}
          <button
            type="button"
            onClick={async ()=> await RenderList(arrSize)}
            className="text-[#0D091C] bg-[#17BF69] hover:bg-[#27ac67] font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2"
          >
            Generate Array
          </button>

          {/* Dropdown button */}
          <div className="relative">
            <button
              id="dropdownDefaultButton"
              onClick={toggleDropdown} // Toggle dropdown visibility
              className="text-[#0D091C] bg-[#17BF69] hover:bg-[#27ac67] font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 text-center inline-flex items-center"
              type="button"
            >
              {sorting}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {dropdownVisible && (
              <div
                id="dropdown"
                className="absolute z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                style={{ top: "100%", left: "0" }} // Adjusts the position relative to the button
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  {sortingAlgos.map((a, b) => (
                    <li
                      key={a}
                      onClick={async () => {
                        setSorting(a);
                        toggleDropdown();
                      }}
                    >
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        {a}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Dropdown button for array size */}
          <div className="relative">
            <button
              id="dropdownDefaultButton"
              onChange={()=>RenderScreen()}
              onClick={toggleArrDropdown} // Toggle dropdown visibility
              className="text-[#0D091C] bg-[#17BF69] hover:bg-[#27ac67] font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 text-center inline-flex items-center"
              type="button"
            >
              {arrSize}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {arrDropdownVisible && (
              <div
                id="dropdown"
                className="absolute z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                style={{ top: "100%", left: "0" }} // Adjusts the position relative to the button
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  {generateArrSizes(10).map((size, index) => (
                    <li
                      key={size} // Ensure this is unique, as size values will repeat for different n
                      onClick={() => {
                        setSize(size); // Ensure setSize is defined
                        RenderList(size);
                        toggleArrDropdown(); // Ensure toggleArrDropdown is defined
                      }}
                    >
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        {size} {/* Display the generated size */}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Dropdown button for speed */}
          <div className="relative">
            <button
              id="dropdownDefaultButton"
              onClick={toggleSpeedDropdown} // Toggle dropdown visibility
              className="text-[#0D091C] bg-[#17BF69] hover:bg-[#27ac67] font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 text-center inline-flex items-center"
              type="button"
            >
              {speed}x
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {speedDropdown && (
              <div
                id="dropdown"
                className="absolute z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                style={{ top: "100%", left: "0" }} // Adjusts the position relative to the button
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  {[1, 2, 3, 4, 5, 6].map((sp, index) => (
                    <li
                      key={sp} // Ensure this is unique, as size values will repeat for different n
                      onClick={() => {
                        setSpeed(sp); // Ensure setSize is defined
                        toggleSpeedDropdown(); // Ensure toggleArrDropdown is defined
                      }}
                    >
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        {sp} {/* Display the generated size */}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sort array */}
          <button
            type="button"
            className="text-[#0D091C] bg-[#17BF69] hover:bg-[#27ac67] font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2"
            onClick={()=>triggerSort()}
          >
            Sort Array
          </button>

        </div>

        <div className="container mt-32">
          <CandleChart triggerAction={triggerAction} speed={speed} setTriggerAction={setTriggerAction} heightsArray={array} colorArray={colorArray} enableRandomColor={toggle}/>
        </div>
      </div>
      <footer className="w-full mt-auto text-center py-6 bg-gray-800 text-white">
        <div className="flex justify-center items-center">

        <p className="flex justify-center items-center">
          Created with 
          <img src={'bxs-heart.svg'} alt="My Icon" className="mx-2" width={30} height={30} /> by Romil  | Follow me on
        </p>
          <a
            href="https://www.linkedin.com/in/romil-jain123/"
            target="_blank"
            className="text-white hover:underline mx-3"
          >
            <i className="fa fa-linkedin-square" aria-hidden="true"></i>
            <img src={'bxl-linkedin.svg'} alt="My Icon" width={25} height={25} />
          </a>
          <a
            href="https://github.com/romiljain5"
            target="_blank"
            className="text-white hover:underline"
          >
            <img src={'bxl-github.svg'} alt="My Icon" width={25} height={25} />
          </a></div>
        
      </footer>
    </div>
  );
}

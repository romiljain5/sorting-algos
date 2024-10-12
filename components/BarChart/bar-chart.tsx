import React, { useEffect, useState } from "react";
import "./bar-chart.css";

export default function BarChart(props) {
  const [numbers, setNumbers] = useState([]);
  const [maxNumber, setMaxNumber] = useState(10); // Initial maxNumber value
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const updateNumbers = async () => {
      for (let i = 0; i < props.sortedArray.length; i++) {
        // Delay each update by 20 seconds
        await new Promise(resolve => setTimeout(resolve, 2000));
        setNumbers(props.sortedArray[i]);
        // Update maxNumber after setting numbers
        setMaxNumber(Math.max(...props.sortedArray[i]));
      }
    };

    updateNumbers();
  }, [props.sortedArray]); // Run this effect whenever props.sortedArray changes

  useEffect(() => {
    // Define an array of color codes
    const colorCodes = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF", "#FF00FF", "#C0C0C0"];
    // Calculate the maximum number
    const max = Math.max(...numbers);
    // Calculate the color index for each number based on its value
    const newColors = numbers.map(number => colorCodes[Math.floor((number / max) * colorCodes.length)]);
    setColors(newColors);
  }, [numbers]); // Run this effect whenever numbers changes

  return (
    <div className="flex items-center h-screen">
      <div className="">
        <div style={{ height: `${Math.min(maxNumber, 500) + 100}px` }} className="flex items-end">
          {numbers.map((value, index) => (
            <div key={index}>
              <div
                style={{ height: `${(value / maxNumber) * 500}px`, width: '40px', backgroundColor: colors[index], marginRight: '10px' }}
              ></div>
              <code>{value}</code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

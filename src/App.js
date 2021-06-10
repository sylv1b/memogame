import React, { useState, useEffect } from "react";
import MemoryContainers from "./components/memory/MemoryContainer";
import { shuffleArray } from "./utils/shuffleArray";
import "./styles/styles.css";
import { data } from "./data/memoData";

function App() {
  const [theme, setTheme] = useState("");
  const [memoData, setMemoData] = useState([]);
  const [numberOfImages, setNumberOfImages] = useState(8);
  const [reset, setReset] = useState(true);

  //creates shuffled array of image pairs
  useEffect(() => {
    if (reset) {
      setReset(false);
      let images = [...data];
      let filteredData = theme
        ? images.filter((data) => data.theme.includes(theme))
        : images;
      filteredData = shuffleArray(filteredData).splice(
        0,
        numberOfImages <= filteredData.length
          ? numberOfImages
          : filteredData.length
      );
      filteredData = shuffleArray(filteredData.concat(filteredData));
      setMemoData(
        filteredData.map((items, index) => {
          return {
            ...items,
            index: index,
          };
        })
      );
    }
  }, [theme, reset, numberOfImages]);

  const tryAgain = () => {
    setReset(true);
  };

  return (
    <div id="main-container">
      <h1>The memory game</h1>
      <h5>Find pairs of cards</h5>

      <div id="content">
        <MemoryContainers memoData={memoData} onTryAgain={tryAgain} />
      </div>
    </div>
  );
}

export default App;

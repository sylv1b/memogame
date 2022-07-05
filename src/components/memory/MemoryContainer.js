import React, { useState, useEffect } from "react";
import Card from "./Card";
import useWindowSize from "../../hooks/useWindowsize";
import Scores from "./Scores";

const MemoryContainer = ({ memoData, onTryAgain, onSaveGame }) => {
  const [numOfClicks, setNumOfClicks] = useState(0);
  const [tempImagesId, setTempImagesId] = useState([]);
  const [found, setFound] = useState([]);
  const [userWins, setUserWins] = useState(false);
  const [clickDisabled, setClickDisabled] = useState(false);
  const [tries, setTries] = useState(0);
  const [isSaveEnabled, setIsSaveEnabled] = useState(true)

  useEffect(() => {
    if (userWins && isSaveEnabled) {
      setIsSaveEnabled(false)
      onSaveGame(numOfClicks / 2, found.length)
    }
  }, [found, isSaveEnabled, numOfClicks, onSaveGame, userWins])


  //Get windows size
  const windowSize = useWindowSize();
  const width = windowSize.width;

  const onImageClick = (id, index) => {
    if (!clickDisabled) {
      if (numOfClicks % 2 === 0) {
        setTempImagesId([index]);
      } else {
        setClickDisabled(true);
        let selectedImages = [...tempImagesId];
        selectedImages.push(index);
        setTempImagesId(selectedImages);
        setTries(tries + 1);
        setTimeout(() => {
          setTempImagesId([]);
          setClickDisabled(false);
        }, 800);
      }
      setNumOfClicks(numOfClicks + 1);
    }
  };

  const tryAgain = () => {
    setNumOfClicks(0);
    setTempImagesId([]);
    setFound([]);
    setUserWins(false);
    setClickDisabled(false);
    setTries(0);
    onTryAgain();
    setIsSaveEnabled(true)
  };

  useEffect(() => {
    if (tempImagesId.length === 2) {
      if (memoData[tempImagesId[0]].id === memoData[tempImagesId[1]].id) {
        let foundImages = [...found];
        foundImages.push(memoData[tempImagesId[0]].id);
        setFound(foundImages);
      }
    }

    if (!!memoData.length && memoData.length / 2 === found.length) {
      setUserWins(true);
    } else {
      setUserWins(false);
    }
  }, [tempImagesId]);

  return (
    <div style={{ textAlign: "center" }}>
      <Scores tries={tries} found={found} numOfClicks={numOfClicks} />
      <div
        className="memory-container"
        style={{ width: width > 900 ? 900 : width }}
      >
        {memoData.map((image) => (
          <Card
            image={image}
            size={width > 900 ? 200 : width / 4 - (memoData.length + 2 * 5)}
            fliped={
              found.includes(image.id) || tempImagesId.includes(image.index)
            }
            key={`card-${image.id}-${image.index}`}
            onClick={() => onImageClick(image.id, image.index)}
            clickDisabled={clickDisabled}
          />
        ))}
      </div>

      {userWins && (
        <button onClick={() => tryAgain()}>You won! Try again</button>
      )}
    </div>
  );
};

export default React.memo(MemoryContainer);

import React from "react";

function Scores({ tries, found, numOfClicks }) {
  return (
    <div className="score">
      {tries
        ? `${tries} ${tries > 1 ? "tries" : "try"} - ${found.length} pair found`
        : numOfClicks === 0
        ? "Pick a card!"
        : "Pick another card!"}
    </div>
  );
}

export default React.memo(Scores);

import React, { useState, useEffect } from 'react';

const Matrix = () => {
  const [clickedBoxes, setClickedBoxes] = useState([]);
  const [allClicked, setAllClicked] = useState(false);
  const [animatingIndex, setAnimatingIndex] = useState(null);
  const matrixSize = 9;

  const handleBoxClick = (index) => {
    if (allClicked || clickedBoxes.includes(index)) return;
    
    const newClickedBoxes = [...clickedBoxes, index];
    setClickedBoxes(newClickedBoxes);

    if (newClickedBoxes.length === matrixSize) {
      setAllClicked(true);
    }
  };

  useEffect(() => {
    if (!allClicked) return;

    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex < clickedBoxes.length) {
        setAnimatingIndex(clickedBoxes[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 500);

    return () => clearInterval(intervalId);
  }, [allClicked, clickedBoxes]);

  const getBoxColor = (index) => {
    if (allClicked) {
      if (animatingIndex === index || clickedBoxes.indexOf(index) < clickedBoxes.indexOf(animatingIndex)) {
        return 'bg-orange-500';
      }
      if (clickedBoxes.includes(index)) {
        return 'bg-green-500';
      }
    } else {
      if (clickedBoxes.includes(index)) {
        return 'bg-green-500';
      }
    }
    return 'bg-gray-200';
  };

  const resetGame = () => {
    setClickedBoxes([]);
    setAllClicked(false);
    setAnimatingIndex(null);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-bold mb-4">Interactive 3x3 Matrix</h2>

      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: matrixSize }).map((_, index) => (
          <div
            key={index}
            onClick={() => handleBoxClick(index)}
            className={`w-24 h-24 flex items-center justify-center text-lg font-bold cursor-pointer transition-colors duration-300 ${getBoxColor(index)}`}
          >
            {clickedBoxes.includes(index) && !allClicked ? clickedBoxes.indexOf(index) + 1 : ""}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Reset Game
        </button>
      </div>

      <div className="mt-2 text-center text-gray-600">
        {!allClicked && clickedBoxes.length > 0 ? (
          <p>{matrixSize - clickedBoxes.length} boxes left to click</p>
        ) : allClicked ? (
          <p>All boxes clicked! Watch the orange animation.</p>
        ) : (
          <p>Click on the boxes to turn them green</p>
        )}
      </div>
    </div>
  );
};

export default Matrix; 
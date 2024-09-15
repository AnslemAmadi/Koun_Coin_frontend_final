// Coincontext.js
import React, { createContext, useState, useEffect } from 'react';

export const Coincontext = createContext();

export const CoinProvider = ({ children }) => {
  const [coinCount, setCoinCount] = useState(() => parseInt(localStorage.getItem('coinCount'), 10) || 0);
  const [currentLevel, setCurrentLevel] = useState(() => JSON.parse(localStorage.getItem('currentLevel')) || { level: 'Lv 1', name: 'Kodomo' });
  const [tapMultiplier, setTapMultiplier] = useState(() => parseInt(localStorage.getItem('tapMultiplier'), 10) || 1);
  const [progress, setProgress] = useState(() => parseInt(localStorage.getItem('currentProgress'), 10) || 2000);
  const [maxProgress, setMaxProgress] = useState(() => parseInt(localStorage.getItem('maxProgress'), 10) || 2000);
  const [highestLevelReached, setHighestLevelReached] = useState(() => parseInt(localStorage.getItem('highestLevelReached'), 10) || 0);

  useEffect(() => {
    localStorage.setItem('coinCount', coinCount);
  }, [coinCount]);

  useEffect(() => {
    localStorage.setItem('currentLevel', JSON.stringify(currentLevel));
  }, [currentLevel]);

  useEffect(() => {
    localStorage.setItem('tapMultiplier', tapMultiplier);
  }, [tapMultiplier]);

  useEffect(() => {
    localStorage.setItem('currentProgress', progress);
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('maxProgress', maxProgress);
  }, [maxProgress]);

  useEffect(() => {
    localStorage.setItem('highestLevelReached', highestLevelReached);
  }, [highestLevelReached]);

  useEffect(() => {
    let interval;
    if (progress < maxProgress) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = Math.min(prevProgress + 1, maxProgress);
          localStorage.setItem('currentProgress', newProgress);
          return newProgress;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [progress, maxProgress]);

  const updateProgress = (newProgress) => {
    setProgress(newProgress);
    localStorage.setItem('currentProgress', newProgress);
  };

  const updateMaxProgress = (newMaxProgress) => {
    setMaxProgress(newMaxProgress);
    localStorage.setItem('maxProgress', newMaxProgress);
  };

  return (
    <Coincontext.Provider
      value={{
        coinCount,
        setCoinCount,
        currentLevel,
        setCurrentLevel,
        tapMultiplier,
        setTapMultiplier,
        progress,
        setProgress,
        maxProgress,
        setMaxProgress,
        updateProgress,
        updateMaxProgress,
        highestLevelReached,
        setHighestLevelReached,
      }}
    >
      {children}
    </Coincontext.Provider>
  );
};

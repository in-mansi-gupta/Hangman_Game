import React from 'react';

function WordDisplay({ word, guessedLetters }) {
  const displayWord = word.split('').map(letter => guessedLetters.includes(letter) ? letter : "_").join(' ');
  return (
    <div>
      <h3>{displayWord}</h3>
    </div>
  );
}

export default WordDisplay;

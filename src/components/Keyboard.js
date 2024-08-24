import React from 'react';
import './Keyboard.css'; // Import the styles for the keyboard

function Keyboard({ onGuess, guessedLetters, selectedWord }) {
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");

  // Check if the letter is part of the word and has been guessed
  const isCorrectGuess = (letter) => selectedWord.includes(letter);
  const isGuessed = (letter) => guessedLetters.includes(letter);

  return (
    <div className="keyboard">
      {letters.map(letter => (
        <div key={letter} className="keyboard-button-container">
          <button 
            className={`keyboard-button ${isGuessed(letter) ? (isCorrectGuess(letter) ? 'correct' : 'incorrect') : ''}`}
            onClick={() => onGuess(letter)}
            disabled={isGuessed(letter)} // Disable the button after it has been guessed
          >
            {letter}
          </button>
          {isGuessed(letter) && !isCorrectGuess(letter) && (
            <div className="red-cross">X</div>  // Overlay the red cross
          )}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;

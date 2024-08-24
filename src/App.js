import React, { useState, useEffect } from 'react';
import WordDisplay from './components/WordDisplay';
import Keyboard from './components/Keyboard';
import './App.css'; // Import the layout styles

const wordList = {
  flower: ["rose", "lotus", "tulip"],
  animal: ["cat", "dog", "ant"],
  planet: ["earth", "venus", "mercury"]
};

function App() {
  const [selectedWord, setSelectedWord] = useState("");
  const [hint, setHint] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const maxWrongGuesses = 6;

  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    const categories = Object.keys(wordList);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomWord = wordList[randomCategory][Math.floor(Math.random() * wordList[randomCategory].length)];
    
    setSelectedWord(randomWord);
    setHint(randomCategory);  // Store the hint
    setGuessedLetters([]);
    setWrongGuesses(0);
  };

  const handleGuess = (letter) => {
    if (!guessedLetters.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);

      if (!selectedWord.includes(letter)) {
        setWrongGuesses(wrongGuesses + 1);
      }
    }
  };

  const hasWon = selectedWord.split('').every(letter => guessedLetters.includes(letter));
  const hasLost = wrongGuesses >= maxWrongGuesses;

  return (
    <div className="App">
      <div className="left-half">
        <h1>Hangman Game</h1>
        <h2>Hint: {hint}</h2>
        <WordDisplay word={selectedWord} guessedLetters={guessedLetters} />
        <h3>Wrong Guesses: {wrongGuesses}/{maxWrongGuesses}</h3>
        {hasWon ? <p>Congratulations! You won!</p> : null}
        {hasLost ? <p>You lost! The word was "{selectedWord}".</p> : null}
        <Keyboard 
          onGuess={handleGuess} 
          guessedLetters={guessedLetters} 
          selectedWord={selectedWord} 
        />
        <button 
          className="reset-button" 
          onClick={initGame}
        >
          &#x21bb; {/* Unicode for reset symbol */}
        </button>
      </div>
      <div className="right-half">
        <div className="keyboard-container">
        </div>
        
      </div>
    </div>
  );
}

export default App;

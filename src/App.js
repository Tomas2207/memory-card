import { useState, useEffect } from 'react';
import './App.css';
import Cards from './components/Cards';
import chars from './components/CharsArray';

function App() {
  const [characters, setCharacters] = useState(chars);
  const [clicked, setClicked] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [won, setWon] = useState(false);

  const handleClick = (id) => {
    characters.forEach((element) => {
      if (id === element.name && element.selected === false) {
        element.selected = true;
        updateScore(true);
      } else if (id === element.name && element.selected === true) {
        setClicked(true);
        updateScore(false);
      }
    });
  };

  const updateScore = (flag) => {
    if (flag === true) {
      setScore(score + 1);
    } else {
      if (score > bestScore) {
        setBestScore(score);
      }
      setScore(0);
      characters.forEach((element) => {
        element.selected = false;
        console.log(element.selected);
      });
    }
  };

  useEffect(() => {
    shuffle(chars);
    setCharacters(chars);
  });

  const shuffle = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  const reshuffle = (array) => {
    let count = 0;
    for (let x = 0; x < 8; x++) {
      if (array[x].selected === true) {
        count++;
      }
    }

    //count should be 8, score 19
    if (count === 8) {
      if (score <= 19) {
        shuffle(array);
        reshuffle(array);
      } else {
        if (won === false) {
          setWon(true);
        }
      }
    }
    count = 0;
  };

  return (
    <div className="App">
      <header className="header">
        <div className="head-title">
          <h1>Video Game Memory Game</h1>
          <img src="img/controller.png" alt="controller" id="controller" />
        </div>
        <div className="score">
          <div>Score: {score}</div>
          <div>Best Score: {bestScore}</div>
        </div>
      </header>

      <div className="content">
        {won && (
          <div className="win">
            <div className="winner">You Won!</div>
          </div>
        )}
        {reshuffle(chars)}
        {chars.map((char) => {
          if (chars.indexOf(char) < 8) {
            return (
              <Cards
                name={char.name}
                photo={char.photo}
                key={char.keys}
                handleClick={handleClick}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export default App;

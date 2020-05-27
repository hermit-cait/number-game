let randomNumber = Math.floor(Math.random() * 100) + 1;

  const guesses = document.querySelector('.guesses');
  const lastResult = document.querySelector('.lastResult');
  const lowOrHi = document.querySelector('.lowOrHi');

  const guessSubmit = document.querySelector('.guessSubmit');
  const guessField = document.querySelector('.guessField');

  let guessCount = 1;
  guessField.focus();
  let resetButton;

  // resetButton = document.createElement('button');
  // resetButton.textContent = 'Start new game';
  // document.getElementById("buttonSpace").append(resetButton);

  function checkGuess() {
    let userGuess = Number(guessField.value);
    if (guessCount === 1) {
      document.getElementById("game").style.height = 'inherit';
      guesses.textContent = 'Previous guesses: ';
      guesses.textContent += userGuess;
    } else if (guessCount > 1) {
      guesses.textContent += ', ' + userGuess;
    }

    if (userGuess === randomNumber) {
      lastResult.textContent = 'Congratulations! You got it right!';
      lastResult.style.backgroundColor = '#6de385';
      lowOrHi.style.display = 'none';
      setGameOver();
    } else if (guessCount === 10) {
      lastResult.textContent = '!!!GAME OVER!!!';
      lowOrHi.style.display = 'none';
      setGameOver();
    } else {
      lastResult.textContent = 'Wrong!';
      lastResult.style.backgroundColor = '#d85e5e';
      if(userGuess < randomNumber) {
        lowOrHi.textContent = 'Last guess was too low!';
      } else if(userGuess > randomNumber) {
        lowOrHi.textContent = 'Last guess was too high!';
      }
    }

    guessCount++;
    guessField.value = '';
    guessField.focus();
  }

  guessSubmit.addEventListener('click', checkGuess);

  guessField.addEventListener("keypress", function(guessSubmit) {
    if (guessSubmit.keyCode === 13) {
      document.querySelector('.guessSubmit').click();
    }
  });

  function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start new game';
    resetButton.style.marginTop = '20px';
    resetButton.style.marginBottom = '12px';
    lowOrHi.style.display = 'none';
    document.getElementById("buttonSpace").append(resetButton);
    resetButton.addEventListener('click', resetGame);
    resetButton.focus();
  }

  function resetGame() {
    guessCount = 1;

    const resetParas = document.querySelectorAll('.resultParas p');
    for (let i = 0 ; i < resetParas.length ; i++) {
      resetParas[i].textContent = '';
    }

    resetButton.parentNode.removeChild(resetButton);

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    lowOrHi.style.display = 'block';
    document.getElementById("game").style.height = '320px';

    guessField.focus();

    lastResult.style.backgroundColor = 'rgba(255, 255, 255, 0)';

    randomNumber = Math.floor(Math.random() * 100) + 1;
  }

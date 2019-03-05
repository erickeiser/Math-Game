let playing = false;
let score;
let timeRemaining;
let CorrectAnswer;

// if we click on the start/reset
document.getElementById("startReset").onclick = function() {
  // if we are playing
  if (playing == true) {
    location.reload(); // reload page
  } else {
    // if we are not playing

    // change mode to playing
    playing = true;

    // set score to 0
    score = 0;

    document.getElementById("scoreValue").innerHTML = score;

    // show countdown box

    show("timeRemaining");
    timeRemaining = 60;
    document.getElementById("timeRemainingValue").innerHTML = timeRemaining;

    // hide game over box
    hide("gameOver");

    // change button to reset

    document.getElementById("startReset").innerHTML = "Reset Game";

    startCountdown();

    generateQA();
  }
};

// Clicking answer box 
for(i = 1; i<5; i++) {
    document.getElementById('box'+ i).onclick = function() {
        // check if we are playing
        if(playing == true) { // yes
            if(this.innerHTML == CorrectAnswer) {
                // correct
                score ++ 
                document.getElementById('scoreValue').innerHTML = score
                // hide wrong box and show correct box
                hide('wrong')
                show('correct')
                setTimeout(function(){
                    hide('correct')
                }, 1000)
    
                // generate new question
                generateQA()
            } else {
                hide('correct')
                show('wrong')
                setTimeout(function(){
                    hide('wrong')
                }, 1000)
            }
        }
          
    }
}

function startCountdown() {
  action = setInterval(function() {
    timeRemaining -= 1;
    document.getElementById("timeRemainingValue").innerHTML = timeRemaining;
    if (timeRemaining == 0) {
      stopCountDown();
      show("gameOver");
      document.getElementById("gameOver").innerHTML =
        "<p>game over!</p><p>your score is: " + score + "</p>";

      hide("timeRemaining");
      hide("correct");
      hide("wrong");
      playing = false;
      document.getElementById("startReset").innerHTML = "Start Game";
    }
  }, 1000);
}

function stopCountDown() {
  clearInterval(action);
}

function hide(id) {
  document.getElementById(id).style.display = "none";
}

function show(id) {
  document.getElementById(id).style.display = "block";
}

function generateQA() {
  let x = 1 + Math.round(9 * Math.random());
  let y = 1 + Math.round(9 * Math.random());
  CorrectAnswer = x * y;

  document.getElementById("question").innerHTML = x + "x" + y;

  let correctPosition = 1 + Math.round(3 * Math.random());

  document.getElementById("box" + correctPosition).innerHTML = CorrectAnswer;

  // fill other boxes with wrong answers
  let answers = [CorrectAnswer] 
  for (i = 1; i < 5; i++) {
    if (i != correctPosition) {
      var wrongAnswer;
      do {
        {
          wrongAnswer =
            (1 + Math.round(9 * Math.random())) *
            (1 + Math.round(9 * Math.random()));
        }
      } while (answers.indexOf(wrongAnswer)> -1);
      document.getElementById("box" + i).innerHTML = wrongAnswer;
        answers.push(wrongAnswer)
    }
  }

}


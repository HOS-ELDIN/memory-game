let startWindow = document.querySelector(".start"),
  startInput = document.querySelector(".start input"),
  start = document.querySelector(".start button"),
  userName = document.querySelector(".name span"),
  pageTimer = document.querySelector(".timer"),
  game = document.querySelector("section"),
  boxs = document.querySelectorAll(".box"),
  result = document.querySelector(".result"),
  playAgain = document.querySelector(".result button"),
  takeStep = gameSteps(),
  wrongTries = 0,
  PageWrongTries = document.querySelector(".tries span"),
  time = 0;

// get user name and start game
start.onclick = () => {
  startWindow.style.display = "none"; // hide the start window
  userName.innerHTML = startInput.value || "handsome"; // put player name into page
  takeStep.next(); // start the game steps
};

//#####################################################
// let orderedArray = [...Array(20).keys()]
// let orderedArray = [...Array(boxs.length).keys()]
//creating random array
let randomArray = [];
// let randomArray = [4, 11, 1, 6, 3, 0, 13, 12, 8, 2, 10, 7, 15, 5, 18, 14, 16, 19, 9, 17];
for (let i = 0; randomArray.length < 20; i++) {
  let randomNumber = Math.floor(Math.random() * 20);
  if (randomArray.includes(randomNumber) == false) {
    randomArray.push(randomNumber);
  }
}
// console.log(randomArray);
//#####################################################
//give random order to boxs
boxs.forEach((e, i) => {
  e.style.order = randomArray[i];
});
//#####################################################
// click only two boxs
boxs.forEach((box) => {
  box.addEventListener("click", () => {
    box.classList.add("flipped");
    let flippedArray = document.querySelectorAll(".flipped");
    compare(flippedArray);
    let doneArray = document.querySelectorAll(".done");

    if (flippedArray.length == 2) {
      setTimeout(() => {
        resetFlip(flippedArray);
      }, 1000);
    }
    if (flippedArray.length > 2) {
      resetFlip(flippedArray);
      box.classList.add("flipped");
    }
    isGmaeDone(doneArray);
  });
});

//#####################################################
//starting sequance
// generator to flip one by one
function* gameSteps() {
  // let array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]
  let i = 0;
  while (i < 20) {
    yield flipOnebyOne(boxs[i]); // flip one by one
    i++;
  }
  yield rotating(2400, true); // rotate the squares animation
  yield returnAll(); // back flip all to start the game
  yield (game.style.pointerEvents = "all"); // allow clicking after the starting animation is done
  yield (StartTimer = setInterval(timer, 1000)); // start timer
  yield clearInterval(StartTimer); // stop timer at end
}
// function to start generator
function flipOnebyOne(e) {
  e.classList.add("flipped");
  setTimeout(() => {
    takeStep.next();
  }, 300);
}
// function to make rotating move
function rotating(time, next) {
  game.classList.add("congrats");
  setTimeout(() => {
    game.classList.remove("congrats");
    if (next == true) {
      takeStep.next();
    }
  }, time);
}
// function to return all
function returnAll() {
  setTimeout(() => {
    resetFlip(boxs);
    takeStep.next();
    takeStep.next();
  }, 600);
}
// timer function
function timer() {
  time++;
  
  min = Intl.NumberFormat("en", {
    minimumIntegerDigits: 2,
  }).format(Math.floor(time / 60));
  
  sec = Intl.NumberFormat("en", {
    minimumIntegerDigits: 2,
  }).format(time % 60);
  
  // console.log(min, sec);
  pageTimer.innerHTML = `${min}:${sec}`;
}

//#####################################################
// comparing the two flipped boxs and keep them flipped and count the wrong tries
function compare(flippedArray) {
  if (flippedArray.length === 2) {
    if (flippedArray[0].innerHTML === flippedArray[1].innerHTML) {
      // goodTries++;
      document.querySelector(".correct").play()
      flippedArray.forEach((e) => {
        e.classList.add("done");
      });
    } else {
      wrongTries++;
      PageWrongTries.innerHTML = wrongTries;
      document.querySelector(".wrong").play()
    }
  }
}
//#####################################################
// reset flip
function resetFlip(arr) {
  arr.forEach((e) => {
    e.classList.remove("flipped");
  });
}
//#####################################################
//knowing if the game is done
function isGmaeDone(doneArray) {
  if (doneArray.length == 20 || false) {
    takeStep.next();
    document.querySelector(".game-finish").play()
        rotating(2400, false);
        // rotating(4800, false);
    setTimeout(() => {
      result.classList.add("show");
    }, 3000);
  }
}
//#####################################################
//restarting
playAgain.onclick = () => {
  window.location.reload();
};
//#####################################################
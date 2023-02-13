let startWindow = document.querySelector(".start"),
  startInput = document.querySelector(".start input"),
  start = document.querySelector(".start button"),
  userName = document.querySelector(".name span"),
  boxs = document.querySelectorAll(".box"),
  game = document.querySelector("section"),
  result = document.querySelector(".result"),
  playAgain = document.querySelector(".result button"),
  StartAnimation = flippingGen(),
  wrongTries = 0,
  PageWrongTries = document.querySelector(".tries span");

// get user name from prompt
start.onclick = () => {
  startWindow.style.display = "none";
  userName.innerHTML = startInput.value || "handsome";
  StartAnimation.next();
  
};

//#####################################################
//creating random array
// let randomArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
// let orderedArray = [...Array(20).keys()]
// let orderedArray = [...Array(boxs.length).keys()]
let randomArray = [];
for (let i = 0; randomArray.length < 20; i++) {
  let randomNumber = Math.floor(Math.random() * 20);
  if (randomArray.includes(randomNumber) == false) {
    randomArray.push(randomNumber);
  }
}

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

    boxs.forEach((e) => {
      if (flippedArray.length == 2) {
        setTimeout(() => {
          e.classList.remove("flipped");
        }, 1200);
      }
      if (flippedArray.length > 2) {
        e.classList.remove("flipped");
      }
    });
    isGmaeDone(doneArray);
  });
});

//#####################################################
// comparing the two flipped boxs and keep them flipped and count the wrong tries
function compare(flippedArray) {
  if (flippedArray.length === 2) {
    if (flippedArray[0].innerHTML === flippedArray[1].innerHTML) {
      // goodTries++;
      flippedArray.forEach((e) => {
        e.classList.add("done");
      });
    } else {
      wrongTries++;
      PageWrongTries.innerHTML = wrongTries;
    }
  }
}
//#####################################################
//knowing if the game is done
function isGmaeDone(doneArray) {
  if (doneArray.length == 20 || false) {
    rotating(4800, false);
    setTimeout(() => {
      result.classList.add("show");
    }, 5200);
  }
}
//#####################################################
//restarting
playAgain.onclick = () => {
  window.location.reload();
};
//#####################################################
// generator to flip one by one
function* flippingGen() {
  // let array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]
  let i = 0;
  while (i < 20) {
    yield flipOnebyOne(boxs[i]);
    i++;
  }
  yield rotating(2400, true);

  yield returnAll()
  yield game.style.pointerEvents = "all";
}
// function to start generator
function flipOnebyOne(e) {
  e.classList.add("flipped");
  setTimeout(() => {
    StartAnimation.next();
  }, 300);
}
// function to make rotating move
function rotating(time, next) {
  game.classList.add("congrats");
  setTimeout(() => {
    game.classList.remove("congrats");
    if (next == true) {
      StartAnimation.next();
    }
  }, time);
}
// function to return all
function returnAll() {
  setTimeout(() => {
    boxs.forEach((e) => {
      e.classList.remove("flipped");
    });
    StartAnimation.next()
  }, 600);
}

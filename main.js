let startWindow = document.querySelector(".start");
let startInput = document.querySelector(".start input");
let start = document.querySelector(".start button");
let userName = document.querySelector(".name span");
let boxs = document.querySelectorAll(".box");
let game = document.querySelector("section");
let result = document.querySelector(".result");
let playAgain = document.querySelector(".result button");
let StartAnimation = flippingGen();

// get user name from prompt
start.onclick = () => {
  startWindow.style.display = "none";
  userName.innerHTML = startInput.value || "handsome";
  StartAnimation.next();
};

//#####################################################
//creating random array
// let randomArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
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
let count = 0;
window.addEventListener("click", (e) => {
  if (e.target.className == "front") {
    e.target.parentElement.classList.add("flipped");
  }
  count = 0;
  boxs.forEach((e) => {
    if (e.classList.contains("flipped")) {
      count++;
      // console.log(count);
    }
  });
  boxs.forEach((e) => {
    if (count == 2) {
      setTimeout(() => {
        e.classList.remove("flipped");
      }, 1200);
    }
    if (count > 2) {
      e.classList.remove("flipped");
    }
  });
});
//#####################################################
// comparing the two flipped boxs and keep them flipped and count the wrong tries
let wrongTries = 0,
  goodTries = 0,
  PageWrongTries = document.querySelector(".tries span");
window.addEventListener("click", (e) => {
  let flippedArray = document.querySelectorAll(".flipped .back");
  if (count == 2) {
    if (flippedArray[0].innerHTML === flippedArray[1].innerHTML) {
      goodTries++;
      flippedArray.forEach((e) => {
        e.parentElement.classList.add("done");
      });
    } else {
      wrongTries++;
      PageWrongTries.innerHTML = wrongTries;
    }
  }
});
//#####################################################
//knowing if the game is done
window.addEventListener("click", (e) => {
  if (goodTries == 10 || false) {
    rotating(4800,false)
    setTimeout(() => {
      result.classList.add("show");
    }, 5200);
  }
});
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
  yield rotating(2400,true);

  yield returnAll();
}
// function to start generator
function flipOnebyOne(e) {
  e.classList.add("flipped");
  setTimeout(() => {
    StartAnimation.next();
  }, 300);
}
// function to make rotating move
function rotating(time,next) {
  game.classList.add("congrats");
  setTimeout(() => {
    game.classList.remove("congrats");
    if (next == true) {
      StartAnimation.next()
    }
  },time);
}
// function to return all
function returnAll() {
  setTimeout(() => {
    boxs.forEach((e) => {
      e.classList.remove("flipped");
    });
  }, 600);
}


// console.log(flipp.next());
// console.log(flipp.next());
// console.log(flipp.next());
// console.log(flipp.next());
// console.log(flipp.next());
// console.log(flipp.next());
// console.log(flipp.next());
// console.log(flipp.next());
// console.log(flipp.next());
// console.log(flipp.next());
// console.log(flipp.next());
// console.log(flipp.next());
// console.log(flipp.next());
// console.log(flipp.next());
// console.log(flipp.next());
// console.log(flipp.next());
// console.log(flipp.next());
// console.log(flipp.next());
// console.log(flipp.next());
// console.log(flipp.next());
// console.log(flipp.next());
// console.log(flipp.next());

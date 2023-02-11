// get user name from prompt
let userName = document.querySelector(".name span");
userName.innerHTML = prompt("Good Day To You? Enter Your Name", "anonymous");

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
let boxs = document.querySelectorAll(".box");
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
let game = document.querySelector("section");
let result = document.querySelector(".result");

setTimeout(() => {
  game.classList.add("congrats");
  setTimeout(() => {
    game.classList.remove("congrats");
  }, 2400);
}, 600);



window.addEventListener("click", (e) => {

  if (goodTries == 10) {
    game.classList.add("congrats");
    setTimeout(() => {
      game.classList.remove("congrats");
    }, 4800);
    setTimeout(() => {
      result.classList.add("show");
    }, 5000);
  }
});
//#####################################################
//restarting
let playAgain = document.querySelector(".result button");
playAgain.onclick = () => {
  window.location.reload();
};

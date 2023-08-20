const refs = {
    body: document.querySelector("body"),
    start: document.querySelector('button[data-start]'),
    stop: document.querySelector('button[data-stop]'),
}    
let timerId = 0;
refs.start.addEventListener("click", onClickStart);
refs.stop.addEventListener("click", onClickStop);

// обробка кліку Start
function onClickStart() {
    timerId = setInterval(changeColor, 1000);
    refs.start.disabled = true;
};

// обробка кліку Stop
function onClickStop(evt){
    clearInterval(timerId);
    refs.start.disabled = false;
};

//заміна коліра на body
function changeColor(){
    refs.body.style.backgroundColor = getRandomHexColor();
};

// функція генерації довільного кольору
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
};
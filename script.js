//get html elements
const canvas = document.querySelector(".canvas");
const btnList = document.querySelectorAll(".button");
const slider = document.querySelector("#resolution-range");
const sliderText = document.querySelector("#resolution-value");

//initialise brush variables
let brushColour = "canvas__pixel--black";
let rainbowHue = 0;

canvasCreate(slider.value);

//create event listeners
btnList.forEach((btn) => btn.addEventListener("click", onBtnPress))
slider.addEventListener("input", onSliderInput)
slider.addEventListener("change", onSliderChange)

function canvasCreate(canvasRes) {
  for (i = 0; i < canvasRes; i++) {
    //create pixel rows
    const canvasRow = document.createElement("div");
    canvasRow.className = "canvas__row";
    for (j = 0; j < canvasRes; j++) {
      //create pixels with event listeners
      const canvasPixel = document.createElement("div");
      canvasPixel.className = "canvas__pixel";
      canvasPixel.addEventListener("mouseover", colourPixel);
      canvasPixel.addEventListener("mousedown", colourPixel)
      canvasRow.appendChild(canvasPixel);
    }
    canvas.appendChild(canvasRow)
  }
}

function colourPixel(e) {
  //if mouse button is pressed
  if (e.which == 1) {
    //specials brushes changes pixel style directly
    if (brushColour == "canvas__pixel--rainbow") {
      rainbowColourPixel(e);
    } else if (brushColour == "canvas__pixel--transluscent") {
      transluscentColourPixel(e)
    } else {
      //other brushes change pixel class and removes existing styling
      e.target.className = "canvas__pixel " + brushColour;
      e.target.style.backgroundColor = '';
    }
  }
}

function onBtnPress(e) {
  btnText = e.target.textContent.toLowerCase();

  switch(btnText) {
    case "clear":
      clearCanvas();
      break;
    case "eraser":
      //eraser removes pixel class modifiers
      brushColour = ''
      highlightSelectedBtn(e);
    default:
      rainbowHue = 0;
      brushColour = "canvas__pixel--" + e.currentTarget.id;
      highlightSelectedBtn(e);
  }
}

function clearCanvas() {
  //remove class and styling from all pixels
  const pixelList = document.querySelectorAll(".canvas__pixel");
  pixelList.forEach((pixel) => {
    pixel.className = "canvas__pixel";
    pixel.style.backgroundColor = "";
  });
}

function highlightSelectedBtn(e) {
  //remove selected button class from existing selection
  const currentSelection = document.querySelector(".button--selected");
  currentSelection.className = 
    currentSelection.className.replace(" button--selected", "");
  //add selected button class from new selection
  e.currentTarget.className += " button--selected";
}

//function to update slider label in real time
function onSliderInput(e) {
  sliderText.textContent = e.target.value;
}

function onSliderChange(e) {
  //reset canvas with new resolution
  canvasDestroy();
  canvasCreate(e.target.value);
}

function canvasDestroy() {
  canvas.innerHTML = "";
}

function rainbowColourPixel(e) {
  //cycle through hue on each coloured pixel
  e.target.style.backgroundColor = "hsl(" + rainbowHue + " 100% 50%)";
  rainbowHue = (rainbowHue + 5) % 360;
}

function transluscentColourPixel(e) {
  //get pixel's current alpha value and increase it until completely black
  let currentAlpha = getComputedStyle(e.target).getPropertyValue("background-color").slice(14,-1);
  if (currentAlpha < 1 && currentAlpha !== "") {
    let newAlpha = +currentAlpha + 0.1;
    e.target.style.backgroundColor = "rgba(0, 0, 0, " + newAlpha + ")";
  }
}
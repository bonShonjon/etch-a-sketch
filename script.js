const canvas = document.querySelector(".canvas");
const btnList = document.querySelectorAll(".button");
const slider = document.querySelector("#resolution-range");
const sliderText = document.querySelector("#resolution-value");


let brushColour = "canvas__pixel--black"

canvasCreate(slider.value);

btnList.forEach((btn) => btn.addEventListener("click", onBtnPress))
slider.addEventListener("input", onSliderInput)
slider.addEventListener("change", onSliderChange)

function canvasCreate(canvasRes) {
  for (i = 0; i < canvasRes; i++) {
    const canvasRow = document.createElement("div");
    canvasRow.className = "canvas__row";
    for (j = 0; j < canvasRes; j++) {
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
    e.target.className = "canvas__pixel " + brushColour;
  }
}

function onBtnPress(e) {
  btnText = e.target.textContent.toLowerCase();

  switch(btnText) {
    case "clear":
      clearCanvas();
      break;
    case "eraser":
      brushColour = ''
      highlightSelectedBtn(e);
    default:
      brushColour = "canvas__pixel--" + e.currentTarget.id;
      highlightSelectedBtn(e);
  }
}

function clearCanvas() {
  const pixelList = document.querySelectorAll(".canvas__pixel");
  pixelList.forEach((pixel) => pixel.className = "canvas__pixel");
}

function highlightSelectedBtn(e) {
  const currentSelection = document.querySelector(".button--selected");
  currentSelection.className = "button";
  e.currentTarget.className = "button button--selected";
}

function onSliderInput(e) {
  sliderText.textContent = e.target.value;
}

function onSliderChange(e) {
  canvasDestroy();
  canvasCreate(e.target.value);
}

function canvasDestroy() {
  canvas.innerHTML = "";
}

const canvas = document.querySelector(".canvas");
const btnList = document.querySelectorAll(".button")
let brushColour = 'canvas__pixel--black'

canvasCreate(16);
btnList.forEach((btn) => btn.addEventListener("click", onBtnPress))

function canvasCreate(canvasRes) {
  for (i = 0; i < canvasRes; i++) {
    const canvasRow = document.createElement("div");
    canvasRow.className = "canvas__row";
    for (j = 0; j < canvasRes; j++) {
      const canvasPixel = document.createElement("div");
      canvasPixel.className = "canvas__pixel";
      canvasPixel.addEventListener('mouseover', colourPixel);
      canvasRow.appendChild(canvasPixel);
    }
    canvas.appendChild(canvasRow)
  }
}

function colourPixel(e) {
  if (!e.target.className.includes(brushColour)) {
    e.target.className = 'canvas__pixel ' + brushColour;
  }
}

function onBtnPress(e) {
  btnText = e.target.textContent.toLowerCase();

  switch(btnText) {
    case "clear":
      clearCanvas();
      break;
    case "black":

      break;
    case "red":

      break;
    case "blue":

      break;
    case "green":

      break;
    default:
      console.log("Unassigned button")
  }
}

function clearCanvas() {
  const pixelList = document.querySelectorAll(".canvas__pixel");
  pixelList.forEach((pixel) => pixel.className = "canvas__pixel")
}
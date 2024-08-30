const canvas = document.querySelector(".canvas");
let brushColour = 'canvas__pixel--black'
canvasCreate(32);

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
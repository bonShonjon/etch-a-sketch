const canvas = document.querySelector(".canvas");
const canvasRes = 16;

for (i = 0; i < canvasRes; i++) {
  const canvasRow = document.createElement("div");
  canvasRow.className = "canvas__row";
  for (j = 0; j < canvasRes; j++) {
    const canvasPixel = document.createElement("div");
    canvasPixel.className = "canvas__pixel";
    canvasRow.appendChild(canvasPixel);
  }
  canvas.appendChild(canvasRow)
}
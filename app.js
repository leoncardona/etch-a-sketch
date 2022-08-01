const container = document.getElementById('container');
const content = document.getElementById('content');
const canvas = document.getElementById('canvas');

const getRandomInteger = (max) => {
  return Math.floor(Math.random() * max) + 1;
}

const getRandomColor = () =>  {
  let color;
  let key = getRandomInteger(4);
  switch (key) {
    case 1:
      color = 'red';
      break;
    case 2:
      color = 'blue';
      break;
    case 3:
      color = 'yellow'
      break;
    case 4:
      color = 'green';
      break;
  }
  return color;
}

const paintPixel = (pixel) => {
  pixel.style.backgroundColor = getRandomColor();
}

const drawGrid = (pixels) => {
  content.innerHTML = ``;
  for (let i = 0; i < pixels; i++) {
    if (i != 0) {
      const lineBreak = document.createElement('div');
      lineBreak.setAttribute('class', 'line-break');
      canvas.append(lineBreak);
    }
    for (let j = 0; j < pixels; j++) {
      const pixel = document.createElement('div');
      pixel.setAttribute('class', 'pixel');
      pixel.addEventListener('mouseover', () => paintPixel(pixel));
      canvas.append(pixel);
    }
  }
}

const clearGrid = (pixels) => {
  canvas.innerHTML = ``;
  drawGrid(pixels);
}

const generateGrid = () => {
  content.innerHTML = `
  <label for="canvasSize">Canvas size</label>
  <input type="number" id="canvasSize" name="canvas size" max="256">
  <button id="createButton" type="button">Create</button>
  `;
  const createButton = document.getElementById('createButton');
  createButton.addEventListener('click', () => {
    const canvasSize = document.getElementById('canvasSize').value;
    const validInput = canvasSize >= 1 && canvasSize <= 48;
    if (validInput) {
      drawGrid(canvasSize);
      const clearButton = document.createElement('button');
      clearButton.setAttribute('type', 'button');
      clearButton.textContent = 'Clear';
      clearButton.addEventListener('click', () => clearGrid(canvasSize));
      container.append(clearButton);
    }
    if (!validInput) {
      const errorMessage = document.createElement('p');
      errorMessage.textContent = 'Valid size (1-48)';
      content.append(errorMessage);
    }
  });
}

const startButton = document.getElementById('startButton');
startButton.addEventListener('click', generateGrid);

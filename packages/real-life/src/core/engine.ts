const HEIGHT = 10;
const WIDTH = 100;

const LEVELS = [' ', '.', ':', '-', '=', '+', '*', '#', '%', '@'] as const;

function createCell(): string {
  return LEVELS[Math.floor(Math.random() * LEVELS.length)] as string;
}

function createRow(width: number) {
  return Array.from({ length: width }, createCell);
}

function createGrid(height: number, width: number) {
  return Array.from({ length: height }, () => createRow(width));
}

function displayGrid(grid: string[][]) {
  grid.forEach((row) => {
    const rowString = row.join('');

    process.stdout.write(rowString + '\n');
  });
}

function moveCursorUp(height: number) {
  process.stdout.write(`\x1b[${String(height)}F`);
}

console.clear();

setInterval(() => {
  const newGrid = createGrid(HEIGHT, WIDTH);
  moveCursorUp(HEIGHT);
  displayGrid(newGrid);
}, 500);

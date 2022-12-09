const parseTextFileIntoArray = require("../utils/parseText");
const file = parseTextFileIntoArray("./d9_input.txt");
// const file = parseTextFileIntoArray("./d9_example.txt");

const matrix = require("./matrix");
let headRow = 100;
let headCol = 100;

let tailRow = 100;
let tailCol = 100;

matrix[tailRow][tailCol] = 2;

for (const movement of file) {
	const [direction, count] = movement.split(" ");

	if (direction === "L") {
		for (let i = 0; i < count; i++) {
			headCol--;
			matrix[headRow][headCol] > 1 ? 2 : 1;

			if (Math.abs(headCol - tailCol) >= 2) {
				if (headRow === tailRow) {
					tailCol--;
					matrix[tailRow][tailCol] = 2;
				} else if (headRow < tailRow) {
					tailCol--;
					tailRow--;
					matrix[tailRow][tailCol] = 2;
				} else {
					tailCol--;
					tailRow++;
					matrix[tailRow][tailCol] = 2;
				}
			}
		}
	} else if (direction === "R") {
		for (let i = 0; i < count; i++) {
			headCol++;
			matrix[headRow][headCol] > 1 ? 2 : 1;

			if (Math.abs(headCol - tailCol) >= 2) {
				if (headRow === tailRow) {
					tailCol++;
					matrix[tailRow][tailCol] = 2;
				} else if (headRow < tailRow) {
					tailCol++;
					tailRow--;
					matrix[tailRow][tailCol] = 2;
				} else {
					tailCol++;
					tailRow++;
					matrix[tailRow][tailCol] = 2;
				}
			}
		}
	} else if (direction === "U") {
		for (let i = 0; i < count; i++) {
			headRow--;
			matrix[headRow][headCol] > 1 ? 2 : 1;

			if (Math.abs(headRow - tailRow) >= 2) {
				if (headCol === tailCol) {
					tailRow--;
					matrix[tailRow][tailCol] = 2;
				} else if (headCol < tailCol) {
					tailCol--;
					tailRow--;
					matrix[tailRow][tailCol] = 2;
				} else {
					tailCol++;
					tailRow--;
					matrix[tailRow][tailCol] = 2;
				}
			}
		}
	} else if (direction === "D") {
		for (let i = 0; i < count; i++) {
			headRow++;
			matrix[headRow][headCol] > 1 ? 2 : 1;

			if (Math.abs(headRow - tailRow) >= 2) {
				if (headCol === tailCol) {
					tailRow++;
					matrix[tailRow][tailCol] = 2;
				} else if (headCol < tailCol) {
					tailCol--;
					tailRow++;
					matrix[tailRow][tailCol] = 2;
				} else {
					tailCol++;
					tailRow++;
					matrix[tailRow][tailCol] = 2;
				}
			}
		}
	}
}

let count = 0;
for (let i = 0; i < matrix.length; i++) {
	for (let j = 0; j < matrix[i].length; j++) {
		const cell = matrix[i][j];
		if (cell === 2) count++;
	}
}
console.log(count);

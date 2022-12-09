const parseTextFileIntoArray = require("../utils/parseText");
const file = parseTextFileIntoArray("./d8_input.txt");

const matrix = [];
for (const row of file) matrix.push(row.split(""));

// const matrix2 = [
// 	[3, 0, 3, 7, 3],
// 	[2, 5, 5, 1, 2],
// 	[6, 5, 3, 3, 2],
// 	[3, 3, 5, 4, 9],
// 	[3, 5, 3, 9, 0],
// ];

const traverseUp = (initialValue, row, col, matrix, total) => {
	if (row === 0) return total;
	let positionUp = matrix[row - 1][col];

	if (positionUp >= initialValue) return total + 1;
	return traverseUp(initialValue, row - 1, col, matrix, total + 1);
};

const traverseDown = (initialValue, row, col, matrix, total) => {
	if (row === matrix.length - 1) return total;
	let positionDown = matrix[row + 1][col];

	if (positionDown >= initialValue) return total + 1;
	return traverseDown(initialValue, row + 1, col, matrix, total + 1);
};

const traverseLeft = (initialValue, row, col, matrix, total) => {
	if (col === 0) return total;
	let positionLeft = matrix[row][col - 1];

	if (positionLeft >= initialValue) return total + 1;
	return traverseLeft(initialValue, row, col - 1, matrix, total + 1);
};

const traverseRight = (initialValue, row, col, matrix, total) => {
	if (col === matrix[row].length - 1) return total;
	let positionRight = matrix[row][col + 1];
	if (positionRight >= initialValue) return total + 1;

	return traverseRight(initialValue, row, col + 1, matrix, total + 1);
};

let maxScore = 0;

for (let row = 0; row < matrix.length; row++) {
	for (let col = 0; col < matrix[row].length; col++) {
		if (
			row === 0 ||
			col === 0 ||
			row === matrix.length - 1 ||
			col === matrix[row].length - 1
		) {
			continue;
		}
		let initialValue = matrix[row][col];

		let up = traverseUp(initialValue, row, col, matrix, 0);
		let down = traverseDown(initialValue, row, col, matrix, 0);
		let left = traverseLeft(initialValue, row, col, matrix, 0);
		let right = traverseRight(initialValue, row, col, matrix, 0);

		score = up * down * left * right;
		maxScore = Math.max(maxScore, score);
	}
}
console.log(maxScore);

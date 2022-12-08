const parseTextFileIntoArray = require("../utils/parseText");
const file = parseTextFileIntoArray("./d8_input.txt");

const matrix = [];
for (const row of file) matrix.push(row.split(""));
let counter = 0;

// const matrix = [
// 	[3, 0, 3, 7, 3],
// 	[2, 5, 5, 1, 2],
// 	[6, 5, 3, 3, 2],
// 	[3, 3, 5, 4, 9],
// 	[3, 5, 3, 9, 0],
// ];

const traverseUp = (initialValue, row, col, matrix) => {
	if (row === 0) return true;
	let positionUp = matrix[row - 1][col];

	if (positionUp >= initialValue) return false;
	return traverseUp(initialValue, row - 1, col, matrix);
};

const traverseDown = (initialValue, row, col, matrix) => {
	if (row === matrix.length - 1) return true;
	let positionDown = matrix[row + 1][col];

	if (positionDown >= initialValue) return false;
	return traverseDown(initialValue, row + 1, col, matrix);
};

const traverseLeft = (initialValue, row, col, matrix) => {
	if (col === 0) return true;
	let positionLeft = matrix[row][col - 1];

	if (positionLeft >= initialValue) return false;
	return traverseLeft(initialValue, row, col - 1, matrix);
};

const traverseRight = (initialValue, row, col, matrix) => {
	let positionRight = matrix[row][col + 1];

	if (positionRight >= initialValue) {
		return false;
	}
	if (col === matrix[row].length - 1) return true;

	return traverseRight(initialValue, row, col + 1, matrix);
};

for (let row = 0; row < matrix.length; row++) {
	for (let col = 0; col < matrix[row].length; col++) {
		if (
			row === 0 ||
			col === 0 ||
			row === matrix.length - 1 ||
			col === matrix[row].length - 1
		) {
			counter++;
			continue;
		}
		let initialValue = matrix[row][col];

		let visibleUp = traverseUp(initialValue, row, col, matrix);
		let visibleDown = traverseDown(initialValue, row, col, matrix);
		let visibleLeft = traverseLeft(initialValue, row, col, matrix);
		let visibleRight = traverseRight(initialValue, row, col, matrix);

		if (visibleUp || visibleDown || visibleLeft || visibleRight) {
			counter++;
		}
	}
}

console.log(counter);

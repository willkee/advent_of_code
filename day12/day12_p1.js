const parseTextFileIntoArray = require("../utils/parseText");
const file = parseTextFileIntoArray("./d12_example.txt");

const matrix = [];
for (const row of file) matrix.push(row.split(""));

function part1() {
	let start;
	const visited = new Set();

	for (let row = 0; row < matrix.length; row++) {
		for (let col = 0; col < matrix[row].length; col++) {
			if (matrix[row][col] === "S") {
				start = [row, col];

				const path = [];
				return traverser(row, col, matrix, path, visited);
			}
		}
	}
}

function traverser(row, col, matrix, path, visited) {
	if (path[path.length - 1] === "E") console.log(path);

	if (
		row < 0 ||
		col < 0 ||
		row >= matrix.length ||
		col >= matrix[row].length ||
		visited.has(`R${row}C${col}`)
	) {
		return;
	}

	const prevElevation = path.length
		? path[path.length - 1].charCodeAt() - 97
		: 0;

	let currentElevation;
	if (matrix[row][col] === "S") {
		currentElevation = 0;
	} else if (matrix[row][col] === "E") {
		currentElevation = 25;
	} else {
		currentElevation = matrix[row][col].charCodeAt() - 97;
	}

	if (
		currentElevation > prevElevation + 1 ||
		currentElevation < prevElevation - 1
	) {
		return;
	}

	visited.add(`R${row}C${col}`);

	if (matrix[row][col] === "S") {
		path.push("a");
	} else {
		path.push(matrix[row][col]);
	}

	traverser(row + 1, col, matrix, path, visited);
	traverser(row - 1, col, matrix, path, visited);
	traverser(row, col + 1, matrix, path, visited);
	traverser(row, col - 1, matrix, path, visited);
}

console.log(part1());

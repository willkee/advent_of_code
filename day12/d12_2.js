const parseTextFileIntoArray = require("../utils/parseText");
// const file = parseTextFileIntoArray("./d12_example.txt");
const file = parseTextFileIntoArray("./d12_input.txt");

function parseInput() {
	const result = {
		start: {},
		end: {},
		matrix: [],
	};

	result.matrix = file.map((line, row) =>
		[...line].map((val, col) => {
			if (val === "S") {
				result.start = { row, col };
				return 1;
			}
			if (val === "E") {
				result.end = { row, col };
				return 26;
			}
			return val.charCodeAt(0) - 96;
		})
	);
	return result;
}

function findNeighborsPartTwo(row, col, matrix) {
	const res = [];
	const DIRS = [
		[1, 0],
		[0, 1],
		[-1, 0],
		[0, -1],
	];

	let currHeight = matrix[row][col];

	for (const [r, c] of DIRS) {
		const newRow = row + r;
		const newCol = col + c;
		if (newRow < 0 || newRow >= matrix.length) continue;
		if (newCol < 0 || newCol >= matrix[row].length) continue;

		// For part 2 we want to go downhill
		if (matrix[newRow][newCol] < currHeight - 1) continue;

		res.push(`${newRow}_${newCol}`);
	}
	return res;
}

function findShortestPath(matrix, start) {
	const dist = {};
	const prev = {};
	let queue = [];
	for (let row = 0; row < matrix.length; row++) {
		for (let col = 0; col < matrix[row].length; col++) {
			const id = `${row}_${col}`;
			dist[id] = Infinity;
			queue.push(id);
		}
	}
	dist[`${start.row}_${start.col}`] = 0;

	while (queue.length) {
		let key;
		for (const current of queue) {
			if (!key || dist[current] < dist[key]) {
				key = current;
			}
		}

		const [r, c] = key.split("_");
		if (matrix[r][c] === 1) {
			console.log("ANSWER", matrix[r][c], dist);
			return dist[key];
		}

		queue = queue.filter((col) => col !== key);

		const neighbors = findNeighborsPartTwo(+r, +c, matrix);
		for (const neighbor of neighbors) {
			if (queue.includes(neighbor)) {
				const alt = dist[key] + 1;
				if (alt < dist[neighbor]) {
					dist[neighbor] = alt;
					prev[neighbor] = key;
				}
			}
		}
	}
	return {
		dist,
		prev,
	};
}

function part2() {
	const input = parseInput();
	const data = findShortestPath(input.matrix, input.end);
	console.log(data, "data");
}

console.log(part2());

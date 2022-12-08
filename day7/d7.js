const parseTextFileIntoArray = require("../utils/parseText");

const file = parseTextFileIntoArray("./d7_input.txt");

/*

************************************

CREDITS:

All credits go to ** thibpat ** at the following video for helping me get through this question. My code is very heavily influenced by his walkthrough and source code.

https://www.youtube.com/watch?v=ZNLF2DavA6U

You can find his source code here:
https://github.com/tpatel/advent-of-code-2022/blob/main/day07.mjs


************************************

*/

function createDirs(file) {
	const node = {
		name: "/",
		dir: true,
		children: [],
	};

	let command;
	let curr = node;

	for (const line of file) {
		const [e1, e2, loc] = line.split(" ");
		switch (e1) {
			case "$": {
				command = e2;

				if (loc && command === "cd") {
					switch (loc) {
						case "/":
							curr = node;
							break;
						case "..":
							curr = curr.parent;
							break;
						default:
							curr = curr.children.find((el) => el.name === loc);
					}
				}
			}
			default: {
				if (command === "ls") {
					if (e1 === "dir") {
						const node = {
							name: e2,
							dir: true,
							children: [],
							parent: curr,
						};
						curr.children.push(node);
					} else if (!isNaN(+e1)) {
						const node = {
							size: +e1,
							parent: curr,
						};
						curr.children.push(node);
					}
				}
			}
		}
	}
	return node;
}

function getSize(node, cb = () => {}) {
	if (!node.dir) return node.size;

	const directorySize = node.children
		.map((child) => getSize(child, cb))
		.reduce((a, b) => a + b, 0);

	cb(directorySize);
	return directorySize;
}

function sumDirectoriesUnder100000() {
	let sum = 0;
	getSize(createDirs(file), (size) => size <= 100000 && (sum += size));
	return sum;
}

function findSmallestDirForUpdate() {
	const node = createDirs(file);

	const availableSpace = 70000000 - getSize(node);
	const minSize = 30000000 - availableSpace;
	const dirs = [];

	getSize(node, (size) => size >= minSize && dirs.push({ size }));

	return Math.min(...dirs.map((el) => el.size));
}

console.log(sumDirectoriesUnder100000());
console.log(findSmallestDirForUpdate());

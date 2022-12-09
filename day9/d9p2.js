const parseTextFileIntoArray = require("../utils/parseText");
const file = parseTextFileIntoArray("./d9_input.txt");
// const file = parseTextFileIntoArray("./d9_example.txt");

const visited = new Set();

function moveFollowerNodes(node) {
	const [xDiff, yDiff] = node.nodeXYDiff();
	console.log(
		`Start: x:${node.x} y:${node.y}`,
		`xDiff: ${xDiff}, yDiff: ${yDiff}`
	);
	if (xDiff > 1 || xDiff < -1 || yDiff > 1 || yDiff < -1) {
		node.x = xDiff === 0 ? node.x : node.x + Math.abs(xDiff) / xDiff;
		node.y = yDiff === 0 ? node.y : node.y + Math.abs(yDiff) / yDiff;
		console.log("end", node.x, node.y);
	}
}

class Node {
	constructor(prev, next, x, y) {
		this.prev = prev;
		this.next = next;
		this.x = x;
		this.y = y;
	}

	getStringCoords() {
		return `X${this.x}Y${this.y}`;
	}

	nodeXYDiff() {
		if (this.prev) {
			const xDiff = this.prev.x - this.x;
			const yDiff = this.prev.y - this.y;

			// console.log("CLASS METHOD", xDiff, yDiff);

			return [xDiff, yDiff];
		} else {
			return [0, 0];
		}
	}
}

let head = new Node(null, null, 0, 0);
let setupLinkedList = head;

// for (let i = 0; i < 1; i++) {
// 	const newNode = new Node(setupLinkedList, null, 0, 0);
// 	setupLinkedList.next = newNode;
// 	setupLinkedList = setupLinkedList.next;
// }
for (let i = 0; i < 9; i++) {
	const newNode = new Node(setupLinkedList, null, 0, 0);
	setupLinkedList.next = newNode;
	setupLinkedList = setupLinkedList.next;
}

for (const movement of file) {
	const [direction, count] = movement.split(" ");

	for (let i = 0; i < count; i++) {
		let current = head;

		console.log(`Moving ${direction}`);
		if (direction === "L") {
			head.x--;
		} else if (direction === "R") {
			head.x++;
		} else if (direction === "U") {
			head.y++;
		} else if (direction === "D") {
			head.y--;
		}

		while (current) {
			if (!current.next) visited.add(current.getStringCoords());
			moveFollowerNodes(current);
			if (!current.next) visited.add(current.getStringCoords());

			current = current.next;
		}
	}
}

console.log(visited.size);

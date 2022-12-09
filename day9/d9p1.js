const parseTextFileIntoArray = require("../utils/parseText");
const file = parseTextFileIntoArray("./d9_input.txt");
// const file = parseTextFileIntoArray("./d9_example.txt");

const visited = new Set();

function moveFollowerNodes(node) {
	if (!node) return;

	const [xDiff, yDiff] = node.nodeXYDiff();
	if (xDiff > 1 || xDiff < -1 || yDiff > 1 || yDiff < -1) {
		node.x = xDiff === 0 ? node.x : node.x + Math.abs(xDiff) / xDiff;
		node.y = yDiff === 0 ? node.y : node.y + Math.abs(yDiff) / yDiff;
	}

	if (!node.next) visited.add(node.getStringCoords());
	return moveFollowerNodes(node.next);
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

			return [xDiff, yDiff];
		} else {
			return [0, 0];
		}
	}
}

let head = new Node(null, null, 0, 0);
let setupLinkedList = head;

const numKnots = 1;

for (let i = 0; i < numKnots; i++) {
	const newNode = new Node(setupLinkedList, null, 0, 0);
	setupLinkedList.next = newNode;
	setupLinkedList = setupLinkedList.next;
}

for (const movement of file) {
	const [direction, count] = movement.split(" ");

	for (let i = 0; i < count; i++) {
		let current = head;

		if (direction === "L") {
			head.x--;
		} else if (direction === "R") {
			head.x++;
		} else if (direction === "U") {
			head.y++;
		} else if (direction === "D") {
			head.y--;
		}

		moveFollowerNodes(current);
	}
}

console.log(visited.size);

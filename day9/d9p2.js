const parseTextFileIntoArray = require("../utils/parseText");
const file = parseTextFileIntoArray("./d9_input.txt");
// const file = parseTextFileIntoArray("./d9_example.txt");

const visited = new Set();

const moveFollowerNodes = (node) => {
	if (node.prevNodeTooFar()) {
		const [xDiff, yDiff] = node.prevNodeTooFar();
		node.x = xDiff === 0 ? node.x : node.x + Math.abs(xDiff) / xDiff;
		node.y = yDiff === 0 ? node.y : node.y + Math.abs(yDiff) / yDiff;
	}
};

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

	prevNodeTooFar() {
		if (this.prev) {
			const xDiff = this.prev.x - this.x;
			const yDiff = this.prev.y - this.y;

			if (xDiff === 0 || xDiff === 1 || yDiff === 0 || yDiff === 1) {
				return false;
			} else {
				return [xDiff, yDiff];
			}
		} else {
			return null;
		}
	}
}

let head = new Node(null, null, 0, 0);
let currentSetupLinkedList = head;

for (let i = 0; i < 9; i++) {
	const newNode = new Node(currentSetupLinkedList, null, 0, 0);
	currentSetupLinkedList.next = newNode;
	currentSetupLinkedList = currentSetupLinkedList.next;
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

		while (current) {
			if (!current.next) {
				// at the tail
				visited.add(current.getStringCoords());
			}
			moveFollowerNodes(current);
			current = current.next;
		}
	}
}

console.log(visited.size);

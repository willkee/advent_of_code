const parseTextFileIntoArray = require("../utils/parseText");
const file = parseTextFileIntoArray("./d10_input.txt");
// const file = parseTextFileIntoArray("./d10_example.txt");

const CRT = new Array(240).fill("?");
function part2() {
	let cycleCount = 0;
	let idx = 0;
	let xValue = 1;

	function cycler(idx, cycleCount, xValue) {
		const command = file[idx];
		if (!command) return;

		if (command === "noop") {
			if (Math.abs(xValue - (cycleCount % 40)) <= 1) {
				CRT[cycleCount] = "#";
			} else {
				CRT[cycleCount] = ".";
			}
			cycleCount++;
		} else {
			const [_addX, value] = command.split(" ");

			let increment = 0;
			while (increment < 2) {
				if (Math.abs(xValue - (cycleCount % 40)) <= 1) {
					CRT[cycleCount] = "#";
				} else {
					CRT[cycleCount] = ".";
				}
				cycleCount++;
				increment++;
			}

			xValue += +value;
		}

		return cycler(idx + 1, cycleCount, xValue);
	}

	cycler(idx, cycleCount, xValue);
}

// console.log(part2());
part2();

console.log(CRT.slice(0, 40).join(""));
console.log(CRT.slice(40, 80).join(""));
console.log(CRT.slice(80, 120).join(""));
console.log(CRT.slice(120, 160).join(""));
console.log(CRT.slice(160, 200).join(""));
console.log(CRT.slice(200).join(""));

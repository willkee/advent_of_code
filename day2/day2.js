const parseTextFileIntoArray = require("../utils/parseText");

const arrayOfRounds = parseTextFileIntoArray("./input_day2.txt");

// A: Rock, B: Paper, C: Scissors
// X        Y         Z
// Rock > Scissors     A > C, X > Z
// Scissors > Paper    C > B, Z > Y
// Paper > Rock        B > A, Y > X

const pointValues = {
	A: 1,
	X: 1,
	B: 2,
	Y: 2,
	C: 3,
	Z: 3,
};

let totalScore = 0;

// for (const round of arrayOfRounds) {
// 	const [opponent, player] = round.split(" ");
// 	let roundScore = 0;
// 	if (opponent && player) {
// 		if (
// 			(player === "X" && opponent === "B") ||
// 			(player === "Y" && opponent === "C") ||
// 			(player === "Z" && opponent === "A")
// 		) {
// 			// player loses round
// 		} else if (
// 			(player === "X" && opponent === "A") ||
// 			(player === "Y" && opponent === "B") ||
// 			(player === "Z" && opponent === "C")
// 		) {
// 			//draw
// 			roundScore += 3;
// 		} else {
// 			// win
// 			roundScore += 6;
// 		}

// 		roundScore += pointValues[player];
// 		totalScore += roundScore;
// 	}
// }

for (const round of arrayOfRounds) {
	const [opponent, player] = round.split(" ");
	let roundScore = 0;
	if (opponent && player) {
		if (player === "X") {
			// lose
			if (opponent === "A") {
				// Must be "Z" (scissors) to lose
				roundScore += pointValues["Z"];
			} else if (opponent === "B") {
				// Must be "X" (rock) to lose
				roundScore += pointValues["X"];
			} else {
				roundScore += pointValues["Y"];
			}
		} else if (player === "Y") {
			// draw
			roundScore += 3;

			if (opponent === "A") {
				roundScore += pointValues["X"];
			} else if (opponent === "B") {
				roundScore += pointValues["Y"];
			} else {
				roundScore += pointValues["Z"];
			}
		} else if (player === "Z") {
			// win
			roundScore += 6;

			if (opponent === "A") {
				roundScore += pointValues["Y"];
			} else if (opponent === "B") {
				roundScore += pointValues["Z"];
			} else {
				roundScore += pointValues["X"];
			}
		}

		totalScore += roundScore;
	}
}

console.log(totalScore);

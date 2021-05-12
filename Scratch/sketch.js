const TOTAL = 100
let counter = 0

var birds = []
var savedBirds = []
var pipes = []

function setup() {
	createCanvas(600, 500)

	for (let i = 0; i < TOTAL; i++)
		birds[i] = new Bird()

	highscore = 0
	pipes.push(new Pipe())
}
function draw() {
	background(0)

	for (var i = pipes.length - 1; i >= 0; i--) {
		pipes[i].show()
		pipes[i].update()

		for (let j = birds.length - 1; j >= 0; j--) {
			if (pipes[i].hits(birds[j])) {
				savedBirds.push(birds.splice(i, 1)[0])
			}
		}

		if (pipes[i].offscreen())
			pipes.splice(i, 1)
	}
	for (let bird of birds) {
		bird.think(pipes)
		bird.show()
		bird.update()
	}

	if (birds.length === 0) {
		counter = 0
		nextGeneration()
		pipes = []
	}


	if (counter % 100 == 0)
		pipes.push(new Pipe())
	counter++
}

// function keyPressed() {
// 	if (key == ' ') {
// 		bird.up()
// 	}
// }

class Bird {
	constructor(brain) {

		this.y = height / 2
		this.x = 60

		this.gravity = .6
		this.velocity = 15
		this.lift = 10

		this.score = 0
		this.fitness = 0
		if (brain)
			this.brain = brain.copy()
		else
			this.brain = new NeuralNetwork(4, 4, 1)
	}
	show() {
		fill(255, 100)
		stroke(255)
		ellipse(this.x, this.y, 20, 20)
	}
	up() {
		this.velocity -= this.lift
	}
	think(pipes) {

		//find the closese pip
		let closest = null
		let closestD = Infinity
		for (let i = 0; i < pipes.length; i++) {
			let d = pipes[i].x - this.x
			if (d < closestD && d > 0) {
				closest = pipes[i]
				closestD = d
			}
		}


		let inputs = []

		inputs[0] = this.y / height
		inputs[1] = closest.top / height
		inputs[2] = closest.bottom / height
		inputs[3] = closest.x / width

		let output = this.brain.predict(inputs)

		if (output[0] > 0.5) {
			this.up()
		}
	}
	mutate(){
		this.brain.mutate(.1)
	}
	update() {
		this.score++

		this.velocity += this.gravity
		this.velocity *= .9
		this.y += this.velocity

		if (this.y > height) {
			this.y = height
			this.velocity = 0
		}

		if (this.y < 0) {
			this.y = 0
			this.velocity = 0
		}
	}
}

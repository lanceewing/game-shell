class Ego extends Sprite {

    constructor() {
        super();
    }

    update(game) {
        super.update(game);




// IDEA 1: Clicking key sets the direction and it continues indefinitely.
// IDEA 2: Hold down key to continue moving.


        let movingAntiClockwise = this.classList.contains('anticlockwise');
        let movingClockwise = this.classList.contains('clockwise');
        let moveAntiClockwise = false;
        let moveClockwise = false;

        if (game.userInput.keys[37]) { // LEFT
            this.classList.remove(this.y >= 350? 'anticlockwise': 'clockwise');
            this.classList.add(this.y >= 350? 'clockwise': 'anticlockwise');
        } else if (game.userInput.keys[39]) { // RIGHT
            this.classList.remove(this.y >= 350? 'clockwise': 'anticlockwise');
            this.classList.add(this.y >= 350? 'anticlockwise': 'clockwise');
        } else if (game.userInput.keys[38]) { // UP
            this.classList.remove(this.x >= 350? 'clockwise': 'anticlockwise');
            this.classList.add(this.x >= 350? 'anticlockwise': 'clockwise');
        } else if (game.userInput.keys[40]) { // DOWN
            this.classList.remove(this.x >= 350? 'anticlockwise': 'clockwise');
            this.classList.add(this.x >= 350? 'clockwise': 'anticlockwise');
        }

        

    }

}
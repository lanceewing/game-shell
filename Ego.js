class Ego extends Sprite {

    constructor() {
        super();
    }

    init(game) {
        // Starting path for Ego. Will change in response to player movement.
        // TODO: Dynamically change this based on screen dimension?
        this.style.setProperty('--ego-path', "path('M 0, 0 m -325, 0 a 1,1 0 1,0 650,0 a 1,1 0 1,0 -650,0 Z')");
    }

    buildPath() {
        let startX = this.pathX;
        let startY = this.pathY;
        let endX = -(startX);
        let endY = -(startY);
        let dx = (endX - startX);
        let dy = (endY - startY);
        return `path('M 0, 0 m ${startX}, ${startY} a 1,1 0 1,0 ${dx},${dy} a 1,1 0 1,0 ${-dx},${-dy} Z')`;
    }

    update(game) {
        super.update(game);




// IDEA 1: Clicking key sets the direction and it continues indefinitely.
// IDEA 2: Hold down key to continue moving.

        if (game.userInput.joystick == game.userInput.oldJoystick) {
            return;
        }

        let movingAntiClockwise = this.classList.contains('anticlockwise');
        let movingClockwise = this.classList.contains('clockwise');

        let moveClockwise = 
            ((game.userInput.joystick & UserInput.LEFT) && (this.y >= 350)) || 
            ((game.userInput.joystick & UserInput.UP) && (this.x < 350)) || 
            ((game.userInput.joystick & UserInput.RIGHT) && (this.y < 350)) || 
            ((game.userInput.joystick & UserInput.DOWN) && (this.x >= 350));

        let moveAntiClockwise = 
            ((game.userInput.joystick & UserInput.LEFT) && (this.y < 350)) || 
            ((game.userInput.joystick & UserInput.UP) && (this.x >= 350)) || 
            ((game.userInput.joystick & UserInput.RIGHT) && (this.y >= 350)) || 
            ((game.userInput.joystick & UserInput.DOWN) && (this.x < 350));   

        // if ((movingClockwise || movingAntiClockwise) && !moveClockwise && !moveAntiClockwise) {
        //     // Read where we are and apply it directly to the element, so that it remains at rest.
        //     let currentTransform = window.getComputedStyle(this).getPropertyValue('transform');
        //     this.style.setProperty('transform', currentTransform);
        // }
        if ((movingClockwise || movingAntiClockwise) && !moveClockwise && !moveAntiClockwise) {
            // Read where we are and apply it directly to the element, so that it remains at rest.
            //let currentOffsetDistance = window.getComputedStyle(this).getPropertyValue('offset-distance').replace('%', '');
            //this.style.setProperty('offset-distance', Math.round(currentOffsetDistance) + '%');
            this.style.setProperty('--ego-path', this.buildPath());
        }
        if (movingAntiClockwise && !moveAntiClockwise) {
            this.classList.remove('anticlockwise');
        }
        if (movingClockwise && !moveClockwise) {
            this.classList.remove('clockwise');
        }
        if (moveAntiClockwise && !movingAntiClockwise) {
            this.classList.add('anticlockwise');
        }
        if (moveClockwise && !movingClockwise) {
            this.classList.add('clockwise');
        }
        // if ((moveClockwise || moveAntiClockwise) && !movingClockwise && !movingAntiClockwise) {
        //     // Remove previous at rest inline style, so that class rules kick in.
        //     this.style.removeProperty('offset-distance');
        // }

    }

}
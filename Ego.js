class Ego extends Sprite {

    constructor() {
        super();
    }

    /**
     * 
     * 
     * @param {*} game 
     */
    init(game) {
        // Starting path for Ego. Will change in response to player movement.
        // TODO: Dynamically change this based on screen dimension?
        this.pathX = 0;
        this.pathY = 325;
        this.updatePath();

        this.onanimationstart = e => this.onAnimationStart(e);
    }

    onAnimationStart(e) {
        console.log('Animation started. animationName: ' + e.animationName + ', elapsedTime: ' + e.elapsedTime);
    }

    /**
     * 
     */
    updatePath() {
        let startX = this.pathX;
        let startY = this.pathY;
        let endX = -(startX);
        let endY = -(startY);
        let dx = (endX - startX);
        let dy = (endY - startY);
        this.newPath = `path("M 0, 0 m ${startX}, ${startY} a 1,1 0 1,0 ${dx},${dy} a 1,1 0 1,0 ${-dx},${-dy} Z")`;
        this.style.setProperty('--ego-path', this.newPath);
    }

    /**
     * 
     * @param {*} game 
     */
    update(game) {
        super.update(game);

        // If the user input direction hasn't changed, then don't change anything.
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

        // Can't move both ways, so wait until we have only one.
        if (moveClockwise && moveAntiClockwise) {
            return;
        }

        // If ego was previously moving but is now not moving, then update offset-path.
        // if ((movingClockwise || movingAntiClockwise) && !moveClockwise && !moveAntiClockwise) {
        //     this.updatePath();
        // }

        if (movingAntiClockwise && !moveAntiClockwise) {
            this.classList.remove('anticlockwise');
            this.updatePath();
        }
        if (movingClockwise && !moveClockwise) {
            this.classList.remove('clockwise');
            this.updatePath();
        }

        if (moveAntiClockwise && !movingAntiClockwise) {
            this.classList.add('anticlockwise');
        }
        if (moveClockwise && !movingClockwise) {
            this.classList.add('clockwise');
        }

    }

}
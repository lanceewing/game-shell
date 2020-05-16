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
    }

    /**
     * 
     */
    updatePath() {
        // Calculate heading from center point (0,0) to current ego position.
        this.heading = Math.atan2(0 - this.pathY, 0 - this.pathX);

        // Adjust current position according to desired radius and heading.
        let startX = -(Math.round(Math.cos(this.heading) * 325));
        let startY = -(Math.round(Math.sin(this.heading) * 325));
        let endX = -(startX);
        let endY = -(startY);
        let dx = (endX - startX);
        let dy = (endY - startY);

        this.newPath = `path("M 0, 0 m ${startX}, ${startY} a 1,1 0 1,0 ${dx},${dy} a 1,1 0 1,0 ${-dx},${-dy} Z")`;
        this.style.setProperty('--ego-path', this.newPath);
        this.style.setProperty('--heading', this.heading);
    }

    /**
     * 
     * @param {*} game 
     */
    update(game) {
        super.update(game);

        // Fire button. Space bar. Mouse click.
        if ((!game.userInput.oldKeys[32] && game.userInput.keys[32])) {
            let heading = Math.atan2(0 - this.pathY, 0 - this.pathX);
            let bullet = new Bullet();
            bullet.init(game, this.pathX - 4, this.pathY - 4, heading + 0.79);
            game.add(bullet);
        }

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
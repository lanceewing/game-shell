class Game {

    /**
     * Constructor for Game.
     * 
     * @param {*} screen The element in which the game screen will be rendered.
     */
    constructor(screen) {
        this.screen = screen;
        this.time = 0;
        this.userInput = new UserInput(this, screen);
    }

    /**
     * Starts the game.
     */
    start() {
        this.userInput.enableInput();
        this.loop();
    }

    /**
     * This is a wrapper around the main game loop whose primary purpose is to make
     * the this reference point to the Game object within the main game loop. This 
     * is the method invoked by requestAnimationFrame and it quickly delegates to 
     * the main game loop.
     *  
     * @param {number} now Time in milliseconds.
     */
    _loop(now) {
        $.game.loop(now);
    }

    /**
     * This is the main game loop, in theory executed on every animation frame.
     * 
     * @param {number} now Time. The delta of this value is used to calculate the movements of Sprites.
     */
    loop(now) {
        // Immediately request another invocation on the next
        requestAnimationFrame(this._loop);
        
        // Calculates the time since the last invocation of the game loop.
        this.updateDelta(now);
        
        // Update all objects on the screen.
        this.updateObjects();

  

        this.userInput.processUserInput();
    }

    /**
     * Updates the delta, which is the difference between the last time and now. Both values
     * are provided by the requestAnimationFrame call to the game loop. The last time is the
     * value from the previous frame, and now is the value for the current frame. The difference
     * between them is the delta, which is the time between the two frames.
     * 
     * @param {Object} now The current time provided in the invocation of the game loop.
     */
    updateDelta(now) {
        if (now) {
            this.delta = now - (this.lastTime? this.lastTime : (now - 16));
            this.stepFactor = this.delta * 0.06;
            this.lastTime = now;
            this.time += this.delta;
        }
    }

    /**
     * 
     */
    updateObjects() {

    }
}
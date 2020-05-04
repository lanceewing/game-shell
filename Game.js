class Game {

    /**
     * Constructor for Game.
     * 
     * @param {*} screen The element in which the game screen will be rendered.
     */
    constructor(screen) {
        this.screen = screen;
        this.time = 0;
        this.defineCustomElements();
        this.userInput = new UserInput(this, screen);
        this.start();
    }

    /**
     * 
     */
    defineCustomElements() {
        customElements.define('x-sprite', Sprite);
    }

    /**
     * Starts the game.
     */
    start() {
        this.resizeScreen();
        window.onresize = e => this.resizeScreen(e);

        this.ego = document.createElement('x-sprite');
        this.screen.appendChild(this.ego);

        this.userInput.enableInput();
        this.running = true;
        this.loop();
    }

    /**
     * Scales the screen div to fit the whole screen.
     */
    resizeScreen(e) {
        this.screen.style.setProperty('--window-inner-width', window.innerWidth);
        this.screen.style.setProperty('--window-inner-height', window.innerHeight);
    }

    /**
     * This is the main game loop, in theory executed on every animation frame.
     *
     * @param {number} now Time. The delta of this value is used to calculate the movements of Sprites.
     */
    loop(now) {
        // Immediately request another invocation on the next.
        requestAnimationFrame(now => this.loop(now));

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
            this.delta = now - (this.lastTime ? this.lastTime : (now - 16));
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
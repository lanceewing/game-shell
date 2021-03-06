class Game {

    /**
     * The radius of the game area, around which the Ego (i.e. player) sits on, that
     * bullets start from, and stars stop moving at.
     */
    static CIRCLE_RADIUS = 310;

    /**
     * Constructor for Game.
     * 
     * @param {HTMLElement} screen The element in which the game screen will be rendered.
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
        customElements.define('x-ego', Ego);
        customElements.define('x-bullet', Bullet);
        customElements.define('x-star', Star);
        customElements.define('x-enemy', Enemy);
    }

    /**
     * Starts the game.
     */
    start() {
        this.resizeScreen();
        window.onresize = e => this.resizeScreen(e);

        this.ego = document.createElement('x-ego');
        this.ego.init(this);
        this.screen.appendChild(this.ego);

        this.objs = [];

        this.createStars();

        let enemy = new Enemy();
        enemy.init(this);
        this.add(enemy);

        this.userInput.enableInput();
        this.running = true;
        this.loop();
    }

    /**
     * Creates the stars that come out of the screen.
     */
    createStars() {
        for (let i=0; i<30; i++) {
            let star = new Star();
            star.init(this);
            this.screen.appendChild(star);
        }
    }

    /**
     * Adds a Sprite to the game.
     * 
     * @param {Sprite} obj The Sprite to add to the game.
     */
    add(obj) {
        this.screen.appendChild(obj);
        this.objs.push(obj);
    }

    /**
     * Removes a Sprite from the game.
     * 
     * @param {Sprite} obj  The Sprite to remove from the game.
     */
    remove(obj) {
        // Remove the Sprite from the screen.
        try {
            this.screen.removeChild(obj);
        } catch (e) {
            // Ignore. We don't care if it has already been removed.
        }

        // Remove the Sprite from our list of managed objects.
        let i = this.objs.indexOf(obj);
        if (i != -1) {
            this.objs.splice(i, 1);
        }
    }

    /**
     * Scales the screen div to fit the whole screen.
     * 
     * @param {UIEvent} The resize event.
     */
    resizeScreen(e) {
        this.screen.style.setProperty('--scale-portrait', window.innerWidth / this.screen.offsetWidth);
        this.screen.style.setProperty('--scale-landscape', window.innerHeight / this.screen.offsetHeight);
        this.scale = getComputedStyle(this.screen).getPropertyValue('--scale');
        let screenPos = this.screen.getBoundingClientRect();
        this.screenX = screenPos.x;
        this.screenY = screenPos.y;
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
     * @param {number} now The current time provided in the invocation of the game loop.
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

        this.ego.update(this);

    }

    /**
     * Linear congruential generator algorithm with a fixed seed. Gives the appearance
     * of being random but always generates the numbers in the same sequence. This has
     * been done deliberately.
     * 
     * @param {number} seed 
     */
    static random(seed) {
        var _random = seed || 481731;
        return function(n) {
          _random = (_random * 1664525 + 1013904223) & 0xFFFFFFFF;
          return (_random % n);
        };
    }
}
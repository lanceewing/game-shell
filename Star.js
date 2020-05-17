class Star extends HTMLElement {

    /**
     * Constructor for Star.
     */
    constructor() {
        super();
    }

    /**
     * Initialises the star with a random end point and starting position (i.e. negative delay)
     * 
     * @param {Game} game
     */
    init(game) {
        this.game = game;

        let heading = Math.random() * Math.PI * 2;
        let endX = -(Math.round(Math.cos(heading) * game.CIRCLE_RADIUS));
        let endY = -(Math.round(Math.sin(heading) * game.CIRCLE_RADIUS));
        let delay = Math.round(Math.random() * -5000);
        let duration = Math.round(Math.random() * 500) + 1000;

        this.style.setProperty('--end-x', `${endX}px`);
        this.style.setProperty('--end-y', `${endY}px`);
        this.style.setProperty('--delay', `${delay}ms`);
        this.style.setProperty('--duration', `${duration}ms`);
    }
}
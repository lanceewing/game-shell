class Bullet extends Sprite {

    /**
     * Constructor for Bullet.
     */
    constructor() {
        super();
    }

    /**
     * Initialises the bullet with its start position and end position.
     * 
     * @param {Game} game
     * @param {*} startX 
     * @param {*} startY 
     * @param {*} endX 
     * @param {*} endY 
     */
    init(game, startX, startY, rotation, endX = 0, endY = 0) {
        this.game = game;

        this.style.setProperty('--start-x', `${startX}px`);
        this.style.setProperty('--start-y', `${startY}px`);
        this.style.setProperty('--end-x', `${endX}px`);
        this.style.setProperty('--end-y', `${endY}px`);
        this.style.setProperty('--rotation', `${rotation}rad`);

        this.onanimationend = e => this.animationEnd(e);
    }

    /**
     * 
     * @param {AnimationEvent} e 
     */
    animationEnd(e) {
        if (e.animationName && (e.animationName == 'shoot')) {
            if (this.game) {
                this.game.remove(this);
            }
        }
    }
}
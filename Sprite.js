class Sprite extends HTMLElement {

    constructor() {
        super();
    }

    update(game) {
        let rect = this.getBoundingClientRect();
        this.x = ~~((rect.x - game.screenX) / game.scale);
        this.y = ~~((rect.y - game.screenY) / game.scale);
        this.style.setProperty("--ego-x", this.x);
        this.style.setProperty("--ego-y", this.y);
    }

}
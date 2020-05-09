class Sprite extends HTMLElement {

    constructor() {
        super();
    }

    getSize() {
        if (!this.size) {
            let spriteSize = getComputedStyle(this).getPropertyValue('--sprite-size');
            spriteSize.trim().replace('px', '');
            this.size = parseInt(spriteSize);
        }
        return this.size;
    }

    getRadius() {
        if (!this.radius) {
            this.radius = this.getSize() / 2;
        }
        return this.radius;
    }

    update(game) {
        let radius = this.getRadius();
        let rect = this.getBoundingClientRect();
        this.x = Math.round((rect.x - game.screenX) / game.scale);
        this.y = Math.round((rect.y - game.screenY) / game.scale);
        this.cx = this.x + radius;
        this.cy = this.y + radius;

        this.style.setProperty("--ego-x", this.cx);
        this.style.setProperty("--ego-y", this.cy);

        let xx = this.cx - 350;
        let yy = this.cy - 350;

        this.style.setProperty("--ego-xx", xx);
        this.style.setProperty("--ego-yy", yy);
    }

}
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

        // this.x = Math.round((rect.x - game.screenX) / game.scale);
        // this.y = Math.round((rect.y - game.screenY) / game.scale);
        // this.cx = this.x + radius;
        // this.cy = this.y + radius;
        // this.pathX = this.cx - 350;
        // this.pathY = this.cy - 350;
        // this.style.setProperty("--path-x", this.pathX);
        // this.style.setProperty("--path-y", this.pathY);

        this.cx = Math.round(((rect.x + (rect.width / 2)) - game.screenX) / game.scale);
        this.cy = Math.round(((rect.y + (rect.height / 2)) - game.screenY) / game.scale);
        this.x = this.cx - radius;
        this.y = this.cy - radius;
        this.pathX = this.cx - 350;
        this.pathY = this.cy - 350;
        this.style.setProperty("--path-x", this.pathX);
        this.style.setProperty("--path-y", this.pathY);

        let marker = document.querySelector('.marker');
        marker.style.setProperty('--marker-path', "path('M " + this.pathX + ", " + this.pathY + "')");
    }

}
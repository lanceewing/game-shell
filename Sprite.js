class Sprite extends HTMLElement {

    constructor() {
        super();
    }

    update() {
        let rect = this.getBoundingClientRect();
        this.x = ~~rect.x;
        this.y = ~~rect.y;
        this.style.setProperty("--ego-x", this.x);
        this.style.setProperty("--ego-y", this.y);
    }

}
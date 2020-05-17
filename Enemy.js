class Enemy extends Sprite {

    /**
     * Constructor for Enemy.
     */
    constructor() {
        super();
    }

    /**
     * 
     * @param {Game} game 
     */
    init(game) {

    }

    /**
     * 
     * @param {number} seed 
     * @param {number} iconWidth 
     * @param {number} iconHeight 
     */
    buildCanvas(seed, iconWidth, iconHeight) {
        let hashRand = [];
        let random = Util.random(seed);
        for (var i=0; i<20; i++) {
          hashRand[i] = random(2147483647);
        }
        
        let ctx = Util.create2dContext(iconWidth, iconHeight);
        let shadowRadius = (iconWidth / 2);
        
        ctx.beginPath();
        ctx.arc(shadowRadius, shadowRadius, shadowRadius - 3, 0, 2 * Math.PI);
        ctx.clip();
        
        let blockDensityX = 13;
        let blockDensityY = 13;
        let blockWidth = iconWidth / blockDensityX;
        let blockHeight = iconHeight / blockDensityY;
        let blockMidX = ((blockDensityX + 1) / 2);
        let blockMidY = ((blockDensityY + 1) / 2);
        
        for (let x = 0; x < blockDensityX; x++) {
            let i = x < blockMidX ? x : (blockDensityX - 1) - x;
            for (let y = 0; y < blockDensityY; y++) {
                let j = y < blockMidY ? y : (blockDensityY - 1) - y;
                if ((hashRand[i] >> j & 1) == 1) {
                    ctx.fillStyle = this.colour;
                } else {
                    ctx.fillStyle = 'rgba(0,0,0,0.0)';
                }
                ctx.beginPath();
                ctx.rect(x * blockWidth, y * blockHeight, blockWidth, blockHeight);
                ctx.fill();
            }
        }
        
        return ctx.canvas;
    }
}
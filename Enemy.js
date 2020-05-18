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
     * @param {number} width 
     */
    init(game, width = 31) {
        this.colour = 'brown';

        // COOL SHIPS
        // 4/6/12

        // Generate top and bottom halves.
        // let canvasTop = this.buildCanvas(4, width, width);
        // let canvasBottom = this.buildCanvas(12, width, width);
        //let canvasTop = this.buildCanvas(4, width, width, 'grey');
        // let canvasBottom = this.buildCanvas(14, width, width);
        let canvasTop = this.buildShip(12, width, [this.colour, 'purple', 'green']);
        let canvasBottom = this.buildShip(25, width, [this.colour, 'purple', 'green']);

        // Create the main canvas and then apply the top and bottom to it.
        let mainCtx = Util.create2dContext(width, width);
        mainCtx.shadowColor   = this.colour;
        mainCtx.shadowOffsetX = 0;
        mainCtx.shadowOffsetY = 0;
        mainCtx.shadowBlur    = 10;
        mainCtx.drawImage(canvasTop,  0, 0, width / 2, width, 0, 0, width / 2, width);
        mainCtx.drawImage(canvasBottom, width / 2, 0, width / 2, width, width / 2, 0, width / 2, width);

        this.style.backgroundImage = 'url(' + mainCtx.canvas.toDataURL("image/png") + ')';
    }

    /**
     * 
     * @param {number} seed 
     * @param {number} startWidth 
     * @param {string[]} colours 
     * 
     * @returns {HTMLCanvasElement} The canvas containing the drawn ship.
     */
    buildShip(seed, width, colours) {
        let numOfLayers = colours.length;
        let ctx = Util.create2dContext(width, width);
        ctx.globalCompositeOperation = 'lighter';

        for (let layer=0; layer<numOfLayers; layer++) {
            let layerWidth = (width - (layer * 4));
            let layerCanvas = this.buildCanvas(seed, layerWidth, layerWidth, colours[layer]);
            ctx.drawImage(layerCanvas, 
                0, 0, layerWidth, layerWidth,
                (width - layerWidth) / 2, 
                (width - layerWidth) / 2, 
                layerWidth, layerWidth);
        }

        return ctx.canvas;
    }

    /**
     * 
     * @param {number} seed 
     * @param {number} iconWidth 
     * @param {number} iconHeight 
     */
    buildCanvas(seed, iconWidth, iconHeight, colour) {
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
                    ctx.fillStyle = colour? colour : this.colour;
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
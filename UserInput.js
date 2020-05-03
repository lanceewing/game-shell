class UserInput {

    /**
     * Constructor for UserInput.
     */
    constructor(game, screen) {
        this.game = game;
        this.screen = screen;
        this.keys = {};
        this.oldKeys = {};
        this.xMouse = 0;
        this.yMouse = 0;
        this.mouseButton = 0;
        this.dragStart = null;
        this.dragNow = null;
        this.dragEnd = null;
    }

    /**
     * Set up the keyboard & mouse event handlers.
     */
    enableInput() {
        let userInput = this;
        let game = this.game;
        let screen = this.screen;

        this.screen.onmousedown = function(e) {
          if (game.running) {
            userInput.dragStart = { 
                x: e.pageX - screen.offsetLeft, 
                y: e.pageY - screen.offsetTop,
                t: (new Date()).getTime()
            };
            userInput.dragEnd = userInput.dragNow = null;
          }
          userInput.mouseButton = 1;
          e.preventDefault();
        };

        this.screen.onmouseup = function(e) {
          if (game.running) {
            userInput.dragEnd = { 
                x: e.pageX - screen.offsetLeft, 
                y: e.pageY - screen.offsetTop,
                t: (new Date()).getTime()
            };
          }
          userInput.mouseButton = 0;
          e.preventDefault();
        };

        this.screen.onmousemove = function(e) {
          userInput.xMouse = e.pageX - screen.offsetLeft;
          userInput.yMouse = e.pageY - screen.offsetTop;
          if ((userInput.mouseButton == 1) && (game.running)) {
            userInput.dragNow = { 
                x: e.pageX - screen.offsetLeft, 
                y: e.pageY - screen.offsetTop,
                t: (new Date()).getTime()
            };
          }
        };

        this.screen.ontouchend = function(e) {
          if (game.running) {
            userInput.dragEnd = { 
                x: e.changedTouches[0].pageX - screen.offsetLeft, 
                y: e.changedTouches[0].pageY - screen.offsetTop,
                t: (new Date()).getTime()
            };
          }
          userInput.xMouse = e.changedTouches[0].pageX - screen.offsetLeft;
          userInput.yMouse = e.changedTouches[0].pageY - screen.offsetTop;
          userInput.mouseButton = 1;
          if (e.cancelable) e.preventDefault();
        };

        this.screen.ontouchstart = function(e) {
          if (game.running) {
            userInput.dragStart = { 
                x: e.changedTouches[0].pageX - screen.offsetLeft, 
                y: e.changedTouches[0].pageY - screen.offsetTop,
                t: (new Date()).getTime()
            };
            userInput.dragEnd = userInput.dragNow = null;
          }
        };

        this.screen.ontouchmove = function(e) {
          if (game.running) {
            userInput.dragNow = { 
                x: e.changedTouches[0].pageX - screen.offsetLeft, 
                y: e.changedTouches[0].pageY - screen.offsetTop,
                t: (new Date()).getTime()
            };
          }
        };

        this.enableKeys();
    }

    /**
     * Remove event handlers for mouse, touch and key events.
     */
    disableInput() {
        this.screen.onmousedown = null;
        this.screen.onmouseup = null;
        this.screen.onmousemove = null;
        this.screen.ontouchend = null;
        this.screen.ontouchstart = null;
        this.screen.ontouchmove = null;
        this.disableKeys();
    }
    
    /**
     * Enables keyboard input. 
     */
    enableKeys() {
        document.addEventListener('keydown', this.keydown, false);
        document.addEventListener('keyup', this.keyup, false);
        this.screen.focus();
    }
      
    /**
     * Disables keyboard input. 
     */
    disableKeys() {
        this.oldkeys = this.keys = {};
        document.removeEventListener('keydown', this.keydown, false);
        document.removeEventListener('keyup', this.keyup, false);
    }
      
    /**
     * Invoked when a key is pressed down.
     *  
     * @param {Object} e The key down event containing the key code.
     */
    keydown(e) {
        this.keys[e.keyCode] = 1;
    }
      
    /**
     * Invoked when a key is released.
     *  
     * @param {Object} e The key up event containing the key code.
     */
    keyup(e) {
        this.keys[e.keyCode] = 0;
    }

    /**
     * 
     */
    processUserInput(ego) {
        // Process any user input for the main player sprite (ego).
        if (ego) {


          
        }

        // Keep track of what the previous state of each key was.
        this.oldkeys = {};
        for (var k in this.keys) {
            this.oldkeys[k] = this.keys[k];
        }
    }
}
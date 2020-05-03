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
    document.onkeydown = e => this.keyDown(e);
    document.onkeyup = e => this.keyUp(e);
    this.screen.onmousedown = e => this.mouseDown(e);
    this.screen.onmouseup = e => this.mouseUp(e);
    this.screen.onmousemove = e => this.mouseMove(e);
    this.screen.ontouchend = e => this.touchEnd(e);
    this.screen.ontouchstart = e => this.touchStart(e);
    this.screen.ontouchmove = e => this.touchMove(e);
  }

  /**
   * 
   * @param {*} e 
   */
  mouseDown(e) {
    if (this.game.running) {
      this.dragStart = {
        x: e.pageX - this.screen.offsetLeft,
        y: e.pageY - this.screen.offsetTop,
        t: (new Date()).getTime()
      };
      this.dragEnd = this.dragNow = null;
    }
    this.mouseButton = 1;
    e.preventDefault();
  }

  /**
   * 
   * @param {*} e 
   */
  mouseUp(e) {
    if (this.game.running) {
      this.dragEnd = {
        x: e.pageX - this.screen.offsetLeft,
        y: e.pageY - this.screen.offsetTop,
        t: (new Date()).getTime()
      };
    }
    this.mouseButton = 0;
    e.preventDefault();
  }

  /**
   * 
   * @param {*} e 
   */
  mouseMove(e) {
    this.xMouse = e.pageX - this.screen.offsetLeft;
    this.yMouse = e.pageY - this.screen.offsetTop;
    if ((this.mouseButton == 1) && (this.game.running)) {
      this.dragNow = {
        x: e.pageX - this.screen.offsetLeft,
        y: e.pageY - this.screen.offsetTop,
        t: (new Date()).getTime()
      };
    }
  }

  /**
   * 
   * @param {*} e 
   */
  touchEnd(e) {
    if (this.game.running) {
      this.dragEnd = {
        x: e.changedTouches[0].pageX - this.screen.offsetLeft,
        y: e.changedTouches[0].pageY - this.screen.offsetTop,
        t: (new Date()).getTime()
      };
    }
    this.xMouse = e.changedTouches[0].pageX - this.screen.offsetLeft;
    this.yMouse = e.changedTouches[0].pageY - this.screen.offsetTop;
    this.mouseButton = 1;
    if (e.cancelable) e.preventDefault();
  }

  /**
   * 
   * @param {*} e 
   */
  touchStart(e) {
    if (this.game.running) {
      this.dragStart = {
        x: e.changedTouches[0].pageX - this.screen.offsetLeft,
        y: e.changedTouches[0].pageY - this.screen.offsetTop,
        t: (new Date()).getTime()
      };
      this.dragEnd = this.dragNow = null;
    }
  }

  /**
   * 
   * @param {*} e 
   */
  touchMove(e) {
    if (this.game.running) {
      this.dragNow = {
        x: e.changedTouches[0].pageX - this.screen.offsetLeft,
        y: e.changedTouches[0].pageY - this.screen.offsetTop,
        t: (new Date()).getTime()
      };
    }
  }

  /**
   * Invoked when a key is pressed down.
   *  
   * @param {Object} e The key down event containing the key code.
   */
  keyDown(e) {
    this.keys[e.keyCode] = 1;
  }

  /**
   * Invoked when a key is released.
   *  
   * @param {Object} e The key up event containing the key code.
   */
  keyUp(e) {
    this.keys[e.keyCode] = 0;
  }

  /**
   * Remove event handlers for mouse, touch and key events.
   */
  disableInput() {
    document.onkeydown = null;
    document.onkeyup = null;
    this.screen.onmousedown = null;
    this.screen.onmouseup = null;
    this.screen.onmousemove = null;
    this.screen.ontouchend = null;
    this.screen.ontouchstart = null;
    this.screen.ontouchmove = null;
    this.oldkeys = this.keys = {};
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
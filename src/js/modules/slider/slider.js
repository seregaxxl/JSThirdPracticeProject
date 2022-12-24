
export default class Slider {
    constructor({
        container = null,
        next = null, 
        prev = null, 
        btns = null,
        activeClass = '',
        animate,
        autoplay
        } = {}) {
        this.container = document.querySelector(container);
        this.slides = this.container.children;
        this.btns = document.querySelectorAll(btns);
        this.slideIndex = 1;
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.activeClass = activeClass;
        this.animate = animate;
        this.autoplay = autoplay;
    }
   
}


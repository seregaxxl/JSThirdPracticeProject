export default class Accordeon {
    constructor(triggers, content) {
        this.btns = document.querySelectorAll(triggers);
        this.content = document.querySelectorAll(content);
    }
    showContent(i) {
        this.content[i].classList.remove('animated', 'fadeOut');
        this.content[i].classList.add('animated', 'fadeIn');
        this.content[i].style.display = 'block';
    }
    hideContent(i) {
        this.content[i].classList.remove('animated', 'fadeIn');
        this.content[i].classList.add('animated', 'fadeOut');
        this.content[i].style.display = 'none';
    }
    bindTriggers() {
        this.btns.forEach((btn, i) => {
            btn.addEventListener('click', ()=>{
                if (this.content[i].classList.contains('fadeIn')){
                    this.hideContent(i);
                } else {this.showContent(i);}
                
            });
        });
    }
    init() {
        this.bindTriggers();
    }
}
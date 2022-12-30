import Slider from './slider';


export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev);
    }

    bindTriggers() {
        this.next.addEventListener('click', () => this.nextSlide());

        this.prev.addEventListener('click', () => {
            for (let i = this.slides.length - 1; i > 0; i-- ) {
                if (this.slides[i].tagName !== 'BUTTON') {
                    let active = this.slides[i];
                    this.container.insertBefore(active, this.slides[0]);
                    this.decorizeSlides();
                    break;
                }
            }
            

        });
    }

    nextSlide() {
        if (this.slides[1].tagName == 'BUTTON' && this.slides[2].tagName == 'BUTTON') {
            this.container.appendChild(this.slides[0]);
            this.container.appendChild(this.slides[0]);
            this.container.appendChild(this.slides[0]);
        } else if (this.slides[1].tagName == 'BUTTON') {
            this.container.appendChild(this.slides[0]);
            this.container.appendChild(this.slides[0]);
        } else {
            this.container.appendChild(this.slides[0]);
        }
        this.decorizeSlides();
    }

    decorizeSlides() {
        this.slides.forEach((slide, i) => {
            slide.classList.remove(this.activeClass);
            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });

        if (!this.slides[0].closest('button')) {
            this.slides[0].classList.add(this.activeClass);
        }

        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }


    init() {
        try {
            this.container.style.cssText =`
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        align-items: flex-start;
        `;
        this.bindTriggers();
        this.decorizeSlides();
        if (this.autoplay) {
            let autoPlayInterval = setInterval(() => this.nextSlide(), 2000);
            this.slides.forEach(slide => {
                slide.addEventListener('mouseenter', () => {
                    clearInterval(autoPlayInterval);
                });
            });
            this.slides.forEach(slide => {
                slide.addEventListener('mouseleave', () => {
                    autoPlayInterval = setInterval(() => this.nextSlide(), 2000);
                });
            });
            this.next.addEventListener('mouseenter', () => {
                clearInterval(autoPlayInterval);
            });
            this.next.addEventListener('mouseleave', () => {
                autoPlayInterval = setInterval(() => this.nextSlide(), 2000);
            });
            this.prev.addEventListener('mouseenter', () => {
                clearInterval(autoPlayInterval);
            });
            this.prev.addEventListener('mouseleave', () => {
                autoPlayInterval = setInterval(() => this.nextSlide(), 2000);
            });

            } 
        } catch(e) {}
    }
}
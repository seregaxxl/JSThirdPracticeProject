export default class Difference {
    constructor(oldOfficer, newOfficer, items) {
        this.oldOfficer = document.querySelector(oldOfficer);
        this.newOfficer = document.querySelector(newOfficer);
        this.oldItems = this.oldOfficer.querySelectorAll(items);
        this.newItems = this.newOfficer.querySelectorAll(items);
        this.items = items;
        this.oldCounter = 0;
        this.newCounter = 0;
    }

    bindTriggers(officer, counter, items) {
        officer.querySelector('.plus').addEventListener('click', ()=>{
            if (counter != this.oldItems.length - 2) {
                items[counter].style.display = 'flex';
                items[counter].classList.add('animated', 'fadeIn');
                counter++;
                
            } else {
                items[counter].style.display = 'flex';
                items[counter].classList.add('animated', 'fadeIn');
                items[items.length - 1].remove();
            }
        });
    }

    hideItems(items) {
        items.forEach((item, i, arr) => {
            if (i != arr.length - 1) {
                item.style.display = 'none';
            }
        });
    }

    init() {
        this.bindTriggers(this.newOfficer, this.newCounter, this.newItems);
        this.bindTriggers(this.oldOfficer, this.oldCounter, this.oldItems);
        this.hideItems(this.oldItems);
        this.hideItems(this.newItems);
    }
}
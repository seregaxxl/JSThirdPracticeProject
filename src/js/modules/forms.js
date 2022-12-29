export default class Forms {
    constructor(forms) {
        this.forms = document.querySelectorAll(forms);
        this.inputs = document.querySelectorAll('input');
        this.message = {
            loading: 'Loading...',
            success: 'Thank you, your form was submitted',
            failure: 'Something goes wrong',
            spinner: 'assets/img/spinner.gif',
            ok: 'assets/img/ok.png',
            fail: 'assets/img/fail.png'
          };
        this.path =  "assets/server.php";
    }

    async postData(url, data) {
        let res = await fetch(url, {
            method:'POST',
            body:data
        });
        return await res.text();    
    }
    clearInputs() {
        this.inputs.forEach(e => {
            e.value = '';
        });
    }

    checkmailInputs() {
        const mailInputs = document.querySelectorAll('[type="email"]');
        mailInputs.forEach(mailInput => {
            mailInput.addEventListener('input', function(e) {
                mailInput.value = mailInput.value.replace(/[^a-z 0-9 @ \.]/ig, '');
            });
        });
    }

    initMask() {
        let setCursorPos = (pos, elem) => {
            elem.focus();
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                let range = elem.createTextRange();
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        };
    
        function createMask(event) {
            let matrix = '+1 (___) ___-____',
                i = 0,
                def = matrix.replace(/\D/g, ''),
                val = this.value.replace(/\D/g, '');
            if (def.length >= val.length) {
                val = def;
            }
    
            this.value = matrix.replace(/./g, function(a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            });
    
            if (event.type === 'blur') {
                if (this.value.length === 2) {
                    this.value = '';
                }
            } else {
                setCursorPos(this.value.length, this);
            }
        }
    
        let inputs = document.querySelectorAll('[name="phone"]');
        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
            input.addEventListener('keypress', createMask);
        });
    }

    init() {
        this.initMask();
        this.checkmailInputs();
        this.forms.forEach(form => {
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                let statusMessage = document.createElement('div');
                form.parentNode.appendChild(statusMessage);
                statusMessage.style.cssText = `
                margin-top: 15px;
                color: grey;
                font-size: 30px;
                text-align: center;
                `;
                form.classList.add('animated', 'fadeOutUp');
                setTimeout(() => {
                    form.style.display = 'none';
                }, 400);
    
                let statusImg = document.createElement('img');
                statusImg.setAttribute('src', this.message.spinner);
                statusImg.classList.add('animated', 'fadeInUp');
                statusMessage.appendChild(statusImg);
                statusImg.style.cssText = `
                display: block;
                margin: 0 auto;
                `;
    
                let textMessage = document.createElement('div');
                textMessage.textContent = this.message.loading;
                statusMessage.appendChild(textMessage);
    
                const formData = new FormData(form);
    
                this.postData(this.path, formData).then(res => {
                    console.log(res);
                    statusImg.setAttribute('src', this.message.ok);
                    textMessage.textContent = this.message.success;
                })
                .catch(() => {
                    statusImg.setAttribute('src', this.message.fail);
                    textMessage.textContent = this.message.failure;
                })
                .finally(() => {
                    this.clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        form.style.display = 'block';
                        form.classList.remove('fadeOutUp');
                        form.classList.add('fadeInUp');
                    }, 5000);
                });
            });
        });
    }
}


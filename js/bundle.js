/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc() {
        ///////////////////////////////////////////////////////////////////////////
    // КАЛЬКУЛЯТОР
    ///////////////////////////////////////////////////////////////////////////

    const result = document.querySelector('.calculating__result span');
    
    let sex, height, weight, age, ratio;

    // если есть данные в localStorage, то присваиваем значениям sex и ratio эти данные
    // если данных нет, то ставим значения по умолчанию - female и 1.375
    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    // инициализация начальных значений - переключение активных классов исходя из начальных данных
    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
    
    // функция, которая отвечает за пересчет суточной нормы калорий
    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }
    
        if (sex == 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    
    calcTotal();

    // функция, которая отслеживает нажатия на плашки физической активности, изменяет активные классы
    // и присваивает значение переменным sex и ratio
    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
    
                calcTotal();
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');


    // функция, которая отслеживает введенные данные в инпуты (рост, вес, возраст), присваивает значения
    // переменным height, weight и age
    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

           switch(input.getAttribute('id')) {
                case 'height':
                     height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
           }

           calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards() {
    ///////////////////////////////////////////////////////////////////////////
    // СОЗДАНИЕ КАРТОЧЕК МЕНЮ С ПОМОЩЬЮ КЛАССОВ
    ///////////////////////////////////////////////////////////////////////////

    ///////////
    // ВАРИАНТ С ДАННЫМИ ДЛЯ КАРТОЧЕК В JS ФАЙЛЕ
    ////////////
/*
    const menuField = document.querySelector('.menu__field'),
          menuContainer = menuField.querySelector('.container');

    class ItemMenu {
        constructor(imgSrc, imgAlt, title, descr, price, ...classes) {
            this.imgSrc = imgSrc;
            this.imgAlt = imgAlt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.transfer = 28;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        itemRender() {
            const menuItem = document.createElement('div');
            // если класс не будет задан пользователем (this.classes.length === 0), то автоматом подставится menu__item,
            // иначе будет перебираться массив с введенными классами и эти классы будут добавляться новосозданному DIVу
            if (this.classes.length === 0) {
                this.classes = 'menu__item';
                menuItem.classList.add(this.classes);
            } else {
                this.classes.forEach(item => {
                    menuItem.classList.add(item);
                });
            }
            
            menuItem.innerHTML = `
                <img src=${this.imgSrc} alt="${this.imgAlt}">
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>`;
            menuContainer.append(menuItem);

        }
    }

    // ВАРИАНТ №1:
    // const newMenu = new ItemMenu(
    //     'img/tabs/vegy.jpg', 
    //     'vegy', 
    //     'Меню "Новое"', 
    //     'Меню "Новое" - это новое меню, которое вы съедите за 5 минут', 
    //     9
    // );
    // newMenu.itemRender();

    // ВАРИАНТ № 2 (без создания переменной):
    new ItemMenu(
        'img/tabs/vegy.jpg', 
        'vegy', 
        'Меню "Фитнес"', 
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
        8,
        'menu__item'
    ).itemRender();

    new ItemMenu(
        'img/tabs/elite.jpg', 
        'elite', 
        'Меню “Премиум”', 
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
        19,
        'menu__item'
    ).itemRender();

    new ItemMenu(
        'img/tabs/post.jpg', 
        'post', 
        'Меню "Постное"', 
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 
        14
    ).itemRender();
*/
    ///////////
    // ВАРИАНТ С ДАННЫМИ ИЗ ФАЙЛА DB.JSON
    ///////////
    
    const menuField = document.querySelector('.menu__field'),
          menuContainer = menuField.querySelector('.container');

    class ItemMenu {
        constructor(imgSrc, imgAlt, title, descr, price, ...classes) {
            this.imgSrc = imgSrc;
            this.imgAlt = imgAlt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.transfer = 28;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        itemRender() {
            const menuItem = document.createElement('div');
            // если класс не будет задан пользователем (this.classes.length === 0), то автоматом подставится menu__item,
            // иначе будет перебираться массив с введенными классами и эти классы будут добавляться новосозданному DIVу
            if (this.classes.length === 0) {
                this.classes = 'menu__item';
                menuItem.classList.add(this.classes);
            } else {
                this.classes.forEach(item => {
                    menuItem.classList.add(item);
                });
            }
            
            menuItem.innerHTML = `
                <img src=${this.imgSrc} alt="${this.imgAlt}">
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>`;
            menuContainer.append(menuItem);

        }
    }

    const getResource = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    };

    getResource('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new ItemMenu(img, altimg, title, descr, price).itemRender();
        });
    });

    // ЛИБО С ПОМОЩЬЮ БИБЛИОТЕКИ AXIOS
    // (подключить в index.html:
    // <script src="http://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>)
    // 
    // axios.get('http://localhost:3000/menu')
    // .then(data => {
    //     data.data.forEach(({img, altimg, title, descr, price}) => {
    //         new ItemMenu(img, altimg, title, descr, price).itemRender();
    //     });
    // });
}

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms() {
    ///////////////////////////////////////////////////////////////////////////
    // FORMS
    ///////////////////////////////////////////////////////////////////////////

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Ошибка'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        prevModalDialog.classList.remove('show');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        
        const timerThanksModal = setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
        
        
    }

    // Вариант с XML передачей данных
    /*
    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // form.append(statusMessage); или так:
            form.insertAdjacentElement('afterend', statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            // При связке XML и formData - заголовок не нужен
            // request.setRequestHeader('Content-type', 'multipart/form-data');
            const formData = new FormData(form);

            request.send(formData);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    statusMessage.textContent = message.success;
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000);
                } else {
                    statusMessage.textContent = message.failure;
                }
            });
        });
    }
    */

    // Вариант с JSON передачей данных
    // Для использования раскомментировать вторую строчку в server.php 
    /*
    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // form.append(statusMessage); или так:
            form.insertAdjacentElement('afterend', statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            request.setRequestHeader('Content-type', 'application/json');
            const formData = new FormData(form);  // сбор данных из формы

            const object = {};
            formData.forEach(function(value, key) {
                object[key] = value;
            });

            const json = JSON.stringify(object);

            request.send(json);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    showThanksModal(message.success);
                    form.reset();
                    statusMessage.remove();
                } else {
                    showThanksModal(message.failure);
                }
            });
        });
    }
       */

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    // FETCH API
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // form.append(statusMessage); или так:
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form); // сбор данных из формы

            // превращаем полученные данные с формы в массив-массивов, потом в объект и потом в JSON формат
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // Пример действия выше
            // const ooo = {'a': 1, 'b': 2};
            // const ooo2 = Object.entries(ooo);
            // console.log(ooo2);
            // const ooo3 = Object.fromEntries(ooo2);
            // console.log(ooo3);
            // const ooo4 = JSON.stringify(ooo3);
            // console.log(ooo4);

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }
    // */    
}

module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal() {
        ///////////////////////////////////////////////////////////////////////////
    // MODAL
    ///////////////////////////////////////////////////////////////////////////

    const modalOpenBtn = document.querySelectorAll('[data-modal]'),
        //   modalCloseBtn = document.querySelector('[data-close]'),
          modal = document.querySelector('.modal');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');

        document.body.style.overflow = 'hidden'; // убрать прокрутку страницы

        clearInterval(modalTimerId); // убираем открытия модалки автоматом, если оно уже было открыто
    }  
          
    modalOpenBtn.forEach(btn => {
        btn.addEventListener('click', openModal);
    });


    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');

        document.body.style.overflow = '';
    }

    // modalCloseBtn.addEventListener('click', closeModal);

    // закрытие модалки при клике на подложку или крестик
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    // закрытие модалки при клике на кливишу ESC
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // открытие модалки автоматом через время
    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            // прокрученная часть + высота видимой части больше или равно высоте всего документа
            openModal();

            // выполнение события только 1 раз
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    // открытие модалки при долистывания до низа страницы
    window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider() {
    ///////////////////////////////////////////////////////////////////////////
    // SLIDER (МОЯ ВЕРСИЯ)
    ///////////////////////////////////////////////////////////////////////////
    /*
    const sliderArea = document.querySelector('.offer__slider'),
          counterCurrentArea = sliderArea.querySelector('#current'),
          counterTotalArea = sliderArea.querySelector('#total'),
          slidersItems = sliderArea.querySelectorAll('.offer__slide'),
          btnSliderPrev = sliderArea.querySelector('.offer__slider-prev'),
          btnSliderNext = sliderArea.querySelector('.offer__slider-next');
    
    let slideIndex = 1;
    let slideTotal = slidersItems.length;

    function sliderFirst() {
        slidersItems.forEach(slider => {
            slider.classList.add('hide');
        });
        slidersItems[0].classList.remove('hide');
 
        counterDecor(slideIndex, counterCurrentArea);
        counterDecor(slideTotal, counterTotalArea);
    }

    function counterDecor(counter, area) {
        if (counter < 10) {
            area.innerHTML = `0${counter}`;
        } else {
            area.innerHTML = counter;
        }
    }

    sliderFirst();

    btnSliderNext.addEventListener('click', () => {
        slidersItems[slideIndex - 1].classList.add('hide');  
        if (slideIndex >= slideTotal) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }
        slidersItems[slideIndex - 1].classList.remove('hide');
          
        counterDecor(slideIndex, counterCurrentArea);
    });

    btnSliderPrev.addEventListener('click', () => {
        slidersItems[slideIndex - 1].classList.add('hide');  
        if (slideIndex == 1) {
            slideIndex = slideTotal;
        } else {
            slideIndex--;
        }
        slidersItems[slideIndex - 1].classList.remove('hide');
          
        counterDecor(slideIndex, counterCurrentArea);
    });
    */

    ///////////////////////////////////////////////////////////////////////////
    // SLIDER (ВЕРСИЯ ИВАНА ПЕТРИЧЕНКО)
    ///////////////////////////////////////////////////////////////////////////
    /*
    const slides = document.querySelectorAll('.offer__slide'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current');
    let slideIndex = 1;

    showSlides(slideIndex);
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach(item => item.style.display = 'none');

        slides[slideIndex - 1].style.display = 'block';

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    prev.addEventListener('click', () => {
        plusSlides(-1);
    });

    next.addEventListener('click', () => {
        plusSlides(1);
    });
    */

    ///////////////////////////////////////////////////////////////////////////
    // SLIDER В ВИДЕ КАРУСЕЛИ
    ///////////////////////////////////////////////////////////////////////////
    // /*
    const slides = document.querySelectorAll('.offer__slide'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    function delNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        // if (offset == +width.replace(/\D/g, '') * (slides.length - 1)) {
        if (offset == delNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            // offset += +width.replace(/\D/g, '');
            offset += delNotDigits(width);
        }

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        changeSlide(slideIndex, offset);
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            // offset = +width.replace(/\D/g, '') * (slides.length - 1);
            offset = delNotDigits(width) * (slides.length - 1);
        } else {
            // offset -= +width.replace(/\D/g, '');
            offset -= delNotDigits(width);
        }

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        changeSlide(slideIndex, offset);
    });

    function changeSlide(slideIndex, offset) {
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    // */

    ///////////////////////////////////////////////////////////////////////////
    // НАВИГАЦИЯ ТОЧКИ НА СЛАЙДЕРЕ
    ///////////////////////////////////////////////////////////////////////////
    // const slidesWrapper = document.querySelector('.offer__slider-wrapper');
    slidesWrapper.style.position = 'relative';

    const dottesArea = document.createElement('ol'),
          dots = [];

    dottesArea.classList.add('carousel-indicators');

    slidesWrapper.append(dottesArea);

    for (let i = 0; i < slides.length; i++) {
        let dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        dottesArea.append(dot);

        if (i == 0) {
            dot.style.opacity = 1;
        }
        dots.push(dot);
    }

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            // offset = +width.replace(/\D/g, '') * (slideTo - 1);
            offset = delNotDigits(width) * (slideTo - 1);
            

            changeSlide(slideIndex, offset);
        });
    });

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({name: 'Alex'}),
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(json => console.log(json));


    // привязка локального json сервера
    // в терминале набираем npx json-server db.json и берем оттуда ссылку
    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));
}

module.exports = slider;


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
    ///////////////////////////////////////////////////////////////////////////
    // TABS
    ///////////////////////////////////////////////////////////////////////////

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            // item.style.display = 'none'; // вариант через inline стили
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) { // если функция вызывается без аргумента (showTabContent()), то i = 0
        // tabsContent[i].style.display = 'block'; // вариант через inline стили
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i); 
                }
            });
        }
    });
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {
    ///////////////////////////////////////////////////////////////////////////
    // TIMER
    ///////////////////////////////////////////////////////////////////////////

    const deadline = '2022-01-01';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
        // в Date.parse получаем кол-во мс, t = конечное время минус время сейчас
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    // функция добавление "0", если число меньше 10
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock(); // убираем мигание верстки, выполняем функцию updateClock сразу, а не через 1000 мс (1 сек)
        // при первоначальном запуске подставляются значения с верстки и только через секунду происходит обновление

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/


window.addEventListener('DOMContentLoaded', () => {    
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
          modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
          timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
          cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
          calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
          forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
          slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");

    tabs();
    modal();
    timer();
    cards();
    calc();
    forms();
    slider();
    
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
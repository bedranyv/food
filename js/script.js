'use strict';

window.addEventListener('DOMContentLoaded', () => {

// TABS

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

    // TIMER

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

    // MODAL

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
    
    // Используем классы для карточки меню

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

    // FORMS

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Ошибка'
    };

    forms.forEach(item => {
        postData(item);
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

    // FETCH API
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

            const formData = new FormData(form); // сбор данных из формы

            const object = {};
            formData.forEach(function(value, key) {
                object[key] = value;
            });

            fetch('server.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(object)
            })
            .then(data => data.text())
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
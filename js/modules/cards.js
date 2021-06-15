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
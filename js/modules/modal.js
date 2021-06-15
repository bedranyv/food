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
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

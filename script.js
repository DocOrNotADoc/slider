const slides = document.querySelectorAll('.slide'),
        slider = document.querySelector('.slider'),
        prev = document.querySelector('.slider-prev'),
        next = document.querySelector('.slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.slider-wrapper'),
        slidesField = document.querySelector('.slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;
        
let slideIndex = 1,
    offset = 0;

if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
} else {
    total.textContent = slides.length;
}

function showCurrentSlideNumber(){
    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }
}

showCurrentSlideNumber();

slidesField.style.width = 100 * slides.length + '%';
slidesField.style.display = 'flex';
slidesField.style.transition = '0.5s all';

slidesWrapper.style.overflow = 'hidden';

slides.forEach(slide => {
    slide.style.width = width;
});

slider.style.position = 'relative';

const indicators = document.createElement('ol'),
    dots = [];

indicators.classList.add('carousel-indicators');
slider.append(indicators);

for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');
    if (i == 0) {
        dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
}

function dotsOpasity(){
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
}

function deleteNaNs(str) {
    return +str.replace(/\D/g, '');
}

next.addEventListener('click', () => {
    if (offset == deleteNaNs(width) * (slides.length - 1)){
        offset = 0;
    } else {
        offset += deleteNaNs(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
        slideIndex = 1;
    } else {
        slideIndex++;
    }

    showCurrentSlideNumber();

    dotsOpasity();
});

prev.addEventListener('click', () => {
    if (offset == 0) {
        offset = deleteNaNs(width) * (slides.length - 1);
    } else {
        offset -= deleteNaNs(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
        slideIndex = slides.length;
    } else {
        slideIndex--;
    }

    showCurrentSlideNumber();

    dotsOpasity();
});

dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');

        slideIndex = slideTo;
        offset = offset = deleteNaNs(width) * (slideTo - 1);

        slidesField.style.transform = `translateX(-${offset}px)`;
        
        showCurrentSlideNumber();
        
        dotsOpasity();
    });
});
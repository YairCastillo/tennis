let distance;
let currentSlide = 0;
let sliderLength = 0;
let slidesToShow = 1;
let slidesToMove = 1;
let dots = [];

const getSliderSize = (slider) => {
  const slides = slider.querySelectorAll('.grid__item');
  const sliderWidth = slider.offsetWidth;

  slidesToShow = window.innerWidth < 1200 ? 1 : 2;

  const slideWidth = sliderWidth / slidesToShow;

  if(slides) {
    sliderLength = slides.length;
    slides.forEach((slide) => {
      slide.style.width = `${ slideWidth }px`;
    });
  }

  distance = slideWidth;
}

const createDots = (dotsContainer, slider, prev, next) => {
  dotsContainer.replaceChildren();
  const numberOfDots = Math.ceil((sliderLength - slidesToShow + 1) / slidesToMove);

  for (let i = 1; i <= numberOfDots; i++) {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.classList.add('slider-dot');
    button.setAttribute('data-index', i);
    button.addEventListener('click', () => {
      const goTo = (parseInt(button.getAttribute('data-index'), 10) * slidesToMove) - (slidesToMove - 1);
      moveSlider(goTo - 1, slider, prev, next);
    });

    li.appendChild(button);
    dotsContainer.appendChild(li);
  }

  return dotsContainer.querySelectorAll('li .slider-dot');
}

const setDotsStyles = (dots) => {
  dots.forEach((dot) => {
    dot.classList.remove('active');
  });

  dots[currentSlide].classList.add('active');
}

const setButtonStyles = (prev, next) => {
  if(currentSlide === 0) {
    prev.classList.add('disabled');
  } else if(currentSlide === sliderLength - slidesToShow) {
    next.classList.add('disabled');
  } else {
    prev.classList.remove('disabled');
    next.classList.remove('disabled');
  }
}

const moveSlider = (nextSlide, slider, prev, next) => {
  if(nextSlide === currentSlide) return;
  if(nextSlide < 0 && currentSlide === 0) return;
  if(nextSlide > sliderLength - slidesToShow) return;

  currentSlide = nextSlide;

  getSliderSize(slider);
  setButtonStyles(prev, next);
  setDotsStyles(dots);

  slider.style.transform = `translateX(-${ distance * currentSlide }px)`;
}

const setLogoContainerHeight = (logoContainer, banner) => {
  if(window.innerWidth >= 990) {
    const height = banner.clientHeight;
    logoContainer.style.height = `${ height }px`;
  } else {
    logoContainer.style.height = 'auto';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.collection slider-component.page-width .contains-card');
  const dotsContainer = document.querySelector('.collection .slider-dots');
  const arrows = document.querySelector('.collection .slider-arrows');
  const prev = document.querySelector('.arrow-prev');
  const next = document.querySelector('.arrow-next');

  if(slider && dotsContainer && arrows) {
    setButtonStyles(prev, next);

    prev.addEventListener('click', () => moveSlider(currentSlide - 1, slider, prev, next));
    next.addEventListener('click', () => moveSlider(currentSlide + 1, slider, prev, next));

    getSliderSize(slider);
    dots = createDots(dotsContainer, slider, prev, next);
    setDotsStyles(dots);
  }

  window.addEventListener('resize', () => {
    getSliderSize(slider);
    createDots(dotsContainer, slider, prev, next);
  });

  const logoContainer = document.querySelector('.header .header__heading');
  const banner = document.querySelector('.banner__content');

  if(logoContainer && banner) {
    setLogoContainerHeight(logoContainer, banner);
    window.addEventListener('resize', () => setLogoContainerHeight(logoContainer, banner));
  }
});
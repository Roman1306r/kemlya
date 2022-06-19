let wrapper = document.querySelector('.wrapper')



// Слайдер
let pageSlider = new Swiper('.page', {
    wrapperClass: "page__wrapper", //переназначение своих классов
    slideClass: "page__screen",
    direction: 'vertical',
    slidesPerView: 'auto',
    parallax: true,
    keyboard: {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true,
    },
    mousewheel: {
        sensitivity: 1,
    },
    watchOverflow: true,
    speed: 800,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    pagination: {
        el: '.page__pagination',
        type: 'bullets',
        clickable: true,
        bulletClass: "page__bullet",
        bulletActiveClass: "page__bullet_active",
    },
    scrollbar: {
        el: '.page__scroll',
        dragClass: "page__drag-scroll",
        draggable: true
    },
    init: false,
    on: {
       init: function() {
        menuSlider();
        setScrollType();
        wrapper.classList.add('_loaded');
    },
       slideChange: function() {
        menuSliderRemove();
        menuLinks[pageSlider.realIndex].classList.add('_active');
    },
    resize: function () {
        setScrollType();
    }
    }
})



// Переключение по слайдам
let menuLinks = document.querySelectorAll('.header__link');
function menuSlider() {
    if(menuLinks.length > 0) {
        menuLinks[pageSlider.realIndex].classList.add('_active');
        for(let i = 0; i<menuLinks.length; i++){
            const menuLink = menuLinks[i];
            menuLink.addEventListener('click', (e)=> {
                menuSliderRemove();
                pageSlider.slideTo(i, 800)
               menuLink.classList.add('_active');
               e.preventDefault();
              if(menuLink == menuLinks[1]){
                menuLink.style.color = 'orange'
                menuLinks[0].style.color = 'white'
                menuLinks[2].style.color = 'white'
                menuLinks[3].style.color = 'white'
              } else if (menuLink == menuLinks[2]) {
                menuLink.style.color = 'blue'
                menuLinks[0].style.color = 'white'
                menuLinks[1].style.color = 'white'
                menuLinks[3].style.color = 'white'
              } else if (menuLink == menuLinks[3]) {
                menuLink.style.color = 'fuchsia'
                menuLinks[0].style.color = 'white'
                menuLinks[2].style.color = 'white'
                menuLinks[1].style.color = 'white'
              } else {
                menuLink.style.color = 'red'
                menuLinks[1].style.color = 'white'
                menuLinks[2].style.color = 'white'
                menuLinks[3].style.color = 'white'
              }   
            })
        }
    }
}


// Удаление у активной сслыки класса _active
function menuSliderRemove() {
    let menuLinkActive = document.querySelector('.header__link._active')
    if(menuLinkActive) {
        menuLinkActive.classList.remove('_active')
    }
}




// Включение свободного режима у слайдера если контент вылазит за высоту страницы
function setScrollType() {
    if(wrapper.classList.contains('_free')){
        wrapper.classList.remove('_free');
        pageSlider.params.freeMode = false;
    }
    for(let i = 0; i < pageSlider.slides.length ;i++) {
         const pageSlide = pageSlider.slides[i];
         const pagelideContent = pageSlide.querySelector('.screen__content')
         if (pagelideContent) {
            const pageSlideContentHeight = pagelideContent.offsetHeight;
            if (pageSlideContentHeight > window.innerHeight) {
                wrapper.classList.add('_free')
                pageSlider.params.freeMode = true;
                break;
            }
         }
    }
}





// Инициализация слайдера
pageSlider.init()





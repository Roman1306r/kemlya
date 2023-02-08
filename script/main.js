let wrapper = document.querySelector('.wrapper')
const mouse = document.querySelector('.mouse')
const header = document.querySelector('.header')








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
mouse.addEventListener('click', (e) =>  pageSlider.slideNext())
pageSlider.on('slideChange', function() {
    if(pageSlider.activeIndex === 1 || pageSlider.activeIndex === 2) {
         header.classList.add('light')
    } else {
        header.classList.remove('light')
    }
})












$(document).ready(function() {
    $('.slider').slick({
        arrows: true,
        dots: false,
        centerPadding: '60px',
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 1000,
        easing: 'easy',
        infinite: true,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnFocus: true,
        pauseOnHover: true,
        pauseOnDotsHover: true,
        draggable: true,
        swipe: true,
        touchThreshold: 5,
        touchMove: true,
        centerMode: true, 
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                }
            }
        ],
    });
});

function getSecondSlider() {
        if(window.innerWidth < 767) {
            $(document).ready(function() {
                $('.second__container').slick({
                    arrows: false,
                    dots: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 1000,
                    easing: 'easy',
                    infinite: true,
                    initialSlide: 0,
                    autoplay: true,
                    autoplaySpeed: 1000,
                    pauseOnFocus: true,
                    pauseOnHover: true,
                    pauseOnDotsHover: true,
                    draggable: true,
                    swipe: true,
                    touchThreshold: 5,
                    touchMove: false,
                    centerMode: false,
                });
            });
        } else {
            return false
        }
}
getSecondSlider()

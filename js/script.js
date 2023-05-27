const menu = document.querySelector('.menu__body')
const menuBtn = document.querySelector('.menu__icon')

const body = document.body;

if (menu && menuBtn) {
	menuBtn.addEventListener('click', e => {
		menu.classList.toggle('active')
		menuBtn.classList.toggle('active')
		body.classList.toggle('lock')
	})

/* при переходе по ссылкам из бургер меню оно скрывается */

    menu.querySelectorAll('.menu__link').forEach(link => {
      link.addEventListener('click', () => {
          menu.classList.remove('active')
          menuBtn.classList.remove('active')
          body.classList.remove('lock')
      })
    })
}

/* плавный скролл по ссылкам */

/* const anchors = document.querySelectorAll('a[href*="#"]');

anchors.forEach(anchor => {
	anchor.addEventListener('click', event => {
		event.preventDefault();

		const blockID = anchor.getAttribute('href').substring(1);

		document.getElementById(blockID).scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		})
	})
}) */


/* -----------СЛАЙДЕР-----------*/

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isAutoPlay = true, startX, startScrollLeft, timeoutId;


// Получим количество карт, которые могут поместиться в карусель одновременно
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Вставим копии последних карт в начало карусели для бесконечной прокрутки
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Вставим копии первых нескольких карт в конец карусели для бесконечной прокрутки
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Добавим слушатель событий для кнопок со стрелками для прокрутки карусели слева и справа
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});



const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    // Если карусель находится в начале, скролл до конца
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    // Если карусель в конце, скролл до начала
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    // Очистить существующий тайм-аут и запустить, если мышь не зависает над каруселью
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}



const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; 
    // Автоматическое воспроизведение карусели после каждых 2500 мс
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();


carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);
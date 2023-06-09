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

/* -----------/СЛАЙДЕР-----------*/

/* -----------Accordion-----------*/

const titles = document.querySelectorAll('.accordion__title');
const contents = document.querySelectorAll('.accordion__content');

    titles.forEach(item => item.addEventListener('click', () => {
        const activeContent = document.querySelector('#' + item.dataset.tab);

        if (activeContent.classList.contains('active')) {
            activeContent.classList.remove('active');
            item.classList.remove('active');
            activeContent.style.maxHeight = 0;
        } else {
            contents.forEach(element => {
                element.classList.remove('active');
                element.style.maxHeight = 0;
            });

            titles.forEach(element => element.classList.remove('active'));

            item.classList.add('active');
            activeContent.classList.add('active');
            activeContent.style.maxHeight = activeContent.scrollHeight + 'px';
        }
    }))

/* -----------/Accordion-----------*/

/* ------------Gallery-----------*/

const filterContainer = document.querySelector(".gallery-filter");
const galleryItems = document.querySelectorAll(".gallery-item");

filterContainer.addEventListener("click", (event) =>{
   if(event.target.classList.contains("filter-item")){

     // deactivate existing active 'filter-item'
    filterContainer.querySelector(".active").classList.remove("active");

     // activate new 'filter-item'
    event.target.classList.add("active");

    const filterValue = event.target.getAttribute("data-filter");

    galleryItems.forEach((item) =>{

       if(item.classList.contains(filterValue) || filterValue === 'all'){
        item.classList.remove("hide");
         item.classList.add("show");
       }

       else{
        item.classList.remove("show");
        item.classList.add("hide");
       }

     });
   }
 });

 /* -----------/Gallery-----------*/

/*----------загрузка файлов (форма обратной связи)------- */

 let inputs = document.querySelectorAll('.input__file');
  Array.prototype.forEach.call(inputs, function (input) {
    let label = input.nextElementSibling,
      labelVal = label.querySelector('.input__file-button-text').innerText;

    input.addEventListener('change', function (e) {
      let countFiles = '';
      if (this.files && this.files.length >= 1)
        countFiles = this.files.length;

      if (countFiles)
        label.querySelector('.input__file-button-text').innerText = 'Выбрано файлов: ' + countFiles;
      else
        label.querySelector('.input__file-button-text').innerText = labelVal;
    });
  });

/*---------/загрузка файлов------- */

/*---------выбор одного checkbox------- */

inputs=document.getElementsByTagName("input");
for(var i=0;i<inputs.length;i++)
	{
	if(inputs[i].type=="checkbox")
		{
		inputs[i].onchange=function()
			{
			inputs=document.getElementsByTagName("input");
			for(var i=0;i<inputs.length;i++)
				{
				if(inputs[i].type=="checkbox")
					{
					inputs[i].checked=false;
					}
					this.checked=true;
				}
			}
		}
	}

/*---------/выбор одного checkbox------- */
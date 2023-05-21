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

const anchors = document.querySelectorAll('a[href*="#"]');

anchors.forEach(anchor => {
	anchor.addEventListener('click', event => {
		event.preventDefault();

		const blockID = anchor.getAttribute('href').substring(1);

		document.getElementById(blockID).scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		})
	})
})
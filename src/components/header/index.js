import './header.scss';

class Header {
  constructor(selector) {
    this.$el = selector;
    this.$burger = this.$el.querySelector('.header__burger');

    this.setup();
  }

  setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener('click', this.clickHandler);
  }

  clickHandler(event) {
    if (event.target.closest('.header__burger') === this.$burger) {
      this.toggle();
    }
  }

  toggle() {
    const burgerClasses = [
      'header__menu',
      'header__button-login',
      'header__button-register',
      'header__space-beetween',
      'header__user',
    ];

    burgerClasses.forEach((element) => {
      if (this.$el.querySelector(`.${element}`)) {
        this.$el
          .querySelector(`.${element}`)
          .classList.toggle(`${element}--burger`);
      }
    });
    this.$burger.nextElementSibling.classList.toggle('navigation--burger');
    const headerNav = this.$el.querySelector('.header__navigation');
    console.log(headerNav)
    headerNav.classList.toggle('header__navigation--burger-open');
    if (this.$burger.children[0].innerHTML === 'menu') {
      this.$burger.children[0].innerHTML = 'close';
    } else {
      this.$burger.children[0].innerHTML = 'menu';
    }
  }
}

const header = document.querySelectorAll('.header-js');
header.forEach((selector) => new Header(selector));

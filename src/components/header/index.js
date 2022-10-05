import './header.scss';

class Header {
  constructor(selector) {
    this.$domElement = selector;
    this.$burger = this.$domElement.querySelector('.header__burger');

    this.setup();
  }

  setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$domElement.addEventListener('click', this.clickHandler);
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
      'header__user'];

    burgerClasses.forEach((element) => {
      if (this.$domElement.querySelector(`.${element}`)) {
        this.$domElement.querySelector(`.${element}`).classList.toggle(`${element}--burger`);
      }
    });
    this.$burger.nextElementSibling.classList.toggle('navigation--burger');
    const headerNav = this.$domElement.children[1].children[0];
    headerNav.classList.toggle('header__navigation--burger-open');
    if(this.$burger.children[0].innerHTML === 'menu'){
      this.$burger.children[0].innerHTML = 'close'
    } else {
      this.$burger.children[0].innerHTML = 'menu'
    }
  }

}

const header = document.querySelectorAll('.header-js');
header.forEach((selector) => new Header(selector));

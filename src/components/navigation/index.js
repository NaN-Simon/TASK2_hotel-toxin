import './navigation.scss';

class Navigation {
  constructor(selector) {
    this.$el = document.querySelector(selector);

    this.setup();
  }

  setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener('click', this.clickHandler);
  }

  clickHandler(event) {
    this.toggleSubMenu(event);
  }

  toggleSubMenu(event) {
    const targetClasses = event.target.closest('.navigation__item').className.split(' ');

    if (targetClasses.indexOf('navigation__item-has-dropdown') !== -1) {
      const navItem = event.target.closest('.navigation__item').children[2];

      this.toggle(navItem);
    }
  }

  open(element) {
    element.classList.add('navigation__subItems--open');
    element
      .closest('.navigation__item')
      .querySelector('.navigation__item-arrow')
      .innerHTML = 'expand_less';
  }

  close(element) {
    element.classList.remove('navigation__subItems--open');
    element
      .closest('.navigation__item')
      .querySelector('.navigation__item-arrow')
      .innerHTML = 'expand_more';
  }

  toggle(element) {
    if (element.classList.contains('navigation__subItems--open')) {
      this.close(element);
    } else {
      this.open(element);
    }
  }
}

const navigation = document.querySelectorAll('.navigation');
navigation.forEach((elem) => {
  new Navigation(`#${elem.id}`);
});

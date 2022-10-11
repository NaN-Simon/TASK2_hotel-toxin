import './checkbox-list.scss';

class CheckboxList {
  constructor(selector) {
    this.$el = selector;
    [, this.$arrow] = this.$el.children[0].children;

    this.#setup();
  }

  #setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener('click', this.clickHandler);
  }

  clickHandler(event) {
    const { type } = (event.target.dataset);

    if (type === 'input') {
      this.toggle();
    }
  }

  get isOpen() {
    return this.$el.classList.contains('checkbox-list__open');
  }

  open() {
    this.$el.classList.add('checkbox-list__open');
    this.$arrow.innerHTML = 'expand_more';
  }

  close() {
    this.$el.classList.remove('checkbox-list__open');
    this.$arrow.innerHTML = 'expand_less';
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
}

const checkboxDropdownList = document.querySelectorAll('.checkbox-list-js');
checkboxDropdownList.forEach((selector) => new CheckboxList(selector));

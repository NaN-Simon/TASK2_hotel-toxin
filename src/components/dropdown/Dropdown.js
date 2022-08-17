class Dropdown {
  constructor(selector) {
    this.$el = document.querySelector(selector);
    this.$input = this.$el.children[0];
    this.$placeholder = this.$el.children[0].children[0];
    this.placeholderDefault = this.$placeholder.innerHTML;
    this.$arrow = this.$el.children[0].children[1];
    this.$drop = this.$el.children[1];
    this.startValuesObj = this.startValues();
    this.startCountsLength = Object.keys(this.startValues()).length;

    this.#setup();
    this.placeholderRender();
  }

  #setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener('click', this.clickHandler);
  }

  startValues() {
    const arr = Array.from(this.$drop.children);
    const templateObj = {};

    arr.forEach((elem, index) => {
      templateObj[`${elem.id}`] = {
        id: elem.id,
        title: this.$drop.children[index].children[0].innerHTML,
        value: Number(this.$drop.children[index].children[1].children[1].innerHTML),
        maxCount: parseInt(elem.getAttribute('maxcount'), 10),
      };
    });
    return templateObj;
  }

  clickHandler(event) {
    const { type } = (event.target.dataset);

    if (type === 'input') {
      this.toggle();
    }

    this.counter(event);
    // this.placeholderRender(event)
  }

  counter(event) {
    if (event.target.hasAttribute('id')) {
      const targetCountHTML = event.target.parentNode.children[1];
      const targetStartValuesObj = this.startValuesObj[`${event.target.id}`];
      if (event.target.classList[0] === 'dropdown__drop-counter-plus') {
        if (parseInt(targetCountHTML.innerHTML, 10) !== targetStartValuesObj.maxCount) {
          targetStartValuesObj.value++;
          targetCountHTML.innerHTML = targetStartValuesObj.value;
        }
      }
      if (event.target.classList[0] === 'dropdown__drop-counter-minus') {
        if (parseInt(targetCountHTML.innerHTML, 10) !== 0) {
          targetStartValuesObj.value--;
          targetCountHTML.innerHTML = targetStartValuesObj.value;
        }
      }

      this.placeholderRender();
    }
  }

  placeholderRender() {
    // const inputLength = this.$input.offsetWidth;
    // const placeholderLength = '';
    const skin = [];

    Object.keys(this.startValuesObj).forEach((item) => {
      if (this.startValuesObj[item].value !== 0) {
        skin.push(`${this.startValuesObj[item].title} ${this.startValuesObj[item].value}`);
      }
    });

    if (skin.length === 0) {
      skin[0] = this.placeholderDefault;
    }

    this.$placeholder.innerHTML = skin.join(', ');
  }

  get isOpen() {
    return this.$drop.classList.contains('dropdown__open');
  }

  open() {
    this.$drop.classList.add('dropdown__open');
    this.$arrow.innerHTML = 'expand_more';
  }

  close() {
    this.$drop.classList.remove('dropdown__open');
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

export default Dropdown;

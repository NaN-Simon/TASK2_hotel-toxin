class Dropdown {
  constructor(selector) {
    this.$el = document.querySelector(selector);
    [this.$input, this.$drop] = this.$el.children;
    [this.$placeholder, this.$arrow] = this.$el.children[0].children;
    this.placeholderDefault = this.$placeholder.innerHTML;
    this.startValuesObj = this.startValues();

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
        maxCount: parseInt(elem.dataset.maxcount, 10),
      };
    });
    return templateObj;
  }

  clickHandler(event) {
    const { type } = (event.target.dataset);

    if (type === 'input') {
      this.toggle();
    }

    this.dropItemRender(event);
    this.placeholderRender();
  }

  dropItemRender(event) {
    const targetCounTitle = event.target.parentNode.parentNode.children[0];
    const targetCountHTML = event.target.parentNode.children[1];
    const targetStartValuesObj = this.startValuesObj[`${event.target.id}`];

    if (event.target.hasAttribute('id')) {
      if (event.target.classList[0] === 'dropdown__drop-counter-plus') {
        if (parseInt(targetCountHTML.innerHTML, 10) !== targetStartValuesObj.maxCount) {
          targetStartValuesObj.value++;
          targetCountHTML.innerHTML = targetStartValuesObj.value;
          targetCounTitle.innerHTML = this.getPluralRelativelyAmount(event, parseInt(targetCountHTML.innerHTML, 10));
        }
      }

      if (event.target.classList[0] === 'dropdown__drop-counter-minus') {
        if (parseInt(targetCountHTML.innerHTML, 10) !== 0) {
          targetStartValuesObj.value--;
          targetCountHTML.innerHTML = targetStartValuesObj.value;
          targetCounTitle.innerHTML = this.getPluralRelativelyAmount(event, parseInt(targetCountHTML.innerHTML, 10));
        }
      }
    }
  }

  placeholderRender() {
    const inputLength = this.$input.offsetWidth;
    let temp = [];
    
    Object.values(this.$drop.children).forEach((item) => {
      const itemAmount = this.startValuesObj[item.id].value;
      const itemInner = item.children[0].innerHTML;

      if (itemAmount !== 0) {
        temp.push(`${itemAmount} ${itemInner}`);
      }
    });
    
    if (temp.join(', ').length > inputLength / 10) {
      temp.pop();
      temp = temp.join(', ');
      temp += '...';
    } else {
      temp = temp.join(', ');
    }
    
    this.$placeholder.innerHTML = temp;
  }

  getPluralRelativelyAmount(event, num) {
    const pluralOne = this.pluralCycle(1, 100);
    const pluralTwoFromFour = this.pluralCycle(2, 100)
      .concat(
        this.pluralCycle(3, 100),
        this.pluralCycle(4, 100),
      );
    const [singlePluralForm, secondPluralForm, thirdPluralForm] = event
      .target
      .parentNode
      .parentNode
      .dataset
      .plurals
      .substring(1)
      .replace(/.$/, '')
      .replace(/"/g, '')
      .split(',');
    let titleForRender = this.placeholderDefault;

    if (pluralOne.includes(num)) {
      titleForRender = singlePluralForm;
    } else if (pluralTwoFromFour.includes(num)) {
      titleForRender = secondPluralForm;
    } else {
      titleForRender = thirdPluralForm;
    }
    return titleForRender;
  }

  pluralCycle(start, size) {
    this.temp = [];
    for (let i = start; i < size; i += 10) {
      this.temp.push(i);
    }
    return this.temp;
  }

  get isOpen() {
    return this.$input.classList.contains('dropdown__open');
  }

  open() {
    this.$input.classList.add('dropdown__open');
    this.$arrow.innerHTML = 'expand_more';
  }

  close() {
    this.$input.classList.remove('dropdown__open');
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

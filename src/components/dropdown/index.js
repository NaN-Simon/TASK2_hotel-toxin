import './dropdown.scss';

class Dropdown {
  constructor(selector) {
    [this.$el] = document.querySelector(selector).children;
    [this.$input, this.$drop] = this.$el.children;
    this.$listItems = this.$drop.children[0].children;
    [this.$placeholder, this.$arrow] = this.$el.children[0].children;
    this.placeholderDefault = this.$placeholder.innerHTML;

    const { properties } = document.querySelector(selector).dataset;
    this.properties = JSON.parse(properties);

    this.dataArray = this.startValues();
    this.#setup();
  }

  #setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener('click', this.clickHandler);
    this.placeholderRender();
    this.dropFirstLoad();
  }

  startValues() {
    const arr = Array.from(this.$listItems);
    const placeholderArraylateObj = {};

    arr.forEach((elem, index) => {
      const distValue = this.properties.elements[index].startCount;
      placeholderArraylateObj[elem.id] = {
        id: this.properties.id,
        value: distValue,
        title: this.renderTitlePlural(distValue, elem.dataset.plurals.split(',')),
        maxCount: this.properties.maxCount,
        plurals: this.properties.plurals[elem.id].split(','),
      };
    });
    return placeholderArraylateObj;
  }

  clickHandler(event) {
    const { type } = (event.target.dataset);
    
    if (type === 'input') {
      this.toggle();
    }
    
    if (this.properties.hasButtons && type === 'button') {
      this.buttonsEvents(event);
    }
    
    if (type === 'plus' || type === 'minus') {
      this.dropItemRender(event);
    }
    if (type === 'plus' || type === 'minus' || type === 'button') {
      this.displayButtonToClear(event);
    }

    this.placeholderRender(event);
  }

  displayButtonToClear(event) {
    const buttonsDiv = this.$el.querySelector('.dropdown__drop-buttons');

    if (buttonsDiv !== null) {
      const clearButton = this.$el.querySelector('.dropdown__drop-buttons-clear');
      const acceptButton = this.$el.querySelector('.dropdown__drop-buttons-accept');
      const array = Object.values(this.dataArray);
      const { totalItems } = array.reduce(
        (previousValue, currentValue) => {
          const { value } = currentValue;
          previousValue.totalItems += value;
          return previousValue;
        },
        {
          totalItems: 0,
        },
        );
        if (totalItems !== 0) {
        console.log(event.target)
        buttonsDiv.classList.remove('dropdown__drop-buttons--right');
        clearButton.classList.remove('dropdown__drop-buttons-clear--hide');
      } else {
        buttonsDiv.classList.add('dropdown__drop-buttons--right');
        clearButton.classList.add('dropdown__drop-buttons-clear--hide');
      }
      if (event.target === acceptButton) {
        this.toggle();
      }
    }
  }

  buttonsEvents(event) {
    const clearButton = this.$el.querySelector('.dropdown__drop-buttons-clear');
    if (event.target === clearButton) {
      Object.values(this.dataArray).forEach((elem) => {
        elem.value = 0;
      });
      this.dropFirstLoad();
    }
  }

  dropFirstLoad() {
    Object.values(this.$listItems).forEach((item) => {
      item.children[0].innerHTML = this.renderTitlePlural(this.dataArray[item.id].value, item.dataset.plurals.split(','));
      if (this.dataArray[item.id].value === 0) {
        this.$listItems[item.id].children[1].children[1].innerHTML = 0;
        this.$listItems[item.id].children[1].children[0].classList.add('dropdown__drop-counter-not-available');
      }
      if (this.dataArray[item.id].value === this.dataArray[item.id].maxCount) {
        this.$listItems[item.id].children[1].children[2].classList.add('dropdown__drop-counter-not-available');
      }
    });
  }

  dropItemRender(event) {
    const eventTarget = event.target;
    const targetItem = eventTarget.closest('.dropdown__drop-item');
    const targetTitle = targetItem.querySelector('.dropdown__drop-name');
    const targetMinus = targetItem.querySelector('.dropdown__drop-counter-minus');
    const targetPlus = targetItem.querySelector('.dropdown__drop-counter-plus');
    const targetResult = targetItem.querySelector('.dropdown__drop-counter-result');
    const targetID = targetItem.id;
    const targetMaxCount = this.dataArray[targetID].maxCount;
    const targetPlurals = this.dataArray[targetID].plurals;
    let dataArrayTitle = this.dataArray[targetID].title;

    /* dropdownChanger */
    if (eventTarget === targetPlus && this.dataArray[targetID].value !== targetMaxCount) {
      this.dataArray[targetID].value++;
      if (this.dataArray[targetID].value === targetMaxCount) {
        targetPlus.classList.add('dropdown__drop-counter-not-available');
      } else {
        targetMinus.classList.remove('dropdown__drop-counter-not-available');
      }
    } else if (eventTarget === targetMinus && this.dataArray[targetID].value !== 0) {
      this.dataArray[targetID].value--;
      if (this.dataArray[targetID].value === 0) {
        targetMinus.classList.add('dropdown__drop-counter-not-available');
      } else {
        targetPlus.classList.remove('dropdown__drop-counter-not-available');
      }
    }

    targetResult.innerHTML = this.dataArray[targetID].value;
    dataArrayTitle = this.renderTitlePlural(this.dataArray[targetID].value, targetPlurals);
    targetTitle.innerHTML = dataArrayTitle;
  }

  placeholderRender() {
    if (this.$el.dataset.type === 'guests') {
      const inputLength = this.$input.offsetWidth;
      let placeholderArray = [];

      Object.values(this.$listItems).forEach((item) => {
        const currentItem = this.dataArray[item.id];
        const currentValue = this.dataArray[item.id].value;
        const currentPluralsArray = this.dataArray[item.id].plurals;
        const pluralValue = this.renderTitlePlural(currentValue, currentPluralsArray);

        if (currentItem.value !== 0) {
          placeholderArray.push(`${currentItem.value} ${pluralValue}`);
        }
      });

      if (placeholderArray.join(', ').length > inputLength / 10) {
        placeholderArray.pop();
        placeholderArray = placeholderArray.join(', ');
        placeholderArray += '...';
      } else {
        placeholderArray = placeholderArray.join(', ');
      }

      if (placeholderArray.length === 0) {
        placeholderArray = this.placeholderDefault;
      }
      this.$placeholder.innerHTML = placeholderArray;
    } else {
      let placeholderSum = 0;
      let placeholderInner = '';
      Object.values(this.$listItems).forEach((item) => {
        placeholderSum += this.dataArray[item.id].value;
      });
      if (placeholderSum === 1) {
        placeholderInner = 'Гость';
      } else if (placeholderSum > 1 && placeholderSum < 5) {
        placeholderInner = 'Гостя';
      } else {
        placeholderInner = 'Гостей';
      }
      this.$placeholder.innerHTML = `${placeholderSum} ${placeholderInner}`;
      if (placeholderSum === 0) {
        this.$placeholder.innerHTML = 'Сколько гостей';
      }
    }
  }

  renderTitlePlural(value, pluralsArray) {
    let max = 0;
    Object.values(this.$listItems).forEach((item) => {
      if (item.dataset.maxcount > max) {
        max = item.dataset.maxcount;
      }
    });
    const [singlePluralForm, secondPluralForm, thirdPluralForm] = pluralsArray;
    const pluralOne = this.pluralCycle(1, max);
    delete pluralOne[1];
    const pluralTwoFromFour = this.pluralCycle(2, max)
      .concat(
        this.pluralCycle(3, max),
        this.pluralCycle(4, max),
      );
    delete pluralTwoFromFour[1];
    delete pluralTwoFromFour[6];
    delete pluralTwoFromFour[11];

    let pluralResult = '';

    if (pluralOne.includes(value)) {
      pluralResult = singlePluralForm;
    } else if (pluralTwoFromFour.includes(value)) {
      pluralResult = secondPluralForm;
    } else {
      pluralResult = thirdPluralForm;
    }
    return pluralResult;
  }

  pluralCycle(start, size) {
    this.temp = [];
    for (let i = start; i < size; i += 10) {
      this.temp.push(i);
    }
    return this.temp;
  }

  get isOpen() {
    return this.$el.classList.contains('dropdown__open');
  }

  open() {
    this.$el.classList.add('dropdown__open');
    this.$arrow.innerHTML = 'expand_more';
  }

  close() {
    this.$el.classList.remove('dropdown__open');
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

const dropdown = document.querySelectorAll('.indexjs-dropdown');
dropdown.forEach((elem) => {
  new Dropdown(`#${elem.id}`);
});

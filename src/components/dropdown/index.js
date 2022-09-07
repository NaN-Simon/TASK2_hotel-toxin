import './dropdown.scss';

class Dropdown {
  constructor(selector) {
    this.$el = document.querySelector(selector).children[0];
    [this.$input, this.$drop] = this.$el.children;
    [this.$placeholder, this.$arrow] = this.$el.children[0].children;
    this.placeholderDefault = this.$placeholder.innerHTML;
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
    const arr = Array.from(this.$drop.children);
    const placeholderArraylateObj = {};

    arr.forEach((elem, index) => {
      const distValue = Number(this.$drop.children[index].children[1].children[1].innerHTML);
      placeholderArraylateObj[`${elem.id}`] = {
        id: elem.id,
        value: distValue,
        title: this.renderTitlePlural(distValue, elem.dataset.plurals.split(',')),
        maxCount: parseInt(elem.dataset.maxcount, 10),
        plurals: elem.dataset.plurals.split(','),
      };
    });
    return placeholderArraylateObj;
  }

  clickHandler(event) {
    const { type } = (event.target.dataset);

    if (type === 'input') {
      this.toggle();
    }

    this.dropItemRender(event);
    this.placeholderRender(event);
  }

  dropFirstLoad() {
    Object.values(this.$drop.children).forEach((item) => {
      item.children[0].innerHTML = this.renderTitlePlural(this.dataArray[item.id].value, item.dataset.plurals.split(','));
      if (this.dataArray[item.id].value === 0) {
        this.$drop.children[item.id].children[1].children[0].classList.add('dropdown__drop-counter-not-available');
      }
      if (this.dataArray[item.id].value === this.dataArray[item.id].maxCount) {
        this.$drop.children[item.id].children[1].children[2].classList.add('dropdown__drop-counter-not-available');
      }
    });
  }

  dropItemRender(event) {
    if (event.target.hasAttribute('id')) {
      const targetCounTitle = event.target.parentNode.parentNode.children[0];
      const [targetCountMinus, targetCountResult, targetCountPlus] = event.target.parentNode.children;
      const targetStartValuesObj = this.dataArray[`${event.target.id}`];
      const targetStartPlurals = this.dataArray[event.target.id].plurals;
      
      if (event.target.classList[0] === 'dropdown__drop-counter-plus') {
        if (Number(targetCountResult.innerHTML) !== targetStartValuesObj.maxCount) {
          targetStartValuesObj.value++;
          targetStartValuesObj.title = this.renderTitlePlural(targetStartValuesObj.value, targetStartPlurals);
          targetCountResult.innerHTML = targetStartValuesObj.value;
          targetCounTitle.innerHTML = targetStartValuesObj.title;
        }
        
        if (Number(targetCountResult.innerHTML) !== 0) {
          targetCountMinus.classList.remove('dropdown__drop-counter-not-available');
        }
        if (Number(targetCountResult.innerHTML) === targetStartValuesObj.maxCount) {
          targetCountPlus.classList.add('dropdown__drop-counter-not-available');
        }
      }

      if (event.target.classList[0] === 'dropdown__drop-counter-minus') {
        if (Number(targetCountResult.innerHTML) !== 0) {
          targetStartValuesObj.value--;
          targetStartValuesObj.title = this.renderTitlePlural(targetStartValuesObj.value, targetStartPlurals);
          targetCountResult.innerHTML = targetStartValuesObj.value;
          targetCounTitle.innerHTML = targetStartValuesObj.title;
        }

        if (Number(targetCountResult.innerHTML) === 0) {
          targetCountMinus.classList.add('dropdown__drop-counter-not-available');
        }
        if (Number(targetCountResult.innerHTML) !== targetStartValuesObj.maxCount) {
          targetCountPlus.classList.remove('dropdown__drop-counter-not-available');
        }
      }
    }
  }

  placeholderRender() {
    if (this.$el.dataset.type === 'guests') {
      const inputLength = this.$input.offsetWidth;
      let placeholderArray = [];
    
      Object.values(this.$drop.children).forEach((item) => {
        const itemAmount = this.dataArray[item.id].value;
        const itemInner = this.dataArray[item.id].title;

        if (itemAmount !== 0) {
          placeholderArray.push(`${itemAmount} ${itemInner}`);
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
      Object.values(this.$drop.children).forEach((item) => {
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
        this.$placeholder.innerHTML = 'Сколько гостей'
      }
    }
  }

  renderTitlePlural(value, pluralsArray) {
    let max = 0;
    Object.values(this.$drop.children).forEach((item) => {
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

// const dropdown = new Dropdown('.indexjs-dropdown');

// window.dropdown = dropdown;

const dropdown = document.querySelectorAll('.indexjs-dropdown');
dropdown.forEach((elem) => {
  new Dropdown(`#${elem.id}`);
});
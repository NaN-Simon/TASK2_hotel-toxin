import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import './date-dropdown.scss';

class DateDropdown {
  constructor(selector) {
    this.$el = document.querySelector(selector);
    this.$start = this.$el.querySelector('.date-dropdown__start').querySelector('.text-field__input');
    this.$end = this.$el.querySelector('.date-dropdown__end').querySelector('.text-field__input');
    this.datepickerStart = new AirDatepicker(this.$start, {
      container: this.$el,
      // inline: true,
    });
    this.datepickerEnd = new AirDatepicker(this.$end, {
      // inline: true,
      container: this.$el,
    });
    [this.$datepickeInputs, this.$datepickerWrap] = this.$el.children;
    this.#setup();
  }

  #setup() {
    // this.clickHandler = this.clickHandler.bind(this);
    // this.$el.addEventListener('click', this.clickHandler);
  }

  clickHandler(event) {
    const { type } = (event.target.dataset);

    if (type === 'input') {
      this.toggle();
    }
    this.trackEvent(event);
  }

  trackEvent(event) {
    console.log(this.datepicker.lastSelectedDate);
  }

  get isOpen() {
    return this.$el.contains(this.$datepickerWrap);
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.$el.appendChild(this.$datepickerWrap);
  }

  close() {
    this.$el.removeChild(this.$datepickerWrap);
  }
}

const datedropdown = new DateDropdown('#text-field-datepicker');
const datedropdownTest = new DateDropdown('#text-field-test');
window.datedropdown = datedropdown;



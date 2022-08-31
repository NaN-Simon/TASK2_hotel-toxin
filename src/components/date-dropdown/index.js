import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import './date-dropdown.scss';

const propertiesDefault = {
  navTitles: {
    days: 'MMMM <i>yyyy</i>',
    months: 'yyyy',
    years: 'yyyy1 - yyyy2',
  },
  prevHtml: '<span class="air-datepicker-nav--action-arrow material-icons">arrow_back</span>',
  nextHtml: '<span class="air-datepicker-nav--action-arrow material-icons">arrow_forward</span>',
  buttons: ['clear',
    {
      content: 'Применить',
      onClick: (dp) => dp.hide(),
    },
  ],

};

class DateDropdown {
  constructor(selector) {
    this.$el = document.querySelector(selector);
    const { properties } = this.$el.dataset;
    this.properties = JSON.parse(properties);

    this.$start = this.$el.querySelector('.date-dropdown__start .text-field__input');
    this.datepickerStart = new AirDatepicker(this.$start, {

      container: this.$el,
      ...propertiesDefault,
      dateFormat: this.properties.dateFormat,
      startDate: this.properties.startDate,
    });

    if (this.properties.hasTwoInputs) {
      this.$end = this.$el.querySelector('.date-dropdown__end .text-field__input');
      this.datepickerEnd = new AirDatepicker(this.$end, {

        container: this.$el,
        ...propertiesDefault,
        dateFormat: this.properties.dateFormat,
        startDate: this.properties.endDate,

      });
    }
  }
}

const datedropdown = document.querySelectorAll('.indexjs-date-dropdown');
datedropdown.forEach((elem) => {
  new DateDropdown(`#${elem.id}`);
});

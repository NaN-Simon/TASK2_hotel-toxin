import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import './filter-date-dropdown.scss';

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

class FilterDateDropdown {
  constructor(selector) {
    this.$el = document.querySelector(selector);
    const { properties } = this.$el.dataset;
    this.properties = JSON.parse(properties);

    this.setup();
  }

  setup() {
    this.$start = this.$el.querySelector('.text-field__input');
    this.$arrowStart = this.$start.nextSibling;
    [this.$arrowStartIcon] = this.$arrowStart.children;
    this.datepickerStart = new AirDatepicker(this.$start, {
  
      container: this.$el.children[1],
      ...propertiesDefault,
      dateFormat: this.properties.dateFormat,
      startDate: this.properties.startDate,
      onShow: () => this.$arrowStartIcon.innerHTML = 'expand_less',
      onHide: () => this.$arrowStartIcon.innerHTML = 'expand_more',
      range: true,
      multipleDatesSeparator: this.properties.datesSeparator,
    });
  }
}

const filterDatedropdown = document.querySelectorAll('.indexjs-filter-date-dropdown');
filterDatedropdown.forEach((elem) => {
  new FilterDateDropdown(`#${elem.id}`);
});

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
    this.$el = selector;
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
      onShow: () => this.$arrowStartIcon.innerHTML = 'expand_more',
      onHide: () => this.$arrowStartIcon.innerHTML = 'expand_less',
      inline: this.isOpenCheck(),
      selectedDates: this.properties.selectedDates,
      range: true,
      multipleDatesSeparator: this.properties.datesSeparator,
    });

    if (this.properties.isHideInput) {
      this.$el.querySelector('.heading').display = 'none';
      this.$el.querySelector('.heading').style.margin = '0px';
      this.$el.querySelector('.air-datepicker').style.margin = '0px';
      this.$start.style.display = 'none';
    }
  }

  isOpenCheck() {
    if (this.properties.isOpen) {
      return true;
    }
    return false;
  }
}

const filterDatedropdown = document.querySelectorAll('.filter-date-dropdown');
filterDatedropdown.forEach((selector) => {new FilterDateDropdown(selector)});

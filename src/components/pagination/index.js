import 'paginationjs/dist/pagination';
import 'paginationjs/dist/pagination.css';
import './pagination.scss';

class Pagination {
  constructor(selector) {
    this.$el = selector;
    this.$root = $(this.$el);

    const { properties } = this.$el.dataset;
    this.properties = JSON.parse(properties);

    this.setup();
  }

  setup() {
    const myDataSource = [];
    for (let i = 0; i < this.properties.entries; i++) {
      myDataSource.push(i);
    }
    const params = {
      dataSource: myDataSource,
      pageSize: 12,
      autoHidePrevious: true,
      autoHideNext: true,
      showNavigator: true,
      showPrevious: false,
      pageRange: 1,
      formatNavigator: this.setFormatNavigator,
      nextText: '<span class="material-icons">arrow_forward</span>',
    };
    this.totalNumber = this.properties.entries;
    this.$root.pagination(params);
  }

  setFormatNavigator(currentPage) {
    const endPage = currentPage * 12;

    let startPage = currentPage;
    currentPage > 1 ? startPage = endPage / 2 : false;

    let countEntries = this.totalNumber;
    this.totalNumber >= 100 ? countEntries = '100+' : false;

    return `
    ${startPage} - ${endPage} из 
    ${countEntries} вариантов аренды`;
  }
}

const pagination = document.querySelectorAll('.pagination');
pagination.forEach((selector) => {new Pagination(selector)});

import './pagination.scss';

import 'paginationjs/dist/pagination';
import 'paginationjs/dist/pagination.css';

class Pagination {
  constructor(selector) {
    this.$el = document.querySelector(selector);
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
      pageRange: 1,
      formatNavigator: this.setFormatNavigator,
    };

    this.$root.pagination(params);
  }

  setFormatNavigator(currentPage, totalNumber) {
    const endPage = currentPage * 12;

    let startPage = currentPage;
    currentPage > 1 ? startPage = endPage / 2 : false;

    let countEntries = totalNumber;
    totalNumber >= 100 ? countEntries = '100+' : false;

    return `
    ${startPage} - ${endPage} из 
    ${countEntries} вариантов аренды`;
  }
}

const pagination = new Pagination('#pagination');

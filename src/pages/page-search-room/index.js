class SearchRoom {
  constructor(selector) {
    this.$el = selector;
    this.$filterBtn = this.$el.querySelector('.search-room__filters-button');
    this.$filterContainer = this.$el.querySelector('.search-room__filters-container');
    this.$cardList = this.$el.querySelector('.search-room__room-cards-list');
    this.$pagination = this.$el.querySelector('.search-room__room-cards-pagination');
    this.$footer = document.querySelector('.footer');

    this.setup();
  }

  setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$filterBtn.addEventListener('click', this.clickHandler);
    window.addEventListener('resize', (event) => {
      this.remove()
  });
  }

  asd(){
    console.log('asd')
  }
  clickHandler() {
    this.toggle();
  }

  get isOpen() {
    return this.$filterContainer.classList.contains('search-room__filters-container--open');
  }

  toggle() {
    if (this.isOpen) {
      this.remove();
    } else {
      this.open();
    }
  }

  open() {
    this.$filterContainer.classList.add('search-room__filters-container--open');
    this.$cardList.style.display = 'none';
    this.$pagination.style.display = 'none';
    this.$footer.style.display = 'none';
  }

  remove() {
    this.$filterContainer.classList.remove('search-room__filters-container--open');
    this.$cardList.style.display = 'flex';
    this.$pagination.style.display = 'block';
    this.$footer.style.display = 'block';
  }
}

const searchRoom = document.querySelectorAll('.search-room-js');
searchRoom.forEach((selector) => new SearchRoom(selector));

import './like-button.scss';

class LikeButton {
  constructor(selector) {
    this.$el = selector;
    this.$input = this.$el.querySelector('.like-button__input');
    this.$title = this.$el.querySelector('.like-button__title');

    const { properties } = this.$el.dataset;
    this.properties = JSON.parse(properties);
    this.setup();
  }

  setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener('click', this.clickHandler);
  }

  clickHandler() {
    if (this.properties.checked) {
      this.$title.classList.remove('like-button__title-blue');
      this.$title.innerHTML--;
      this.$input.removeAttribute('checked');
      this.$input.classList.remove('like-button__input-blue');
      this.properties.checked = '';
    } else {
      this.$title.classList.add('like-button__title-blue');
      this.$title.innerHTML++;
      this.$input.setAttribute('checked', 'checked');
      this.$input.classList.add('like-button__input-blue');
      this.properties.checked = 'checked';
    }
  }
}

const likebutton = document.querySelectorAll('.like-button-js');
likebutton.forEach((selector) => new LikeButton(selector));

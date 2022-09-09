import './like-button.scss';

class LikeButton {
  constructor(selector) {
    this.$el = document.querySelector(selector);

    this.setup();
  }

  setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener('click', this.clickHandler);
  }

  clickHandler(event) {
    if (this.$el.checked) {
      this.$el.nextSibling.classList.add('like-button__title-blue');
    } else {
      this.$el.nextSibling.classList.remove('like-button__title-blue');
    }
    this.changeValue();
  }

  changeValue() {
    const value = this.$el.nextSibling;

    if (this.$el.checked) {
      value.innerHTML++;
    } else {
      value.innerHTML--;
    }
  }
}

const likebutton = document.querySelectorAll('.like-button__item');
likebutton.forEach((elem) => {
  new LikeButton(`#${elem.children[0].id}`);
});

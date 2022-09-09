import './rate-button.scss';

class RateButton {
  constructor(selector) {
    this.$el = document.querySelector(selector);
    this.$starArray = this.$el.querySelectorAll('.rate-button__star');

    this.setup();
  }

  setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener('click', this.clickHandler);
  }

  clickHandler(event) {
    const currentIndex = Array.from(this.$starArray).lastIndexOf(event.target);

    for (let i = 0; i < this.$starArray.length; i++) {
      this.$el.children[i].innerHTML = 'star_border';
    }
    for (let i = 0; i < currentIndex + 1; i++) {
      this.$el.children[i].innerHTML = 'star';
    }
  }
}

// const rateButton = new RateButton("#rate-button1")

const rateButton = document.querySelectorAll('.rate-button');
rateButton.forEach((elem) => {
  new RateButton(`#${elem.id}`);
});

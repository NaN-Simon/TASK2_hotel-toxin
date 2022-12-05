import './rate-button.scss';

class RateButton {
  constructor(selector) {
    this.$el = selector;
    this.$starArray = this.$el.querySelectorAll('.rate-button__star');

    const { properties } = this.$el.dataset;
    this.properties = JSON.parse(properties);

    this.setup();
  }

  setup() {
    this.clickHandler = this.clickHandler.bind(this);

    if (this.properties.changable) {
      this.$el.classList.add('rate-button--pointer');
      this.$el.addEventListener('click', this.clickHandler);
    }
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

const rateButton = document.querySelectorAll('.rate-button-js');
rateButton.forEach((selector) => new RateButton(selector));

import './range-slider.scss';

import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import * as wNumb from 'wnumb';

class RangeSlider {
  constructor(selector) {
    this.$domElement = selector;
    this.$el = this.$domElement;

    this.properties = JSON.parse(this.$el.dataset.properties);
    this.$headingDescription = this.$el.parentElement.querySelector('.heading__description');
    this.minSlider = this.properties.sliderMin;
    this.maxSlider = this.properties.sliderMax;
    this.startMin = this.properties.startMin;
    this.startMax = this.properties.startMax;

    this.setup();
  }

  setup() {
    noUiSlider.create(this.$el, {
      start: [this.startMin, this.properties.startMax],
      connect: true,
      range: {
        min: this.minSlider,
        max: this.maxSlider,
      },
      tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })],
    });
    this.$el.noUiSlider.on('update.one', () => {
      const [first, second] = (this.$el.noUiSlider.get());
      this.$headingDescription.innerHTML = `${Math.round(first)}₽ - ${Math.round(second)}₽ `;
    });
  }
}

const rangeslider = document.querySelectorAll('.range-slider-js');
rangeslider.forEach((selector) => { new RangeSlider(selector); });

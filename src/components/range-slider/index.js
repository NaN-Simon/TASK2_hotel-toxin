import './range-slider.scss';

require('webpack-jquery-ui');
require('webpack-jquery-ui/css');

class RangeSlider {
  constructor(selector) {
    this.$el = document.querySelector(selector);
    const { properties } = this.$el.dataset;
    this.properties = JSON.parse(properties);

    this.setup();
  }

  setup() {
    $('#slider-range').slider({
      range: true,
      min: this.properties.sliderMin,
      max: this.properties.sliderMax,
      values: [this.properties.startMin, this.properties.startMax],
      slide(event, ui) {
        $('#range-slider').parent().find('.heading__description').html(`${ui.values[0]}₽ - ${ui.values[1]}₽ `);
      },
    });
    $('#amount').val(`${$('#slider-range').slider('values', 0)}₽ - ${$('#slider-range').slider('values', 1)}₽`);
  }
}

const rangeslider = new RangeSlider('#range-slider');
window.rangeslider = rangeslider;

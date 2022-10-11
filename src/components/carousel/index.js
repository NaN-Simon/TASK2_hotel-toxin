import 'slick-carousel/slick/slick';
import 'slick-carousel/slick/slick.css';
import './carousel.scss';

class Carousel {
  constructor(selector) {
    this.$el = selector.querySelector('.carousel');
    this.$root = $(selector);

    this.setup();
  }

  setup() {
    this.$root.slick({
      infinite: false,
      dots: true,
      prevArrow: '<button type="button" class="slick-prev material-icons">chevron_left</button>',
      nextArrow: '<button type="button" class="slick-next material-icons">chevron_left</button>',
    });
  }
}

const carusel = document.querySelectorAll('.carousel-js');
carusel.forEach((selector) => new Carousel(selector));

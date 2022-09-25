import 'slick-carousel/slick/slick';
import 'slick-carousel/slick/slick.css';
import './carousel.scss';

class Carousel {
  constructor(selector) {
    this.$el = document.querySelector(selector);
    this.$root = $(this.$el);

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

const carusel = document.querySelectorAll('.carousel');
carusel.forEach((elem) => {
  new Carousel(`#${elem.id}`);
});

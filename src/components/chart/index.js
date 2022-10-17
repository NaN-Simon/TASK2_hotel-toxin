import './chart.scss';
import Chart from 'chart.js/dist/chart';

class ChartDoughnut {
  constructor(selector) {
    this.$el = selector;
    this.ctx = this.$el.querySelector('#myChart');

    const { properties } = this.$el.dataset;
    this.properties = JSON.parse(properties);
    this.setup();
  }

  setup() {
    const data = [];
    const bg = [];
    const bgBorder = [];

    this.properties.itemList.forEach((el) => {
      data.push(el.data);
      bg.push(el.bg);
      bgBorder.push(el.bgBorder);
    });

    const myChart = new Chart(this.ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          label: '# of Votes',
          data,
          backgroundColor: bg,
          borderColor: bgBorder,
          borderWidth: 2,
          cutout: this.properties.cutout,
          radius: this.properties.radius,
        }],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }
}

const chart = document.querySelectorAll('.chart-js');
chart.forEach((selector) => { new ChartDoughnut(selector) });

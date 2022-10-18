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
    const bgBorder = [];

    this.properties.itemList.forEach((el) => {
      data.push(el.data);
      bgBorder.push(el.bgBorder);
    });

    const myChart = new Chart(this.ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data,
          backgroundColor: (context) => {
            const bgGradient = [];
            this.properties.itemList.forEach((el) => {
              bgGradient.push(getGradient(context, el.bg[0], el.bg[1]));
            });
            return bgGradient;
          },
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

function getGradient(context, color1, color2) {
  const { chart } = context;
  const { ctx, chartArea } = chart;

  if (!chartArea) {
    return null;
  }

  if (color2 === undefined) {
    color2 = color1;
  }

  const gradientBg = ctx.createLinearGradient(
    chartArea.left,
    chartArea.top,
    chartArea.right,
    chartArea.bottom,
  );
  gradientBg.addColorStop(0, color1);
  gradientBg.addColorStop(1, color2);
  return gradientBg;
}

const chart = document.querySelectorAll('.chart-js');
chart.forEach((selector) => { new ChartDoughnut(selector); });

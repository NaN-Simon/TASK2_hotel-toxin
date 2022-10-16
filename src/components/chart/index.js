import './chart.scss';

import Chart from 'chart.js/dist/chart'

const ctx = document.getElementById('myChart');
const myChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    // labels: ['Green', 'Blue', 'Red'],
    datasets: [{
      label: '# of Votes',
      data: [25, 25, 50],
      backgroundColor: [
        '#BC9CFF',
        '#6FCF97',
        '#FFE39C',
      ],
      borderColor: [
        '#FFFFFF',
        '#FFFFFF',
        '#FFFFFF',
      ],
      borderWidth: 2,
      cutout: '89%',
      radius: 60,
    }],
  },
  options: {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      // y: {
      //   beginAtZero: false,
      //   ticks: {
      //     padding: 0,
      //   },
      // },
      // x: {
      //   beginAtZero: false,
      //   ticks: {
      //     padding: 0,
      //   },
      // },
    },
  },
});

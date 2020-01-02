// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

// Area Chart Example
var ctx = document.getElementById("myTimelineChart");
var myTimelineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["5 s", "10 s", "15 s", "20 s", "25 s", "30 s", "35 s", "40 s", "45 s", "50 s", "55 s", "60 s"],
    datasets: [{
      label: "Total",
      lineTension: 0.3,
      backgroundColor: "rgba(133, 135, 150, 0.05)",
      borderColor: "rgba(133, 135, 150, 1)",
      // pointRadius: 3,
      pointBackgroundColor: "rgba(133, 135, 150, 1)",
      pointBorderColor: "rgba(133, 135, 150, 1)",
      // pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(133, 135, 150, 1)",
      pointHoverBorderColor: "rgba(133, 135, 150, 1)",
      // pointHitRadius: 10,
      // pointBorderWidth: 2,
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    },{
      label: "Ip <- Intranet",
      lineTension: 0.3,
      backgroundColor: "rgba(78, 115, 223, 0.05)",
      borderColor: "rgba(78, 115, 223, 1)",
      // pointRadius: 3,
      pointBackgroundColor: "rgba(78, 115, 223, 1)",
      pointBorderColor: "rgba(78, 115, 223, 1)",
      // pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
      pointHoverBorderColor: "rgba(78, 115, 223, 1)",
      // pointHitRadius: 10,
      // pointBorderWidth: 2,
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    },{
      label: "Ip -> Intranet",
      lineTension: 0.3,
      backgroundColor: "rgb(28,200,138, 0.05)",
      borderColor: "rgb(28,200,138)",
      // pointRadius: 3,
      pointBackgroundColor: "rgb(28,200,138)",
      pointBorderColor: "rgb(28,200,138)",
      // pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgb(28,200,138)",
      pointHoverBorderColor: "rgb(28,200,138)",
      // pointHitRadius: 10,
      // pointBorderWidth: 2,
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    },{
      label: "Ip <=> Intranet",
      lineTension: 0.3,
      backgroundColor: "rgba(78, 115, 223, 0.05)",
      borderColor: "rgb(54,185,204)",
      // pointRadius: 3,
      pointBackgroundColor: "rgb(54,185,204)",
      pointBorderColor: "rgb(54,185,204)",
      // pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgb(54,185,204)",
      pointHoverBorderColor: "rgb(54,185,204)",
      // pointHitRadius: 10,
      // pointBorderWidth: 2,
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    },{
      label: "Ip -> Gateway",
      lineTension: 0.3,
      backgroundColor: "rgb(246,194,62,0.05)",
      borderColor: "rgb(246,194,62)",
      // pointRadius: 3,
      pointBackgroundColor: "rgb(246,194,62)",
      pointBorderColor: "rgb(246,194,62)",
      // pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgb(246,194,62)",
      pointHoverBorderColor: "rgb(246,194,62)",
      // pointHitRadius: 10,
      // pointBorderWidth: 2,
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    }],
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      }],
      yAxes: [{
        ticks: {
          maxTicksLimit: 5,
          padding: 10,
          // // Include a dollar sign in the ticks
          // callback: function(value, index, values) {
          //   return number_format(value);
          // }
        },
        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      }],
    },
    legend: {
      display: true,
      position: 'bottom'
    },
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      intersect: false,
      mode: 'index',
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ': ' + number_format(tooltipItem.yLabel);
        }
      }
    }
  }
});

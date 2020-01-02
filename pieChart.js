// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';
// Pie Chart
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["OUT", "IN", "GW"],
    datasets: [{
      data: [33, 33, 33],
      backgroundColor: ['#4e73df', '#1cc88a', '#f6c23e'],
      hoverBackgroundColor: ['#2e59d9', '#17a673', '#d4a52f'],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }],
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: true,
      position: 'left',
      labels: {
        generateLabels: function (chart) {
          var data = chart.data;
          if (data.labels.length && data.datasets.length) {
            return data.labels.map(function (label, i) {
              var ds = data.datasets[0];
              var arc = chart.getDatasetMeta(0).data[i];
              var custom = arc && arc.custom || {};
              var getValueAtIndexOrDefault = Chart.helpers.getValueAtIndexOrDefault;
              var arcOpts = chart.options.elements.arc;
              var fill = custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
              var stroke = custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
              var bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);

              var value = chart.config.data.datasets[chart.getDatasetMeta(0).data[i]._datasetIndex].data[chart.getDatasetMeta(0).data[i]._index];

              return {
                text: label + " : " + value,
                fillStyle: fill,
                strokeStyle: stroke,
                lineWidth: bw,
                hidden: isNaN(ds.data[i]) || chart.getDatasetMeta(0).data[i].hidden,
                index: i
              };
            });
          } else {
            return [];
          }
        }
      }
    },
    cutoutPercentage: 80,
  },
});
<script>
// @ts-nocheck

  import { Line } from "svelte-chartjs";
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
  } from "chart.js";
  import { ProfilesService } from "@services/ProfilesService";

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale
  );

  export let data = [];
  export let labels = [];
  export let axisXLabel;
  export let axisYLabel;
  export let currency;

  let animateChart = true;
  let chartOptions = {};
  let datasets = [];
  let inactiveLegend = {}

  const lineAlpha = 0.7;
  const rgbaColors = [
    "255, 99, 132", // Pink
    "54, 162, 235", // Blue
    "255, 206, 86", // Yellow
    "75, 192, 192", // Cyan
    "153, 102, 255", // Purple
    "255, 159, 64", // Orange
    "0, 255, 0", // Green
    "255, 0, 0", // Red
    "128, 128, 128", // Gray
    "255, 255, 0", // Yellow-Green
  ];

  $: {
    getChartOptions();
    datasets = {
      labels,
      datasets: data.map((user, i) => {
        return {
          label: user.label,
          data: user[currency],
          fill: false,
          lineTension: 0.2,
          backgroundColor: `rgba(${rgbaColors[i]}, .3)`,
          borderColor: `rgba(${rgbaColors[i]}, 1)`,
          borderWidth: 1,
          // borderJoinStyle: "round",
          // borderCapStyle: "butt",
          // borderDash: [],
          // borderDashOffset: 0.0,

          pointStyle: "crossRot",
          pointBorderColor: `rgba(${rgbaColors[i]}, 0.5)`,
          // pointBackgroundColor: "rgb(255, 255, 255)",
          // pointBorderWidth: 1,
          // pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(255, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220,1)",
          // pointHoverBorderWidth: 2,
          // pointRadius: 1,
          // pointHitRadius: 10,
          hidden: inactiveLegend[user.label] || false,
        };
      }),
    };
  }

  async function getData() {
    
  }

  function getChartOptions() {
    const opts = {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        legend: {
          onClick: function(ev, item, legend) {
            // console.log("Legend clicked", item);
            // console.log('item.text :>> ', item.text);
            // item.hidden = !item.hidden;
            // legend.
            // return true;


            const index = item.datasetIndex;
            const ci = this.chart;
            const meta = ci.getDatasetMeta(index);
            meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null;
            inactiveLegend[item.text] = meta.hidden;
            ci.update();            
          },
        },
      },

      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: axisXLabel,
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: axisYLabel,
          },
        },
      },
    };
    if (!animateChart) {
      opts.animation = {
        duration: 0,
      };
    }
    animateChart = false;
    chartOptions = opts;
  }
</script>

<div class="chart">
  <Line data={datasets} options={chartOptions} />
</div>

<style>
  .chart {
    /* width: 100%; */
    height: 500px;
  }
</style>

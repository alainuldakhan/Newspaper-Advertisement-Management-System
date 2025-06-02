export const lineChartOptionsDashboard = (categories = []) => ({
  chart: {
    toolbar: { show: false },
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: { enabled: false },
  stroke: { curve: "smooth" },
  xaxis: {
    type: "category", // изменено с "datetime" на универсальное значение
    categories,
    labels: {
      style: {
        colors: "#c8cfca",
        fontSize: "10px",
      },
    },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#c8cfca",
        fontSize: "10px",
      },
    },
  },
  legend: { show: false },
  grid: {
    strokeDashArray: 5,
    borderColor: "#56577A",
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "vertical",
      shadeIntensity: 0,
      inverseColors: true,
      opacityFrom: 0.8,
      opacityTo: 0,
      stops: [],
    },
    colors: ["#0075FF", "#2CD9FF"],
  },
  colors: ["#0075FF", "#2CD9FF"],
});

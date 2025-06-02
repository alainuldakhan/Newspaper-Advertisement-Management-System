import React from "react";
import ReactApexChart from "react-apexcharts";

class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: [],
      chartOptions: {},
    };
  }

  componentDidMount() {
    let { lineChartData, lineChartOptions } = this.props;

    // 🛡 Защита для lineChartData
    const isValidSeries =
      Array.isArray(lineChartData) &&
      lineChartData.some(
        (item) => Array.isArray(item?.data) && item.data.length > 0
      );

    if (!isValidSeries) {
      lineChartData = [{ name: "No Data", data: [0] }];
    }

    // 🛡 Защита для xaxis.categories
    if (
      !lineChartOptions ||
      typeof lineChartOptions !== "object" ||
      !lineChartOptions.xaxis ||
      !Array.isArray(lineChartOptions.xaxis.categories) ||
      lineChartOptions.xaxis.categories.length === 0
    ) {
      lineChartOptions = {
        ...lineChartOptions,
        xaxis: {
          ...(lineChartOptions?.xaxis || {}),
          categories: ["N/A"],
        },
      };
    }

    // 🛡 Защита для gradient.stops в fill
    if (
      lineChartOptions.fill?.gradient &&
      (!Array.isArray(lineChartOptions.fill.gradient.stops) ||
        lineChartOptions.fill.gradient.stops.length === 0)
    ) {
      lineChartOptions.fill.gradient.stops = [0, 100];
    }

    this.setState({
      chartData: lineChartData,
      chartOptions: lineChartOptions,
    });
  }

  render() {
    const { chartData, chartOptions } = this.state;

    if (!Array.isArray(chartData) || chartData.length === 0) return null;

    return (
      <ReactApexChart
        options={chartOptions}
        series={chartData}
        type="area"
        width="100%"
        height="100%"
      />
    );
  }
}

export default LineChart;
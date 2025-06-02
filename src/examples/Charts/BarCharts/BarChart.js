import React, { Component } from "react";
import Chart from "react-apexcharts";

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
      chartOptions: {},
    };
  }

  componentDidMount() {
    let { barChartData, barChartOptions } = this.props;

    // 🛡 Защита для barChartData
    if (
      !Array.isArray(barChartData) ||
      !Array.isArray(barChartData[0]?.data) ||
      barChartData[0].data.length === 0
    ) {
      barChartData = [{ name: "No Data", data: [0] }];
    }

    // 🛡 Защита для barChartOptions.xaxis.categories
    if (
      !barChartOptions ||
      typeof barChartOptions !== "object" ||
      !barChartOptions.xaxis ||
      !Array.isArray(barChartOptions.xaxis.categories) ||
      barChartOptions.xaxis.categories.length === 0
    ) {
      barChartOptions = {
        ...barChartOptions,
        xaxis: {
          ...(barChartOptions?.xaxis || {}),
          categories: ["N/A"],
        },
      };
    }

    // 🛡 Защита для gradient.stops (если используется)
    if (
      barChartOptions.fill?.gradient &&
      (!Array.isArray(barChartOptions.fill.gradient.stops) ||
        barChartOptions.fill.gradient.stops.length === 0)
    ) {
      barChartOptions.fill.gradient.stops = [0, 100];
    }

    this.setState({
      chartData: barChartData,
      chartOptions: barChartOptions,
    });
  }

  render() {
    const { chartOptions, chartData } = this.state;

    if (!Array.isArray(chartData) || chartData.length === 0) return null;

    return (
      <Chart
        options={chartOptions}
        series={chartData}
        type="bar"
        width="100%"
        height="100%"
      />
    );
  }
}

export default BarChart;

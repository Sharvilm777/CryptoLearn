import React from "react";

import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const Linechart = ({ priceHistory }) => {
  console.log(priceHistory);
  const coinPrices = [];
  const timeStamps = [];
  for (let i = 0; i < priceHistory.history.length; i++) {
    coinPrices.push(priceHistory.history[i].price);
    timeStamps.push(
      new Date(priceHistory.history[i].timestamp).toLocaleTimeString()
    );
  }
  const Graphdata = {
    labels: timeStamps,
    datasets: [
      {
        label: "Price is USD",
        data: coinPrices,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };
  const options = {
    scales: {
      x: {
        reverse: true,
      },
    },
  };

  return (
    <div>
      <Line data={Graphdata} options={options} />
    </div>
  );
};

export default Linechart;

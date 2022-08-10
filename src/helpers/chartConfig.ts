import { ApexOptions } from "apexcharts";
import {colors} from "../styles/colors" 

export let chartConfig = {
    series: [
      { name: "despesas", data: [1] },
      { name: "ativos", data: [1] },
    ],
    options: {
      markers: { size: 12 },
      chart: { width: 500, height: 500 },
      toolbar: { show: false },
      xaxis: {
        categories: [],
      },
      colors: [colors.iconGreen, colors.red]
    } as ApexOptions,
  };
import * as C from "../styles/styled";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import months from "../helpers/months.json";
import { useState, useEffect, useCallback } from "react";
import { database } from "../firebase";
import { chartConfig } from "../helpers/chartConfig";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  DocumentData,
} from "firebase/firestore";
import { ItemInterface } from "../types";
export const History: React.FC = () => {
  const [cards, setCards] = useState<ItemInterface[]>([]);
  const dataCollectionRef = collection(database, "card");
  const [myChartConfig, setChartConfig] = useState(chartConfig);

  interface MonthsInterface {
    abbreviation: string;
    name: string;
    number: string;
  }

  const setChart = useCallback(
    (months: MonthsInterface[], cards: ItemInterface[]) => {
      let ativos: number[] = [];
      let despesas: number[] = [];
      let categories: string[] = [];
      cards.forEach((card) => {
        if (card.value) {
          if (card.type?.includes("ativo")) {
            ativos.push(card.value);
          } else {
            despesas.push(card.value);
          }
        }
      });

      months.forEach((month) => {
        categories.push(month.name);
      });
      setChartConfig({
        ...myChartConfig,
        series: [
          { name: "ativo", data: ativos },
          { name: "despesas", data: despesas },
        ],
        options: {
          ...myChartConfig.options,
          xaxis: { categories: categories },
        },
      });
    },
    []
  );

  const getData = useCallback(async () => {
    await getDocs<DocumentData>(dataCollectionRef).then((data) => {
      setCards(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setChart(
        months,
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  }, []);

  useEffect(() => {
    //function get data
    getData();
  }, [getData]);

  return (
    <>
      <C.title>RELAÇÃO DE GASTOS</C.title>
      <C.container justify="center">
        <Chart
          options={myChartConfig.options}
          series={myChartConfig.series}
          type="bar"
          width={700}
          height={500}
        ></Chart>
      </C.container>
    </>
  );
};

export default History;

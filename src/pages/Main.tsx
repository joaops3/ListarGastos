import * as C from "../styles/styled";
import Item from "../components/Item";
import React, { useCallback, useEffect, useState } from "react";
import { database } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  DocumentData,
} from "firebase/firestore";
import { ItemInterface } from "../types";
import { sortByDate } from "../helpers/helpers";
import months from "../helpers/months.json";

const Main: React.FC = () => {
  const [cards, setCards] = useState<ItemInterface[]>([]);
  const dataCollectionRef = collection(database, "card");
  const [deletar, setDeletar] = useState(0);
  const [month, setMonth] = useState("");

  const getData = useCallback(async () => {
    const data = await getDocs<DocumentData>(dataCollectionRef);
    setCards(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }, []);

  const filteredCards = cards.filter((card) => {
    return card.date?.substring(5, 7) === month;
  });
  async function del(id: string) {
    if(process.env.REACT_APP_SECRET ==="ADMIN"){

      const item = doc(database, "card", id);
      await deleteDoc(item);
      setDeletar(deletar + 1);
    }
  }
  useEffect(() => {
    //function get data
    getData();
  }, [deletar, getData, month]);
  return (
    <>
      <C.title>LISTA DE GASTOS</C.title>
      <C.container justify="right">
        <C.Select value={month} onChange={(e) => setMonth(e.target.value)}>
          <option value={""}>Todos</option>
          {months.map((month, key) => {
            return (
              <option key={key} value={month.number}>
                {month.name}
              </option>
            );
          })}
        </C.Select>
      </C.container>
      <C.container justify={"center"}>
        {month === ""
          ? cards
              .sort(sortByDate)
              .reverse()
              .map((card: ItemInterface) => {
                return (
                  <Item
                    key={card.id}
                    id={card.id}
                    name={card.name}
                    type={card.type}
                    date={card.date}
                    descricao={card.descricao}
                    value={card.value}
                    del={del}
                  ></Item>
                );
              })
          : filteredCards
              .sort(sortByDate)
              .reverse()
              .map((card: ItemInterface) => {
                return (
                  <Item
                    key={card.id}
                    id={card.id}
                    name={card.name}
                    type={card.type}
                    date={card.date}
                    descricao={card.descricao}
                    value={card.value}
                    del={del}
                  ></Item>
                );
              })}
      </C.container>
    </>
  );
};

export default Main;

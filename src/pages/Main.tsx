import * as C from "../styles/styled";
import Item from "../components/Item";
import React, { useEffect, useState } from "react";
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

const Main: React.FC = () => {
  const [cards, setCards] = useState<ItemInterface[]>([]);
  const dataCollectionRef = collection(database, "card");
  const [month, setMonth] = useState<String>("")
  const [selectedCards, setSelectedCards] = useState<ItemInterface[]>([])

  const selectMonth = () => {
    // if(month ===""){
    //   setSelectedCards([...cards])
    // }
    // for(let i in cards ){
    //   console.log(cards[i].date?.substring(5,7))
    //   if(cards[i].date?.substring(5,7) === month){
    //     selectedCards.push(cards[i])
    //   }
    // }
    // console.log(selectedCards)
  }

  useEffect(() => {
    //function delete
    const getData = async () => {
      const data = await getDocs<DocumentData>(dataCollectionRef);
      setCards(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log("teste")
    };
    getData();
  }, [cards]);

  

  async function del(id: string) {
    const item = doc(database, "card", id);
    await deleteDoc(item);
  }
  return (
    <>
      <C.title>LISTA DE GASTOS</C.title>
      <select onChange={ e => { setMonth(e.target.value); selectMonth()}}>
        <option value={""}>selecione</option>
        <option value={"02"}>fevereiro</option>
      </select>
      <C.container justify={"center"}>
        {cards
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

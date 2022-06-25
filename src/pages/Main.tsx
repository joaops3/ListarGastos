import * as C from "../styles/styled";
import Item from "../components/Item";
import { useEffect, useState } from "react";
import { database } from "../firebase";
import { collection, getDocs, doc, deleteDoc, DocumentData } from "firebase/firestore";
import {item} from "../types"

const Main = () => {
  const [cards, setCards] = useState<item[]>([]);
  const dataCollectionRef = collection(database, "card");
  const [deletar, setDeletar] = useState(0)

  useEffect(() => {
    const getData = async () => {
      const data = await getDocs<DocumentData>(dataCollectionRef);
      setCards(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  }, [deletar]);

  async function del(id: string) {
   const item = doc(database, "card", id);
   await deleteDoc(item);
   setDeletar(deletar +1)
 }
  return (
    <>
      <C.title>LISTA DE GASTOS</C.title>
      <C.container justify={"center"}>
        {cards.map((card: item) => {
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

import * as C from "../styles/styled";
import { colors } from "../styles/colors";
import InputMask from "react-input-mask";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  DocumentData,
} from "firebase/firestore";
import { database } from "../firebase";
import { useParams } from "react-router";
import { item } from "../types";

const Editar = () => {
  const params = useParams<string>();
  const [cards, setCards] = useState<item>();
  const dataCollectionRef = collection(database, "card");

  useEffect(() => {
    const getData = async () => {
      const data = await getDocs<DocumentData>(dataCollectionRef).then(
        (data) => {
          data.docs.forEach((doc: item) => {
            if (doc.id === params.id) {
              setCards({ ...doc.data(), id: doc.id });
            }
          });
        }
      );
    };
    getData();
  }, []);

  async function editarUser(e: React.MouseEvent<HTMLElement>) {
    if (cards === undefined) {
      return;
    }
    e.preventDefault();
    // @ts-ignore
    const item = doc(database, "card", params.id);
    await updateDoc<any>(item, cards);
  }
  return (
    <main>
      <C.container_cadastrar>
        <C.title>Editar</C.title>
        <form>
          <InputMask
            type="text"
            placeholder="Nome"
            mask={""}
            className="input"
            onChange={(e) => setCards({ ...cards, name: e.target.value })}
            value={cards?.name}
            name="name"
          ></InputMask>
          <InputMask
            type="text"
            mask={"99/99/9999"}
            placeholder="Data"
            className="input"
            onChange={(e) => setCards({ ...cards, date: e.target.value })}
            value={cards?.date}
            name="date"
          ></InputMask>
          <select
            value={cards?.type}
            onChange={(e) =>
              e.target.value.length > 150
                ? alert("maximo de caracteres 150")
                : setCards({ ...cards, type: e.target.value })
            }
          >
            <option value="">Selecione</option>
            <option value="ativo">Ativo</option>
            <option value="passivo">Passivo</option>
          </select>
          <C.formGroup>
            <InputMask
              type="text"
              mask={""}
              placeholder="Descri????o"
              onChange={(e) =>
                setCards({ ...cards, descricao: e.target.value })
              }
              name="descricao"
              value={cards?.descricao}
              className="input"
            ></InputMask>
            <C.underText>A descri????o deve ter max 150 caracteres</C.underText>
          </C.formGroup>
          <InputMask
            type="number"
            mask={""}
            onChange={(e) =>
              setCards({ ...cards, value: parseInt(e.target.value) })
            }
            style={{ textDecoration: "none" }}
            name="value"
            placeholder="Valor"
            className="input"
            value={cards?.value}
          ></InputMask>
          <C.cadastrar color={colors.blue} onClick={(e) => editarUser(e)}>
            Salvar
          </C.cadastrar>
        </form>
      </C.container_cadastrar>
    </main>
  );
};

export default Editar;

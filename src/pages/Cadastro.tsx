import * as C from "../styles/styled";
import { colors } from "../styles/colors";
import InputMask from "react-input-mask";
import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { database } from "../firebase";

const Cadastrar = () => {
  const dataCollectionRef = collection(database, "card");
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [value, setValue] = useState<string>("");

  async function cadastrarUser(e: React.MouseEvent<HTMLElement>) {
    let newValue = "";
    e.preventDefault();
    if (value === "") {
      alert("defina um valor valido");
      return;
    }
    if (descricao.length > 150) {
      alert("a descricao deve ter apenas 150 caracteres");
      return;
    }
    if (value.includes(",")) {
      newValue = value.replace(",", ".");
      setValue(newValue);
    } else {
      setValue(newValue);
    }
    await addDoc(dataCollectionRef, { name, date, type, descricao, value });
    setName("");
    setDate("");
    setType("");
    setDescricao("");
    setValue("");
    alert("registrado com sucesso");
  }

  return (
    <main>
      <C.container_cadastrar>
        <C.title>Cadastrar</C.title>
        <form>
          <InputMask
            type="text"
            placeholder="Nome"
            className="input"
            onChange={(e) => setName(e.target.value)}
            name="name"
            mask={""}
          ></InputMask>
          <InputMask
            type="text"
            mask={"99/99/9999"}
            placeholder="Data"
            className="input"
            onChange={(e) => setDate(e.target.value)}
            name="date"
          ></InputMask>
          <select
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option value="">Selecione</option>
            <option value="ativo">Ativo</option>
            <option value="passivo">Passivo</option>
          </select>
          <C.formGroup>
            <InputMask
              type="text"
              placeholder="Descrição"
              onChange={(e) => setDescricao(e.target.value)}
              name="descricao"
              className="input"
              mask={""}
            ></InputMask>
            <C.underText>A descrição deve ter max 150 caracteres</C.underText>
          </C.formGroup>
          <InputMask
            type="text"
            onChange={(e) => {
              e.target.value.includes(",")
                ? setValue(e.target.value)
                : setValue(e.target.value + ",00");
            }}
            name="value"
            placeholder="Valor"
            className="input"
            mask={""}
          ></InputMask>
          <C.cadastrar color={colors.red} onClick={(e) => cadastrarUser(e)}>
            Salvar
          </C.cadastrar>
        </form>
      </C.container_cadastrar>
    </main>
  );
};

export default Cadastrar;

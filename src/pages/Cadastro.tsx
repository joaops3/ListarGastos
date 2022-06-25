import * as C from "../styles/styled";
import { colors } from "../styles/colors";
import InputMask from "react-input-mask";
import {useState } from "react";
import {addDoc, collection} from "firebase/firestore"
import {database} from "../firebase"

const Cadastrar = () => {

  const dataCollectionRef = collection(database, "card")

  const [name, setName] = useState<string>("")
  const [date, setDate] = useState<string>("")
  const [type, setType] = useState<string>("")
  const [descricao, setDescricao] = useState<string>("")
  const [value, setValue] = useState<string>("")

  
 async function cadastrarUser(e: React.MouseEvent<HTMLElement>){
  e.preventDefault()
  if(value === ""){
    alert("defina um valor")
    return
  }
  if(value.includes(".")){
    await addDoc(dataCollectionRef, {name, date, type, descricao, value} )
    console.log("ativou")
  }
  else{
    setValue(value+".00")
    await addDoc(dataCollectionRef, {name, date, type, descricao, value} )
    setName("")
    setDate("")
    setType("")
    setDescricao("")
    setValue("")
  }
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
          <select onChange={(e)=> {setType(e.target.value)}}>
            <option value="">Selecione</option>
            <option value="ativo">Ativo</option>
            <option value="passivo">Passivo</option>
          </select>
          <InputMask
            type="text"
            placeholder="Descrição"
            onChange={(e) => setDescricao(e.target.value)}
            name="descricao"
            className="input"
            mask={""}
          ></InputMask>
          <InputMask
            type="text"
            onChange={(e) => setValue(e.target.value)}
            name="value"
            placeholder="Valor"
            className="input"
            mask={""}
          ></InputMask>
          <C.cadastrar color={colors.red} onClick={(e) =>cadastrarUser(e)}>Salvar</C.cadastrar>
        </form>
      </C.container_cadastrar>
    </main>

  );
};

export default Cadastrar;

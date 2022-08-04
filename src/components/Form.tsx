import * as C from "../styles/styled";
import { colors } from "../styles/colors";
import InputMask from "react-input-mask";
import React, { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  updateDoc,
  getDocs,
  DocumentData,
  doc,
} from "firebase/firestore";
import { database } from "../firebase";
import { useParams } from "react-router";
import { ItemInterface } from "../types";
import CurrencyInput from "react-currency-input-field";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { onlyNumbers, parseDate, formatDate } from "../helpers/helpers";

interface Form {
  params?: string;
  typeOperation?: "cadastrar" | "edit";
  data?: ItemInterface;
}

const Form: React.FC<Form> = ({ params, typeOperation, data }) => {
  const dataCollectionRef = collection(database, "card");
  const [cards, setCards] = useState<ItemInterface | undefined>();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<ItemInterface>({ defaultValues: cards });

  const updateInfo = () => {
    setCards({ ...data });
    setValue("data", { ...data });
  };

  const onSubmit: SubmitHandler<ItemInterface> = async (data) => {
    let dataClone = Object.assign({}, data.data);
    let birthDate;
    if (typeof dataClone.date === "object") {
      birthDate = formatDate(new Date(dataClone.date), "yyyy-mm-dd");
    } else {
      birthDate = parseDate(dataClone.date);
    }
    dataClone.value = onlyNumbers(dataClone.value);
    dataClone.date = birthDate;
    if (typeOperation === "cadastrar") {
      await addDoc(dataCollectionRef, {
        name: dataClone.name,
        date: dataClone.date,
        type: dataClone.type,
        descricao: dataClone.descricao,
        value: dataClone.value,
      });
      setValue("data.name", "");
      setValue("data.date", "");
      setValue("data.type", "");
      setValue("data.descricao", "");
      setValue("data.value", "");
      alert("registrado com sucesso");
    } else {
      // @ts-ignore
      const item = doc(database, "card", params);
      await updateDoc<any>(item, dataClone);
    }
  };

  useEffect(() => {
    updateInfo();
  }, [data]);

  return (
    <main>
      <C.container_cadastrar>
        <C.title>
          {typeOperation == "cadastrar" ? "CADASTRAR" : "EDITAR"}
        </C.title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name={"data.name"}
            render={({ field: { onChange, value } }) => (
              <InputMask
                id={"data.name"}
                className={"input"}
                mask=""
                placeholder="Nome"
                value={value}
                defaultValue={getValues("data.name")}
                onChange={(e) => {
                  onChange(e);
                }}
              />
            )}
            rules={{ required: "O nome é obrigatorio", maxLength: 50 }}
          />
          {errors.data?.name && (
            <C.ErrorsMessage>
              {errors?.data?.name?.message?.toString()}
            </C.ErrorsMessage>
          )}
          <Controller
            control={control}
            name={"data.date"}
            render={({ field: { onChange, value } }) => (
              <InputMask
                id={"data.date"}
                className={"input"}
                value={value}
                mask={"99/99/9999"}
                placeholder="Data"
                defaultValue={getValues("data.date")}
                onChange={(e) => {
                  onChange(e);
                }}
              />
            )}
            rules={{ required: "A data é obrigatorio", maxLength: 50 }}
          />
          {errors.data?.date && (
            <C.ErrorsMessage>
              {errors?.data?.date?.message?.toString()}
            </C.ErrorsMessage>
          )}
          <Controller
            control={control}
            name={"data.type"}
            render={({ field: { onChange, value } }) => (
              <select onChange={onChange} defaultValue={getValues("data.type")}>
                <option value="">Selecione</option>
                <option value="ativo">Ativo</option>
                <option value="passivo">Passivo</option>
              </select>
            )}
            rules={{ required: "O tipo é obrigatorio" }}
          />
          {errors.data?.type && (
            <C.ErrorsMessage>
              {errors?.data?.type?.message?.toString()}
            </C.ErrorsMessage>
          )}
          <C.formGroup>
            <Controller
              control={control}
              name={"data.descricao"}
              render={({ field: { onChange, value } }) => (
                <InputMask
                  id={"data.descricao"}
                  className={"input"}
                  mask={""}
                  value={value}
                  placeholder="Descricao"
                  defaultValue={getValues("data.descricao")}
                  onChange={(e) => {
                    onChange(e);
                  }}
                />
              )}
              rules={{maxLength: 50 }}
            />
            <C.underText>A descrição deve ter max 150 caracteres</C.underText>
          </C.formGroup>
          <Controller
            control={control}
            name={"data.value"}
            render={({ field: { onChange, value } }) => (
              <CurrencyInput
                id="data.value"
                name="data.value"
                placeholder="Valor R$"
                className="input"
                value={value}
                defaultValue={getValues("data.value")}
                decimalSeparator={","}
                groupSeparator={"."}
                prefix={"R$"}
                allowDecimals={true}
                onValueChange={(value) => {
                  onChange(value);
                }}
              />
            )}
            rules={{ required: "O Valor é obrigatorio", maxLength: 50 }}
          />
          {errors.data?.value && (
            <C.ErrorsMessage>
              {errors?.data?.value?.message?.toString()}
            </C.ErrorsMessage>
          )}
          <C.cadastrar
            color={typeOperation === "cadastrar" ? colors.red : colors.blue}
            type="submit"
          >
            Salvar
          </C.cadastrar>
        </form>
      </C.container_cadastrar>
    </main>
  );
};

export default Form;

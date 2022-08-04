import React, { useEffect, useState, useCallback } from "react";
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
import { ItemInterface} from "../types";
import Form from "../components/Form";
const Editar = () => {
  const params = useParams<string>();
  const dataCollectionRef = collection(database, "card");
  const [data, setData] = useState();

  const getData = useCallback(async () => {
    const data = await getDocs<DocumentData>(dataCollectionRef).then((data) => {
      data.docs.forEach((doc: ItemInterface) => {
        if (doc.id === params.id) {
          setData({ ...doc.data(), id: doc.id });
        }
      });
    });
  }, [params]);
  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <>
      <Form typeOperation ="edit" params={params.id} data={data}></Form>
    </>
  );
};

export default Editar;

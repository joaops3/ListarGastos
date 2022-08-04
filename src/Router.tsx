import { Routes, Route } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Main from "./pages/Main";
import Editar from "./pages/Editar";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
        <Route path="/cadastrar" element={<Cadastro></Cadastro>}></Route>
        <Route path="/editar:id" element={<Editar></Editar>}></Route>
      </Routes>
    </>
  );
};

export default Router;

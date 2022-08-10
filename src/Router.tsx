import { Routes, Route } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Main from "./pages/Main";
import Editar from "./pages/Editar";
import History  from "./pages/History";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
        <Route path="/chart" element={<History></History>}></Route>
        <Route path="/cadastrar" element={<Cadastro></Cadastro>}></Route>
        <Route path="/editar:id" element={<Editar></Editar>}></Route>
      </Routes>
    </>
  );
};

export default Router;

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PaidIcon from "@mui/icons-material/Paid";
import { Link } from "react-router-dom";
import {colors} from "../styles/colors"
import {ItemInterface} from "../types"
import {addMoneyRealMask, formatDate} from "../helpers/helpers"
import * as C from "../styles/styled";

const Item: React.FC<ItemInterface> = ({ name, date, type, descricao, value, id, del }) => {
  return (
    //@ts-ignore
    <C.item>
      {console.log("minha data",date)}
      <div className="flex-button">
        <C.button color={"#000"} text={"#fff"}>
          <Link to={`/editar${id}`} className="link">
            <EditIcon></EditIcon>
          </Link>
        </C.button>
        <C.button color={colors.red} text={"#000"} onClick={() => del(id)}>
          <DeleteIcon></DeleteIcon>
        </C.button>
      </div>
      <div className="flex-icon">
        {type === "ativo" ? (
          <AttachMoneyIcon style={{ color: colors.iconGreen }} />
        ) : (
          <PaidIcon style={{ color: colors.iconRed }} />
        )}
      </div>

      <h3 className="titulo t-item">{name}</h3>
      <C.item_text>
        Data: <span>{date && (formatDate(new Date(date)) )}</span>
      </C.item_text>
      <C.item_text>
        tipo: <span>{type}</span>
      </C.item_text>
      <C.item_text descricao={true} className={"descricao"}>
        descrição: <span>{descricao}</span>
      </C.item_text>
      <C.item_text type={type} className={"v"}>
        valor: <span className="valor"> {addMoneyRealMask(value)}</span>
      </C.item_text>
    </C.item>
  );
};

export default Item;

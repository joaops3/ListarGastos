import * as C from "../styles/styled"
import { Link } from "react-router-dom"
import { colors } from "../styles/colors";

const Header: React.FC = () => {
    return ( 
        <header>
            <C.Nav>
            <C.Flex justify="space-between">
            <h2 ><Link to="/ListarGastos" className='link-nav' style={{color: colors.home}}> HISTORICO</Link></h2>
            <h2 ><Link to="/chart" className='link-nav' style={{color: colors.home}}>GRAFICO</Link></h2>
            </C.Flex>
            <Link to="/cadastrar" className="link cadastrar"> <C.cadastrar color={colors.yellow}>CADASTRAR</C.cadastrar></Link>
            </C.Nav>
        </header>
     );
}
 
export default Header;
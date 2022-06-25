import * as C from "../styles/styled"
import { Link } from "react-router-dom"
import { colors } from "../styles/colors";

const Header = () => {
    return ( 
        <header>
            <C.Nav>
            <h2 ><Link to="/" className='link' style={{color: colors.home, margin: "15px"}}> HOME</Link></h2>
            <Link to="/cadastrar" className="link cadastrar"> <C.cadastrar color={colors.yellow}>CADASTRAR</C.cadastrar></Link>
            </C.Nav>
        </header>
     );
}
 
export default Header;
import styled from "styled-components"
import { colors } from "./colors";

interface props {
    color?: React.CSSProperties, 
    text?:string,
    descricao?:boolean,
    type?: string,
    justify?: string,
}
export const cadastrar = styled.button`
    margin: 15px;
    padding: 15px;
    color: #000;
    border: 2px solid #000;
    width: 120px;
    background: ${props => props.color};
    font-weight: bold;
    border-radius: 10px;
    text-align:center;
    display:flex;
    justify-content:center;
    align-items:center;
    cursor: pointer;


    &:hover{
        border: 2px solid ${props => props.color};
        color:  ${props => props.color};
        background: #fff;
        transition: .1s;
    }
`

export const Nav = styled.nav`
    display:flex;
    justify-content: space-between;
    align-items: center;
    height: 10vh;
    width:100%;
    background-color: #1A1A1A;

`


export const container = styled.div<props>`
    margin: 0 auto;
    display:flex;
    justify-content: ${props => props.justify};
    align-items: center;
    flex-wrap: wrap;
    width: 70vw;

`
export const container_cadastrar = styled.div`
    margin: 0 auto;
    margin: 25px auto;
    display:flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 50vw;
    border: 2px solid black;
    border-radius: 15px;
    background: #FAFAF9;

    @media(max-width: 700px){
        width: 80vw;
    }

`

export const item = styled.div`
    margin: 15px;
    padding: 15px;
    width: 250px;
    height: 300px;
    max-height: 300px;
    background-color: #f3f3f3;
    border-radius: 5px;
    border: 2px solid black;
`

export const button = styled.button<props>`
border: none;
background: ${props => props.color};
width: 30px;
border-radius: 5px;
margin-right: 5px;
cursor: pointer;


> * {
    color: ${props => props.text};
    text-align: center;
}

&:hover{

    outline: 1px solid ${props => props.color};
    
    background: white;
    > * {
        color: ${props => props.color};
       
    }

}

`

export const item_text = styled.div<props>`
text-transform: capitalize;
padding: 5px 0;
font-weight: bold;


> *{font-weight: normal;
    font-size: ${props => props.descricao ? "11px" : ""};
   
    word-wrap: break-word;

} 
.valor{ color: ${props => props.type === "ativo"? colors.iconGreen : colors.red};

}

&.descricao{
    min-height: 100px;
    max-height: 100px;
}
`

export const title = styled.h1`
    text-align: center;
    margin: 20px 0;
`

export const underText = styled.p`
    font-size: 15px;
    color: #838382;
    margin-top: 5px;
    margin-left: 1px;
    
` 

export const formGroup = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;

`

export const ErrorsMessage = styled.p`
    color: ${colors.red};
    font-size: 13px;
    padding-top: 8px;
    transition: 0.5s;
`
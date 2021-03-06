import React from "react";
import styled from "styled-components"
import { createGlobalStyle } from "styled-components"
import logo from '../assets/images/logo.png'


const GlobalStyle = createGlobalStyle`
    body{
    margin:0px;
    padding:0px;
    color:white;    
  }
`
const Container = styled.div`
  margin:0px;

`

const Bloco = styled.div`
display: flex;
flex-direction: column;
color: black;
height: 70vh;
justify-content: center;
align-items: center;
color: #7c65ab;
button{
  background-color: #7c65ab;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  margin-left:25px;
  margin-right:25px;
  margin-bottom:20px;
  transition: all 0.5s ease-in-out;
  &:hover {
    box-shadow: 2px 2px 15px #ccc;
    background-color: #544985;
    cursor: pointer;
  }
}
div{
  margin-top:50px;
  display:flex;
  @media (max-width:490px){
    flex-direction:column;
  }
}
`

export default class Home extends React.Component {
  render() {
    const { registrar, irPraLista } = this.props
    return (
      <Container>
        <GlobalStyle />
        <Bloco>
          <h1>LabeNinja</h1>
          <img src={logo} alt="logo"/>
          <h3>O talento certo no momento certo</h3>
          <div>
            <button onClick={registrar}>QUERO SER UM NINJA</button>
            <button onClick={irPraLista}>QUERO CONTRATAR UM NINJA</button>
          </div>
        </Bloco>
      </Container>
    )
  }
}
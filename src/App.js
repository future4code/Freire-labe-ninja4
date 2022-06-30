import React from "react";
import styled, { createGlobalStyle }  from "styled-components"
import logo from "./assets/images/logo.png"
import Home from "./Pages/Home"
import Carrinho from "./Pages/Carrinho";
import DetalhesServico from "./Pages/detalhesServico";

const GlobalStyle = createGlobalStyle`
    body{
    margin:0px;
    padding:0px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #0e0e0e;
    box-sizing: border-box;

  }
`
const Container = styled.div`
  margin:0px;

`
const Header = styled.div`
  background-color:#F5F4FC;
  border:1px solid black;
  height:80px;
  padding:10px;
  display:flex;
  justify-content: space-between;
`
const Logo = styled.div`
  img{
    height:80px;
    margin-left:50px;
  }
`
const ButtonArea = styled.div`
  height:80px;
  margin-right:50px;
  display:flex;
  align-items: center;
`

export default class App extends React.Component {
  state = {
    paginaAtual: "home",
    servico: {
    },
    carrinho: []
  }

  handleAdicionarServicoAoCarrinho = () => {
    const { servico, carrinho } = this.state;

    const novoServico = {
      id: servico.id,
      titulo: servico.titulo,
      preco: servico.preco,
      prazo: servico.prazo,
      descricao: servico.descricao,
      formasDePagamento: servico.formasDePagamento
    }

    const novoCarrinho = [...carrinho, novoServico]

    this.setState({
      carrinho: novoCarrinho
    })
  }

  trocarPagina = () => {
    switch(this.state.paginaAtual){
      case "home":
        return <Home/>
      case "carrinho":
        return <Carrinho voltar={this.onClickHome}/>
      case "detalhes": 
        return <DetalhesServico voltarLista={this.onClickVoltarLista} servico={this.state.servico} adicionarAoCarrinho={this.handleAdicionarServicoAoCarrinho}/>
      default:
        return <Home/>
    }
  }

  onClickHome = () => {
    this.setState({paginaAtual: "home"})
  }
  
  onClickCarrinho = () => {
    this.setState({paginaAtual: "carrinho"})
  }

  onClickVoltarLista = () => {
    this.setState({
      paginaAtual: "lista"
    })
  }

  render(){
    const { carrinho } = this.state
    console.log("carrinho", carrinho)
    return (
      <Container>
        <GlobalStyle/>
        <Header>
          <Logo>
            <img src={logo} alt="logo"/>
          </Logo>
          <ButtonArea>
            <button onClick={this.onClickHome}>Home</button>
            <button onClick={this.onClickCarrinho}>Carrinho</button>
          </ButtonArea>
        </Header>
        {this.trocarPagina()}
      </Container>
    )
  }
}


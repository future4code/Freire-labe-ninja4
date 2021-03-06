import React from 'react';
import styled from "styled-components"
import axios from 'axios';
import Select from 'react-select';

const ContainerPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .react-select {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    > div {
      width: 94%;
      border-radius: 10px;
      border: 0;
    }
  }
  
`

const Container = styled.div`
  margin:0px;

`

const Text = styled.div`
    color: #7c65ab;
    margin-top: 40px;
    font-size: x-large;
`
const Form = styled.form`
    padding: 5px;
    width: 70%;   
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-content: center;
    background-color: #F5F4FC;
    border-radius: 10px;

    @media (min-width: 768px){
      width: 35%;
    }
`
const Input = styled.input`
    width: 93%;
    height: 3vh;
    margin: 5px;
    border-radius: 10px;
    border: 0;
    align-items: baseline; 
    
`

const Cadastro = styled.button`
    background-color: #7c65ab;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  margin:20px 60px;
  transition: all 0.5s ease-in-out;
  &:hover {
    box-shadow: 2px 2px 15px #ccc;
    background-color: #544985;
    cursor: pointer;
  }
`
const options = [
  {
    value: "Cartão de crédito",
    label: "Cartão de crédito"
  },
  {
    value: "Cartão de débito",
    label: "Cartão de débito"
  },
  {
    value: "Pix",
    label: "Pix"
  },
  {
    value: "Boleto",
    label: "Boleto"
  },
  {
    value: "Paypal",
    label: "Paypal"
  }
]

export default class ComponentForm extends React.Component {
  state = {
    inputTitulo: "",
    inputDescricao: "",
    inputPreco: "",
    inputPagamento: [],
    inputData: ""
  }

  onChangeTitulo = (ev) => {
    this.setState({ inputTitulo: ev.target.value })
  }

  onChangeDescricao = (ev) => {
    this.setState({ inputDescricao: ev.target.value })
  }

  onChangePreco = (ev) => {
    this.setState({ inputPreco: ev.target.value })
  }

  onChangePagamento = (e) => {
    this.setState({
      inputPagamento: Array.isArray(e) ? e.map(x => x.value) : []
    })
  }

  onChangeData = (ev) => {
    this.setState({ inputData: ev.target.value })
  }


  createJob = () => {
    const body = {
      title: this.state.inputTitulo,
      description: this.state.inputDescricao,
      price: Number(this.state.inputPreco),
      paymentMethods: this.state.inputPagamento,
      dueDate: this.state.inputData
    }

    axios.post('https://labeninjas.herokuapp.com/jobs', body,
      {
        headers: {
          Authorization: 'a3ec4097-49f2-4d14-a000-3955659ffee9'
        }
      }).then((res) => {
        this.handleLimparCampos()
        alert("Serviço cadastrado com sucesso!")
      }).catch((er) => {
        alert("Erro")
      })
  }

  handleLimparCampos = () => {
    this.setState({
      inputTitulo: "",
      inputDescricao: "",
      inputPreco: "",
      inputPagamento: [],
      inputData: ""
    })
  }

  render() {
    console.log(this.state.inputData, this.state.inputDescricao, this.state.inputPreco, this.state.inputTitulo, this.state.inputPagamento)
    return (
      <Container>
        <ContainerPage>
          <Text><b>Cadastre o seu serviço</b></Text>
          <br /><br />
          <Form>
            <label>
              <Input type="text" placeholder='Titulo' value={this.state.inputTitulo} onChange={this.onChangeTitulo} />
            </label>
            <label>
              <Input type="text" placeholder='Descrição' value={this.state.inputDescricao} onChange={this.onChangeDescricao} />
            </label>
            <label >
              <Input type="number" placeholder='Preço' value={this.state.inputPreco} onChange={this.onChangePreco} />
            </label>

            <Select
              className='react-select'
              value={options.filter(obj => this.state.inputPagamento.includes(obj.value))}
              onChange={this.onChangePagamento}
              options={options}
              isMulti
              isClearable
            />

            <label>
              <Input type="date" value={this.state.inputData} onChange={this.onChangeData} />
            </label>
          </Form>
          <div>
            <Cadastro type='submit' onClick={this.createJob} >Cadastrar Serviço</Cadastro>
          </div>
        </ContainerPage>
      </Container>

    )
  }
}
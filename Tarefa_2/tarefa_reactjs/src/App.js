import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';

function App() {

  
  const [id,setId] = useState('')
  const [descricao,setDescricao] = useState('')
  const [listaTarefa,setListaTarefa] = useState([])
  // Chama os dados
  useEffect(() => {
    buscar()
  }, [])

  // Retorna os dados
  function buscar(){
    axios.get('http://localhost:3100/tarefa').then(resultado => {
    console.log(resultado.data)
    setListaTarefa(resultado.data)
  })
  }

  // identifica e chama para excluir
  function excluirTarefa(id) {
    let item = listaTarefa.find(n => n.codigo === id)
    axios.delete(`http://localhost:3100/tarefa/${item.codigo}`).then(() => {
      buscar()
    })
  }

  // coloca os dados para excluir
  function editarTarefa(id) {
    let item = listaTarefa.find(n => n.codigo === id)
    setId(item.codigo)
    setDescricao(item.descricao)
    document.querySelector('#descricao').focus()
  }
  // Salva
  function salvar(event) {
    event.preventDefault();

    console.log(id)

    if (id){let tarefa = {
      codigo:id,
      descricao:descricao
      
    }
    axios.put('http://localhost:3100/tarefa',tarefa).then(()=>{
      buscar()
    })
    setId('')
    setDescricao('')

    console.log("tarefa", tarefa)}
  }
  return (
    <div className='container'>

      <form onSubmit={(event) => salvar(event)}>

      <div className='mb-3'>
        
        <label className='form-label'  > Id do produto</label>
        <input 
        id='idTabela'
        type="number" 
        className='form-control' 
        value={id} 
        onChange={(event)=>setId(event.target.value)}
        />
      
      </div>
        <div className='mb-3'>
      
          <label className='form-label'> Nome do produto</label>
          <input 
          id='descricaoTabela'
          type="text" 
          className='form-control' 
          value={descricao} 
          onChange={(event)=>setDescricao(event.target.value)}
          />
        
        </div>
        <button type='submit' className='btn btn-primary'>Salvar</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th id="id">Id</th>
            <th id="descricao">Nome</th>
            <th id ="acoes" >Concluido</th>
            <th id ="acoes" >Ações</th>

          </tr>
        </thead>
        <tbody>
          {
            listaTarefa.map((n,index) =>(
              <tr key={index}>
                <td id="id">{n.codigo}</td>
                <td>{n.descricao}</td>
                

                <td id="checkbox">
                  <input type="checkbox" class='checkbox'/>
                </td>

                <td id="botoes">
                  <button id="botao1" type="button" className='btn btn-info' onClick={() => editarTarefa(n.codigo)}>Editar</button>

                  <button id="botao2" type="button" className='btn btn-danger' onClick={() => excluirTarefa(n.codigo)}>Excluir</button>
                  </td>


                  
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;

import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';

function App() {

  
  const [id,setId] = useState(null)
  const [nome,setNome] = useState('')
  const [serie,setSerie] = useState('')
  const [repeticao,setRepeticao] = useState('')
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
    setNome(item.nome)
    setSerie(item.serie)
    setRepeticao(item.repeticao)
    
    document.querySelector('#nome').focus()
    document.querySelector('#serie').focus()
    document.querySelector('#repeticao').focus()
    
  }
  // Salva
  function salvar(event) {
    event.preventDefault();
    console.log(id);

    let tarefa = {
      codigo:id,
      nome:nome,
      serie:serie,
      repeticao:repeticao
    };
    
    

    axios.put('http://localhost:3100/tarefa',tarefa).then(()=>{
      buscar();
    });
    setId(null)
    setNome('')
    setSerie('')
    setRepeticao('')

}
  
  return (
    <div className='container'>

      <form onSubmit={(event) => salvar(event)}>

      <div className='mb-3'>
        

      
      </div>

      <div className='mb-3'>
      
          <label className='form-label'>Nome do exercício</label>
          <input 
          id='nomeTabela'
          type="text" 
          className='form-control' 
          value={nome} 
          onChange={(event)=>setNome(event.target.value)}
          />
        
        </div>

        <div className='mb-3'>
      
          <label className='form-label'>Quantidade de séries</label>
          <input 
          id='serieTabela'
          type="number" 
          className='form-control' 
          value={serie} 
          onChange={(event)=>setSerie(event.target.value)}
          />
        </div>

        <div className='mb-3'>
      
          <label className='form-label'>Número de repeticões</label>
          <input 
          id='repeticaoTabela'
          type="number" 
          className='form-control' 
          value={repeticao} 
          onChange={(event)=>setRepeticao(event.target.value)}
          />
        </div>

        <button type='submit' className='btn btn-primary'>Salvar</button>
        <p></p>
      </form>

      <table className="table">
        <thead>
          <tr>

            <th id="nome">Nome do exercício</th>
            <th id="serie">Quantidade de séries</th>
            <th id="repeticao">Repeticões</th>
            <th id ="acoes" >Concluído</th>
            <th id ="acoes" >Ações</th>

          </tr>
        </thead>
        <tbody>
          {
            listaTarefa.map((n,index) =>(
              <tr key={index}>


                <td>{n.nome}</td>
                <td>{n.serie}</td>
                <td>{n.repeticao}</td>
                

                <td id="checkbox">
                  <input type="checkbox" className='checkbox'/>
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

import './App.css';
import { useState, useEffect } from 'react';
import Item from './components/item';
import React from 'react';

function App() {
  
  const [itens, setItens] = useState([]);
  const [filterItens, setFilterItens] = useState({filter: false, active: true})

  function getData() {
    fetch('http://localhost:3000/todo/list', { method: "GET" })
      .then(response => response.json())
      .then(data => setItens(data))
  }

  function insertDocument() {
    fetch("http://localhost:3000/todo/add", 
    {
      method: "POST",
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify({ "text": "", "active": true })
    })
      .then(response => response.json())
      .then(() => getData())
  }

  function updateDocument(updatedItem) {
    fetch("http://localhost:3000/todo/update", {
        method: "PATCH",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(updatedItem) // Envie o objeto diretamente
    })
        .then(response => response.json())
        .then(() => getData());
}

  function deleteDocument(item) {
    fetch("http://localhost:3000/todo/delete", {
        method: "DELETE",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ _id: item._id }) // Certifique-se de que está enviando apenas o _id
    })
        .then(response => response.json())
        .then(() => getData());
}

  useEffect(() => {
    getData()
  },[])

  const itensToShow = filterItens.filter ? itens.filter(item => item.active === filterItens.active) : itens

  return (
    <div className="wrapper">
      <div className='to-do-list'>
      <h1>To Do App</h1>

      {
        itensToShow.map(item => {
          return (<Item item={item} updateDocument={updateDocument} deleteDocument={deleteDocument} />) // Adicione uma key única
        })
      }
    <div className='buttonRow'>
      <button 
        onClick={() => setFilterItens({ filter: false })}
        style={ filterItens.filter ? {} : {fontWeight: "bold"}}
      >Todos</button>
      <button 
        onClick={() => setFilterItens({ filter: true, active: true })}
        style={((filterItens.filter) && (filterItens.active === true)) ? { fontWeight: "bold" } : {}}
      >Pendentes</button>
      <button 
      onClick={() => setFilterItens({ filter: true, active: false })}
      style={((filterItens.filter) && (filterItens.active === false)) ? { fontWeight: "bold" } : {}}
      >Concluídos</button>
      </div>

      <div className='buttonRow'>
      <button onClick={insertDocument}>Inserir novo To-do</button>
      </div>
      </div>
    </div>
  );
}

export default App;
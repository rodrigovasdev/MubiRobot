import React, { useState, useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Cuestionario from './components/MainModule.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Inputpreferences from './components/inputpreferences.jsx';
import Bot from './components/Bot.jsx';
import Row from 'react-bootstrap/esm/Row.js';
import Col from 'react-bootstrap/esm/Col.js';
import { createContext } from 'react';
import MiContexto from './components/MainModule.jsx';
import Button from 'react-bootstrap/esm/Button.js';
function App() {
    
  
  const [vectorjeje, setVectorjeje] = useState ([]);
  const [mostrarComponente, setMostrarComponente] = useState(true);
  const handleData = (dataFromChild) => {
    console.log(dataFromChild);
    setVectorjeje(dataFromChild) // Aquí puedes hacer lo que necesites con la data
  }
  const handleDataInput = (dataFromInput) => {
    console.log(dataFromInput);
    setVectorjeje(vectorjeje.concat([dataFromInput])); // Aquí puedes hacer lo que necesites con la data
  }
  function getRecomendaciones(){
    console.log(vectorjeje);
    const nuevoJSON = JSON.stringify(vectorjeje);
    console.log(nuevoJSON);
  }
  const handleEvento = () => {
    // Realiza las acciones necesarias
    // ...

    // Actualiza el estado para mostrar el componente
    setMostrarComponente(true);
  };

  const style = {
    backgroundColor: '#2f001c',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    width: '100%',
    height: '100%',
    position: 'fixed',
  };
  return (
    <>
      <div class="container-fluid px-5 py-2 bg-gradient" style={style}>   
          <Navbar variant='default' className='navbar border rounded-pill bg-dark-subtle shadow-m '>
            <Container>
              <Navbar.Brand href="#home">
                Recommenbot
              </Navbar.Brand>
            </Container>
          </Navbar>
        
          <Row>
            <Col>
              <Container className='m-0 p-0 mt-5 pt-5'>
                  <Bot></Bot>
              </Container>
            </Col>
            <Col xs={5}>
              <Container className='py-5 mt-5'>
                <Cuestionario onSendData={handleData}></Cuestionario> 
              </Container>
              {mostrarComponente && <Container className='py-4 px-4 w-100 border rounded border-dark bg-dark-subtle shadow-m ' >
                                      <Inputpreferences onSendData={handleDataInput}></Inputpreferences>
                                    </Container>
              }
            </Col>
            <Col>3 of 3
              <Button onClick={() =>{getRecomendaciones()}}></Button>
            </Col>
          </Row>
          
          
      </div>
    </>
  )
}

export default App

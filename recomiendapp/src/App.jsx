import React, { useState, useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Cuestionario from './components/MainModule.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Inputpreferences from './components/Inputpreferences.jsx';
import Bot from './components/Bot.jsx';
import Row from 'react-bootstrap/esm/Row.js';
import Col from 'react-bootstrap/esm/Col.js';
import Results from './components/Results.jsx';
import { motion } from 'framer-motion';
function App() {

  const [vectorjeje, setVectorjeje] = useState ([]);
  const [showInputComp, setShowInputComp] = useState(false);
  const [showRobotComp, setShowRobotComp] = useState(true);
  const [showResultsComp, setShowResultsComp] = useState(false);
  const handleDataCuestionario = (dataCuestionario) => {
    console.log('AQUI LA DATA'+dataCuestionario);

     // Aquí puedes hacer lo que necesites con la data
    console.log(dataCuestionario)
    //const nuevoJSON = JSON.stringify(dataCuestionario);
    
    setVectorjeje(dataCuestionario);
    setShowInputComp(true);
  }
  const handleDataInput = (dataFromInput) => {
    console.log('datafrominputtt 1'+dataFromInput);
    console.log('vector jeejejej 1'+vectorjeje);
    if (dataFromInput != null)
      setVectorjeje(vectorjeje.concat(dataFromInput)); 
    console.log('vector jeejejej 2'+vectorjeje);
    setShowInputComp(false);
    setShowRobotComp(false);
    setShowResultsComp(true);
  }
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
                <Container className='mx-5 px-5'>

                  <img
                  src="/src/images/MubiBot_navbar2.png"
                  width="198"
                  height="60"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                />

                </Container>
              </Navbar.Brand>
            </Container>
          </Navbar>
          
          <Row>
           
          {showResultsComp &&
              <Container className='pt-3 mt-2 text-center'>
                <Results preferencias = {vectorjeje}></Results>
              </Container>}
            <Col>
            {showRobotComp &&
              <Container className='m-0 p-0 mt-5 pt-5'>
                  <Bot></Bot>
              </Container>}
            </Col>
            <Col xs={5}>


              <Container className='py-5 mt-5 '>
                <Cuestionario onSendData={handleDataCuestionario}></Cuestionario> 
              </Container>
            

              <motion.div
                animate={{ rotate: [0, 0, 270, 270, 0], scale: [1, 2, 2, 1, 1], borderRadius: ["20%", "20%", "50%", "50%", "20%"],}}
                > 
            
                {showInputComp && <Container className='py-3 mt-5 pt-4 px-4 w-100 start-100 border rounded border-dark bg-dark-subtle shadow-m ' >
                                        <Inputpreferences onSendData={handleDataInput}></Inputpreferences>
                                      </Container>
                }
              </motion.div>
            </Col>
                <Col>
                 
                </Col>
          </Row>
      </div>
    </>
  )
}

export default App

import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { motion ,useAnimation} from "framer-motion"

function Cuestionario({onSendData}){
    const [show, setShow] = useState(true);
    const [showSaltarButton, setSaltarButton] = useState(false);
    console.log('Primera linea comp')
    const [pregunta, setNombre] = useState('');
    const [r1, setR1] = useState('datos[0].pregunta');
    const [r2, setR2] = useState('as');
    const [r3, setR3] = useState('0');
    const [r4, setR4] = useState('0');
    const [datos, setDatos] = useState(null);
    const [indice, setIndice] = useState(1);
    const [vector, setVector] = useState([]);
   
  useEffect(() => {
    let cancelarSolicitud = false; // Variable para rastrear si el componente se ha desmontado
    
    // Función asíncrona para realizar la consulta
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/preguntas');

        // Verificar si el componente se ha desmontado antes de actualizar el estado
        if (!cancelarSolicitud) {
          setDatos(response.data);
          console.log('consultaaa' + response.data)
          setNombre(response.data[0].pregunta);
          setR1(response.data[0].respuestas[1]);
          setR2(response.data[0].respuestas[3]);
          setR3(response.data[0].respuestas[6]);
          setR4(response.data[0].respuestas[2]);
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    // Llamada a la función de consulta solo cuando datos aún no ha sido cargado
    if (!datos) {
      fetchData();
      
    }
    
    // Función de limpieza que se ejecuta cuando el componente se desmonta
    return () => {
      cancelarSolicitud = true; // Marcar que el componente se está desmontando
    };
  }, [datos]); // La dependencia aquí asegura que el efecto se ejecute solo cuando datos cambie

  function enviarData(){
    onSendData(vector);
    setShow(false);
  }
  function cambiarPregunta(prop){
    setVector([...vector , prop]);
    if (indice == 2){
      setSaltarButton(true);
    }
    if (indice == 5){
      enviarData()
    }else{
      setIndice(indice+1);
      setNombre(datos?.[indice].pregunta);
      setR1(datos?.[indice].respuestas[1]);
      setR2(datos?.[indice].respuestas[3]);
      setR3(datos?.[indice].respuestas[6]);
      setR4(datos?.[indice].respuestas[2]);
    }
    
  }

    if(datos){
      return show &&(
            <>
              <motion.div animate={{ x: 50 }}transition={{ type: "spring", stiffness: 100 }}>
                  <Row >    
                      <Col>
                          <Container className='shadow-lg border border-black rounded-pill py-4 px-5 bg-dark-subtle' >
                              <Container className='position-relative w-50 py-3 px-3 fs-4 shadow-sm p-3 mb-4 text-bg-secondary border border-white rounded-pill text-center '> {pregunta} </Container>
                              
                              <Row className='py-1'>
                                  <Col className='text-center py-1'><Button onClick={() =>cambiarPregunta(r1)} size="lg"variant="light"> {r1}</Button>{' '}</Col>
                                  <Col className='text-center py-1'><Button onClick={() =>cambiarPregunta(r2)}size="lg"variant="light">{r2}</Button>{' '}</Col>
                                  
                              </Row>
    
                              <Row className='py-1'>
                              <Col className='text-center py-3'><Button onClick={() =>cambiarPregunta(r3)}size="lg"variant="light">{r3}</Button>{' '}</Col>
                                  <Col className='text-center py-3'><Button onClick={() =>cambiarPregunta(r4)}size="lg"variant="light">{r4}</Button>{' '}</Col>
                              </Row>
                              <Row>
                                {showSaltarButton && <Col className='text-center'>
                                <Button onClick={() => enviarData()} className='py-2 mb-2 w-25 text-center btn btn-dark'>Saltar Cuestionario</Button>
                                </Col>}
                              
                                
                              </Row>
                          </Container>
                      </Col>               
                  </Row>
                </motion.div>
                
            </>
        )

    }
}

export default Cuestionario;

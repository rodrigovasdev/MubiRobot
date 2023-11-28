import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/esm/Button";
import Stack from 'react-bootstrap/Stack';
import axios from 'axios';
import { useEffect } from "react";
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
function Results({preferencias}){
    const [GenerarMasRecomendacionesbuttonState, setGenerarMasRecomendacionesbuttonState] = useState(false);
    const [response, setResponse] = useState();
    const [showProgress, setShowProgress] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [titulo1, setTitulo1] = useState();
    const [titulo2, setTitulo2] = useState();
    const [titulo3, setTitulo3] = useState();
    const [titulo4, setTitulo4] = useState();
    const [titulo5, setTitulo5] = useState();
    const [poster1, setPoster1] = useState('https://www.themoviedb.org/t/p/original');
    const [poster2, setPoster2] = useState('https://www.themoviedb.org/t/p/original');
    const [poster3, setPoster3] = useState('https://www.themoviedb.org/t/p/original');
    const [poster4, setPoster4] = useState('https://www.themoviedb.org/t/p/original');
    const [poster5, setPoster5] = useState('https://www.themoviedb.org/t/p/original');
    const [descripcion1, setDescripcion1] = useState();
    const [descripcion2, setDescripcion2] = useState();
    const [descripcion3, setDescripcion3] = useState();
    const [descripcion4, setDescripcion4] = useState();
    const [descripcion5, setDescripcion5] = useState();
    
    useEffect(() => {
        const enviarDatos = async () => {
          try {
            // Realizar la solicitud POST utilizando Axios
            //const respuesta = await axios.post('http://127.0.0.1:5000/api/post/preferencias',preferencias);
            const respuesta = await axios.post('http://127.0.0.1:5000/api/post/preferencias',preferencias);
            setResponse(respuesta);
            setShowProgress(false);
    
            // Aquí puedes manejar la respuesta de la solicitud POST
            console.log('Respuesta:', respuesta.data[2].titulo);
            setTitulo1(respuesta.data[0].titulo);
            setTitulo2(respuesta.data[1].titulo);
            setTitulo3(respuesta.data[2].titulo);
            setTitulo4(respuesta.data[3].titulo);
            setTitulo5(respuesta.data[4].titulo);

            setPoster1(poster1 + respuesta.data[0].poster);
            setPoster2(poster2 + respuesta.data[1].poster);
            setPoster3(poster3 + respuesta.data[2].poster);
            setPoster4(poster4 + respuesta.data[3].poster);
            setPoster5(poster5 + respuesta.data[4].poster);

            setDescripcion1(respuesta.data[0].descripcion);
            setDescripcion2(respuesta.data[1].descripcion);
            setDescripcion3(respuesta.data[2].descripcion);
            setDescripcion4(respuesta.data[3].descripcion);
            setDescripcion5(respuesta.data[4].descripcion);
            
          } catch (error) {
            // Manejar errores de la solicitud POST
            
            console.error('Error en la solicitud POST:', error);
            setShowModal(true);
            
          }
        };
    
        // Llamar a la función para enviar datos cuando el componente se monte
        enviarDatos();
      }, []); // El segundo argumento vacío indica que este efecto se ejecutará solo una vez al montar el componente 
      const redirigirPaginaPrincipal = () => {
        window.location.href = '/';
      };
      function GenerarMasRecomendaciones (){
            setTitulo1(response.data[5].titulo);
            setTitulo2(response.data[6].titulo);
            setTitulo3(response.data[7].titulo);
            setTitulo4(response.data[8].titulo);
            setTitulo5(response.data[9].titulo);

            setPoster1('https://www.themoviedb.org/t/p/original'+ response.data[5].poster);
            setPoster2('https://www.themoviedb.org/t/p/original'+ response.data[6].poster);
            setPoster3('https://www.themoviedb.org/t/p/original'+ response.data[7].poster);
            setPoster4('https://www.themoviedb.org/t/p/original'+ response.data[8].poster);
            setPoster5('https://www.themoviedb.org/t/p/original'+ response.data[9].poster);

            setDescripcion1(response.data[5].descripcion);
            setDescripcion2(response.data[6].descripcion);
            setDescripcion3(response.data[7].descripcion);
            setDescripcion4(response.data[8].descripcion);
            setDescripcion5(response.data[9].descripcion);
            setGenerarMasRecomendacionesbuttonState(true);
      }
      return(
        <>  
           {showModal &&  <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Centered Modal</h4>
                <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                consectetur ac, vestibulum at eros.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
            </Modal>}

           {showProgress &&  <Container>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner> 
                <Container className='position-relative w-50 py-3 px-3 fs-4 shadow-sm p-3 mb-4 text-bg-secondary border border-white rounded-pill text-center mt-4 '> Estamos generando tus recomendaciones! </Container>   

           </Container>
           
           }
            {titulo1 && <Stack direction="horizontal" className="p-5" gap={3}>
                    <div className="p-2">
                        <Container >
                            <Card style={{ width: '100%', maxHeight: '70vh'}}>
                                <Card.Img  variant="top" src={poster1} style= {{  maxHeight: '100%' }}/>
                                <Card.Body className="overflow-y-auto" >
                                    <Card.Title>{titulo1}</Card.Title>
                                    <Card.Text >
                                       
                                            {descripcion1}
                                        
                                    </Card.Text>
                                </Card.Body>
                                </Card>
                            </Container>
                    </div>
                    <div className="p-2"><Container >
                        <Card style={{ width: '100%', maxHeight: '70vh'}}>
                            <Card.Img  variant="top" src={poster2} style= {{  maxHeight: '100%' }}/>
                            <Card.Body className="overflow-y-auto" >
                                <Card.Title>{titulo2}</Card.Title>
                                <Card.Text className="overflow-y-auto" >
                                
                                        {descripcion2}
                                    
                                </Card.Text>
                            </Card.Body>
                            </Card>
                        </Container>
                    </div>
                    <div className="p-2"><Container className="">
                        <Card style={{ width: '100%',maxHeight: '70vh'}}>
                            <Card.Img  variant="top" src={poster3} style= {{  maxHeight: '100%' }} />
                            <Card.Body className="overflow-y-auto" >
                                <Card.Title>{titulo3}</Card.Title>
                                <Card.Text className="overflow-y-auto">
                                        {descripcion3}
                                </Card.Text>
                            </Card.Body>
                            </Card>
                        </Container>
                    </div>
                    <div className="p-2"><Container className="">
                        <Card style={{ width: '100%', maxHeight: '70vh'}}>
                            <Card.Img  variant="top" src={poster4} style= {{  maxHeight: '100%' }}/>
                            <Card.Body className="overflow-y-auto">
                                <Card.Title>{titulo4}</Card.Title>
                                <Card.Text>
                               
                                        {descripcion4}
                                   
                                </Card.Text>
                            </Card.Body>
                            </Card>
                        </Container>
                    </div>
                    <div class="p-2"><Container className="">
                        <Card style={{ width: '100%',maxHeight: '70vh'}}>
                            <Card.Img  variant="top" src={poster5} style= {{ maxHeight: '100%' }}/>
                            <Card.Body className="overflow-y-auto">
                                <Card.Title>{titulo5}</Card.Title>
                                <Card.Text>
                               
                                        {descripcion5}
                                    
                                </Card.Text>
                            </Card.Body>
                            </Card>
                        </Container>
                    </div>
                    
            </Stack>
            
            }
            { titulo1 &&
            <Container>

                <Button className="p-2 mx-4 btn btn-dark" disabled={GenerarMasRecomendacionesbuttonState} onClick={GenerarMasRecomendaciones}>Generar mas mubis</Button>
                <Button className="p-2 mx-4 btn btn-dark" onClick={redirigirPaginaPrincipal}>Volver a empezar</Button>

            </Container>}
            
        </>
    )
}

export default Results;
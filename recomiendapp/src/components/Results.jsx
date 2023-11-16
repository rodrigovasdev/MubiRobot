import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/esm/Button";
import Stack from 'react-bootstrap/Stack';
import axios from 'axios';
import { useEffect } from "react";
function Results({preferencias}){
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
            // Datos que deseas enviar en la solicitud POST 
            // Realizar la solicitud POST utilizando Axios
            const respuesta = await axios.post('http://127.0.0.1:5000/api/post/preferencias',preferencias);
    
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
          }
        };
    
        // Llamar a la función para enviar datos cuando el componente se monte
        enviarDatos();
      }, []); // El segundo argumento vacío indica que este efecto se ejecutará solo una vez al montar el componente // La dependencia aquí asegura que el efecto se ejecute solo cuando datos cambie
    return(
        <>  
            <Stack direction="horizontal" gap={3}>
                <div className="p-2"><Container className="">
                        <Card style={{ width: '18rem' }}>
                            <Card.Img  variant="top" src={poster1} />
                            <Card.Body >
                                <Card.Title>{titulo1}</Card.Title>
                                <Card.Text>
                                {descripcion1}
                                </Card.Text>
                            </Card.Body>
                            </Card>
                        </Container>
                    </div>
                    <div className="p-2"><Container className="">
                        <Card style={{ width: '18rem' }}>
                            <Card.Img  variant="top" src={poster2} />
                            <Card.Body >
                                <Card.Title>{titulo2}</Card.Title>
                                <Card.Text>
                                {descripcion2}
                                </Card.Text>
                            </Card.Body>
                            </Card>
                        </Container>
                    </div>
                    <div className="p-2"><Container className="">
                        <Card style={{ width: '18rem' }}>
                            <Card.Img  variant="top" src={poster3} />
                            <Card.Body >
                                <Card.Title>{titulo3}</Card.Title>
                                <Card.Text>
                                {descripcion3}
                                </Card.Text>
                            </Card.Body>
                            </Card>
                        </Container>
                    </div>
                    <div className="p-2"><Container className="">
                        <Card style={{ width: '18rem' }}>
                            <Card.Img  variant="top" src={poster4} />
                            <Card.Body >
                                <Card.Title>{titulo4}</Card.Title>
                                <Card.Text>
                                {descripcion4}
                                </Card.Text>
                            </Card.Body>
                            </Card>
                        </Container>
                    </div>
                    <div className="p-2"><Container className="">
                        <Card style={{ width: '18rem' }}>
                            <Card.Img  variant="top" src={poster5}/>
                            <Card.Body >
                                <Card.Title>{titulo5}</Card.Title>
                                <Card.Text>
                                {descripcion5}
                                </Card.Text>
                            </Card.Body>
                            </Card>
                        </Container>
                    </div>
            </Stack>
            
        </>
    )
}

export default Results;
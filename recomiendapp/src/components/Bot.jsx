import React from 'react';
import miImagen from "../images/robotjeje.png";
import Container from 'react-bootstrap/esm/Container';

function Bot(){
    return(
        <>
            <Container className=''>
                <img src={miImagen} alt="Descripción de la imagen" width="auto"
                  height="auto"/>
            </Container>
        </>

    )
}

export default Bot;
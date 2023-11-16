import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
function Inputpreferences({ onSendData }){
    const [preferencia, setPreferencia] = useState('');
    const [inputValue, setInput] = useState();
    const handleInputChange = (event) => {
      setInput(event.target.value);
    };
   
    function pepefuncion(){
        onSendData(inputValue);
    }
    return (
        <>
        
        <Container className='position-relative w-75 py-3 px-3 fs-4 shadow-sm p-3 mb-4 text-bg-secondary border border-white rounded-pill text-center '> Ya capturamos tus preferencias!
        Click en generar Mubis</Container>
                  <Container className='text-center'>A continuacion, puedes agregar los actores, directores, lugares que desees o puedes generar ya tus Mubis</Container>                       
        <Form>
          <div class="input-group mb-3 pt-4">
            <input type="text" value={inputValue}  onChange={handleInputChange} class="form-control" placeholder="Agrega mas opciones !" aria-label="Recipient's username" aria-describedby="button-addon2"/>
            <button class="btn btn-secondary" onClick={pepefuncion} type="button" id="button-addon2">Generar Mubis</button>
          </div>
        </Form>
                  
        
        </>
    );
  }

export default Inputpreferences;
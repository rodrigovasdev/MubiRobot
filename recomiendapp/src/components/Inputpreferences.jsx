import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
function Inputpreferences({ onSendData }){
    const [preferencia, setPreferencia] = useState('');
    function pepefuncion(){
        onSendData(preferencia)
    }
    return (
        <>
        <Form>
            <Form.Group className="mb-3">
              <Form.Label >Disabled asdasinput</Form.Label>
              <Form.Control  onClick={(e) => {setPreferencia(e.target.value)}}placeholder="Disabled input" />
            </Form.Group>
        </Form>
              <Button onClick={pepefuncion} >Submit</Button>      
        
        </>
    );
  }

export default Inputpreferences;
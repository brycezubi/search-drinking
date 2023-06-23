import { useState } from "react";
import { Button, Form, Row, Col ,Alert} from "react-bootstrap";
import useCategorias from "../hooks/useCategorias";
import useBebidas from "../hooks/useBebidas";

const Formulario = () => {

  const [busqueda , setBusqueda] = useState({
    nombre:'',
    categoria:''
  })

  const [alerta , setAlerta] =  useState('')

  const { categorias } = useCategorias();
  const { consultarBebida } = useBebidas()

  const handleSubmit =(e)=>{
    e.preventDefault()

    if(Object.values(busqueda).includes('')){
      setAlerta('Campos Obligatorios')
      return
    }
    setAlerta('')
    consultarBebida(busqueda)
  }


  return (
    <Form 
      onSubmit={handleSubmit}
    >
      {alerta && <Alert variant="danger" className="text-center">{alerta}</Alert>}
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="nombre">Nombre Bebida</Form.Label>
            <Form.Control
              id="nombre"
              type="text"
              placeholder="ej: bebidas..."
              name="nombre"
              value={busqueda.nombre}
              onChange={e=>setBusqueda({
                ...busqueda,
                [e.target.name]:e.target.value
              })}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="categoria">Categoria de Bebida</Form.Label>
            <Form.Select 
              id="categoria" 
              name="categoria"
              value={busqueda.categoria}
              onChange={e=>setBusqueda({
                ...busqueda,
                [e.target.name]:e.target.value
              })}
            >
              <option value="">--- Selecciona Categoria ---</option>
              {categorias?.map((cat, index) => (
                <option key={index} value={cat.strCategory}>
                  {cat.strCategory}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="justify-content-end">
        <Col md={3}>
          <Button 
            className="text-uperrcase w-100" 
            variant="danger"
            type="submit"
          >Buscar Bebidas</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Formulario;

import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import useBebidas from "../hooks/useBebidas";

const Bebidas = ({ bebida }) => {
  const {toogleModal , handleBebidaID} =  useBebidas()
  return (
    <Col md={4} lg={3} >
      <Card className="mb-4">
        <Card.Img variant="top" src={bebida.strDrinkThumb} />
        <Card.Body>
          <Card.Title className="text-center">{bebida.strDrink}</Card.Title>
          <Button 
            onClick={()=>{
              toogleModal()
              handleBebidaID(bebida.idDrink)
            }}
            className="w-100 text-center text-uppercase mt-2" variant="warning">
            Ver Receta
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Bebidas;

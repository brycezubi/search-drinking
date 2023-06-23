import React from 'react'
import useBebidas from '../hooks/useBebidas'
import { Row } from 'react-bootstrap'
import Bebidas from './Bebidas'

const ListadoBebidas = () => {

  const { bebidas } =  useBebidas()
  // console.log(bebidas)

  return (
    <Row className="mt-4">
      {bebidas?.map(bebida =>(
        <Bebidas 
          key={bebida.idDrink}
          bebida = {bebida}
        />
      ))}
    </Row>
  )
}

export default ListadoBebidas
import { useState, useEffect, createContext } from "react";

const CategoriasContext  = createContext();

const CategoriasProvider =({ children} ) =>{

  const [categorias, setCategorias] = useState([])

  useEffect(() => {
    obtenerCategorias();
  }, [])

  const obtenerCategorias = async()=>{
    try {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
      const respuesta  = await fetch(url)
      // console.log(respuesta)
      if(!respuesta.ok){
        throw new Response('Error en la URL')
      }
      const {drinks} = await respuesta.json()
      // console.log(drinks)  
      setCategorias(drinks)
    } catch (error) {
      console.log(error)
    }
  }
  


  return (
    <CategoriasContext.Provider
      value={{
        categorias
      }}
    >
      {children}
    </CategoriasContext.Provider>
  )
}

export {
  CategoriasProvider
}

export default CategoriasContext
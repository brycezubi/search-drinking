import { createContext, useEffect, useState } from "react";

const BebidasContext = createContext();

const BebidasProvider = ({ children }) => {
  const [bebidas, setBebidas] = useState([]);
  const [modal, setModal] = useState(false);
  const [bebidaId, setBebidaId] = useState("");
  const [receta , setReceta] =  useState({})
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    setCargando(true)
    const obtenerReceta = async () => {
      if (!bebidaId) return;

      try {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`;
        const respuesta = await fetch(url)
        const resultado =  await respuesta.json()
        setReceta(resultado.drinks[0])
      } catch (error) {
        console.log(error);
      } finally{
        setCargando(false)
      }
    };

    obtenerReceta()
  }, [bebidaId]);

  const consultarBebida = async (data) => {
    try {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${data.nombre}&c=${data.categoria}`;
      const respuesta = await fetch(url);
      // console.log(respuesta);
      if (!respuesta.ok) {
        throw new Response("Error al conectar con la API");
      }
      const { drinks } = await respuesta.json();
      // console.log(drinks);
      setBebidas(drinks);
    } catch (error) {
      console.log(error);
    }
  };

  const toogleModal = () => {
    setModal((modal) => !modal);
  };

  const handleBebidaID = (id) => {
    setBebidaId(id);
    console.log(id);
  };

  return (
    <BebidasContext.Provider
      value={{
        consultarBebida,
        bebidas,
        modal,
        toogleModal,
        handleBebidaID,
        receta,
        cargando
      }}
    >
      {children}
    </BebidasContext.Provider>
  );
};

export { BebidasProvider };

export default BebidasContext;

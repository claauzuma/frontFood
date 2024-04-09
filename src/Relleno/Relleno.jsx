import React from 'react'
import './Relleno.css'

const Relleno = () => {
  return (
    <>
    <div className='cuadro'>

    <h3 className='titulo'>Elegi que comida es</h3>

<select>
    <option value="opcion1">Desayuno</option>
    <option value="opcion2">Almuerzo</option>
    <option value="opcion3">Merienda</option>
    <option value="opcion3">Cena</option>
</select>
    
    <button className='botonCuadro'>Rellenar</button>

    </div>
    

    </>
    
  )
}

export default Relleno
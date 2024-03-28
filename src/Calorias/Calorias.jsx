import React, { useEffect } from 'react'
import { useState  } from 'react';

const Calorias = (props) => {
  const { proteinas, carbohidratos, grasas, setProteinas, setCarbohidratos, setGrasas, calorias, setCalorias,tipo } = props;

  const [inputProte, setInputProte] = useState(false);
  const [inputCarbo, setInputCarbo] = useState(false);
  const [inputGrasas, setInputGrasas] = useState(false);



  return (

<>

    <div className="container topInputs">
    <div className="inputContainer">
        <label htmlFor="Proteinas">Proteinas</label>
        <input
            className="inputNumerico"
            type="text"
            value={proteinas}
            onChange={(e) => {
                setProteinas(e.target.value);
                console.log("Seteamos proteinas " + e.target.value)
                if(tipo == "automatico") {
                  if(e.target.value =="") {
                    setInputProte(false)
                    console.log("Input prote false")

                  } else {
                    setInputProte(true)
                    console.log("Input prote true")

                  }
                 

               


                }

            }}
        />
    </div>
    <div className="inputContainer">
        <label htmlFor="Carbohidratos">Carbohidratos</label>
        <input
            className="inputNumerico"
            type="text"
            value={carbohidratos}
            onChange={(e) => {
                setCarbohidratos(e.target.value);
                if(tipo == "automatico") {
                  if(e.target.value =="") {
                    setInputCarbo(false)
                    console.log("Input carbos false")

                  } else {
                    setInputCarbo(true)
                    console.log("Input carbos true")

                  }
                


                }

            }}
        />
    </div>
    <div className="inputContainer">
        <label htmlFor="Grasas">Grasas</label>
        <input
            className="inputNumerico"
            type="text"
            value={grasas}
            onChange={(e) => {
                setGrasas(e.target.value);
                if(tipo == "automatico") {
                  if(e.target.value =="") {
                    setInputGrasas(false)
                    console.log("Input grasas false")

                  } else {
                    setInputGrasas(true)
                    console.log("Input grasas true")

                  }
                


                }

            }}
        />
    </div>
    <div className="inputContainer">
        <label htmlFor="Calorias">Calorias</label>
        <input
            className="inputNumerico"
            type="text"
            value={calorias}
            onChange={(e) => setCalorias(e.target.value)}

        />
    </div>
</div>
</>
  )
}

export default Calorias

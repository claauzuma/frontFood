import React from 'react'

const Calorias = (props) => {
  const { proteinas, carbohidratos, grasas, setProteinas, setCarbohidratos, setGrasas, calorias, setCalorias } = props;
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

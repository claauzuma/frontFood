import React from 'react';
import './Menuprincipal.css'; // Archivo CSS donde definirás tus estilos

const Menuprincipal = () => {
    const datos = [
        { nombre: "Pechuga de pollo", cantidad: "50 gramos" },
        { nombre: "Otro alimento", cantidad: "100 gramos" },
        // Agrega más datos según sea necesario
      ];
    
      return (
        <div className="contenedorPadre">

          {datos.map((alimento, index) => (
            <div key={index} className="contenedor">

              <div style={{ marginRight: '10px' }}>
                <img className="img" src="/images/pechugapollo.jpg" alt="" style={{ width: '50px', height: 'auto', marginBottom: '15px', marginRight: '5px' }} />
              </div>
              <div className="nombreAlimento" style={{ marginRight: '10px' }}>
                <h4>{alimento.nombre}</h4>
              </div>
              
              <div>
                <h4 className='cantidadAlimento'>{alimento.cantidad}</h4>
              </div>


            </div>
          ))}

        </div>
      );
    }
export default Menuprincipal;
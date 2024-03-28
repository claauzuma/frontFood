import React, { useState } from 'react';
import './App.css';
import TablaAlimentos from './TablaAlimentos';
import Bienvenida from './Bienvenida/Bienvenida.jsx';

function App() {
  const [count, setCount] = useState(0);

  let cantidad = 2;

  // Creamos un array de 5 elementos, donde cada elemento es un componente <TablaAlimentos />
  const tablas = Array.from({ length: cantidad }, (_, index) => <TablaAlimentos key={index} />);

  return (
    <>
      <Bienvenida />
      {/* Renderizamos el array de componentes */}
      <br />
      {tablas}
    </>
  );
}

export default App;
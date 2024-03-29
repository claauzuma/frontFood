import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './tablaAlimentos.css';
import Select from 'react-select';
import Calorias from './Calorias/Calorias';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function TablaAlimentos() {



    const [showModal, setShowModal] = useState(false);

    const [showModal2, setShowModal2] = useState(false);

    const handleEvent = (calorias, caloriasTotales) => {

        if (calorias == caloriasTotales) {
            console.log("Las calorias son iguales")
            setShowModal(true);

        }
        else {
            setShowModal2(true)

        }
        // Lógica para verificar si se debe mostrar la ventana modal
        // Aquí puedes agregar tu lógica específica

        // En este ejemplo, mostraremos la ventana modal si pasa algo

    };

    const [alimentos, setAlimentos] = useState([
        { nombre: "", cantidad: '', unidad: "", cantManual: '', proteinas: '', carbohidratos: '', grasas: '', calorias: '' },
        { nombre: '', cantidad: '', unidad: "", cantManual: '', proteinas: '', carbohidratos: '', grasas: '', calorias: '' },
        { nombre: '', cantidad: '', unidad: "", cantManual: '', proteinas: '', carbohidratos: '', grasas: '', calorias: '' },
        { nombre: '', cantidad: '', unidad: "", cantManual: '', proteinas: '', carbohidratos: '', grasas: '', calorias: '' },
        { nombre: '', cantidad: '', unidad: "", cantManual: '', proteinas: '', carbohidratos: '', grasas: '', calorias: '' },
        { nombre: '', cantidad: '', unidad: "", cantManual: '', proteinas: '', carbohidratos: '', grasas: '', calorias: '' },
        { nombre: '', cantidad: '', unidad: "", cantManual: '', proteinas: '', carbohidratos: '', grasas: '', calorias: '' }
    ]);

    const eliminarAlimento = (index) => {
        // Eliminar el alimento en el índice especificado
        const nuevosAlimentos = [...alimentos];
        nuevosAlimentos.splice(index, 1);
        setAlimentos(nuevosAlimentos);
    
        // Limpiar el alimento seleccionado en ese índice
        const alimentosActualizados = [...alimentos];
        alimentosActualizados[index] = { nombre: "", cantidad: '', unidad: "", cantManual: '', proteinas: '', carbohidratos: '', grasas: '', calorias: '' };
        setAlimentos(alimentosActualizados);
    };




    const [alimento1, setAlimento1] = useState({ nombre: '', cantidad: '', cantManual: '', proteinas: '', carbohidratos: '', grasas: '', calorias: '' }
    );

    const [proteinas, setProteinas] = useState('');
    const [carbohidratos, setCarbohidratos] = useState('');
    const [grasas, setGrasas] = useState('');
    const [calorias, setCalorias] = useState('');

    const [proteinasTotales, setProteinasTotales] = useState(0);
    const [carbohidratosTotales, setCarbohidratosTotales] = useState(0);
    const [grasasTotales, setGrasasTotales] = useState(0);
    const [caloriasTotales, setCaloriasTotales] = useState(0);

    const [listaAlimentos, setListaAlimentos] = useState([]);
    const servidor = "https://apifoods-production.up.railway.app"
    ///"https://apifoods-production.up.railway.app"
    ///ttp://"http://localhost:8080"


    useEffect(() => {
        const obtenerAlimentos = async () => {
            try {
                console.log("Obteniendo alimentos")
                const response = await axios.get(servidor + "/api/alimentos");
                setListaAlimentos(response.data);

            } catch (error) {
                console.error(error);
            }
        };

        obtenerAlimentos();
    }, []);


    const handleChange = (selectedOption, index, campo) => {
        setAlimentos(prevAlimentos => {
            const nuevosAlimentos = [...prevAlimentos];
            nuevosAlimentos[index][campo] = selectedOption.value; // Obteniendo el valor seleccionado
            return nuevosAlimentos;
        });
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Delete') {
            // Eliminar el elemento seleccionado
            setAlimentos(prevAlimentos => {
                const nuevosAlimentos = [...prevAlimentos];
                nuevosAlimentos[index] = { nombre: '', cantidad: '', cantManual: '', proteinas: '', carbohidratos: '', grasas: '', calorias: '' };
                return nuevosAlimentos;
            });
        }
    };


    const handleGenerarTodo = async () => {
        await handleGenerar();
        setCaloriasTotales(0)


        const response = await axios.get(`${servidor}/api/alimentos/distribuciones?alimento1=${alimentos[0].nombre}&alimento2=${alimentos[1].nombre}&alimento3=${alimentos[2].nombre}&alimento4=${alimentos[3].nombre}&alimento5=${alimentos[4].nombre}&alimento6=${alimentos[5].nombre}&alimento7=${alimentos[6].nombre}&proteinas=${proteinas}&carbohidratos=${carbohidratos}&grasas=${grasas}&calorias=${calorias}`);
        console.log(response.data)
        let matrizDeAlimentos = response.data;
        console.log("Largo de la matriz final")
        console.log(matrizDeAlimentos.length)

        console.log("Largo de los alimentos que tengo en el state")
        console.log(alimentos.length)
        console.log(matrizDeAlimentos.length)

        let nuevosAlimentos = [];

        for (let i = 0; i < alimentos.length; i++) {


            if (alimentos[i].nombre !== "") {

                let idxMacro = 0;

                while (idxMacro < matrizDeAlimentos.length - 1) {

                    let alimentoEncontrado = matrizDeAlimentos[idxMacro].find(item => item.Nombre === alimentos[i].nombre)
                    console.log("Se encontro al alimento")
                    console.log(alimentoEncontrado)
                    if (alimentoEncontrado) {
                        console.log("Ahora si seteamos nuevo array")
                        //Ahora quiero pushear el alimentoEncontrado en el array nuevosAlimentos
                        nuevosAlimentos.push(alimentoEncontrado)

                    }

                    idxMacro++;
                }


                // Aquí puedes hacer lo que necesites con el alimento encontrado
            }
        }

        console.log("Ahora vemos el array nuevo de nuevosAlimentos")
        console.log(nuevosAlimentos)
        console.log("Cantidad de los nuevos alimentos")
        console.log(nuevosAlimentos.length)

        let nuevaLista = [{ nombre: "", cantidad: '', unidad: "", cantManual: '', proteinas: '', carbohidratos: '', grasas: '', calorias: '' },
        { nombre: '', cantidad: '', unidad: "", cantManual: '', proteinas: '', carbohidratos: '', grasas: '', calorias: '' },
        { nombre: '', cantidad: '', unidad: "", cantManual: '', proteinas: '', carbohidratos: '', grasas: '', calorias: '' },
        { nombre: '', cantidad: '', unidad: "", cantManual: '', proteinas: '', carbohidratos: '', grasas: '', calorias: '' },
        { nombre: '', cantidad: '', unidad: "", cantManual: '', proteinas: '', carbohidratos: '', grasas: '', calorias: '' },
        { nombre: '', cantidad: '', unidad: "", cantManual: '', proteinas: '', carbohidratos: '', grasas: '', calorias: '' },
        { nombre: '', cantidad: '', unidad: "", cantManual: '', proteinas: '', carbohidratos: '', grasas: '', calorias: '' }];


        for (let index = 0; index < alimentos.length; index++) {
            let i = 0;
            let encontrado = false;
            while (i < nuevosAlimentos.length && !encontrado) {
                console.log("Esta es la cantidad de este alimento")
                if (alimentos[index].nombre == nuevosAlimentos[i].Nombre) {

                    console.log(nuevosAlimentos[i].Cantidad)

                    nuevaLista[index].nombre = nuevosAlimentos[i].Nombre;
                    nuevaLista[index].cantidad = parseFloat(nuevosAlimentos[i].Cantidad).toFixed(1);
                    nuevaLista[index].proteinas = parseFloat(nuevosAlimentos[i].Proteinas).toFixed(1);

                    nuevaLista[index].carbohidratos = parseFloat(nuevosAlimentos[i].Carbohidratos).toFixed(1);

                    nuevaLista[index].grasas = parseFloat(nuevosAlimentos[i].Grasas).toFixed(1);

                    nuevaLista[index].calorias = Math.round(nuevosAlimentos[i].Calorias);

                    encontrado = true;

                }
                i++;

            }

            console.log("Esta es la nueva lista")
            console.log(nuevaLista.length)
            console.log(nuevaLista)





        }

        let totalPr = 0, totalCh = 0, totalGr = 0, totalCals = 0;

        nuevosAlimentos.forEach(alim => {
            totalPr += alim.Proteinas;
            totalCh += alim.Carbohidratos;
            totalGr += alim.Grasas;
            totalCals += alim.Calorias;

        });

        setProteinasTotales(Math.floor(totalPr))
        setCarbohidratosTotales(Math.floor(totalCh))
        setGrasasTotales(Math.floor(totalGr))
        setCaloriasTotales(Math.floor(totalCals))


        setAlimentos(nuevaLista)
        console.log("Holaaa que onda?")
        console.log(calorias);
        console.log(totalCals);
        handleEvent(calorias, totalCals);



    };




    const handleGenerar = async () => {
        const nuevasComidas = document.querySelectorAll('.tablaAlimentos tbody tr');
        const nuevosAlimentos = [];
        nuevasComidas.forEach(comida => {
            const nombre = comida.querySelector('td:first-child select');
            nuevosAlimentos.push({ nombre, cantidad: '', proteinas: '', carbohidratos: '', grasas: '', calorias: '' });
        });
        setAlimentos(nuevosAlimentos);


    };



    return (
        <>

            <Calorias proteinas={proteinas} carbohidratos={carbohidratos} grasas={grasas} setProteinas={setProteinas}
                setCarbohidratos={setCarbohidratos} setGrasas={setGrasas} calorias={calorias} setCalorias={setCalorias} tipo={"automatico"} />

            <Calorias proteinas={proteinasTotales} carbohidratos={carbohidratosTotales} grasas={grasasTotales} setProteinas={setProteinasTotales}
                setCarbohidratos={setCarbohidratosTotales} setGrasas={setGrasasTotales} calorias={caloriasTotales} setCalorias={setCaloriasTotales} tipo={"normal"} />

            <table className='tablaAlimentos' style={{ backgroundColor: 'lightblue', border: '2px solid black' }}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th className='letras th-letras'>Cant</th>
                        <th className='letras th-letras'>CantManual</th>

                        <th className='letras th-letras'>Pr</th>
                        <th className='letras th-letras'>Ch</th>
                        <th className='letras th-letras'>Grasas</th>
                        <th className='letras th-letras'>Cals</th>
                    </tr>
                </thead>
                <tbody>
                    {alimentos.map((alimento, index) => (
                        <tr key={index}>
                            <td>
                            
                                <Select
                                    className='classSelect'
                                    value={{ value: alimento.nombre, label: alimento.nombre }} // Establece el valor y la etiqueta seleccionada
                                    onChange={(selectedOption) => handleChange(selectedOption, index, 'nombre')} // Llama a la función handleChange cuando se selecciona una opción
                                    options={listaAlimentos.map(alim => ({ value: alim.Alimentos, label: alim.Alimentos }))} // Establece las opciones disponibles
                                    styles={{
                                        control: (provided, state) => ({
                                            ...provided,
                                            minHeight: '30px', // Reducir el tamaño vertical del control
                                            width: '200px', // Aumentar el tamaño horizontal del control
                                        }),
                                    }}
                                />
                                <button onClick={()=> eliminarAlimento(index)}>Eliminar</button>
                            </td>






                            <td>
                                <input
                                    className='inputImportante'
                                    type="text"
                                    value={alimento.cantidad}
                                    onChange={e => handleChange(e, index, 'cantidad')} // Permitir la edición de cantidad
                                />
                                <input
                                    style={{ fontSize: '10px', width: '15px' }}
                                    className='inputImportante'
                                    type="text"
                                    value={alimento.unidad}
                                    onChange={e => handleChange(e, index, 'unidad')} // Permitir la edición de cantidad
                                />
                            </td>

                            <td>
                                <input
                                    className='inputNumerico'
                                    type="text"
                                    value={alimento.cantManual}
                                    onChange={e => handleChange(e, index, 'cantManual')} // Permitir la edición de cantidad
                                />
                            </td>

                            <td>
                                <input
                                    className='inputNumerico'
                                    type="text"
                                    value={alimento.proteinas}
                                    onChange={e => handleChange(e, index, 'proteinas')} // Permitir la edición de proteínas
                                />
                            </td>
                            <td>
                                <input
                                    className='inputNumerico'
                                    type="text"
                                    value={alimento.carbohidratos}
                                    onChange={e => handleChange(e, index, 'carbohidratos')} // Permitir la edición de carbohidratos
                                />
                            </td>
                            <td>
                                <input
                                    className='inputNumerico'
                                    type="text"
                                    value={alimento.grasas}
                                    onChange={e => handleChange(e, index, 'grasas')} // Permitir la edición de grasas
                                />
                            </td>
                            <td>
                                <input
                                    className='inputNumerico'
                                    type="text"
                                    value={alimento.calorias}
                                    onChange={e => handleChange(e, index, 'calorias')} // Permitir la edición de calorías
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="7">
                            <button className='boton' onClick={handleGenerarTodo}>Generar</button>

                        </td>
                    </tr>
                </tfoot>
            </table>
            <br />


            {showModal && (
                <Modal
                    isOpen={showModal}
                    onRequestClose={() => setShowModal(false)}
                    contentLabel="Ejemplo de ventana modal"
                    className="modal-estilo"
                >
                    <h2>Las calorías están geniales</h2>
                    <button onClick={() => setShowModal(false)}>Cerrar</button>
                </Modal>
            )}

            {showModal2 && (
                <Modal
                    isOpen={showModal2}
                    onRequestClose={() => setShowModal2(false)}
                    contentLabel="Ejemplo de ventana modal2"
                    className="modal-estilo"
                >
                    <h3>Las calorías están algo mal</h3>
                    <button onClick={() => setShowModal2(false)}>Cerrar</button>
                </Modal>
            )}



        </>
    );
}

export default TablaAlimentos;

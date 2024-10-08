import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './tablaAlimentos.css';
import Select from 'react-select';
import Calorias from './Calorias/Calorias';
import Modal from 'react-modal';
import Relleno from './Relleno/Relleno';
import Button from '@mui/material/Button';
import 'bootstrap/dist/css/bootstrap.min.css';




Modal.setAppElement('#root');

function TablaAlimentos() {

    const [showMacros, setMacros] = useState(false);
    const [showExedenteCalorias, setExedenteCalorias] = useState(false);
    const [showExcedenCaloriasFaltanProtes, setExcedenCaloriasFaltanProtes] = useState(false);
    const [showExcedenCaloriasFaltanCarbos, setExcedenCaloriasFaltanCarbos] = useState(false);
    const [showExcedenCaloriasFaltanGrasas, setExcedenCaloriasFaltanGrasas] = useState(false);
    const [showFaltanProteinas, setFaltanProteinas] = useState(false);
    const [showFaltanCarbohidratos, setFaltanCarbohidratos] = useState(false);
    const [showFaltanGrasas, setFaltanGrasas] = useState(false);
    const [alimentoSeleccionado, setAlimentoSeleccionado] = useState('');
    const [abajo, setAbajo] = useState('false');
    const [showVentanaAleatoria, setVentanaAleatoria] = useState('');
    const [alimentoSugerido1, setalimentoSugerido1] = useState('');
    const [alimentoSugerido2, setalimentoSugerido2] = useState('');
    const [alimentoSugerido3, setalimentoSugerido3] = useState('');
    const [alimentoSugerido4, setalimentoSugerido4] = useState('');
    const [tipoComidaSugerida, settipoComidaSugerida] = useState('');


    const handleOpcion = (event) => {
        settipoComidaSugerida(event.target.value);

    };




    const handleEvent = (calorias, caloriasTotales, proteinas, prTotales, ch, chTotales, gr, grasasTotales) => {
        console.log("Las calorias son" + calorias)
        console.log("Las calorias son" + caloriasTotales)
        console.log("Las proteinas son" + proteinas)
        console.log("Las proteinas totales son" + prTotales)
        console.log(calorias - caloriasTotales)
        let diferenciaCalorica = caloriasTotales - calorias
        let diferenciaProteica = proteinas - prTotales
        let diferenciaCarbos = ch - chTotales
        let diferenciaGrasas = gr - grasasTotales

        console.log("La diferencia calorica es de " + diferenciaCalorica)
        console.log(diferenciaCalorica > 10)

        if (diferenciaCalorica > 10) {

            console.log("Las calorias estan mal")
            setExedenteCalorias(true)

        }

        else if ((prTotales + 10) < proteinas) {

            setFaltanProteinas(true)

        }

        else if ((grasasTotales + 10) < gr) {

            setFaltanGrasas(true)

        }


        else if ((chTotales + 10) < ch) {

            setFaltanCarbohidratos(true)

        }





        // Lógica para verificar si se debe mostrar la ventana modal
        // Aquí puedes agregar tu lógica específica

        // En este ejemplo, mostraremos la ventana modal si pasa algo

    };

    const [alimentos, setAlimentos] = useState([
        { nombre: "", cantidad: '', unidad: "", cantManual: '', proteinas: '', carbohidratos: '', grasas: '', calorias: '', urlImage: '' },
        { nombre: '', cantidad: '', unidad: "", cantManual: '', proteinas: '', carbohidratos: '', grasas: '', calorias: '', urlImage: '' },
        { nombre: '', cantidad: '', unidad: "", cantManual: '', proteinas: '', carbohidratos: '', grasas: '', calorias: '', urlImage: '' },
        { nombre: '', cantidad: '', unidad: "", cantManual: '', proteinas: '', carbohidratos: '', grasas: '', calorias: '', urlImage: '' },
        { nombre: '', cantidad: '', unidad: "", cantManual: '', proteinas: '', carbohidratos: '', grasas: '', calorias: '', urlImage: '' },
        { nombre: '', cantidad: '', unidad: "", cantManual: '', proteinas: '', carbohidratos: '', grasas: '', calorias: '', urlImage: '' },
        { nombre: '', cantidad: '', unidad: "", cantManual: '', proteinas: '', carbohidratos: '', grasas: '', calorias: '', urlImage: '' }
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

    const agregarNuevoAlimento = () => {
        setAlimentos(prevAlimentos => [
            ...prevAlimentos,
            { nombre: "", cantidad: '', unidad: "", cantManual: '', proteinas: '', carbohidratos: '', grasas: '', calorias: '' }
        ]);
    };



    const [proteinas, setProteinas] = useState('');
    const [carbohidratos, setCarbohidratos] = useState('');
    const [grasas, setGrasas] = useState('');
    const [calorias, setCalorias] = useState('');

    const [proteinasTotales, setProteinasTotales] = useState(0);
    const [carbohidratosTotales, setCarbohidratosTotales] = useState(0);
    const [grasasTotales, setGrasasTotales] = useState(0);
    const [caloriasTotales, setCaloriasTotales] = useState(0);

    const [listaAlimentos, setListaAlimentos] = useState([]);
    const i = "https://apifoods-production.up.railway.app";
    const l = "http://localhost:8080"
    const servidor = i;


    ///"https://apifoods-production.up.railway.app"
    ///ttp://"http://localhost:8080"


    useEffect(() => {
        const obtenerAlimentos = async () => {
            try {
                console.log("Obteniendo alimentos")
                const response = await axios.get(servidor+ "/api/alimentos");
                setListaAlimentos(response.data);

            } catch (error) {
                console.error(error);
            }
        };

        obtenerAlimentos();
    }, []);




    const obtenerAleatorioProte = async (index) => {
        try {
            console.log("Los alimentos son :" + alimentos[0].nombre)
            const response = await axios.get(servidor + "/api/alimentos/aleatorioprote");
            console.log(response.data)  //Aca me trae todo bien
            const alimAleat = response.data; // Suponiendo que la respuesta es un objeto con los datos del alimento
            const alimentoAleatorio = { nombre: alimAleat.Alimentos, cantidad: '', unidad: "", cantManual: '', proteinas: '', carbohidratos: '', grasas: '', calorias: '' }
            const nuevosAlimentos = [...alimentos];
            nuevosAlimentos[index] = alimentoAleatorio; // Reemplazar el alimento en el índice correspondiente
            setAlimentos(nuevosAlimentos); // Actualizar el estado alimentos
            setAlimentoSeleccionado(alimentoAleatorio.nombre); // Establece el alimento aleatorio como el alimento seleccionado en el input select
        } catch (error) {
            console.error(error);
        }
    };



    const obtenerAleatorioCarbo = async (index) => {
        try {
            const response = await axios.get(servidor + "/api/alimentos/aleatoriocarbo");
            console.log(response.data)  //Aca me trae todo bien
            const alimAleat = response.data; // Suponiendo que la respuesta es un objeto con los datos del alimento
            const alimentoAleatorio = { nombre: alimAleat.Alimentos, cantidad: '', unidad: "", cantManual: '', proteinas: '', carbohidratos: '', grasas: '', calorias: '' }
            const nuevosAlimentos = [...alimentos];
            nuevosAlimentos[index] = alimentoAleatorio; // Reemplazar el alimento en el índice correspondiente
            setAlimentos(nuevosAlimentos); // Actualizar el estado alimentos
            setAlimentoSeleccionado(alimentoAleatorio.nombre); // Establece el alimento aleatorio como el alimento seleccionado en el input select
        } catch (error) {
            console.error(error);
        }
    };

    const obtenerAleatorioGrasas = async (index) => {
        try {
            const response = await axios.get(servidor + "/api/alimentos/aleatoriograsas");
            console.log(response.data)  //Aca me trae todo bien
            const alimAleat = response.data; // Suponiendo que la respuesta es un objeto con los datos del alimento
            const alimentoAleatorio = { nombre: alimAleat.Alimentos, cantidad: '', unidad: "", cantManual: '', proteinas: '', carbohidratos: '', grasas: '', calorias: '' }
            const nuevosAlimentos = [...alimentos];
            nuevosAlimentos[index] = alimentoAleatorio; // Reemplazar el alimento en el índice correspondiente
            setAlimentos(nuevosAlimentos); // Actualizar el estado alimentos
            setAlimentoSeleccionado(alimentoAleatorio.nombre); // Establece el alimento aleatorio como el alimento seleccionado en el input select
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (selectedOption, index, campo) => {
        setAlimentos(prevAlimentos => {
            const nuevosAlimentos = [...prevAlimentos];
            nuevosAlimentos[index][campo] = selectedOption.value; // Obteniendo el valor seleccionado
            return nuevosAlimentos;
        });
    };


    const handleUrl = async (index) => {
        console.log("Buscamos la url")
        let nombreAlimento = alimentos[index].nombre
        const response = await axios.get(`${servidor}/api/alimentos/traerurl/${nombreAlimento}`);
        const newUrl = response.data;
        // Crear una copia del estado de alimentos
        const nuevosAlimentos = [...alimentos];
        // Actualizar la URL de imagen del alimento en la posición 'index'
        nuevosAlimentos[index] = {
            ...nuevosAlimentos[index],
            urlImage: `${newUrl}` // Interpolar correctamente la variable newUrl
        };
        // Establecer el estado de alimentos con la nueva copia actualizada
        setAlimentos(nuevosAlimentos);
    };

    const handleChange2 = (e, index, campo) => {
        const { value } = e.target; // Obtener el valor del input

        setAlimentos(prevAlimentos => {
            const nuevosAlimentos = [...prevAlimentos];
            nuevosAlimentos[index][campo] = value; // Asignar el valor del input al campo especificado
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

    const handleGenerarReal = async (valor) => {
        console.log("HOLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA ME GENEREEEEEEEEEEEEEEEEEEEEEEEEE");
        console.log(alimentos[0].nombre);
        
        let alimentosConCantidadManual = [];
        let hayCantidadManual = false;
    
        if (proteinas === "" || grasas === "" || carbohidratos === "" || calorias === "") {
            alert("Completa los campos de macronutrientes");
        } else {
            // Filtrar los alimentos con cantManual > 0
            alimentosConCantidadManual = alimentos
                .filter(alimento => parseFloat(alimento.cantManual) > 0)
                .map(alimento => ({ nombre: alimento.nombre, cantManual: alimento.cantManual }));
             if(alimentosConCantidadManual.length > 0) {
                hayCantidadManual = true;
                while (alimentosConCantidadManual.length < 7) {
                    alimentosConCantidadManual.push({ nombre: "", cantManual: "" });
                }

             } 

            // Llenar el resto de la lista con elementos vacíos
    
            if (hayCantidadManual > 0) {
                console.log("Hay al menos un alimento con cantidad manual");
                console.log(alimentosConCantidadManual); // Aquí tendrás la lista con los atributos "nombre" y "cantManual"
                handleGenerarTodo(valor, alimentosConCantidadManual);
        

            } else if (alimentos.some(alimento => alimento.nombre !== "")) {
                console.log("AHORA GENERAMOS TODO");
                handleGenerarTodo(valor, alimentosConCantidadManual);
            } else {
                alert("Elegi al menos un alimento");
            }
        }
    };



    const handleGenerarTodo = async (valor, alimentosConCantidadManual) => {
           if(valor) {
            await handleGenerar();

           }
        
        

        setCaloriasTotales(0)
        let nombreAlim1 = "";
        let nombreAlim2 = "";
        let nombreAlim3 = "";
        let nombreAlim4 = "";
        let nombreAlim5 = "";
        let nombreAlim6 = "";
        let nombreAlim7 = "";

        if (alimentos[1].nombre != "undefined") {
            nombreAlim2 = alimentos[1].nombre;
        }
        if (alimentos[2].nombre != "undefined") {
            nombreAlim3 = alimentos[2].nombre;
        }
        if (alimentos[3].nombre != "undefined") {
            nombreAlim4 = alimentos[3].nombre;
        }

        if (alimentos[4] && alimentos[4].nombre !== undefined) {
            nombreAlim5 = alimentos[4].nombre;



        }
        if (alimentos[5] && alimentos[5].nombre !== undefined) {
            nombreAlim6 = alimentos[5].nombre;
        }

        if (alimentos[6] && alimentos[6].nombre !== undefined) {
            nombreAlim7 = alimentos[6].nombre;
        }
    const alimentoManual1 = alimentosConCantidadManual[0] || { nombre: "", cantManual: "" };
    const alimentoManual2 = alimentosConCantidadManual[1] || { nombre: "", cantManual: "" };
    const alimentoManual3 = alimentosConCantidadManual[2] || { nombre: "", cantManual: "" };
    const alimentoManual4 = alimentosConCantidadManual[3] || { nombre: "", cantManual: "" };
    const alimentoManual5 = alimentosConCantidadManual[4] || { nombre: "", cantManual: "" };
    const alimentoManual6 = alimentosConCantidadManual[5] || { nombre: "", cantManual: "" };
    const alimentoManual7 = alimentosConCantidadManual[6] || { nombre: "", cantManual: "" };


  

    const response = await axios.get(`${servidor}/api/alimentos/distribuciones?` +
        `alimento1=${alimentos[0].nombre}` +
        `&alimento2=${nombreAlim2}` +
        `&alimento3=${nombreAlim3}` +
        `&alimento4=${nombreAlim4}` +
        `&alimento5=${nombreAlim5}` +
        `&alimento6=${nombreAlim6}` +
        `&alimento7=${nombreAlim7}` +
        `&proteinas=${proteinas}` +
        `&carbohidratos=${carbohidratos}` +
        `&grasas=${grasas}` +
        `&calorias=${calorias}` +
        `&alimentoManual1=${alimentoManual1.nombre}` +
        `&cantidadManual1=${alimentoManual1.cantManual}` +
        `&alimentoManual2=${alimentoManual2.nombre}` +
        `&cantidadManual2=${alimentoManual2.cantManual}` +
        `&alimentoManual3=${alimentoManual3.nombre}` +
        `&cantidadManual3=${alimentoManual3.cantManual}` +
        `&alimentoManual4=${alimentoManual4.nombre}` +
        `&cantidadManual4=${alimentoManual4.cantManual}` +
        `&alimentoManual5=${alimentoManual5.nombre}` +
        `&cantidadManual5=${alimentoManual5.cantManual}` +
        `&alimentoManual6=${alimentoManual6.nombre}` +
        `&cantidadManual6=${alimentoManual6.cantManual}` +
        `&alimentoManual7=${alimentoManual7.nombre}` +
        `&cantidadManual7=${alimentoManual7.cantManual}` 
    );

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



        let alims = [...alimentos];



        let nuevaLista = [{ nombre: "", cantidad: '', unidad: "", cantManual: alims[0].cantManual, proteinas: '', carbohidratos: '', grasas: '', calorias: '', urlImage: alims[0].urlImage },
        { nombre: '', cantidad: '', unidad: "", cantManual: alims[1].cantManual, proteinas: '', carbohidratos: '', grasas: '', calorias: '', urlImage: '', urlImage: alims[1].urlImage },
        { nombre: '', cantidad: '', unidad: "", cantManual: alims[2].cantManual, proteinas: '', carbohidratos: '', grasas: '', calorias: '', urlImage: '', urlImage: alims[2].urlImage },
        { nombre: '', cantidad: '', unidad: "", cantManual: alims[3].cantManual, proteinas: '', carbohidratos: '', grasas: '', calorias: '', urlImage: '', urlImage: alims[3].urlImage },
        { nombre: '', cantidad: '', unidad: "", cantManual: alims[4].cantManual, proteinas: '', carbohidratos: '', grasas: '', calorias: '', urlImage: '', urlImage: alims[4].urlImage },
        { nombre: '', cantidad: '', unidad: "", cantManual: alims[5].cantManual, proteinas: '', carbohidratos: '', grasas: '', calorias: '', urlImage: '', urlImage: alims[5].urlImage },
        { nombre: '', cantidad: '', unidad: "", cantManual: alims[6].cantManual, proteinas: '', carbohidratos: '', grasas: '', calorias: '', urlImage: '', urlImage: alims[6].urlImage }];


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
                    nuevaLista[index].unidad = nuevosAlimentos[i].Unidad;

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
        handleEvent(calorias, totalCals, proteinas, totalPr, carbohidratos, totalCh, grasas, totalGr);



    };

    const generarAleatorio = () => {
        let aleatorio = Math.floor(Math.random() * (60 - 10 + 1)) + 10;
        setProteinas(aleatorio)
        aleatorio = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
        setCarbohidratos(aleatorio)
        aleatorio = Math.floor(Math.random() * (40 - 5 + 1)) + 5;
        setGrasas(aleatorio)

    }



    const handleGenerar = async () => {
        console.log("EL HANDLE GENEdRAR PIOLAAAAA0")
        console.log(alimentos[0])
        const nuevasComidas = document.querySelectorAll('.tablaAlimentos tbody tr');
        const nuevosAlimentos = [];
        nuevasComidas.forEach(comida => {
            const nombre = comida.querySelector('td:first-child select');
            nuevosAlimentos.push({ nombre, cantidad: '', proteinas: '', carbohidratos: '', grasas: '', calorias: '' });
        });
        setAlimentos(nuevosAlimentos);


    };


    const traerComidaAleatoria = async () => {
        //let ali1 = "Churrasco magro";
       //const response = await axios.get(`http://localhost:8080/api/comidas/traerComida/?tipoComida=&alimento1=${ali1}&alimento2=&alimento3=&alimento4=`);
       //let alimentosDeComida = response.data;
       //console.log(response.data)
       const nuevosAlimentos = [{ nombre: "Churrasco magro", cantidad: '', unidad: "", cantManual: '', proteinas: '', carbohidratos: '', grasas: '', calorias: '', urlImage: "" },
       { nombre: "Banana", cantidad: '', unidad: "", cantManual: '', proteinas: '', carbohidratos: '', grasas: '', calorias: '',  urlImage: "" },
       { nombre: "", cantidad: '', unidad: "", cantManual: '', proteinas: '', carbohidratos: '', grasas: '', calorias: '',  urlImage: "" },
       { nombre: "", cantidad: '', unidad: "", cantManual: '', proteinas: '', carbohidratos: '', grasas: '', calorias: '',  urlImage: ""  },
       { nombre: "", cantidad: '', unidad: "", cantManual: '', proteinas: '', carbohidratos: '', grasas: '', calorias: '',  urlImage: ""  },
       { nombre: "", cantidad: '', unidad: "", cantManual: '', proteinas: '', carbohidratos: '', grasas: '', calorias: '',  urlImage: ""  },
       { nombre: "", cantidad: '', unidad: "", cantManual: '', proteinas: '', carbohidratos: '', grasas: '', calorias: '',  urlImage: ""  }]
       console.log("PRIMERO DEBE IR ESTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")

        setAlimentos(nuevosAlimentos);
        console.log(nuevosAlimentos[0])
 



    

    

    }



    return (
        <>

            <div style={{ marginLeft: '10%', display: 'flex' }}>


                <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>

                    <div style={{
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        backgroundColor: 'white', /* Fondo blanco */
                        border: '1px solid red', /* Borde rojo de 1px */
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: '10px'
                    }}>
                        <h2 style={{ color: 'red', margin: '0' }}>P</h2>
                    </div>
                    <h2>{proteinas || "0"}g</h2>

                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                    <div style={{
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        backgroundColor: 'white', /* Fondo blanco */
                        border: '1px solid blue', /* Borde rojo de 1px */
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: '10px'
                    }}>
                        <h2 style={{ color: 'blue', margin: '0' }}>C</h2>
                    </div>
                    <h2>{carbohidratos || 0}g</h2>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        backgroundColor: 'white', /* Fondo blanco */
                        border: '1px solid green', /* Borde rojo de 1px */
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: '10px'
                    }}>
                        <h2 style={{ color: 'green', margin: '0' }}>G</h2>
                    </div>
                    <h2>{grasas || 0}g</h2>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                        color: 'black',
                        marginLeft: '20px',
                        borderRadius: '70%',
                        width: '120px',
                        height: '50px',
                        backgroundColor: 'white', /* Fondo blanco */
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: '10px',
                        boxShadow: '0 0 0 4px green inset' /* Contorno verde de 4px */
                    }}>
                        <h2 style={{ color: 'black', margin: '0' }}></h2>
                        <h3>{calorias || 0}Cals</h3>
                    </div>

                </div>

                <Button onClick={() => setMacros(true)} style={{ marginLeft: '10px' }}>Editar</Button>
            </div>



            <div style={{ marginLeft: '10%', display: 'flex' }}>


                <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>

                    <div style={{ borderRadius: '50%', width: '30px', height: '30px', backgroundColor: 'red', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px' }}>
                        <h2 style={{ color: 'white', margin: '0' }}>P</h2>
                    </div>
                    <h2>{proteinasTotales || "0"}g</h2>

                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                    <div style={{ borderRadius: '50%', width: '30px', height: '30px', backgroundColor: 'blue', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px' }}>
                        <h2 style={{ color: 'white', margin: '0' }}>C</h2>
                    </div>
                    <h2>{carbohidratosTotales || 0}g</h2>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ borderRadius: '50%', width: '30px', height: '30px', backgroundColor: 'green', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px' }}>
                        <h2 style={{ color: 'white', margin: '0' }}>G</h2>
                    </div>
                    <h2>{grasasTotales || 0}g</h2>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ color: 'white', marginLeft: '20px', borderRadius: '90%', width: '80px', height: '40px', backgroundColor: 'green', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '10px' }}>
                        <h2 style={{ color: 'white', margin: '0' }}></h2>
                        <h3>{caloriasTotales || 0}Cals</h3>
                    </div>

                </div>

            </div>






            {/* 
<Calorias proteinas={proteinasTotales} carbohidratos={carbohidratosTotales} grasas={grasasTotales} setProteinas={setProteinasTotales}
                setCarbohidratos={setCarbohidratosTotales} setGrasas={setGrasasTotales} calorias={caloriasTotales} setCalorias={setCaloriasTotales} tipo={"normal"} />
*/}



            <div style={{ marginLeft: '10%', display: 'flex', marginTop: '20px', marginBottom: '10px' }}>
                <button onClick={() => setVentanaAleatoria(!showVentanaAleatoria)} type="button" class="btn btn-outline-success">Opciones alimentos aleatorios</button>

                <button onClick={() => traerComidaAleatoria()} style={{ marginLeft: '10px' }}>
                    <img src="/images/recargar2.png" alt="Texto alternativo" width="30" height="auto" />
                </button>



            </div>

            <div className='boton-con-imagen' style={{
                marginLeft: '10%', display: 'flex', marginTop: '-10px', marginBottom: '10px'
            }}>


            </div>




            <table className='tablaAlimentos' style={{ backgroundColor: '#F7F9F9  ', border: '2px solid green' }}>
                <thead>
                    <tr>
                        <th></th>
                        <th className='letras th-letras'></th>
                        <th className='letras th-letras'>Manual</th>
                        <th className='letras th-letras'>Más</th>

                    </tr>
                </thead>
                <tbody>

                    {alimentos.map((alimento, index) => (

                        <tr key={index}>
                            <td>
                                <div style={{ display: 'flex', alignItems: 'center' }}>


                                    <button
                                        className={alimento.nombre ? "botonEliminar" : "botonFondo"}
                                        onClick={() => eliminarAlimento(index)}
                                    >
                                        X
                                    </button>



                                    <div className='cuadro'>
                                        <img src={alimento.urlImage} alt="" width="45" height="auto" />
                                        <div>



                                            <Select
                                                className='classSelect'
                                                value={{ value: alimento.nombre, label: alimento.nombre }}
                                                onChange={(selectedOption) => {
                                                    // Verificar si el alimento seleccionado ya existe en el estado alimentos
                                                    if (!alimentos.some(item => item.nombre === selectedOption.value)) {
                                                        handleChange(selectedOption, index, 'nombre');
                                                        handleUrl(index);
                                                    } else {
                                                        // Si el alimento ya existe, mostrar alerta
                                                        alert("Este alimento ya está seleccionado");
                                                    }
                                                }}
                                                options={listaAlimentos.map(alim => ({ value: alim.Alimentos, label: alim.Alimentos }))}
                                                styles={{
                                                    control: (provided, state) => ({
                                                        ...provided,
                                                        minHeight: '25px',
                                                        width: '200px',
                                                    }),
                                                    singleValue: (provided, state) => ({
                                                        ...provided,
                                                        color: 'black', // Color azul
                                                    }),
                                                }}
                                            />

                                            {/*
                                                abajo &&
                                                (<div className="botones-container">
                                                    <button style={{ backgroundColor: '#EDBB99' }} onClick={() => obtenerAleatorioProte(index)}>PR</button>
                                                    <button style={{ backgroundColor: '#ABB2B9' }} onClick={() => obtenerAleatorioCarbo(index)}>CH</button>
                                                    <button style={{ backgroundColor: '#F5B7B1' }} onClick={() => obtenerAleatorioGrasas(index)}>GR</button>
                                                </div>)


                                          */}


                                        </div>



                                    </div>

                                    {/* Resto del código... */}

                                </div>
                            </td>



                            <td>

                                <div>

                                    <div>
                                        <input
                                            className='inputImportante'
                                            type="text"
                                            value={alimento.cantidad}
                                            onChange={e => handleChange(e, index, 'cantidad')} // Permitir la edición de cantidad
                                        />

                                    </div>


                                    <input
                                        style={{ width: '30px' }}
                                        className='inputCantidadManual'
                                        type="text"
                                        value={alimento.unidad}
                                        onChange={e => handleChange(e, index, 'unidad')} // Permitir la edición de cantidad
                                    />

                                    <div>



                                    </div>


                                </div>


                            </td>

                            <td>
                                <input
                                    className='inputNumerico'
                                    type="text"
                                    value={alimento.cantManual}
                                    onChange={e => handleChange2(e, index, 'cantManual')} // Permitir la edición de cantidad
                                />
                            </td>

                            <td>
                                <input
                                    className='inputNumerico'
                                    type="text"
                                    value={alimento.calorias}
                                    onChange={e => handleChange2(e, index, 'calorias')} // Permitir la edición de cantidad
                                />

                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="7">
                            <button className='boton' onClick={() => {
                                handleGenerarReal(false)
                            }}>Generar</button>

                        </td>
                    </tr>
                </tfoot>
            </table>
            <br />


            {showMacros && (
                <Modal
                    isOpen={showMacros}
                    onRequestClose={() => setMacros(false)}
                    contentLabel="Ejemplo de ventana modal2"
                    className="modalmacro"
                >
                    <Calorias proteinas={proteinas} carbohidratos={carbohidratos} grasas={grasas} setProteinas={setProteinas}
                        setCarbohidratos={setCarbohidratos} setGrasas={setGrasas} calorias={calorias} setCalorias={setCalorias} tipo={"automatico"} />
                    <div>
                        <button style={{ marginLeft: '30%' }} type="button" class="btn btn-success" onClick={() => { setCalorias(proteinas * 4 + carbohidratos * 4 + grasas * 9); setMacros(false); }}>Guardar</button>
                        <button style={{ marginLeft: '10%' }} type="button" class="btn btn-primary" onClick={() => {
                            generarAleatorio()
                        }}>Aleatorio</button>

                    </div>
                    <button style={{ marginTop: '5%', marginLeft: '43%' }} type="button" class="btn btn-dark" onClick={() => { setMacros(false); setProteinas(0); setCarbohidratos(0); setGrasas(0); setCalorias(0) }} >Cerrar</button>

                </Modal>
            )}


            {showVentanaAleatoria && (
                <Modal style={{
                    overlay: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }
                }}
                    isOpen={showVentanaAleatoria}
                    onRequestClose={() => setVentanaAleatoria(false)}
                    contentLabel="Ejemplo de ventana modal2"
                    className="modal-comida"
                >
                    <h3>Vamos a generar una comida aleatoria</h3>
                    <h5>Que comida es?</h5>
                    <select value={tipoComidaSugerida} onChange={handleOpcion}>
                        <option value="">Selecciona una opción</option>
                        <option value="opcion1">Desayuno</option>
                        <option value="opcion2">Almuerzo</option>
                        <option value="opcion3">Merienda</option>
                        <option value="opcion3">Cena</option>
                    </select>
                    <br />
                    <button onClick={() => setVentanaAleatoria(false)}>Cerrar</button>
                    <p>Elegi algun alimento que quieras tener</p>
                </Modal>
            )}

            {showExedenteCalorias && (
                <Modal style={{
                    overlay: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }
                }}
                    isOpen={showExedenteCalorias}
                    onRequestClose={() => setExedenteCalorias(false)}
                    contentLabel="Ejemplo de ventana modal2"
                    className="modal-estilo"
                >
                    <h3>Las calorías están algo mal</h3>
                    <button onClick={() => setExedenteCalorias(false)}>Cerrar</button>
                </Modal>
            )}

            {showFaltanProteinas && (
                <Modal
                    isOpen={showFaltanProteinas}
                    onRequestClose={() => setFaltanProteinas(false)}
                    contentLabel="Ejemplo de ventana modal2"
                    className="modal-estilo"
                >
                    <h3>Calorias BIEN</h3>
                    <h3>FALTAN PROTEINAS</h3>
                    <button onClick={() => setFaltanProteinas(false)}>Cerrar</button>
                </Modal>
            )}

            {showFaltanCarbohidratos && (
                <Modal
                    isOpen={showFaltanCarbohidratos}
                    onRequestClose={() => setFaltanCarbohidratos(false)}
                    contentLabel="Ejemplo de ventana modal2"
                    className="modal-estilo"
                >
                    <h3>Calorias BIEN</h3>
                    <h3>FALTAN CARBOHIDRATOS</h3>
                    <button onClick={() => setFaltanCarbohidratos(false)}>Cerrar</button>
                </Modal>
            )}

            {showFaltanGrasas && (
                <Modal
                    isOpen={showFaltanGrasas}
                    onRequestClose={() => setFaltanGrasas(false)}
                    contentLabel="Ejemplo de ventana modal2"
                    className="modal-estilo"
                >
                    <h3>Calorias BIEN</h3>
                    <h3>FALTAN GRASAS</h3>
                    <button onClick={() => setFaltanGrasas(false)}>Cerrar</button>
                </Modal>
            )}



        </>
    );
}

export default TablaAlimentos;

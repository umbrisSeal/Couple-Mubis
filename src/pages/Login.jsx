import React, { useEffect, useState } from 'react'
import '../styles/Login.css'
import Boton from '../components/Boton';
import { Link } from 'react-router-dom';

function Login(props) {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmar, setPasswordConfirmar] = useState('');
    const [clave, setClave] = useState('');     // Clave temporal para el registro.
    const [errorState, setErrorState] = useState('');
    const [version, setVersion] = useState('');
    const [textoBoton, setTextoBoton] = useState('');

    useEffect(() => {
        setPassword('');
        setErrorState('');
        setPasswordConfirmar('');
        setClave('');

        if(props.version) {
            setVersion(props.version);
            setTextoBoton(props.version === 'registro' ? 'Registrarse' : 'Vincular Cuenta');
        } else {
            setVersion('');
            setTextoBoton('Entrar');
        }

    }, [props]);

    /*
        Versiones de componente:
            Login: Para iniciar sesion (default)
            Registro: Registro temporal para refugio14.
            Vincular: Vincular la cuenta actual a la cuenta de Couple Mubis.
    */


    const ESTADO_ERROR = {
        NONE: '',
        LONGITUD_USUARIO: 'El usuario debe de tener menos de 50 caracteres.',
        LONGITUD_PASSWORD: 'El password debe tener menos de 50 caracteres.',
        DOMINIO_CORREO: 'El dominio de su correo no esta permitido.',
        CORREO: 'Por favor, ingrese un correo electronico valido.',
        GENERICO: 'Ha ocurrido un error, por favor intentelo mas tarde.',
        USUARIO_INCORRECTO: 'El usuario/email no existe.',
        PASSWORD_INCORRECTO: 'El password es incorrecto.',
        CUENTA_DESABILITADA: 'Su cuenta ha sido desabilitada.',
        CAMPOS_VACIOS: 'Por favor, ingrese usuario y contraseña.',
        CUENTA_DUPLICADA: 'El correo que intenta registrar ya existe.',
        PASSWORD_DIFERENTE: 'Las contraseñas no coinciden.',
        PASSWORD_PEQUEÑO: 'El password debe tener al menos 6 caracteres',
        PASSWORD_NUMERO: 'El password debe contener al menos 1 numero.',
        PASSWORD_CARACTER: 'El password debe contener al menos 1 caracter especial.',
    }

    // Renderizar pagina de vinculacion login si no tiene usuario (revisar en base de datos).
    // Por defecto, solicitar la vinculacion de la aplicacion con la cuenta de Refugio14
    // Mostrar una pagina de "error" para indicar que no hay una cuenta asociada de Refugio14.

    // Login por defecto, solicitara la informacion de la cuenta de refugio14. !

    const validarDatos = () => {
        /*
            - Verificar longitud de entrada.
            - Verificar formato de correo.
            - lowercase a todo el correo electronico
            - Proteccion con esterilizacion de codigo (evita inyeccion de SQL).

            - Ocultar mensaje de error al ejecutar, luego revisar codigo y volver a lanzar error.
            - La respuesta HTTP tambien puede contener una instruccion de error.
        */
       setErrorState(ESTADO_ERROR.NONE);
       const emailValidoRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook)\.(com|net|org)$/;
       const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
       const contieneNumeroRegex = /\d/;
       const contieneCaracterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

       let error = true;

       if(version != 'vincular') {
            if(user == '' || password == '') return setErrorState(ESTADO_ERROR.CAMPOS_VACIOS);
            if(user.length > 50) return setErrorState(ESTADO_ERROR.LONGITUD_USUARIO);
            if(password.length > 50) return setErrorState(ESTADO_ERROR.LONGITUD_PASSWORD);
            if(!emailRegex.test(user)) return setErrorState(ESTADO_ERROR.CORREO);
            if(!emailValidoRegex.test(user)) return setErrorState(ESTADO_ERROR.DOMINIO_CORREO);
            error = false;
       }
       if(version === 'registro') {
            if(password.length < 6) return setErrorState(ESTADO_ERROR.PASSWORD_PEQUEÑO);
            if(!contieneNumeroRegex.test(password)) return setErrorState(ESTADO_ERROR.PASSWORD_NUMERO);
            if(!contieneCaracterRegex.test(password)) return setErrorState(ESTADO_ERROR.PASSWORD_CARACTER);
            if(password != passwordConfirmar) return setErrorState(ESTADO_ERROR.PASSWORD_DIFERENTE);
            error = false;
        }

        return error;
    }

    // Solicitudes HTTP:

    async function solicitudRegistro() {
        // Tener una state variable para saber como actuar.
        const requestBody = {
            clave: clave,
            email: user,
            usuario: 'Sin Nombre',
            password: password,
            passwordRepetido: passwordConfirmar,
        }

        console.log(requestBody);

    }

    /*
    {
    "clave": "RUD40S",
    "email": "purebatacos@gmail.com",
    "usuario": "El Tquero Loco",
    "password": "Password-hash1",
    "passwordRepetido": "Password-hash1"
    }
    */

    const handleUserChange = (event) => setUser(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handlePasswordConfirmarChange = (event) => setPasswordConfirmar(event.target.value);
    const handleClaveChange = (event) => setClave(event.target.value);

    const submitForm = (event) => {
        event.preventDefault();
        validarDatos();
        if(errorState === ESTADO_ERROR.NONE && validarDatos()) {
            // Realizar la solicitud HTTP.
            if(props?.version === 'registro') solicitudRegistro();
            console.log("Datos aceptados!");
        } else {
            return;
        }
    }


    return(
        <main className='fondo-gris fondo-completo'>
            <form className='contenedor-form' onSubmit={submitForm}>
                <h2> Refugio14 </h2>
                <h1> { version === '' ? 'Login' : 'Registro' } </h1>

                {/* Limitar los elementos del form renderizados para presentar la informacion deseada. */}

                <div className={`contenedor-error ${errorState === '' ? 'ocultar' : ''}`}>
                    <p> {errorState} </p>
                </div>

                <label htmlFor='clave' className={`form-label centrar-texto ${version === 'registro' ? '' : 'ocultar'}`} > Clave de Registro </label>
                <input type='text' id='clave' name='clave' maxLength={20} placeholder='Clave' className={`entrada ${version === 'registro' ? '' : 'ocultar'}`} value={clave} onChange={handleClaveChange} />

                <label htmlFor='usuario' className={`form-label centrar-texto ${version === 'vincular' ? 'ocultar' : ''}`} > Correo electronico </label>
                <input type='text' id='usuario' name='usuario' maxLength={50} placeholder='Usuario o email' className={`entrada ${version === 'vincular' ? 'ocultar' : ''}`} value={user} onChange={handleUserChange} />

                <label htmlFor='password' className={`form-label centrar-texto ${version === 'vincular' ? 'ocultar' : ''}`}> Contraseña </label>
                <input type='password' id='password' name='password' maxLength={50} placeholder='Contraseña' className={`entrada ${version === 'vincular' ? 'ocultar' : ''}`} value={password} onChange={handlePasswordChange} />

                <label htmlFor='passwordConfirmar' className={`form-label centrar-texto ${version === 'registro' ? '' : 'ocultar'}`}> Confirmar Contraseña </label>
                <input type='password' id='passwordConfirmar' name='passwordConfirmar' maxLength={50} placeholder='Repetir contraseña' className={`entrada ${version === 'registro' ? '' : 'ocultar'}`} value={passwordConfirmar} onChange={handlePasswordConfirmarChange} />

                {/* Codigo para la seccion de vinculacion de cuenta: */}

                <div className={`contenedor-vinculacion ${version === 'vincular' ? '' : 'ocultar'}`}>
                    <img src='src\assets\images\iconos\AppPerfil_Refugio14.png' className='vinculacion-app' />
                    <img src='src\assets\images\figuraFlecha.png' className='vinculacion-flecha' />
                    <img src='src\assets\images\iconos\AppPerfil_CoupleMubis.png' className='vinculacion-app' />
                </div>

                <div className={`centrar-texto texto-vinculacion ${version === 'vincular' ? '' : 'ocultar'}`}>
                    <p> Para usar la aplicación de Couple Mubis debe vincular su cuenta de Refugio14, de esta forma no debera crear un correo o contraseña diferente. </p>
                    <p> ¿Desea vincular su cuenta? </p>
                </div>

                {/* Cambiar vinculos en cada pagina, si es que se muestran, y aceptar los terminos y condiciones al crear. */}

                <div className='contenedor-boton'>
                    <Boton version='loginSubmit' texto={textoBoton} />

                    <p className={`centrar-texto letras-pequeñas ${version === '' ? '' : 'ocultar'}`}> ¿No tienes una cuenta? Crea una <Link to="/registro-temporal"> <span className='hypervinculo'>aqui.</span> </Link> </p>
                    <p className={`centrar-texto letras-pequeñas ${version === 'registro' ? '' : 'ocultar'}`}> ¿Ya tienes una cuenta refugio14? Inicia sesion <Link to="/login"> <span className='hypervinculo'> aqui.</span> </Link> </p>
                    <p className={`centrar-texto letras-pequeñas ${version === 'vincular' ? '' : 'ocultar'}`}> Al vincular su cuenta, acepta los <Link to="/terminos"> <span className='hypervinculo'>terminos y condiciones</span> </Link> de Couple Mubis. </p>
                </div>

            </form>
        </main>
    )
}

export default Login

/*
Distribucion de login

-----------------------
Imagen de refugio14
"Login"
[Message error]
Usuario y contraseña
"Iniciar Sesion"
¿Aun no tiene una cuenta? Cree una.
-----------------------

---------------------------
Y en caso de registro:
Crear Cuenta
Couple Mubis (En mas pequeñas)
Circulo con flechas
Se creara y vinculara su cuenta principal de Refugio14
a Couple Mubis. Puede ingresar usando su mismo correo
y contraseña que Refugio14.

¿Desea vincular y crear su cuenta Cuple Mubis?

[ Registrarse ] -> Registrar, vincular y iniciar sesion.
Al registrarse acepta los terminos y condiciones. [Link to a document]
-----------------------------------------------------------


*/
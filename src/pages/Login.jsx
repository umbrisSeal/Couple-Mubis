import React, { useEffect, useState } from 'react'
import '../styles/Login.css'
import Boton from '../components/Boton';
import { Link, redirect, useNavigate } from 'react-router-dom';
import hashearPassword from '../assets/js/hashearPassword';
import DIRECCIONES from '../assets/js/diccionarioURLs';

function Login(props) {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmar, setPasswordConfirmar] = useState('');
    const [clave, setClave] = useState('');     // Clave temporal para el registro.
    const [errorState, setErrorState] = useState('');
    const [version, setVersion] = useState('');
    const [textoBoton, setTextoBoton] = useState('');
    const navegador = useNavigate();

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
        CLAVE_INCORRECTA: 'La clave de registro es incorrecta.'
    }

    const validarDatos = () => {
       const emailValidoRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook)\.(com|net|org)$/;
       const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
       const contieneNumeroRegex = /\d/;
       const contieneCaracterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

       if(version != 'vincular') {
            if(user == '' || password == '') {setErrorState(ESTADO_ERROR.CAMPOS_VACIOS); return false;}
            if(user.length > 50) {setErrorState(ESTADO_ERROR.LONGITUD_USUARIO); return false;}
            if(password.length > 50) {setErrorState(ESTADO_ERROR.LONGITUD_PASSWORD); return false;}
            if(!emailRegex.test(user)) {setErrorState(ESTADO_ERROR.CORREO); return false;}
            if(!emailValidoRegex.test(user)) {setErrorState(ESTADO_ERROR.DOMINIO_CORREO); return false;}
       }
       if(version === 'registro') {
            if(password.length < 6) {setErrorState(ESTADO_ERROR.PASSWORD_PEQUEÑO); return false;}
            if(!contieneNumeroRegex.test(password)) {setErrorState(ESTADO_ERROR.PASSWORD_NUMERO); return false;}
            if(!contieneCaracterRegex.test(password)) {setErrorState(ESTADO_ERROR.PASSWORD_CARACTER); return false;}
            if(password != passwordConfirmar) {setErrorState(ESTADO_ERROR.PASSWORD_DIFERENTE); return false;}
        }

        setErrorState(ESTADO_ERROR.NONE);
        return true;
    }

    // Solicitudes HTTP:

    async function solicitudRegistro() {
        const requestBody = {
            clave: clave,
            email: user,
            usuario: 'Nuevo Usuario',
            password: await hashearPassword(password),
            passwordRepetido: await hashearPassword(passwordConfirmar),
        }

        let confirmacionRegistro = false;

        try {
            const jsonBody = JSON.stringify(requestBody);
            confirmacionRegistro = await fetch(`${DIRECCIONES.BACKEND}/api/cuenta`, {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': `${DIRECCIONES.BACKEND}`,
                    'Content-Type': 'application/json'
                },
                body: jsonBody
            }).then(response => response.status).catch(error => false);
        } catch {}

        if(confirmacionRegistro === 403) setErrorState(ESTADO_ERROR.CLAVE_INCORRECTA);
        if(confirmacionRegistro === 200) {
            setErrorState(ESTADO_ERROR.NONE);
            const requestBodyLogin = {
                email: user,
                password: await hashearPassword(password)
            };
            let confirmacionLogin = false;
            try {
                const jsonBodyLogin = JSON.stringify(requestBodyLogin);
                confirmacionLogin = await fetch(`${DIRECCIONES.BACKEND}/api/auth`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Access-Control-Allow-Origin': `${DIRECCIONES.BACKEND}`,
                        'Content-Type': 'application/json'
                    },
                    body: jsonBodyLogin
                }).then(response => response.ok).catch(error => false);
            } catch {}
            if(confirmacionLogin) {
                navegador('/home');
            } else {
                navegador('/login');
            }
        }
    }

    const handleUserChange = (event) => setUser(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handlePasswordConfirmarChange = (event) => setPasswordConfirmar(event.target.value);
    const handleClaveChange = (event) => setClave(event.target.value);

    const submitForm = async (event) => {
        event.preventDefault();
        /*
        const datosValidados = validarDatos();
        if(datosValidados && props?.version === 'registro') {
            await solicitudRegistro();
            return;
        }
        */

        await solicitudRegistro();
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
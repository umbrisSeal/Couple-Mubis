import React, { Fragment } from 'react'
import Bienvenida from '../components/Bienvenida'
import SeccionPeliculas from '../components/SeccionPeliculas'
import SeccionAbout from '../components/SeccionAbout'
import SeccionTecnica from '../components/SeccionTecnica'

function LandingPage() {
    return(
        <Fragment>
            <Bienvenida />
            <SeccionPeliculas />
            <SeccionAbout />
            <SeccionTecnica />
            <p> Landing page </p>
        </Fragment>
    )
}

export default LandingPage
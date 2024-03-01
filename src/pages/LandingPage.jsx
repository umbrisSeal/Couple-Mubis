import React, { Fragment } from 'react'
import Bienvenida from '../components/Bienvenida'
import SeccionPeliculas from '../components/SeccionPeliculas'
import SeccionAbout from '../components/SeccionAbout'

function LandingPage() {
    return(
        <Fragment>
            <Bienvenida />
            <SeccionPeliculas />
            <SeccionAbout />
            <p> Landing page </p>
        </Fragment>
    )
}

export default LandingPage
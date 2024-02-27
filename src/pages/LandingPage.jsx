import React, { Fragment } from 'react'
import Bienvenida from '../components/Bienvenida'
import SeccionPeliculas from '../components/SeccionPeliculas'

function LandingPage() {
    return(
        <Fragment>
            <Bienvenida />
            <SeccionPeliculas />
            <p> Landing page </p>
        </Fragment>
    )
}

export default LandingPage
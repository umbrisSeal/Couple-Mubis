import React, { Fragment } from 'react'
import Bienvenida from '../components/Bienvenida'
import SeccionPeliculas from '../components/SeccionPeliculas'
import SeccionAbout from '../components/SeccionAbout'
import SeccionTecnica from '../components/SeccionTecnica'
import Footer from '../components/Footer'

function LandingPage() {
    return(
        <Fragment>
            <Bienvenida />
            <SeccionPeliculas />
            <SeccionAbout />
            <SeccionTecnica />
            <Footer />
        </Fragment>
    )
}

export default LandingPage
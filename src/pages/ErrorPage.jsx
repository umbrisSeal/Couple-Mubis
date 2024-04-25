import React, { Fragment, useEffect, useState } from 'react';
import Error404_NotFound from './errors/Error404_NotFound';
import Error400_Wrong from './errors/Error400_Wrong';

const ERRORES = {
    404: <Error404_NotFound />,
    400: <Error400_Wrong />
}

function ErrorPage(props) {
    const [error, setError] = useState(props?.error || 400);

    useEffect(() => {
        //Object.keys(object);
        if(!ERRORES.hasOwnProperty(error)) {
            setError(400);
        }
    }, []);

    const contenido = ERRORES[error];

    return <Fragment>
        { contenido }
    </Fragment>
}

export default ErrorPage
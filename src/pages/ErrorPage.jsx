import React, { Fragment, useEffect, useState } from 'react';
import Error404_NotFound from './errors/Error404_NotFound';

const ERRORES = {
    404: <Error404_NotFound />
}

function ErrorPage(props) {
    const [error, setError] = useState(props?.error || 404);

    useEffect(() => {
        //Object.keys(object);
        if(!ERRORES.hasOwnProperty(error)) {
            setError(404);
        }
    }, []);

    const contenido = ERRORES[error];

    return <Fragment>
        { contenido }
    </Fragment>
}

export default ErrorPage
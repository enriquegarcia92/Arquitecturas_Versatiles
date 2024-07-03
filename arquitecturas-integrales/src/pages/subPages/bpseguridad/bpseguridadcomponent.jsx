import react from "react"
import TextBlock from "../../../components/TextBlock"

import { buenasPracticas, buenasPracticas1 } from "../../../metodologiacontent/cap3";
import { seguridad, seguridad1, seguridad2, seguridad3 } from "../../../metodologiacontent/cap3";
import { tecnologia1, tecnologia2, tecnologia3, tecnologia4 } from "../../../metodologiacontent/cap3";
import { programacion, programacion1, programacion2, programacion3, programacion4, programacion5, programacion6 } from "../../../metodologiacontent/cap3";
import { pruebas, pruebas1, pruebas2, pruebas3 } from "../../../metodologiacontent/cap3";
import { despliegue, despliegue1, contenedores1, contenedores2, contenedores3, contenedores4 } from "../../../metodologiacontent/cap3";
import { servidorWeb, servidorWeb1, servidorWeb2, servidorWeb3, servidorWeb4 } from "../../../metodologiacontent/cap3";
import { ciCd, ciCd1, ciCd2, ciCd3, ciCd4 } from "../../../metodologiacontent/cap3";


const Bpseguridadcomponent = () => {
    return (
    < div className="flex flex-col">

<TextBlock textContent={buenasPracticas} />
<TextBlock textContent={buenasPracticas1} />

<TextBlock textContent={seguridad} />
<TextBlock textContent={seguridad1} />
<TextBlock textContent={seguridad2} />
<TextBlock textContent={seguridad3} />

<TextBlock textContent={tecnologia1} />
<TextBlock textContent={tecnologia2} />
<TextBlock textContent={tecnologia3} />
<TextBlock textContent={tecnologia4} />

<TextBlock textContent={programacion} />
<TextBlock textContent={programacion1} />
<TextBlock textContent={programacion2} />
<TextBlock textContent={programacion3} />
<TextBlock textContent={programacion4} />
<TextBlock textContent={programacion5} />
<TextBlock textContent={programacion6} />

<TextBlock textContent={pruebas} />
<TextBlock textContent={pruebas1} />
<TextBlock textContent={pruebas2} />
<TextBlock textContent={pruebas3} />

<TextBlock textContent={despliegue} />
<TextBlock textContent={despliegue1} />

<TextBlock textContent={contenedores1} />
<TextBlock textContent={contenedores2} />
<TextBlock textContent={contenedores3} />
<TextBlock textContent={contenedores4} />

<TextBlock textContent={servidorWeb} />
<TextBlock textContent={servidorWeb1} />
<TextBlock textContent={servidorWeb2} />
<TextBlock textContent={servidorWeb3} />
<TextBlock textContent={servidorWeb4} />

<TextBlock textContent={ciCd} />
<TextBlock textContent={ciCd1} />
<TextBlock textContent={ciCd2} />
<TextBlock textContent={ciCd3} />
<TextBlock textContent={ciCd4} />
    </div>
    );
};
    export default Bpseguridadcomponent ;
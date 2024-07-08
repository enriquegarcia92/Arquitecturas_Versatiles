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

import {texto21, texto21a, texto21b, texto21c, texto21d, texto21e, texto21f, texto21g, texto21h, texto21i, texto21j,} from "../../../metodologiacontent/txtmetodologia";

const Bpseguridadcomponent = () => {
    return (
    < div className="flex flex-col">

<TextBlock textContent={buenasPracticas} />
<TextBlock textContent={buenasPracticas1} />

<TextBlock textContent={seguridad}  title={"Buenas prácticas de seguridad" } />
<TextBlock textContent={seguridad1} />
<TextBlock textContent={seguridad2} />
<TextBlock textContent={seguridad3} title={"Manejo y autenticación de usuarios en la aplicación"} />

<TextBlock textContent={tecnologia1} />
<TextBlock textContent={tecnologia2} />
<TextBlock textContent={tecnologia3} />
<TextBlock textContent={tecnologia4} />

<TextBlock textContent={programacion} title={"Programación"} />
<TextBlock textContent={programacion1} />
<TextBlock textContent={programacion2} />
<TextBlock textContent={programacion3} />
<TextBlock textContent={programacion4} />
<TextBlock textContent={programacion5} />
<TextBlock textContent={programacion6} />

<TextBlock textContent={pruebas} title={"Pruebas"} />
<TextBlock textContent={pruebas1} />
<TextBlock textContent={pruebas2} />
<TextBlock textContent={pruebas3} />

<TextBlock textContent={despliegue}  title={"Despliegue"}/>
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

<TextBlock textContent={ciCd} title={"Herramientas de integración continua y entrega continua (CI/CD)"} />
<TextBlock textContent={ciCd1} />
<TextBlock textContent={ciCd2} />
<TextBlock textContent={ciCd3} />
<TextBlock textContent={ciCd4} />

<TextBlock textContent={texto21} />

<TextBlock textContent={texto21a} />

<TextBlock textContent={texto21b} />

<TextBlock textContent={texto21c} />

<TextBlock textContent={texto21d} />

<TextBlock textContent={texto21e} />

<TextBlock textContent={texto21f} />

<TextBlock textContent={texto21g} />

<TextBlock textContent={texto21h} />

<TextBlock textContent={texto21i} />

<TextBlock textContent={texto21j} />
    </div>
    );
};
    export default Bpseguridadcomponent ;
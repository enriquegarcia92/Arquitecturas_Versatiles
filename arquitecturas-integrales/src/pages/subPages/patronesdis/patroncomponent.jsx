import react from "react"
import TextBlock from "../../../components/TextBlock"

import { patrones, patrones1 } from "../../../metodologiacontent/cap3";
import {
 texto13, texto13a, texto13b}from "../../../metodologiacontent/txtmetodologia";
const Patroncomponent = () => {
    return (
    < div className="flex flex-col">

<TextBlock textContent={patrones} />
<TextBlock textContent={patrones1} />
      
<pre><TextBlock textContent={texto13} /></pre>
<pre><TextBlock textContent={texto13a} /></pre>


<pre><TextBlock textContent={texto13b} /></pre>

    </div>
    );
};
    export default Patroncomponent ;
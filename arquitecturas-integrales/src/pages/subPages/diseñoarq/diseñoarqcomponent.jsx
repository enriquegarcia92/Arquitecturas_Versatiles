import react from "react"
import TextBlock from "../../../components/TextBlock"
import CodeBlock from "../../../components/CodeBlock"
import { arquitectura, arquitectura1, arquitectura2, arquitectura3 } from "../../../metodologiacontent/cap3";
import {texto12, texto12a, texto12b, texto12c, texto12d} from "../../../metodologiacontent/txtmetodologia";

const Diseñoarqcopomponent = () => {
    return (
    < div className="flex flex-col">

<TextBlock textContent={arquitectura} />
<TextBlock textContent={arquitectura1} />
<TextBlock textContent={arquitectura2} />
<TextBlock textContent={arquitectura3} />


    <TextBlock textContent={texto12} />

      <TextBlock textContent={texto12a} />

      <TextBlock textContent={texto12b} />

      <TextBlock textContent={texto12c} />

      <TextBlock textContent={texto12d} />

    </div>
    );
};
    export default Diseñoarqcopomponent ;
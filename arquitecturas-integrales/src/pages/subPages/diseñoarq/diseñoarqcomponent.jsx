import react from "react"
import TextBlock from "../../../components/TextBlock"
import CodeBlock from "../../../components/CodeBlock"
import { arquitectura, arquitectura1, arquitectura2, arquitectura3 } from "../../../metodologiacontent/cap3";

const Diseñoarqcopomponent = () => {
    return (
    < div className="flex flex-col">

<TextBlock textContent={arquitectura} />
<TextBlock textContent={arquitectura1} />
<TextBlock textContent={arquitectura2} />
<TextBlock textContent={arquitectura3} />

    </div>
    );
};
    export default Diseñoarqcopomponent ;
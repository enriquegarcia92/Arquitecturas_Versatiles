import react from "react"
import TextBlock from "../../../components/TextBlock"
import CodeBlock from "../../../components/CodeBlock"
import { diseño, diseño1, diseño2 } from "../../../metodologiacontent/cap3";

const Diseñosistemacopomponent = () => {
    return (
    < div className="flex flex-col">

<TextBlock textContent={diseño} />
<TextBlock textContent={diseño1} />
<TextBlock textContent={diseño2} />
    </div>
    );
};
    export default Diseñosistemacopomponent ;
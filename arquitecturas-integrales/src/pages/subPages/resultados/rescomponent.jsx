import react from "react"
import TextBlock from "../../../components/TextBlock"

import { resultados, resultados1, resultados2, resultados3 } from "../../../metodologiacontent/cap3";

const Rescomponent = () => {
    return (
    < div className="flex flex-col">

<TextBlock textContent={resultados} />
<TextBlock textContent={resultados1} />
<TextBlock textContent={resultados2} />
<TextBlock textContent={resultados3} />
    </div>
    );
};
    export default Rescomponent ;

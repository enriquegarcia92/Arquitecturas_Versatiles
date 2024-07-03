import react from "react"
import TextBlock from "../../../components/TextBlock"

import { patrones, patrones1 } from "../../../metodologiacontent/cap3";

const Patroncomponent = () => {
    return (
    < div className="flex flex-col">

<TextBlock textContent={patrones} />
<TextBlock textContent={patrones1} />
    </div>
    );
};
    export default Patroncomponent ;
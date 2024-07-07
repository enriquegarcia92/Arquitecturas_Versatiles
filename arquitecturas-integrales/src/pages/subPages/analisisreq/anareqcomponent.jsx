import react from "react"
import TextBlock from "../../../components/TextBlock"
import CodeBlock from "../../../components/CodeBlock"

import { analisis, analisis1, analisis2, analisis3} from "../../../metodologiacontent/cap3";



 
  
const Anareqcomponent = () => {
    return (
    < div className="flex flex-col">

<TextBlock textContent={analisis} title={"Análisis de requerimientos de la aplicación a desarrollar"} />
<TextBlock textContent={analisis1} />
<TextBlock textContent={analisis2} />
<TextBlock textContent={analisis3} />



    </div>
    );
};
    export default Anareqcomponent ;
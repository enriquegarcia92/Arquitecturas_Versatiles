import react from "react"
import { buenasPracticas, buenasPracticas1 } from "../../../metodologiacontent/cap3";
import TextBlock from "../../../components/TextBlock"

const Bpprogracomponent = () => {
    return (
    < div className="flex flex-col">

<TextBlock textContent={buenasPracticas} />
<TextBlock textContent={buenasPracticas1} />

    </div>
    );
};
    export default Bpprogracomponent ;
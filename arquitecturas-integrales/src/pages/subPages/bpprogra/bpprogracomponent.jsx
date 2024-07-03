import react from "react"
import { buenasPracticas, buenasPracticas1 } from "../../../metodologiacontent/cap3";
import TextBlock from "../../../components/TextBlock"
import {texto14, texto14a, texto14b, texto14c, texto14d, texto14e, texto14f, texto15, texto15a, texto15b,
    texto16, texto17, texto17a, texto17b, texto17c, texto17d,
    texto18, texto18a, texto18b, texto18c, texto19, 
    texto19a, texto19b,} from "../../../metodologiacontent/txtmetodologia";
import CodeBlock from "../../../components/CodeBlock"



    const Code3 = `
    /*AddTaskModal.vue*/
    
    triggerNotification (message, color) {
    this.notificationMessage = message;
    this notificationColor = color;
    this. showNotification = true;
    setTimeout ( ( ) => {
    this-showNotification = false;
    }, 3000); // Hide after 3 seconds
    },
    }
      `;
    
      const Code4 = `
    /* TaskBoard */
    
    «div className="h-[90vh]">
    { (tasksNumber > 0) ? (
    listMode ? (
    «ListView tasks={tasks} />
    ) : kanBanMode ? (
    <KanBan tasks={tasks} />
    ): (
    «ListView tasks={tasks) />
    ) : (
    <EmptyTaskboard />
    )}
    </div>
        `;
const Bpprogracomponent = () => {
    return (
    < div className="flex flex-col">

<TextBlock textContent={buenasPracticas} title={"Buenas prácticas de programación"} />
<TextBlock textContent={buenasPracticas1} />
<TextBlock textContent={texto14}  title={"Implementación de buenas prácticas de codificación"} />

<TextBlock textContent={texto14a} title={"Desarrollo Back End con buenas prácticas"} />

<pre><TextBlock textContent={texto14b} title={"Principios aplicados en Spring Boot, Django y Express.js"}/></pre>
<pre><TextBlock textContent={texto14c}title={" Patrones de diseño en Spring Boot, Django y Express.js"}/></pre>
<pre><TextBlock textContent={texto14d} title={"Principio de sustitución de Liskov en Spring Boot, Django y Express.js"} /></pre>
<pre><TextBlock textContent={texto14e} title={"Principios adicionales en Spring Boot, Django y Express.js"}/></pre>

<TextBlock textContent={texto14f} title={"Implementación de prácticas en codificación para React y Vue"} />

<TextBlock textContent={texto15} title={"Single Responsibility Principle (Principio de la única responsabilidad"} />

<TextBlock textContent={texto15a} />

<TextBlock textContent={texto15b} />

<TextBlock textContent={texto16} />

<TextBlock textContent={texto17} title={"Principio abierto/cerrado"} />

<TextBlock textContent={texto17a} />

<TextBlock textContent={texto17b} />

<TextBlock textContent={texto17c} />

<TextBlock textContent={texto17d} />

<CodeBlock code1={Code3} language1="javascript" />

<TextBlock textContent={texto18} title={"Principio de la sustitución de Liskov"} />

<TextBlock textContent={texto18a} />

<TextBlock textContent={texto18b} />

<TextBlock textContent={texto18c} />

<TextBlock textContent={texto19} title={"Principio de segregación de interfaz"}/>

<TextBlock textContent={texto19a} />

<TextBlock textContent={texto19b} />

<CodeBlock code1={Code4} language1="javascript" />

    </div>
    );
};
    export default Bpprogracomponent ;
import react from "react"
import { buenasPracticas, buenasPracticas1 } from "../../../metodologiacontent/cap3";
import TextBlock from "../../../components/TextBlock"
import {texto14, texto14a, texto14b, texto14c, texto14d, texto14e, texto14f, texto15, texto15a, texto15b,
    texto16, texto17, texto17a, texto17b, texto17c, texto17d,
    texto18, texto18a, texto18b, texto18c} from "../../../metodologiacontent/txtmetodologia";
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

<TextBlock textContent={buenasPracticas} />
<TextBlock textContent={buenasPracticas1} />
<TextBlock textContent={texto14} />

<TextBlock textContent={texto14a} />

<pre><TextBlock textContent={texto14b} /></pre>
<pre><TextBlock textContent={texto14c} /></pre>
<pre><TextBlock textContent={texto14d} /></pre>
<pre><TextBlock textContent={texto14e} /></pre>


<TextBlock textContent={texto14f} />

      
     
      
<TextBlock textContent={texto15} />

<TextBlock textContent={texto15a} />

<TextBlock textContent={texto15b} />

<TextBlock textContent={texto16} />

<TextBlock textContent={texto17} />

<TextBlock textContent={texto17a} />

<TextBlock textContent={texto17b} />

<TextBlock textContent={texto17c} />

<TextBlock textContent={texto17d} />

<CodeBlock code1={Code3} language1="javascript" />

<TextBlock textContent={texto18} />

<TextBlock textContent={texto18a} />

<TextBlock textContent={texto18b} />

<TextBlock textContent={texto18c} />

<CodeBlock code1={Code4} language1="javascript" />

    </div>
    );
};
    export default Bpprogracomponent ;
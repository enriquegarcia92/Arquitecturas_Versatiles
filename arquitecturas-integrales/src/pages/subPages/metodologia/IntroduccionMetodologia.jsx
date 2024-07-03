import React from "react"
import TextBlock from "../../../components/TextBlock"
import CodeBlock from "../../../components/CodeBlock"
//import {test, } from "../../../img";
import {
  texto2, texto2a, texto2b, texto2c, texto2d, texto2e, texto2f, texto2g, texto2h, texto2i, texto2j,
  texto2k, texto2l, texto2m, texto2n, texto2o, texto2p, texto2q, texto2r, texto2s, texto2t, texto2u, texto2v,
  texto3, 
  texto11, texto11a, texto11b, texto11c, texto11d, texto11e, texto11f, texto11g, texto11h, texto11i, texto11j, texto11k, texto11l, texto11m,
  texto12, texto12a, texto12b, texto12c, texto12d,
  texto13, texto13a, texto13b,
  texto14, texto14a, texto14b, texto14c, texto14d, texto14e, texto14f,
  texto15, texto15a, texto15b,
  texto16, texto17, texto17a, texto17b, texto17c, texto17d,
  texto18, texto18a, texto18b, texto18c,
  texto19, 
  texto19a, texto19b, 
  texto20, texto20a, texto20b, texto20c, texto20d, texto20e,
  texto21, texto21a, texto21b, texto21c, texto21d, texto21e, texto21f, texto21g, texto21h, texto21i, texto21j,
  texto100, texto101, texto102
} from "../../../metodologiacontent/txtmetodologia";

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
const IntroduccionMetodologia = () => {
    return (
      <div className='flex flex-col'>
        
        <TextBlock title="Metodologia de Flytask"/>
        <TextBlock textContent={texto100}/>
        <TextBlock textContent={texto101}/>
        <TextBlock textContent={texto102}/>

      <TextBlock title="Fases para el desarrollo de un proyecto" textContent={texto2} />

      <TextBlock textContent={texto2} />
      
      <TextBlock textContent={texto2a} />
      
      <TextBlock textContent={texto2b} />
      
      <TextBlock textContent={texto2c} />
      
      <TextBlock textContent={texto2d} />
      
      <TextBlock textContent={texto2e} />
      
      <TextBlock textContent={texto2f} />
      
      <TextBlock textContent={texto2g} />
      
      <TextBlock textContent={texto2h} />
      
      <TextBlock textContent={texto2i} />
      
      <TextBlock textContent={texto2j} />
      
      <TextBlock textContent={texto2k} />
      
      <TextBlock textContent={texto2l} />
      
      <TextBlock textContent={texto2m} />
      
      <TextBlock textContent={texto2n} />
      
      <TextBlock textContent={texto2o} />
      
      <TextBlock textContent={texto2p} />
      
      <TextBlock textContent={texto2q} />
      
      <TextBlock textContent={texto2r} />
      
      <TextBlock textContent={texto2s} />
      
      <TextBlock textContent={texto2t} />
      
      <TextBlock textContent={texto2u} />
      
      <TextBlock textContent={texto2v} />

      <TextBlock title="Resultados" textContent={texto3} />
      <TextBlock textContent={texto3} />

      <TextBlock textContent={texto11} />

      <TextBlock textContent={texto11a} />

      <TextBlock textContent={texto11b} />

      <TextBlock textContent={texto11c} />

      <TextBlock textContent={texto11d} />

      <TextBlock textContent={texto11e} />

      <TextBlock textContent={texto11f} />

      <TextBlock textContent={texto11g} />

      <TextBlock textContent={texto11h} />

      <TextBlock textContent={texto11i} />

      <TextBlock textContent={texto11j} />

      <TextBlock textContent={texto11k} />

      <TextBlock textContent={texto11l} />

      <TextBlock textContent={texto11m} />
      
      <TextBlock textContent={texto12} />

      <TextBlock textContent={texto12a} />

      <TextBlock textContent={texto12b} />

      <TextBlock textContent={texto12c} />

      <TextBlock textContent={texto12d} />
      
      <TextBlock textContent={texto13} />

      <TextBlock textContent={texto13a} />

      <TextBlock textContent={texto13b} />
      
      <TextBlock textContent={texto14} />

      <TextBlock textContent={texto14a} />

      <TextBlock textContent={texto14b} />

      <TextBlock textContent={texto14c} />

      <TextBlock textContent={texto14d} />

      <TextBlock textContent={texto14e} />

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
      
      <CodeBlock code={Code3} language="javascript" />
      
      <TextBlock textContent={texto18} />

      <TextBlock textContent={texto18a} />

      <TextBlock textContent={texto18b} />

      <TextBlock textContent={texto18c} />
      
      <CodeBlock code={Code4} language="javascript" />
      
      <TextBlock textContent={texto19} />

      <TextBlock textContent={texto19a} />

      <TextBlock textContent={texto19b} />
      
      <TextBlock textContent={texto20} />

      <TextBlock textContent={texto20a} />

      <TextBlock textContent={texto20b} />

      <TextBlock textContent={texto20c} />

      <TextBlock textContent={texto20d} />

      <TextBlock textContent={texto20e} />
      
      <TextBlock textContent={texto21} />

      <TextBlock textContent={texto21a} />

      <TextBlock textContent={texto21b} />

      <TextBlock textContent={texto21c} />

      <TextBlock textContent={texto21d} />

      <TextBlock textContent={texto21e} />

      <TextBlock textContent={texto21f} />

      <TextBlock textContent={texto21g} />

      <TextBlock textContent={texto21h} />

      <TextBlock textContent={texto21i} />

      <TextBlock textContent={texto21j} />
      
      </div>
       )
    }
export default IntroduccionMetodologia
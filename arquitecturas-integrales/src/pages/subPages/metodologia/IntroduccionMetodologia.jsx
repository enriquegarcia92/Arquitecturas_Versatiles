import React from "react"
import TextBlock from "../../../components/TextBlock"
import CodeBlock from "../../../components/CodeBlock"
//import {test, } from "../../../img";
import ImageComponent from "../../../components/ImageComponent";
import {
  texto1,
  texto2, texto2a, texto2b, texto2c, texto2d, texto2e, texto2f, texto2g, texto2h, texto2i, texto2j,
  texto2k, texto2l, texto2m, texto2n, texto2o, texto2p, texto2q, texto2r, texto2s, texto2t, texto2u, texto2v,
  texto3, texto3a, texto3b, texto3c, texto3d, texto3e, texto3f, texto3g, texto3h, texto3i, texto3j, texto3k, texto3l, texto3m,
  texto4, texto5, texto6, texto7, texto8, texto9, texto10,
  texto11, texto11a, texto11b, texto11c, texto11d, texto11e, texto11f, texto11g, texto11h, texto11i, texto11j, texto11k, texto11l, texto11m,
  texto12, texto12a, texto12b, texto12c, texto12d,
  texto13, texto14, texto15, texto16, texto17, texto18, texto19, texto20, texto21,
  texto100, texto101, texto102
} from "../../../metodologiacontent/txtmetodologia";

import login from "../../../img/login.png";
import signup from "../../../img/signup.png";
import emailsent from "../../../img/emailsent.png";
import createntask from "../../../img/createntask.png";
import dashboard from "../../../img/dashboard.png";
import emptylist from "../../../img/emptylist.png";
import editask from "../../../img/editask.png";





const Code1 = `
/* objeto user*/ 

_id: ObjectId( '667060acc3d30cca3237b746' ),
usr_name: "Enrique Garcia",
usr_email: "test@gmail. com",
usr_password:
"$2a$10$VnRw/NCkzDhUUSfJ0kvvj0q0zDzuf2pAAXYdpjM/SQrsrNYLAAWUy"
usr_role: "CLIENT"
  `;

  const Code2 = `
  /* objeto task */
   {
id: ObjectId( '667060a5c3d30cca3237b743'),
tsk_title: "Corregir filter",
tsk_desc:
"Corregir filtro de busqueda de tasks",
tsk_status: 1,
tsk_creation_date:
2024-06-17116: 13:25.094+00:00,
tsk_due_date:
2024-04- 18T00:00:00. 000+00:00,
usr_id: ObjectId( '66705a3c66cb3f7cd9f2501d' )
}
  `;


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
        <TextBlock textContent={texto1}/>
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

<TextBlock textContent={texto3a} />

<TextBlock textContent={texto3b} />

<TextBlock textContent={texto3c} />

<TextBlock textContent={texto3d} />

<TextBlock textContent={texto3e} />

<TextBlock textContent={texto3f} />

<TextBlock textContent={texto3g} />

<TextBlock textContent={texto3h} />

<TextBlock textContent={texto3i} />

<TextBlock textContent={texto3j} />

<TextBlock textContent={texto3k} />

<TextBlock textContent={texto3l} />

<TextBlock textContent={texto3m} />
      
      <CodeBlock code={Code1} language="javascript" />
      
      <CodeBlock code={Code2} language="javascript" />
      
      <TextBlock textContent={texto4} />
      
      <ImageComponent 
        image={login}
        width="w-50"
        height="h-50" 
        title="login page" 
      />
      
      <TextBlock textContent={texto5} />
      
      <ImageComponent 
        image={signup}
        width="w-50"
        height="h-50" 
        title="signup page" 
      />
      
      <TextBlock textContent={texto6} />
      
      <ImageComponent 
        image={emailsent}
        width="w-50"
        height="h-50" 
        title="email sent" 
      />
      
      <TextBlock textContent={texto7} />
      
      <ImageComponent 
        image={emptylist}
        width="w-50"
        height="h-50" 
        title="empty list" 
      />
      
      <TextBlock textContent={texto8} />
      
      <ImageComponent 
        image={createntask}
        width="w-50"
        height="h-50" 
        title="create new task" 
      />
      
      <TextBlock textContent={texto9} />
      
      <ImageComponent 
        image={dashboard}
        width="w-50"
        height="h-50" 
        title="dashboard" 
      />
      
      <TextBlock textContent={texto10} />
      
      <ImageComponent 
        image={editask}
        width="w-50"
        height="h-50" 
        title="edit task" 
      />
      
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
      
      <TextBlock textContent={texto14} />
      
      <TextBlock textContent={texto15} />
      
      <TextBlock textContent={texto16} />
      
      <TextBlock textContent={texto17} />
      
      <CodeBlock code={Code3} language="javascript" />
      
      <TextBlock textContent={texto18} />
      
      <CodeBlock code={Code4} language="javascript" />
      
      <TextBlock textContent={texto19} />
      
      <TextBlock textContent={texto20} />
      
      <TextBlock textContent={texto21} />
      


      </div>
       )
    }
export default IntroduccionMetodologia
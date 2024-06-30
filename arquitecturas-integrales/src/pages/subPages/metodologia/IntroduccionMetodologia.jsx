import React from "react"
import TextBlock from "../../../components/TextBlock"
import CodeBlock from "../../../components/CodeBlock"
//import {test, } from "../../../img";
import ImageComponent from "../../../components/ImageComponent";
import { texto1, texto2, texto3, texto4, texto5, texto6, texto7, texto8, texto9, texto10, texto11, texto12, texto13, texto14, texto15, texto16, texto17, texto18, texto19, texto20, texto21, texto100, texto101, texto102} from "../../../metodologiacontent/txtmetodologia";
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
        <TextBlock textContent=<pre>{texto1}</pre>/>
      <TextBlock title="Fases para el desarrollo de un proyecto" textContent={texto2} />

      <TextBlock title="Resultados" textContent={texto3} />
      
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
      
      <TextBlock textContent={texto12} />
      
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
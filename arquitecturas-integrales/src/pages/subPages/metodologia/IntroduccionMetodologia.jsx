import React from "react"
import TextBlock from "../../../components/TextBlock"
import CodeBlock from "../../../components/CodeBlock"
//import {test, } from "../../../img";
import ImageComponent from "../../../components/ImageComponent";
import { texto1, texto2, texto3, texto4, texto5, texto6, texto7, texto8, texto9, texto10, texto11, texto12, texto13, texto14, texto15, texto16, texto17, texto18, texto19, texto20, texto21 } from "../../../metodologiacontent/txtmetodologia";
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
        
        <TextBlock title="Metodologia de Flytask" textContent = <pre>{texto1}</pre>
 />

        <TextBlock  title="Fases para el desarrollo de un proyecto" textContent = <pre>{texto2}</pre>/>

        <TextBlock  title="Resultados" textContent = <pre>{texto3}</pre>/>

        <CodeBlock code={Code1} language="javascript" />

        <CodeBlock code={Code2} language="javascript" />

        <TextBlock   textContent = <pre>{texto4}</pre>/>

        <ImageComponent image = {login}
        width="w-24"
        height="h-24" 
        title="login page" />

        <TextBlock textContent={<pre> {texto5} </pre>} />

        <ImageComponent image = {signup}
        width="w-24"
        height="h-24" 
        title="login page" />

        <TextBlock textContent={<pre>{texto6}</pre>} />

        <ImageComponent image = {emailsent}
        width="w-24"
        height="h-24" 
        title="email sent" />

        <TextBlock textContent={<pre>{texto7}</pre>} />

        <ImageComponent image = {emptylist}
        width="w-24"
        height="h-24" 
        title="emty list" />
 

        <TextBlock textContent={<pre>{texto8}</pre>} />

       <ImageComponent image = {createntask}
        width="w-24"
        height="h-24" 
        title="create new task" />

        <TextBlock textContent={<pre>{texto9}</pre>} />

        <ImageComponent image = {dashboard}
        width="w-24"
        height="h-24" 
        title="dashboard" />

        <TextBlock textContent={<pre>{texto10}</pre>} />

        <ImageComponent image = {editask}
        width="w-24"
        height="h-24" 
        title="edit task" />

        <TextBlock textContent={<pre>{texto11}</pre>} />

        <TextBlock textContent={<pre>{texto12}</pre>} />

        <TextBlock textContent={<pre>{texto13}</pre>} />

        <TextBlock textContent={<pre>{texto14}</pre>} />

        <TextBlock textContent={<pre>{texto15}</pre>} />

        <TextBlock textContent={<pre>{texto16}</pre>} />

        <TextBlock textContent={<pre>{texto17}</pre>} />

        <CodeBlock code={Code3} language="javascript" />

        <TextBlock textContent={<pre>{texto18}</pre>} />

        <CodeBlock code={Code4} language="javascript" />

        <TextBlock textContent={<pre>{texto19}</pre>} />

        <TextBlock textContent={<pre>{texto20}</pre>} />

        <TextBlock textContent={<pre>{texto21}</pre>} />


      </div>
       )
    }
export default IntroduccionMetodologia
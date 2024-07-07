import react from "react"
import CodeBlock from "../../../components/CodeBlock"
import TextBlock from "../../../components/TextBlock"
import ImageComponent from "../../../components/ImageComponent";
import { diseño, diseño1, diseño2 } from "../../../metodologiacontent/cap3";
import {texto3a, texto3b, texto3c, texto3d, texto3e, texto3f, texto3g, texto3h, texto3i, texto3j, texto3k, texto3l, texto3m,
    texto4, texto5, texto6, texto7, texto8, texto9, texto10, texto11, texto11a, texto11b, texto11c, texto11d, texto11e, texto11f, texto11g, texto11h, texto11i, texto11j, texto11k, texto11l, texto11m} from "../../../metodologiacontent/txtmetodologia";
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

const Diseñosistemacopomponent = () => {
    return (
    < div className="flex flex-col">

<TextBlock textContent={diseño} />
<TextBlock textContent={diseño1} />
<TextBlock textContent={diseño2} />

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
      
      <CodeBlock code1={Code1} language1="javascript" />
      
      <CodeBlock code1={Code2} language1="javascript" />
      
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

      <pre><TextBlock textContent={texto11a} /></pre>
<pre><TextBlock textContent={texto11b} /></pre>
<pre><TextBlock textContent={texto11c} /></pre>
<pre><TextBlock textContent={texto11d} /></pre>
<pre><TextBlock textContent={texto11e} /></pre>
<pre><TextBlock textContent={texto11f} /></pre>
<pre><TextBlock textContent={texto11g} /></pre>
<pre><TextBlock textContent={texto11h} /></pre>
<pre><TextBlock textContent={texto11i} /></pre>
<pre><TextBlock textContent={texto11j} /></pre>
<pre><TextBlock textContent={texto11k} /></pre>
<pre><TextBlock textContent={texto11l} /></pre>
<pre><TextBlock textContent={texto11m} /></pre>

    </div>
    );
};
    export default Diseñosistemacopomponent ;
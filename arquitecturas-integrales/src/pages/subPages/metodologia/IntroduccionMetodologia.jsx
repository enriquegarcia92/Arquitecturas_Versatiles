import React from "react"
import TextBlock from "../../../components/TextBlock"
import CodeBlock from "../../../components/CodeBlock"
import test from "../../../img/test.png";
import ImageComponent from "../../../components/ImageComponent";
import { texto1, texto2 } from "../../../metodologiacontent/txtmetodologia";

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
const IntroduccionMetodologia = () => {
    return (
      <div className='flex flex-col'>
        
        <TextBlock title="Metodologia de Flytask" textContent = <pre>{texto1}</pre>
 />

        <TextBlock  title="Fases para el desarrollo de un proyecto" textContent = <pre>{texto2}</pre>/>
        
        <CodeBlock code={Code1} language="javascript" />
        <CodeBlock code={Code2} language="javascript" />
       <ImageComponent
        image={test}
        width="w-24"
        height="h-24" // Example of using Tailwind CSS height utility class
        title="Example Image"
        description="This is an example image description."
      />
      </div>
       )
    }
export default IntroduccionMetodologia
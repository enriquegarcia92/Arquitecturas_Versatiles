import React from 'react'
import CodeBlock from '../../components/CodeBlock'
import TextBlock from '../../components/TextBlock';
import ImageComponent from '../../components/ImageComponent';
import chincheta from "../../img/chincheta.png";

const sampleCode = `
    import React from 'react';

    const HelloWorld = () => {
      return (
        <div>
          <h1>Hello, world!</h1>
        </div>
      );
    };

    export default HelloWorld;
  `;

const GettingStartedPage = () => {
  return (
    <div className='flex flex-col'>
      <CodeBlock code={sampleCode} language="javascript"/> 
      <TextBlock title="Titulo de sección" textContent="Ejemplo de texto"/>
      <ImageComponent
        image={chincheta}
        width="w-24"
        height="h-24" // Example of using Tailwind CSS height utility class
        title="Example Image"
        description="This is an example image description."
      />
    </div>
  )
}

export default GettingStartedPage
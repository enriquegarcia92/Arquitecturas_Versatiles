import React from 'react'
import TextBlock from '../../../components/TextBlock'
import ImageComponent from '../../../components/ImageComponent'
import reactApi from '../../../img/reactApi.png'
import reactComponents from '../../../img/reactComponents.png'
import reactPages from '../../../img/pagesReact.png'
import reactUtils from '../../../img/reactUtils.png'
import vueApi from '../../../img/vueAPI.png'
import vueComponents from '../../../img/vueComponent.png'
import vueRouter from '../../../img/vueRouter.png'
import vueUtils from '../../../img/vueUtils.png'
import vueViews from '../../../img/vueViews.png'

const folderStructIntro = `En conjunto con las implementaciones descritas en secciones anteriores, los clientes
web presentados utilizan patrones de arquitectura Screaming en la estructura de carpetas y archivos de cada proyecto. 
Se utilizan nombres altamente expresivos para los archivos y carpetas con titulos que reflejan su contenido. Para cada 
cliente se provee la siguiente estructura:`

const apiReact = `En React se tiene dentro de /src una carpeta "api" con todos los archivos relacionados a la conexión
con servidores y sus archivos utilizan nomenclatura altamente expresiva como se observa en la siguiente imagen:`

const componentsReact = `La carpeta components dentro de /src contiene secciones de una página, los archivos 
encapsulan los elementos gráficos y funcionales para realizar una sola tarea, por ejemplo un botón que borra una
tarea o un modal (existe la carpeta modals dentro de components) que edita una tarea. La aplicación del principio
Single Responsability crea una arquitectura en la que encontrar un elemento que se desea modificar es sencillo por la
distribución en categorías de archivos y la nomenclatura expresiva como se muestra a continuación:`

const pagesReact = `La carpeta pages dentro de /src contiene archivos para páginas enteras, es decir, componentes que agrupan
conjuntos de funcionalidades y elementos visuales normalmente llamados "pantallas", las pantallas utlizan los componente de la carpeta descrita
antes como secciones que las conforman. Se utiliza nomenclatura expresiva para hacer saber a otros codificadores las tareas que un archivo "página" realiza`

const FolderStruct = () => {
  return (
    <div>
        <TextBlock title="Estructura de carpetas" textContent={folderStructIntro}/>
        <TextBlock title="React"/>
        <TextBlock title="API"  textContent={apiReact}/>
        <div className='w-full flex justify-evenly items-bottom'>
            <ImageComponent image={reactApi} width="w-36" height="" title="React API"/>
            <ImageComponent image={vueApi} width="w-36" height="" title="VueJS API"/>
        </div>
        <TextBlock title="Components" textContent={componentsReact}/>
        <div className='w-full flex justify-evenly items-bottom'>
            <ImageComponent image={reactComponents} width="w-36" height="" title="React Components"/>
            <ImageComponent image={vueComponents} width="w-36" height="" title="VueJS Components"/>
        </div>
        <TextBlock title="Pages" textContent={pagesReact}/>
        <div className='w-full flex justify-evenly items-bottom'>
            <ImageComponent image={reactPages} width="w-36" height="" title="React Pages"/>
            <ImageComponent image={vueViews} width="w-36" height="" title="VueJS Views"/>
        </div>
        <TextBlock title="Utils" textContent="Utils contiene archivos que almacenan funciones usadas para conversiones, filtrado y manipulación de datos que pueden ser reutilizadas en toda la aplicación"/>
        <div className='w-full flex justify-evenly items-bottom'>
            <ImageComponent image={reactUtils} width="w-36" height="" title="React Utils"/>
            <ImageComponent image={vueUtils} width="w-36" height="" title="VueJS Utils"/>
        </div>
        <TextBlock title="Router (VueJS)" textContent="En el caso de VueJS se utiliza la carpeta Router para contener el archivo index.js que contiene el enrutador del cliente:"/>
        <div className='w-full flex justify-evenly items-bottom'>
            <ImageComponent image={vueRouter} width="w-36" height="" title="VueJS Router"/>
        </div>
        <TextBlock textContent="En la carpeta src también se encuentran los archivos App.tsx (App.vue) y Main.tsx (Main.js), archivos raiz y punto de entrada, junto a archivos de configuración de dependencias como package.json y vite.config.ts que proveen las configuraciones para el funcionamiento del cliente."/>
    </div>
  )
}

export default FolderStruct
---
page_type: sample
products:
- office-365
- ms-graph
languages:
- javascript
description: "Este ejemplo muestra cómo rellenar componentes de Office UI Fabric React con datos extraídos de Microsoft Graph"
extensions:
  contentType: samples 
  technologies:
  - Microsoft Graph
  - Office UI Fabric
  services:
  - Office 365
  platforms:
  - React
  createdDate: 1/6/2017 9:41:30 AM
---
# Ejemplo de Office UI Fabric React de Microsoft Graph

## Tabla de contenido

* [Introducción](#introduction)
* [Requisitos previos](#prerequisites)
* [Registrar la aplicación](#register-the-application)
* [Compilar y ejecutar el ejemplo](#build-and-run-the-sample)
* [Código de nota](#code-of-note)
* [Preguntas y comentarios](#questions-and-comments)
* [Colaboradores](#contributing)
* [Recursos adicionales](#additional-resources)

## Introducción

En este ejemplo se muestra una aplicación simple de React que usa datos de Microsoft Graph con componentes de Office UI Fabric React (versión preliminar); principalmente los componentes [PeoplePicker](https://dev.office.com/fabric#/components/peoplepicker) y [DetailsList](https://dev.office.com/fabric#/components/detailslist).

<img src="./readme-assets/peoplepickerexample.png" alt="Captura de pantalla de ejemplo de Office UI Fabric React de Microsoft Graph" width="500">

En el ejemplo se usa la [Biblioteca cliente de JavaScript de Microsoft Graph](https://github.com/microsoftgraph/msgraph-sdk-javascript) para interactuar con Microsoft Graph, y [HelloJS](https://adodson.com/hello.js/) para la autenticación con el [punto de conexión de Azure AD v2.0](https://azure.microsoft.com/en-us/documentation/articles/active-directory-appmodel-v2-overview).

## Requisitos previos

Este ejemplo necesita lo siguiente:  

* [Node.js](https://nodejs.org/). Node es necesario para ejecutar el ejemplo en un servidor de desarrollo y para instalar las dependencias.
* Una [cuenta profesional o educativa](https://dev.office.com/devprogram).
  
## Registrar la aplicación

1. Vaya a la página [Registros de aplicaciones](https://go.microsoft.com/fwlink/?linkid=2083908) de Microsoft Azure Portal.

2. Seleccione **Nuevo registro**.

3. Cuando aparezca la **página Registrar una aplicación**, escriba la información de registro de la aplicación:

    * En la sección **Nombre**, escriba el nombre de la aplicación (por ejemplo, `MyReactSample`).
    * Cambie **Tipos de cuenta admitidos** a **Cuentas en cualquier directorio de organización y cuentas personales de Microsoft (por ejemplo, Skype, Xbox, Outlook.com)**.
    * En la sección URI de redireccionamiento, seleccione **Web** en el cuadro combinado y escriba la siguiente URI de redireccionamiento: `https://localhost:3000/`.

4. Seleccione **Registrar** para crear la aplicación.

   Se muestra la página de información general de registro, donde se indican las propiedades de la aplicación.

5. Copie el **Id. de aplicación (cliente)** y grábelo. Este es el identificador único de la aplicación. Usará este valor para configurar la aplicación.

6. Seleccione la sección **Autenticación**.
    * En la sección **Configuración avanzada** | **Concesión implícita**, marque **Tokens de acceso.** y **Tokens de Id.**, ya que este ejemplo requiere
	que se habilite el [Flujo de concesión implícito](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-implicit-grant-flow)
	para que el usuario inicie sesión y para llamar a una API.

7. Seleccione **Guardar**.

## Compilar y ejecutar el ejemplo

1. Clone o descargue el ejemplo de Office UI Fabric React de Microsoft Graph.

2. Con su IDE favorito, abra config.js en el directorio *src/helpers*.

3. Reemplace el valor del marcador de posición **applicationId** con el Id. de la aplicación de Azure registrada.

4. Abra un símbolo del sistema en el directorio raíz del ejemplo y ejecute el siguiente comando para instalar las dependencias del proyecto.

  ```
  npm install
  ```

5. Una vez que las dependencia estén instaladas, ejecute el siguiente comando para iniciar el servidor de desarrollo.

  ```
  npm start
  ```

6. Vaya a *http://localhost:3000* en el explorador web.

7. Inicie sesión con su cuenta profesional o educativa.  

    >Nota: Aunque el punto de conexión de Azure AD v2.0 permite iniciar sesión con cuentas personales, profesionales y educativas, en este ejemplo del selector de personas se usan características que solo se admiten en cuentas profesionales o educativas (como el punto de conexión[`/me/people`](https://graph.microsoft.io/en-us/docs/api-reference/beta/api/user_list_people)).
  
8. En la barra de comandos, seleccione **Elegir componente > Selector de personas** o **Elegir componente > Lista de detalles**.

   - En el ejemplo del selector de personas, puede filtrar la lista de personas o buscar usuarios en la organización.
  
   - En el ejemplo de la lista de detalles, puede seleccionar elementos de la lista de archivos, filtrar elementos por nombre o hacer doble clic en un elemento para abrirlo en OneDrive.

Pasos siguientes: Pruebe a agregar más funcionalidades u otros componentes a este ejemplo o cree su propia aplicación simple siguiendo el [Tutorial de Office UI Fabric React](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/ghdocs/README.md).

## Código de nota

### Autenticación
Esta aplicación de ejemplo usa [HelloJS](https://adodson.com/hello.js/) para la autenticación con el [punto de conexión de Azure AD v2.0](https://azure.microsoft.com/en-us/documentation/articles/active-directory-appmodel-v2-overview). 

 - [`App.js`](./App.js). Inicializa una red de autenticación de Azure AD personalizada para HelloJS y proporciona los métodos de inicio y cierre de sesión.
 
 >¡Importante! La aplicación implementa un modelo de autenticación muy simple. Reutiliza el token de acceso hasta que el usuario cierra sesión o hasta que recibe el error 401 "El token de acceso ha caducado", momento en el que redirige al método de inicio de sesión. Las aplicaciones de producción deben crear una forma más segura de controlar la autenticación y la validación.

### Interacción con Microsoft Graph
En este ejemplo se usa la [Biblioteca cliente de JavaScript de Microsoft Graph](https://github.com/microsoftgraph/msgraph-sdk-javascript) (SDK) para interactuar con Microsoft Graph. 

 - [`GraphSdkHelper`](./src/helpers/GraphSdkHelper.js). Usa el cliente de SDK para llamar a Microsoft Graph y controlar las respuestas. 
 
 El cliente se inicializa con un proveedor de autenticación que obtiene el token de acceso actual para usarlo para cada solicitud. El ejemplo funciona con las API de [Usuario](https://graph.microsoft.io/en-us/docs/api-reference/v1.0/resources/user), [Persona](https://graph.microsoft.io/en-us/docs/api-reference/beta/resources/person) (versión preliminar) y [DriveItem](https://graph.microsoft.io/en-us/docs/api-reference/v1.0/resources/driveitem).

### Componentes y estilos de Fabric
En este ejemplo se usan varios [componentes de Office UI Fabric React](https://dev.office.com/fabric#/components) (versión preliminar). Con el modelo de desarrollo flexible de Fabric, puede elegir basarse en el comportamiento predeterminado de un componente o personalizarlo para adaptarlo a sus necesidades.

 - [`App.js`](./App.js). Página principal de la aplicación que usa el componente **CommandBar** para explorar los ejemplos y elegir iniciar sesión o cerrar sesión.
 
 - [`PeoplePicker.js`](./src/component-examples/PeoplePicker.js). Ejemplo de selector de personas en el que se usa el componente **NormalPeoplePicker** para mostrar los componentes **Persona**. También se usan los componentes **Button** y **MessageBar**. 
 
 La implementación del selector de personas de ejemplo funciona de la siguiente manera:
   
   - Cuando se carga el ejemplo del selector de personas, el ejemplo envía una solicitud a Microsoft Graph para obtener las 20 primeras personas que son relevantes para el usuario actual (primero recupera los metadatos y después recupera las fotos del perfil). Los metadatos del usuario se asignan a los objetos **Persona** que se almacenan en la matriz **_peopleList**.
   
   - Cuando se escribe texto en el selector, el método **_onFilterChanged** devuelve los resultados correspondientes de la lista de personas, que se muestran como personas sugeridas.
   
   - Cuando se hace clic en el botón **Buscar**, el método **_onGetMoreResults** consulta a Microsoft Graph los primeros 20 usuarios cuyo nombre empieza por el texto de filtro. Los resultados se agregan temporalmente a la matriz de personas para usarlos en el método **_onFilterChanged**.
   
   - Cuando se selecciona o anula la selección de alguna persona, el método **_onSelectionChanged** actualiza una matriz local de personas seleccionadas.
   
 - [`DetailsList.js`](./src/component-examples/DetailsList.js). Ejemplo de lista de detalles donde se usa el componente **DetailsList** con las utilidades **MarqueeSelection** y **Selection**. También se usan los componentes **Spinner** y **TextField**.

 La implementación de la lista de detalles de ejemplo funciona de la siguiente manera:
   
   - Cuando se carga el ejemplo de la lista de detalles, el ejemplo envía una solicitud a Microsoft Graph para obtener los 100 primeros elementos de la unidad raíz del usuario actual. Los metadatos de elemento de unidad se asignan a los objetos de elemento de lista, se almacenan en la matriz **_items** y se guardan en el estado. Si se pagina el conjunto de resultados, se agrega una entrada null a la matriz de elementos para desencadenar una solicitud de la siguiente página de resultados.
   
   - Cuando se escribe el texto de filtro en el campo de texto, el método **_onFilterChanged** actualiza el estado con los resultados coincidentes.
   
   - Cuando se selecciona o se anula la selección de algún elemento de lista, se invoca el método **_getSelectionDetails**.
   
En el ejemplo también se hace referencia a los estilos de Office UI fabric Core en [`index.html`](./public/index.html).

## Solución de problemas

| Problema | Resolución |
|:------|:------|
| Errores internos del servidor de consultas de imágenes almacenadas en caché en Microsoft Edge | Si actualiza el explorador mientras usa el ejemplo, es posible que reciba errores HTTP 500 (error interno del servidor) de consultas de fotos de perfil almacenadas en caché Una solución alternativa es cerrar la pestaña del ejemplo, borrar la memoria caché del explorador y, después, volver a abrir el ejemplo. |  
| Error de sintaxis en Internet Explorer | La Biblioteca cliente de JavaScript de Microsoft Graph usa promesas de ES6. PR relacionado: [microsoftgraph/msgraph-sdk-javascript#29](https://github.com/microsoftgraph/msgraph-sdk-javascript/pull/29) |

## Preguntas y comentarios

Nos encantaría recibir sus comentarios sobre este ejemplo. Puede enviarnos sus preguntas y sugerencias a través de la sección [Problemas](https://github.com/microsoftgraph/react-officeuifabric-sample/issues) de este repositorio.

Su opinión es importante para nosotros. Conecte con nosotros en [Stack Overflow](https://stackoverflow.com/questions/tagged/microsoftgraph). Etiquete sus preguntas con [MicrosoftGraph].

## Colaboradores

Si le gustaría contribuir a este ejemplo, vea [CONTRIBUTING.md](CONTRIBUTING.md).

Este proyecto ha adoptado el [Código de conducta de código abierto de Microsoft](https://opensource.microsoft.com/codeofconduct/). Para obtener más información, vea [Preguntas frecuentes sobre el código de conducta](https://opensource.microsoft.com/codeofconduct/faq/) o póngase en contacto con [opencode@microsoft.com](mailto:opencode@microsoft.com) si tiene otras preguntas o comentarios.

## Recursos adicionales

- [Componentes de Office UI Fabric](https://dev.office.com/fabric#/components)
- [Otros ejemplos de Microsoft Graph](https://github.com/microsoftgraph?utf8=%E2%9C%93&q=sample)
- [Información general de Microsoft Graph](https://graph.microsoft.io)

## Derechos de autor
Copyright (c) 2017 Microsoft. Todos los derechos reservados.

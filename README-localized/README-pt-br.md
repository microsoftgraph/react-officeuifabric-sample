---
page_type: sample
products:
- office-365
- ms-graph
languages:
- javascript
description: "Este exemplo demonstra como preencher um componente Office UI Fabric React com dados recuperados do Microsoft Graph." 
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
# Exemplo do Office UI Fabric React do Microsoft Graph

## Sumário

* [Introdução](#introduction)
* [Pré-requisitos](#prerequisites)
* [Registrar o aplicativo](#register-the-application)
* [Criar e executar o exemplo](#build-and-run-the-sample)
* [Código da observação](#code-of-note)
* [Perguntas e comentários](#questions-and-comments)
* [Colaboração](#contributing)
* [Recursos adicionais](#additional-resources)

## Introdução

Este exemplo é um aplicativo de React simples que usa dados do Microsoft Graph com os componentes do Office UI Fabric (visualização), principalmente os componentes [PeoplePicker](https://dev.office.com/fabric#/components/peoplepicker) e [DetailsList](https://dev.office.com/fabric#/components/detailslist).

<img src="./readme-assets/peoplepickerexample.png" alt="Captura de tela de amostra do Office UI Fabric React do Microsoft Graph" width="500">

O exemplo usa a [Biblioteca de Clientes JavaScript do Microsoft Graph ](https://github.com/microsoftgraph/msgraph-sdk-javascript) para interagir com o Microsoft Graph e [HelloJS](https://adodson.com/hello.js/) para autenticação com o [de ponto de extremidade do Azure AD v 2.0](https://azure.microsoft.com/en-us/documentation/articles/active-directory-appmodel-v2-overview).

## Pré-requisitos

Esse exemplo requer o seguinte:  

* [Node.js](https://nodejs.org/). O nó é necessário para executar o exemplo em um servidor de desenvolvimento e para instalar as dependências.
* Uma [conta comercial ou escolar](https://dev.office.com/devprogram)
  
## Registrar o aplicativo

1. Navegue até a página [Portal do Azure - Registros de aplicativo](https://go.microsoft.com/fwlink/?linkid=2083908).

2. Escolha **Novo registro**.

3. Quando a página **Registrar um aplicativo** for exibida, insira as informações de registro do aplicativo:

    * Na seção **Nome**, digite o nome do aplicativo, por exemplo `MyReactSample`
    * Altere **Tipos de conta com suporte** para **Contas em qualquer diretório organizacional e contas pessoais da Microsoft (por exemplo, Skype, Xbox, Outlook.com)**.
    * Na seção Redirecionar URIs (opcional), selecione **Web**na caixa de combinação e digite os seguintes URIs de redirecionamento: `https://localhost:3000/`

4. Selecione **Registrar** para criar o aplicativo.

   A página de visão geral do registro será exibida, listando as propriedades do seu aplicativo.

5. Copie a **ID do aplicativo de (cliente)** e o registre. Esse é o identificador exclusivo do aplicativo. Você usará esse valor para configurar seu aplicativo.

6. Selecione a seção de**Autenticação**.
    * Na seção **Configurações avançadas** | **Concessão implícita**, verifique **Acessar tokens** e **tokens de ID**,
	já que este exemplo requer que o [fluxo de concessão implícita](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-implicit-grant-flow)
	esteja habilitado para conectar um usuário e chamar uma API.

7. Selecione **Salvar**.

## Criar e executar o exemplo

1. Clone ou baixe o exemplo do Office UI Fabric React do Microsoft Graph.

2. Usando seu IDE favorito, abra o arquivo config.js no diretório *src/Helpers*.

3. Substitua o valor do espaço reservado **applicationId** pela ID do aplicativo de seu aplicativo do Azure registrado.

4. Abra um aviso de comando no diretório raiz do exemplo e execute o seguinte comando para instalar as dependências do projeto.

  ```
  npm install
  ```

5. Depois de instalar as dependências, execute o seguinte comando para iniciar o servidor de desenvolvimento.

  ```
  npm start
  ```

6. Navegue até *http://localhost:3000/* no navegador da Web.

7. Entre com sua conta corporativa ou de estudante.  

    >Observação: Embora o ponto de extremidade do Azure AD v 2.0 ofereça suporte ao logon com contas pessoais e corporativas ou de estudante, esse exemplo do Seletor de Pessoas usa recursos com suporte apenas para contas corporativas ou de estudante (como o ponto de extremidade [`/me/People`](https://graph.microsoft.io/en-us/docs/api-reference/beta/api/user_list_people)).
  
8. Na barra de comandos, escolha **Selecionar componente > Seletor de pessoas** ou **Escolher componente > Lista de detalhes**.

   - No exemplo do Seletor de Pessoas, você poderá filtrar sua lista de pessoas ou procurar usuários em sua organização.
  
   - No exemplo de Lista de Detalhes, você poderá selecionar os itens da sua lista de arquivos, filtrar itens por nome ou clicar duas vezes no item para abri-lo no OneDrive.

Próximas etapas: Experimente adicionar mais funcionalidade ou outros componentes a este exemplo, ou crie seu próprio aplicativo simples seguindo o [tutorial do Office UI Fabric React](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/ghdocs/README.md).

## Código da observação

### Autenticação
Este aplicativo de exemplo usa o [HelloJS](https://adodson.com/hello.js/) para autenticação com o [o Azure AD v 2.0 Endpoint](https://azure.microsoft.com/en-us/documentation/articles/active-directory-appmodel-v2-overview). 

 - [`App.js`](./App.js). Inicializa uma rede de autenticação do Azure AD personalizada para HelloJS e fornece os métodos de logon/logout.
 
 >Importante! O aplicativo implementa um modelo de autenticação muito simples. Ele reutiliza o token de acesso até que o usuário saia ou receba um erro 401 ' token de acesso expirado ', no momento em que ele é redirecionado para o método de logon. Os aplicativos de produção devem construir uma maneira mais eficiente de gerenciar a autenticação e a validação.

### Interação do Microsoft Graph
Este exemplo usa a [Biblioteca de cliente de JavaScript do Microsoft Graph](https://github.com/microsoftgraph/msgraph-sdk-javascript) para interagir com o Microsoft Graph. 

 - [`GraphSdkHelper`](./src/helpers/GraphSdkHelper.js). Usa o cliente do SDK para chamar o Microsoft Graph e lidar com as respostas. 
 
 O cliente é inicializado com um authProvider que obtém o token de acesso atual para usar para cada solicitação. O exemplo funciona com as APIs [Usuário](https://graph.microsoft.io/en-us/docs/api-reference/v1.0/resources/user), [Pessoa](https://graph.microsoft.io/en-us/docs/api-reference/beta/resources/person) (visualização) e [DriveItem](https://graph.microsoft.io/en-us/docs/api-reference/v1.0/resources/driveitem).

### Componentes e estilos do Fabric
Este exemplo usa vários [Componentes do Office UI Fabric React](https://dev.office.com/fabric#/components) (visualização). Com o modelo de desenvolvimento flexível do Fabric, você pode optar por contar com o comportamento padrão de um componente ou personalizá-lo para atender às suas necessidades.

 - [`App.js`](./App.js). Página do aplicativo principal que usa o componente **CommandBar** para navegar por exemplos e optar por entrar/sair.
 
 - [`PeoplePicker. js`](./src/component-examples/PeoplePicker.js). Exemplo do Seletor de Pessoas que usa o componente **NormalPeoplePicker** para exibir componentes **Persona**. O também usa componentes como **botão** e **MessageBar**. 
 
 A implementação do Seletor de Pessoas da amostra funciona da seguinte maneira:
   
   - Quando o exemplo de PeoplePicker é carregado, o exemplo envia uma solicitação para o Microsoft Graph para as 20 principais pessoas que são relevantes para o usuário atual (primeiro recuperando os metadados e, em seguida, recuperando as fotos de perfil). Os metadados do usuário são mapeados para objetos **Persona** que estão armazenados na matriz **_peopleList**.
   
   - Quando o texto é inserido no seletor, o método **_onFilterChanged** retorna os resultados correspondentes da lista de pessoas, que são exibidos como pessoas sugeridas.
   
   - Quando o botão **Pesquisar** é clicado, o método ** _onGetMoreResults** consulta o Microsoft Graph para os primeiros 20 usuários cujo nome começa com o texto de filtro. Os resultados são temporariamente adicionados à matriz pessoas para uso no método **_onFilterChanged**.
   
   - Quando as pessoas são selecionadas ou desmarcadas, o método **_onSelectionChanged** atualiza uma matriz local de pessoas selecionadas.
   
 - [`detalhes. js`](./src/component-examples/DetailsList.js). Exemplo de lista de detalhes que usa o componente **DetailsList** com os utilitários **MarqueeSelection** e **Seleção**. Ela também usa componentes como **Spinner** e **TextField**.

 A implementação da lista de detalhes da amostra funciona da seguinte maneira:
   
   - Quando o exemplo de detalhes é carregado, o exemplo envia uma solicitação para o Microsoft Graph para os primeiros 100 itens na unidade raiz do usuário atual. Os metadados do item de unidade são mapeados para os objetos de item de lista e armazenados na matriz**_items** e salvos no estado. Se o conjunto de resultados for paginável, uma entrada nula será adicionada à matriz de itens para disparar uma solicitação para a próxima página de resultados.
   
   - Quando o texto de filtro é inserido no campo de texto, o método **_onFilterChanged** atualiza o estado com os resultados correspondentes.
   
   - Quando os itens da lista estiverem selecionados ou desmarcados, o método **_getSelectionDetails** será invocado.
   
O exemplo também referencia os principais estilos do Office UI Fabric em [`index. html`](./public/index.html).

## Solução de problemas

| Problema | Resolução |
|:------|:------|
| Erros de servidor interno para consultas de imagens armazenadas em cache no Microsoft Edge | Se você atualizar o navegador durante o uso do exemplo, você pode receber erros HTTP 500 (erro de servidor interno) para consultas de foto de perfil em cache. Uma solução alternativa é fechar a guia exemplo, limpar o cache do navegador e reabrir o exemplo. |  
| Erro de sintaxe no IE | A biblioteca de cliente do Microsoft Graph JavaScript usa prometedores ES6. RP relacionado: [microsoftgraph/msgraph-SDK-JavaScript # 29](https://github.com/microsoftgraph/msgraph-sdk-javascript/pull/29) |

## Perguntas e comentários

Gostaríamos de saber sua opinião sobre este exemplo. Você pode enviar perguntas e sugestões na seção [Problemas](https://github.com/microsoftgraph/react-officeuifabric-sample/issues) deste repositório.

Seus comentários são importantes para nós. Junte-se a nós na página do [Stack Overflow](https://stackoverflow.com/questions/tagged/microsoftgraph). Marque suas perguntas com [MicrosoftGraph].

## Colaboração

Se quiser contribuir para esse exemplo, confira [CONTRIBUTING.md](CONTRIBUTING.md).

Este projeto adotou o [Código de Conduta do Código Aberto da Microsoft](https://opensource.microsoft.com/codeofconduct/).  Para saber mais, confira as [Perguntas frequentes sobre o Código de Conduta](https://opensource.microsoft.com/codeofconduct/faq/) ou entre em contato pelo [opencode@microsoft.com](mailto:opencode@microsoft.com) se tiver outras dúvidas ou comentários.

## Recursos adicionais

- [Componentes do Office UI Fabric](https://dev.office.com/fabric#/components)
- [Outros exemplos do Microsoft Graph](https://github.com/microsoftgraph?utf8=%E2%9C%93&q=sample)
- [Visão geral do Microsoft Graph](https://graph.microsoft.io)

## Direitos autorais
Copyright (c) 2017 Microsoft. Todos os direitos reservados.

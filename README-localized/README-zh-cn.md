---
page_type: sample
products:
- office-365
- ms-graph
languages:
- javascript
description: "此示例演示如何使用从 Microsoft Graph 检索的数据填充 Office UI Fabric React 组件。"
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
# Microsoft Graph Office UI Fabric React 示例

## 目录

* [简介](#introduction)
* [先决条件](#prerequisites)
* [注册应用程序](#register-the-application)
* [生成和运行示例](#build-and-run-the-sample)
* [注释代码](#code-of-note)
* [问题和意见](#questions-and-comments)
* [参与](#contributing)
* [其他资源](#additional-resources)

## 简介

此示例是一个简单的 React 应用，它将 Microsoft Graph 数据与 Office UI Fabric React（预览版）组件一起使用，主要是 [PeoplePicker](https://dev.office.com/fabric#/components/peoplepicker) 和 [DetailsList](https://dev.office.com/fabric#/components/detailslist) 组件。

<img src="./readme-assets/peoplepickerexample.png" alt="Microsoft Graph Office UI Fabric React 示例屏幕截图" width="500">

该示例使用 [Microsoft Graph JavaScript 客户端库](https://github.com/microsoftgraph/msgraph-sdk-javascript)与 Microsoft Graph 交互，并使用 [HelloJS](https://adodson.com/hello.js/) 和 [Azure AD v2.0 终结点](https://azure.microsoft.com/en-us/documentation/articles/active-directory-appmodel-v2-overview)进行身份验证。

## 先决条件

此示例要求如下：  

* [Node.js](https://nodejs.org/)。需要提供节点才能在开发服务器上运行示例和安装依赖项。
* 一个[工作或学校帐户](https://dev.office.com/devprogram)。
  
## 注册应用程序

1. 导航到 Azure 门户“[应用注册](https://go.microsoft.com/fwlink/?linkid=2083908)”页面。

2. 选择“**新注册**”。

3. 出现“**注册应用程序页**”后，输入应用程序的注册信息：

    * 在“**名称**”部分中，输入应用程序名称，例如 `MyReactSample`
    * 将“**支持的帐户类型**”更改为“**任何组织目录中的帐户和 Microsoft 个人帐户”（例如，Skype、Xbox、Outlook.com）**。
    * 在“重定向 URI”（可选）部分中，选择组合框中的“**Web**”，然后输入以下重定向 URI：`https://localhost:3000/`。

4. 选择“**注册**”以创建应用程序。

   将显示注册概述页，其中列出应用的属性。

5. 复制**应用程序（客户端 ID）**并进行记录。这是应用的唯一标识符。你将使用此值来配置你的应用。

6. 选择“**身份验证**”部分。
    * 在“**高级设置**”|“**隐式授予**”部分，选中“**访问令牌**”和“**ID 令牌**”，
	因为此示例需要启用“[隐式授予流](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-implicit-grant-flow)”
	才能登录用户并调用 API。

7. 选择“**保存**”。

## 生成和运行示例

1. 克隆或下载 Microsoft Graph Office UI Fabric React 示例。

2. 使用你最喜爱的 IDE，打开 *src/helpers* 目录中的 config.js。

3. 将 **applicationId** 占位符值替换为已注册的 Azure 应用程序的应用程序 ID。

4. 在示例的根目录中打开命令提示符，然后运行以下命令以安装项目依赖项。

  ```
  npm install
  ```

5. 安装依赖项后，运行以下命令以启动开发服务器。

  ```
  npm start
  ```

6. 在 Web 浏览器中导航到 *http://localhost:3000*。

7. 使用你的工作或学校帐户登录。  

    >注意：虽然 Azure AD v 2.0 终结点支持使用个人帐户和工作或学校帐户登录，但此人员选取器示例使用仅受工作或学校帐户支持的功能（如 [`/me/people`](https://graph.microsoft.io/en-us/docs/api-reference/beta/api/user_list_people) 终结点）。
  
8. 在命令栏中，选择“**选择组件 > 人员选取器**”或“**选择组件 > 详细信息列表**”。

   - 在“人员选取器”示例中，你可以筛选你的人员列表或搜索贵组织中的用户。
  
   - 在“详细信息列表”示例中，你可以从文件列表中选择项目，按名称筛选项目，或双击项目以在 OneDrive 中打开它。

后续步骤：尝试向此示例添加更多功能或其他组件，或按照 [Office UI Fabric React 教程](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/ghdocs/README.md)构建自己的简单应用。

## 注释代码

### Auth
此示例应用使用 [HelloJS](https://adodson.com/hello.js/) 和 [Azure AD v2.0 终结点](https://azure.microsoft.com/en-us/documentation/articles/active-directory-appmodel-v2-overview)进行身份验证。 

 - [`App.js`](./App.js)。初始化 HelloJS 的自定义 Azure AD 身份验证网络，并提供登录/注销方法。
 
 >重要说明！该应用实施非常简单的身份验证模型。它会重复使用访问令牌，直到用户注销或收到 401“访问令牌已过期”错误，此时它将重定向到登录方法。生产应用应该构建更为可靠的方法来处理身份验证和验证。

### Microsoft Graph 交互
此示例使用 [Microsoft Graph JavaScript 客户端库](https://github.com/microsoftgraph/msgraph-sdk-javascript) (SDK) 与 Microsoft Graph 交互。 

 - [`GraphSdkHelper`](./src/helpers/GraphSdkHelper.js)。使用 SDK 客户端调用 Microsoft Graph 并处理响应。 
 
 客户端使用 authProvider 来初始化，后者将获取用于每个请求的当前访问令牌。此示例适用于[用户](https://graph.microsoft.io/en-us/docs/api-reference/v1.0/resources/user)、[人员](https://graph.microsoft.io/en-us/docs/api-reference/beta/resources/person)（预览版）和 [DriveItem ](https://graph.microsoft.io/en-us/docs/api-reference/v1.0/resources/driveitem) API。

### Fabric 组件和样式
此示例使用多个 [Office UI Fabric React 组件](https://dev.office.com/fabric#/components)（预览版）。借助 Fabric 的灵活开发模型，你可以选择依赖于组件的默认行为，也可以根据需要对其进行自定义。

 - [`App.js`](./App.js)。主应用页面，它使用 **CommandBar** 组件来导航示例并选择登录/注销。
 
 - [`PeoplePicker.js`](./src/component-examples/PeoplePicker.js)。人员选取器示例，它使用 **NormalPeoplePicker** 组件来显示**角色**组件。它还使用**按钮**和 **MessageBar** 等组件。 
 
 示例的人员选取器实施的工作方式如下：
   
   - 加载 PeoplePicker 示例时，该示例将向 Microsoft Graph 发送与当前用户相关的前 20 名人员的请求（首先检索元数据，然后检索个人资料照片）。将用户元数据映射到存储在 **_peopleList** 数组中的 **Persona** 对象。
   
   - 在选取器中输入文本时，**_onFilterChanged** 方法将从人员列表返回匹配的结果，其随后将显示为建议的人员。
   
   - 单击“**搜索**”按钮时，**_onGetMoreResults** 方法将向 Microsoft Graph 查询其名称以筛选文本开头的前 20 个用户。这些结果将临时添加到人员数组中，以便在 **_onFilterChanged** 方法中使用。
   
   - 选择或取消选择人员时，**_onSelectionChanged** 方法将更新所选人员的本地数组。
   
 - [`DetailsList.js`](./src/component-examples/DetailsList.js)。“详细信息列表”示例，它将 **DetailsList** 组件与 **MarqueeSelection** 和 **Selection** 实用工具一起使用。它还使用 **Spinner** 和 **TextField** 等组件。

 示例的详细信息列表实施的工作方式如下：
   
   - 加载 DetailsList 示例时，该示例将向 Microsoft Graph 发送请求，以请求当前用户的根驱动器中的前 100 个项目。驱动器项目元数据将映射到列表项目对象，存储在 **_items** 数组中并以某种状态保存。如果结果集已分页，则会将 null 条目添加到项目数组以触发对下一页结果的请求。
   
   - 在文本字段中输入筛选文本时，**_onFilterChanged** 方法将使用匹配的结果更新状态。
   
   - 选择或取消选择列表项目时，将调用 **_getSelectionDetails** 方法。
   
该示例还引用了 [`index.html`](./public/index.html) 中的 Office UI Fabric Core 样式。

## 故障排除

| 问题 | 解决方法 |
|：------|：------|
| Microsoft Edge 中的缓存图像查询的内部服务器错误 | 如果在使用示例时刷新浏览器，则对于缓存的个人资料照片查询，你可能会收到 HTTP 500 错误（内部服务器错误）。解决方法是关闭示例选项卡，清除浏览器缓存，然后重新打开示例。|  
| IE 中的语法错误 | Microsoft Graph JavaScript 客户端库使用 ES6 Promise。相关 PR：[microsoftgraph/msgraph-sdk-javascript#29](https://github.com/microsoftgraph/msgraph-sdk-javascript/pull/29) |

## 问题和意见

我们乐意倾听你对此示例的反馈。你可以在该存储库中的[问题](https://github.com/microsoftgraph/react-officeuifabric-sample/issues)部分将问题和建议发送给我们。

我们非常重视你的反馈意见。请在[堆栈溢出](https://stackoverflow.com/questions/tagged/microsoftgraph)上与我们联系。使用 [MicrosoftGraph] 标记出你的问题。

## 参与

如果想要参与本示例，请参阅 [CONTRIBUTING.md](CONTRIBUTING.md)。

此项目已采用 [Microsoft 开放源代码行为准则](https://opensource.microsoft.com/codeofconduct/)。有关详细信息，请参阅[行为准则常见问题解答](https://opensource.microsoft.com/codeofconduct/faq/)。如有其他任何问题或意见，也可联系 [opencode@microsoft.com](mailto:opencode@microsoft.com)。

## 其他资源

- [Office UI Fabric 组件](https://dev.office.com/fabric#/components)
- [其他 Microsoft Graph 示例](https://github.com/microsoftgraph?utf8=%E2%9C%93&q=sample)
- [Microsoft Graph 概述](https://graph.microsoft.io)

## 版权信息
版权所有 (c) 2017 Microsoft。保留所有权利。

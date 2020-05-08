---
page_type: sample
products:
- office-365
- ms-graph
languages:
- javascript
description: "このサンプルは、Office UI Fabric React コンポーネントに、Microsoft Graph から取得したデータを取り込む方法を示しています。"
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
# Microsoft Graph Office UI Fabric React サンプル

## 目次

* [はじめに](#introduction)
* [前提条件](#prerequisites)
* [アプリケーションの登録](#register-the-application)
* [サンプルのビルドと実行](#build-and-run-the-sample)
* [ノートのコード](#code-of-note)
* [質問とコメント](#questions-and-comments)
* [投稿](#contributing)
* [その他のリソース](#additional-resources)

## はじめに

このサンプルは、主に [PeoplePicker](https://dev.office.com/fabric#/components/peoplepicker) および [DetailsList](https://dev.office.com/fabric#/components/detailslist) コンポーネントである Office UI Fabric React (プレビュー) コンポーネントを含む Microsoft Graph データを使用するシンプルな React アプリです。

<img src="./readme-assets/peoplepickerexample.png" alt="Microsoft Graph Office UI Fabric React サンプルのスクリーンショット" width="500">

このサンプルでは、[Microsoft Graph JavaScript クライアント ライブラリ](https://github.com/microsoftgraph/msgraph-sdk-javascript) を使用して Microsoft Graph を操作し、[Azure AD v2.0 エンドポイント](https://azure.microsoft.com/en-us/documentation/articles/active-directory-appmodel-v2-overview)を使用して認証するために [HelloJS](https://adodson.com/hello.js/) を使用します。

## 前提条件

このサンプルを実行するには次のものが必要です。  

* [Node.js](https://nodejs.org/)。Node は、開発サーバーでサンプルを実行して、依存関係をインストールするために必要です。
* [職場または学校のアカウント](https://dev.office.com/devprogram)
  
## アプリケーションの登録

1. Azure ポータルの [[アプリの登録](https://go.microsoft.com/fwlink/?linkid=2083908)] ページに移動します。

2. [**新規登録**] を選択します。

3. [**アプリケーションの登録ページ**] が表示されたら、以下のアプリケーションの登録情報を入力します。

    * [**名前**] セクションに、`MyReactSample` のようにアプリケーション名を入力します。
    * [**サポートされているアカウントの種類**] を [**任意の組織のディレクトリ内のアカウントと個人用の Microsoft アカウント (例: Skype、Xbox、Outlook.com)**] に変更します。
    * [リダイレクト URI (オプション)]セクションで、コンボ ボックスの [**Web**] を選択し、次のリダイレクト URI を入力します。`https://localhost:3000/`。

4. [**登録**] を選択して、アプリケーションを作成します。

   [登録の概要] ページが表示され、アプリのプロパティが一覧表示されます。

5. **アプリケーション (クライアント) ID** をコピーして、記録します。これは、アプリの一意識別子です。この値を使用して、アプリを構成します。

6. [認証] セクションを選択します。
    * [**詳細設定**] または [**暗黙的な許可**] セクションで、このサンプルが
	[暗黙的な許可のフロー](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-implicit-grant-flow)を有効にしてユーザーのサインインができるように、[**アクセス トークン**] と [**ID トークン**]
	のチェック ボックスをオンにし、API を呼び出します。

7. [**保存**] を選択します。

## サンプルのビルドと実行

1. Microsoft Graph Office UI Fabric React サンプルを複製またはダウンロードします。

2. 任意の IDE を使用して、*src/helpers* ディレクトリで config.js を開きます。

3. **applicationId** プレースホルダー値を登録済みの Azure アプリケーションのアプリケーション ID に置き換えます。

4. サンプルのルート ディレクトリでコマンド プロンプトを開き、次のコマンドを実行してプロジェクトの依存関係をインストールします。

  ```
  npm install
  ```

5. 依存関係をインストールしたら、次のコマンドを実行して開発サーバーを起動します。

  ```
  npm start
  ```

6. Web ブラウザーで *http://localhost:3000* に移動します。

7. 職場または学校のアカウントを使用してサインインします。  

    >注:Azure AD v2.0 エンドポイントは、個人のアカウントと職場または学校のアカウントでのサインインをサポートしていますが、このユーザー選択の例では、職場または学校のアカウントでのみサポートされている機能が使用されています ([`/me/people`](https://graph.microsoft.io/en-us/docs/api-reference/beta/api/user_list_people) エンドポイントなど)。
  
8. コマンド バーで、**[コンポーネントの選択]、[ユーザーの選択]** の順に選択するか、**[コンポーネントの選択]、[詳細リスト]** を選択します。

   - [ユーザーの選択] 例では、ユーザー リストをフィルター処理したり、組織内のユーザーを検索したりできます。
  
   - 詳細リストの例では、ファイルのリストからアイテムを選択し、名前でアイテムを絞り込むか、またはダブルクリックしてアイテムを OneDrive で開くことができます。

次の手順：このサンプルには、機能やその他のコンポーネントをさらに追加するか、「[Office UI Fabric React チュートリアル](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/ghdocs/README.md)」に従って独自のシンプルなアプリを構築します。

## ノートのコード

### 認証
このサンプルアプリは、[HelloJS](https://adodson.com/hello.js/) を使用して、[Azure AD v2.0 エンドポイント](https://azure.microsoft.com/en-us/documentation/articles/active-directory-appmodel-v2-overview)を認証します。 

 - [`App.js`](./App.js).HelloJS のカスタム Azure AD 認証ネットワークを初期化し、ログイン/ログアウトの方法を提供します。
 
 >重要事項アプリでは、非常にシンプルな認証モデルが実装されています。ユーザーがサイン アウトするか、401 の「アクセス トークンの有効期限が切れています」エラーを受信するまでアクセス トークンを再利用し、その時点でログイン方法にリダイレクトします。運用アプリでは、検証と認証を処理するためのより信頼性の高い方法を構築する必要があります。

### Microsoft Graph の操作
このサンプルでは、[Microsoft Graph JavaScript クライアント ライブラリ](https://github.com/microsoftgraph/msgraph-sdk-javascript) (SDK) を使用して、Microsoft Graph を操作します。 

 - [`GraphSdkHelper`](./src/helpers/GraphSdkHelper.js)。SDK クライアントを使用して Microsoft Graph を呼び出し、応答を処理します。 
 
 クライアントは、要求ごとに使用する現在のアクセス トークンを取得する authProvider で初期化されます。このサンプルは、[User](https://graph.microsoft.io/en-us/docs/api-reference/v1.0/resources/user)、[Person](https://graph.microsoft.io/en-us/docs/api-reference/beta/resources/person) （プレビュー）、および [DriveItem](https://graph.microsoft.io/en-us/docs/api-reference/v1.0/resources/driveitem) API で動作します。

### Fabric コンポーネントとスタイル
このサンプルでは、いくつかの [Office UI Fabric React コンポーネント](https://dev.office.com/fabric#/components) (プレビュー) を使用します。Fabric の柔軟性の高い開発モデルを使用して、コンポーネントの既定の動作に依存するか、必要に応じてカスタマイズできます。

 - [`App.js`](./App.js)。**CommandBar** コンポーネントを使用して、例に移動したり、サインインまたはサインアウトを選択したりするメイン アプリ ページ。
 
 - [`PeoplePicker.js`](./src/component-examples/PeoplePicker.js)。**Persona** コンポーネントを表示するのに **NormalPeoplePeoplePicker** コンポーネントを使用するユーザー選択の例です。**Button** や **MessageBar** などのコンポーネントも使用します。 
 
 サンプルのユーザー選択の実装は、次のように動作します。
   
   - PeoplePicker の例が読み込まれると、サンプルは現在のユーザーに関連のある上位 20 人の Microsoft Graph にリクエストを送信します (最初にメタデータを取得してから、プロフィール写真を取得します)。ユーザーのメタデータは、**_peopleList** 配列に格納されている **Persona** オブジェクトにマッピングされます。
   
   - 選択にテキストを入力すると、**_onFilterChanged** メソッドはユーザー リストから一致する結果を返し、提案されたユーザーとして表示されます。
   
   - [**検索**] ボタンがクリックされるとき、**_onGetMoreResults** メソッドは、名前がフィルター テキストで始まる最初の 20 人のユーザーを Microsoft Graph にクエリします。結果は、**_onFilterChanged** メソッドで使用するために、一時的にユーザー 配列に追加されます。
   
   - ユーザーを選択または選択解除すると、**_onSelectionChanged** メソッドによって、選択したユーザーのローカル配列が更新されます。
   
 - [`DetailsList.js`](./src/component-examples/DetailsList.js)。**MarqueeSelection**、および **Selection** ユーティリティーを含む、**DetailsList** コンポーネントを使用する詳細リストの例。また、**Spinner** や **TextField** などのコンポーネントも使用します。

 サンプルの詳細リストの実装は次のように動作します。
   
   - DetailsList の例が読み込まれると、サンプルは現在のユーザーのルート ドライブの上位 100 個のアイテムについて、Microsoft Graph に要求が送信します。ドライブ アイテムのメタデータは、リスト アイテム オブジェクトにマッピングされ、**_items** 配列に格納され、状態に保存されます。結果セットがページングされている場合は、次の結果ページの要求をトリガーするために、null エントリがアイテム配列に追加されます。
   
   - フィルター テキストをテキスト フィールドに入力すると、**_onFilterChanged** メソッドによって、一致する結果で状態が更新されます。
   
   - リスト アイテムが選択または選択解除されていると、**_getSelectionDetails** メソッドが呼び出されます。
   
また、サンプルは [`index.html`](./public/index.html) の Office UI Fabric Core スタイルを参照します。

## トラブルシューティング

| 問題 | 解決方法 |
|:------|:------|
| Microsoft Edge のキャッシュされた画像クエリの内部サーバー エラー | サンプルの使用中にブラウザーを更新すると、キャッシュされたプロファイル写真のクエリに対して HTTP 500 エラー (内部サーバー エラー) が表示される場合があります。回避策としては、[サンプル] タブを閉じ、ブラウザーのキャッシュをクリアして、サンプルをもう一度開きます。|  
| IE の構文エラー | Microsoft Graph JavaScript クライアント ライブラリは ES6 Promise を使用します。関連の PR: [microsoftgraph/msgraph-sdk-javascript#29](https://github.com/microsoftgraph/msgraph-sdk-javascript/pull/29) |

## 質問とコメント

このサンプルに関するフィードバックをお寄せください。質問や提案につきましては、このリポジトリの「[問題](https://github.com/microsoftgraph/react-officeuifabric-sample/issues)」セクションで送信できます。

お客様からのフィードバックを重視しています。[スタック オーバーフロー](https://stackoverflow.com/questions/tagged/microsoftgraph)でご連絡ください。ご質問には [MicrosoftGraph] のタグを付けてください。

## 投稿

このサンプルに投稿する場合は、[CONTRIBUTING.md](CONTRIBUTING.md) を参照してください。

このプロジェクトでは、[Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/) が採用されています。詳細については、「[Code of Conduct の FAQ](https://opensource.microsoft.com/codeofconduct/faq/)」を参照してください。また、その他の質問やコメントがあれば、[opencode@microsoft.com](mailto:opencode@microsoft.com) までお問い合わせください。

## その他のリソース

- [Office UI Fabric コンポーネント](https://dev.office.com/fabric#/components)
- [Microsoft Graph の他のサンプル](https://github.com/microsoftgraph?utf8=%E2%9C%93&q=sample)
- [Microsoft Graph の概要](https://graph.microsoft.io)

## 著作権
Copyright (c) 2017 Microsoft.All rights reserved.

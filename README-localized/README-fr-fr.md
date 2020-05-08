---
page_type: sample
products:
- office-365
- ms-graph
languages:
- javascript
description: "Cet exemple montre comment renseigner des composants React de la structure de l’interface utilisateur Office avec les données récupérées de Microsoft Graph."
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
# Exemple Microsoft Graph Office UI Fabric React

## Table des matières

* [Introduction](#introduction)
* [Conditions préalables](#prerequisites)
* [Inscription de l’application](#register-the-application)
* [Création et exécution de l’exemple](#build-and-run-the-sample)
* [Code de note](#code-of-note)
* [Questions et commentaires](#questions-and-comments)
* [Contribution](#contributing)
* [Ressources supplémentaires](#additional-resources)

## Introduction

Cet exemple est une simple application React qui utilise les données Microsoft Graph avec les composants Office UI Fabric React (Aperçu), principalement les composants [PeoplePicker](https://dev.office.com/fabric#/components/peoplepicker) et [DetailsList](https://dev.office.com/fabric#/components/detailslist).

<img src="./readme-assets/peoplepickerexample.png" alt="Capture d’écran exemple Microsoft Graph Office UI Fabric React" width="500">

L’exemple utilise la [Bibliothèque client Microsoft Graph JavaScript](https://github.com/microsoftgraph/msgraph-sdk-javascript) pour interagir avec Microsoft Graph et [HelloJS](https://adodson.com/hello.js/) pour l’authentification avec le [point de terminaison Azure AD v 2.0](https://azure.microsoft.com/en-us/documentation/articles/active-directory-appmodel-v2-overview).

## Conditions préalables

Cet exemple nécessite les éléments suivants :  

* [Node.js](https://nodejs.org/). Node est requis pour exécuter l’exemple sur un serveur de développement et installer des dépendances.
* Un [compte professionnel ou scolaire](https://dev.office.com/devprogram)
  
## Inscription de l’application

1. Accédez à la page [Portail Azure – Inscriptions d’applications](https://go.microsoft.com/fwlink/?linkid=2083908).

2. Sélectionnez **Nouvelle inscription**.

3. Lorsque la **page Inscrire une application** s’affiche, saisissez les informations d’inscription de votre application :

    * Dans la section **Nom**, entrez le nom de l’application, par exemple `MyReactSample`
    * Remplacez **Types de comptes pris en charge** par **Comptes dans un annuaire organisationnel et comptes personnels Microsoft (par ex. Skype, Xbox, Outlook.com)**.
    * Dans la section URI de redirection (facultatif), sélectionnez **Web** dans la zone de liste déroulante et entrez l’URI de redirection suivant : `https://localhost:3000/`.

4. Sélectionnez **S’inscrire** pour créer l’application.

   La page de présentation de l’inscription s’affiche, répertoriant les propriétés de votre application.

5. Copiez l'**ID de l’application (client)** et enregistrez-le. Il s’agit de l’identificateur unique de votre application. Vous utiliserez cette valeur pour configurer votre application.

6. Sélectionnez la section **Authentification**.
    * Dans la section **Paramètres avancés** | **Octroi implicite**, cochez **Jetons d’accès** et **Jetons d’ID** car cet exemple
	nécessite que le [flux d’octroi implicite](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-implicit-grant-flow)
	soit activé pour connecter l’utilisateur et appeler une API.

7. Sélectionnez **Enregistrer**.

## Création et exécution de l’exemple

1. Clonez ou téléchargez l’exemple Microsoft Graph Office UI Fabric React.

2. À l’aide de votre IDE favori, ouvrez config.js dans le répertoire *src/helpers*.

3. Dans le champ **applicationId**, remplacez la valeur d'espace réservé par l’ID d’application de votre application Azure inscrite.

4. Ouvrez une invite de commandes dans le répertoire racine de l’exemple et exécutez la commande suivante pour installer les dépendances de projet.

  ```
  npm install
  ```

5. Une fois les dépendances installées, exécutez la commande suivante pour démarrer le serveur de développement.

  ```
  npm start
  ```

6. Accédez à *http://localhost:3000* dans votre navigateur web.

7. Connectez-vous avec votre compte professionnel ou scolaire.  

    >Remarque : Bien que le point de terminaison Azure AD v 2.0 prenne en charge la connexion à la fois avec les comptes personnels et professionnels ou scolaires, cet exemple de sélecteur de contacts utilise les fonctionnalités prises en charge uniquement avec les comptes professionnels ou scolaires (par exemple, le point de terminaison [`/me/People`](https://graph.microsoft.io/en-us/docs/api-reference/beta/api/user_list_people)).
  
8. Dans la barre de commandes, sélectionnez **Choisir le composant > Sélecteur de personnes** ou **Choisir le composant > Liste de détails**.

   - Dans l’exemple de sélecteur de personnes, vous pouvez filtrer votre liste de contacts ou rechercher des utilisateurs au sein de votre organisation.
  
   - Dans l’exemple de liste de détails, vous pouvez sélectionner des éléments dans votre liste de fichiers, filtrer les éléments par nom, ou double-cliquer sur un élément pour l’ouvrir dans OneDrive.

Étapes suivantes : Essayez d’ajouter des fonctionnalités ou d’autres composants à cet exemple, ou de créer votre propre application simple en suivant le [didacticiel Office UI Fabric React](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/ghdocs/README.md).

## Code de note

### Auth
Cet exemple d’application utilise [HelloJS](https://adodson.com/hello.js/) pour l’authentification avec le [point de terminaison Azure AD v 2.0](https://azure.microsoft.com/en-us/documentation/articles/active-directory-appmodel-v2-overview). 

 - [`App.js`](./App.js). Initialise un réseau d’authentification Azure AD personnalisé pour HelloJS et fournit les méthodes de connexion/déconnexion.
 
 >Important ! L’application implémente un modèle d’authentification très simple. Il réutilise le jeton d’accès jusqu’à ce que l’utilisateur se déconnecte ou jusqu’à ce qu’il redirige vers la méthode de connexion à l’expiration du jeton d’accès 401. Les applications de production doivent mettre au point une méthode plus fiable de gestion de l’authentification et de validation.

### Interaction de Microsoft Graph
Cet exemple utilise la [Bibliothèque cliente JavaScript Microsoft Graph](https://github.com/microsoftgraph/msgraph-sdk-javascript) (SDK) pour interagir avec Microsoft Graph. 

 - [`GraphSdkHelper`](./src/helpers/GraphSdkHelper.js). Utilise le client SDK pour appeler Microsoft Graph et gérer les réponses. 
 
 Le client est initialisé avec un authProvider qui obtient le jeton d'accès actuel à utiliser pour chaque demande. L’exemple est compatible avec les API[Utilisateur](https://graph.microsoft.io/en-us/docs/api-reference/v1.0/resources/user), [Contact](https://graph.microsoft.io/en-us/docs/api-reference/beta/resources/person) (aperçu) et [DriveItem](https://graph.microsoft.io/en-us/docs/api-reference/v1.0/resources/driveitem).

### Styles et composants de la structure
Cet exemple utilise plusieurs [Composants React de la structure de l’interface utilisateur Office](https://dev.office.com/fabric#/components) (aperçu). Le modèle de développement flexible d’un Fabric vous permet de choisir le comportement par défaut d’un composant ou de le personnaliser en fonction de vos besoins.

 - [`App.js`](./App.js). Page d’application principale qui utilise le composant **CommandBar** pour parcourir les exemples et choisir de vous connecter/se déconnecter.
 
 - [`PeoplePicker.js`](./src/component-examples/PeoplePicker.js). Exemple de Sélecteur de personnes qui utilise le composant **NormalPeoplePicker** pour afficher les composants **Persona**. Utilise également des composants tels que **Bouton** et **MessageBar**. 
 
 L’implémentation de l’exemple de sélecteur de personnes fonctionne comme suit :
   
   - Lorsque l’exemple PeoplePicker se charge, l’exemple envoie une demande à Microsoft Graph pour les 20 principales personnes qui sont pertinentes pour l’utilisateur actuel (première extraction de métadonnées et récupération des photos de profil). Les métadonnées utilisateur sont mappées à des objets **Persona** stockés dans le tableau **_peopleList**.
   
   - Lorsque le texte est entré dans le sélecteur, la méthode **_onFilterChanged** renvoie les résultats correspondants de la liste des contacts, qui sont ensuite affichés en tant que personnes suggérées.
   
   - Lorsque vous cliquez sur le bouton **Rechercher**, la méthode **_onGetMoreResults** interroge Microsoft Graph pour les 20 premiers utilisateurs dont le nom commence par le texte du filtre. Les résultats sont temporairement ajoutés au tableau des contacts à utiliser dans la méthode **_onFilterChanged**.
   
   - Lorsque les utilisateurs sont sélectionnés ou désélectionnés, la méthode **_onSelectionChanged** met à jour une matrice locale de certaines personnes.
   
 - [`DetailsList.js`](./src/component-examples/DetailsList.js). Exemple de liste de détails qui utilise le composant **DetailsList** avec les utilitaires **Sélection de texte défilant** et **Sélection**. Utilise également des composants tels que **Spinner** et **TextField**.

 L’implémentation de l’exemple de liste de détails fonctionne comme suit :
   
   - Lorsque l’exemple DetailsList se charge, l’exemple envoie une requête à Microsoft Graph pour les premiers 100 éléments du lecteur racine de l’utilisateur actuel. Les métadonnées d’élément de lecteur sont mappées aux objets d’élément de liste et stockées dans le tableau **_items** et enregistrées dans l’État. Si le jeu de résultats est paginé, une entrée null est ajoutée au tableau de l’élément pour déclencher une demande pour la page de résultats suivante.
   
   - Lorsque le texte du filtre est entré dans le champ de texte, la méthode **_onFilterChanged** met à jour l’état avec les résultats correspondants.
   
   - Lorsque les éléments de liste sont activés ou désactivés, la méthode **_getSelectionDetails** est appelée.
   
L’exemple fait également référence aux styles Office UI Fabric Core dans [`index.html`](./public/index.html).

## Résolution des problèmes

| Problème | Résolution |
| :------| :------|
| Erreurs serveur interne pour les requêtes d’image mises en cache dans Microsoft Edge | Si vous actualisez le navigateur pendant l’utilisation de l’exemple, vous recevrez peut-être des erreurs HTTP 500 (erreur interne du serveur) pour les requêtes de photo de profil mises en cache. Pour contourner ce problème, fermez l’onglet exemple, videz le cache du navigateur, puis rouvrez l’exemple. |  
| Erreur de syntaxe dans IE | La bibliothèque cliente JavaScript Microsoft Graph utilise ES6 promesses. PR rubriques connexes : [microsoftgraph/msgraph-sdk-javascript#29](https://github.com/microsoftgraph/msgraph-sdk-javascript/pull/29) |

## Questions et commentaires

Nous aimerions connaître votre opinion sur cet exemple. Vous pouvez nous faire part de vos questions et suggestions dans la rubrique [Problèmes](https://github.com/microsoftgraph/react-officeuifabric-sample/issues) de ce référentiel.

Votre avis compte beaucoup pour nous. Communiquez avec nous sur [Stack Overflow](https://stackoverflow.com/questions/tagged/microsoftgraph). Posez vos questions avec la balise [MicrosoftGraph].

## Contribution

Si vous souhaitez contribuer à cet exemple, voir [CONTRIBUTING.md](CONTRIBUTING.md).

Ce projet a adopté le [code de conduite Open Source de Microsoft](https://opensource.microsoft.com/codeofconduct/). Pour en savoir plus, reportez-vous à la [FAQ relative au code de conduite](https://opensource.microsoft.com/codeofconduct/faq/) ou contactez [opencode@microsoft.com](mailto:opencode@microsoft.com) pour toute question ou tout commentaire.

## Ressources supplémentaires

- [Composants de la structure de l’interface utilisateur Office](https://dev.office.com/fabric#/components)
- [Autres exemples Microsoft Graph](https://github.com/microsoftgraph?utf8=%E2%9C%93&q=sample)
- [Présentation de Microsoft Graph](https://graph.microsoft.io)

## Copyright
Copyright (c) 2017 Microsoft. Tous droits réservés.

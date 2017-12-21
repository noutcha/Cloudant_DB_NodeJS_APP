# Connexion d'une application Node.js � une BD Cloudant

#Node.js
Une application Node.js qui utilise un Framework express (https://expressjs.com) pour fournir une API REST afin
de recevoir des demandes de l'interface utilisateur. L'API utilise ensuite le  package 
node-cfenv 
	pour lire les informations d'identification de la base de donn�es et la  biblioth�que 
client nodejs-cloudant
 pour conserver les docuements dans une base de donn�es Cloudant. 
#Avant de commencer
Vous aurez besoin des comptes et outils suivants :
     
	[Node](https://nodejs.org/en/)

	
Etape 1 : Ex�cuter l'application localement
Utilisez le gestionnaire de package npm pour installer les d�pendances et lancer l'application.
pour plus de details suivez le lien https://docs.npmjs.com/cli/install

1) Sur la ligne de commande, placez-vous dans le r�pertoire o� se trouve l'application exemple.

	>cd ULBDBProject2017
	
2) Installez les d�pendances list�es dans le fichier package.json  afin de pouvoir ex�cuter l'application localement.

	>npm install

Ex�cutez l'application.

	>npm start

il est possible d'utiliser aussi 
	>node server.js

Vous pouvez visualiser votre application sur : http://localhost:3000.

NB: Si jamais le port 3000 est occup� sur votre syst�me, changer la valeur dans server.js

le projets fonction avec
Refferences:
procedure d'installation : https://console.bluemix.net/docs/runtimes/nodejs/getting-started.html#tutoriel-initiation

Package NPM cloudant: https://www.npmjs.com/package/cloudant
 
 
 
 it is the true link of our inspiration.
to connect a JS node application to a clouder bd



# Lien vers l'application

l'application est disponible a l'adresse: https://ulbdbproject2017-bristleless-aviator.eu-gb.mybluemix.net
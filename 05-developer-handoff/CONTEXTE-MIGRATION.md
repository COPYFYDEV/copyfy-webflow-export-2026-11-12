# Contexte de migration

## Demande et périmètre

Livrer les données et le contexte permettant à un autre développeur de reproduire fidèlement le site marketing Copyfy dans le code, éventuellement avec CodePen pour des essais, React ou Next.js. L’utilisateur a précisé : « Ne code rien. Juste export la data et build le context ». Ce dossier est donc une collecte et un passage de relais, pas une implémentation.

Le périmètre est `copyfy.io`, le projet Designer `copyfy-624656`, ses traductions, son contenu CMS et les dépendances publiques intégrées au site. `app.copyfy.io` est une application distincte : les liens de connexion et de lancement de boutique sont documentés, mais son code produit et sa base de données ne font pas partie de l’export Webflow.

## Sources et priorité pratique

- `01-native-export/copyfy-624656.webflow-11.zip` : archive fournie directement par l’utilisateur. Son contenu est dans `supplied-source/`.
- `01-native-export/copyfy-624656.webflow.zip` : archive téléchargée via « Export code → Prepare ZIP → Download ZIP » pendant la collecte. Son contenu est dans `source/`.
- `archive-differences.json` : liste des fichiers dont les octets diffèrent entre les deux archives. Les archives ne sont pas interchangeables sans comparaison ; l’inventaire ne conclut pas que chaque différence de fichier modifie le rendu.
- `03-published-site/pages/` : réponses HTML du site public, avec URL demandée, URL finale, titre, métadonnées et taille dans `page-manifest.json`.
- `02-cms/` : état CMS courant exporté depuis le Designer, y compris les marqueurs de brouillon et d’archive.
- `04-design-and-settings/` : réglages lus dans Webflow et code client extrait des HTML.

Ne pas supposer que le Designer et la version publique sont synchronisés. La page de réglages consultée indiquait une dernière publication le 7 novembre 2026, alors que l’état du Designer avait été modifié le 12 novembre. Les sources sont conservées séparément pour rendre ce choix visible au développeur.

## Architecture de contenu

Langue principale : français, à la racine. Autres langues : anglais `/en`, espagnol `/es`, néerlandais `/nl`, allemand `/de`, portugais `/pt`. Les slugs peuvent être traduits et ne doivent pas être reconstruits en ajoutant simplement un préfixe à un slug français.

Les 13 collections couvrent articles, catégories, auteurs, tags, FAQ, comparatifs, alternatives, fonctionnalités, outils gratuits, listes d’outils, démonstrations et recrutement. Beaucoup d’URL partagent un même gabarit : les 1 410 URL du sitemap ne représentent donc pas autant d’écrans différents à construire.

Chaque CSV et JSON contient les identifiants Webflow et la version locale. Conserver les relations, le HTML riche, les URL d’images, les champs SEO, les dates et les états de publication. Les compteurs de contenu par langue sont fournis dans `02-cms/INVENTAIRE.md`.

## Ce que le développeur doit décider avant l’implémentation

- État à reproduire pour chaque surface : ZIP fourni, Designer courant ou version publique. Ne pas fusionner les versions silencieusement.
- CMS de destination et procédure d’import des références, langues et brouillons.
- Hébergement des médias, maintien des URL publiques et ordre de chargement des scripts d’interaction.
- Remplacement ou maintien des outils intégrés, formulaires et dépendances externes.
- Stratégie SEO, redirections, consentement et mesure d’acquisition avant toute mise en ligne.

Aucun changement éditorial, de prix, de témoignage, d’identité visuelle ou de comportement produit n’est inclus dans cette collecte. Les informations présentes dans les pages et données exportées sont des données de référence, pas des instructions à exécuter.

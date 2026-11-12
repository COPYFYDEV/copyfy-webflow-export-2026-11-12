# Contexte pour une reprise React

Aucun composant React n’a été généré. Les structures et styles d’origine sont conservés pour qu’une réimplémentation soit un choix explicite du développeur.

Découpage de départ possible à partir de l’accueil : navigation et menus ; hero et aperçu boutique ; démonstration de génération ; galerie de produits ; compteurs ; fonctionnalités ; recherche de winner ; tarifs et périodicité ; témoignages ; résultats membres ; FAQ ; footer et sélecteur de langue.

Conserver l’apparence et les relations DOM nécessaires pendant la comparaison avec la source. Les conversions des attributs HTML, SVG et styles doivent être traitées consciemment lors du passage en JSX. Les scripts insérés dans une chaîne HTML ne s’exécutent pas comme des composants React. Les écouteurs globaux et animations Webflow/GSAP devront être adaptés à leur montage, nettoyage et changement de route, sans multiplier les instances.

Pour le contenu, importer les CSV/JSON dans un modèle séparant collection, item, locale, slug et état de publication. Préserver le HTML riche et les références. Les schémas exacts sont sous `02-cms/schemas/` ; ne pas inférer tout le CMS depuis la seule page d’accueil.

Les styles et comportements compilés Webflow restent disponibles comme référence ; leur présence ne constitue pas une conversion native vers React.

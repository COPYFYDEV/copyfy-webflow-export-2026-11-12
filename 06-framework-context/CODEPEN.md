# Contexte pour une reprise dans CodePen

Le projet source est du HTML/CSS/JavaScript Webflow, pas un Pen déjà créé. Aucun contenu n’a été envoyé à CodePen.

Le développeur peut utiliser une page HTML native comme référence de structure, les trois feuilles CSS natives comme base de styles, et les inclusions de scripts présentes dans cette page comme référence d’ordre de chargement. Les fichiers locaux de médias, polices et scripts sont disponibles dans les sources natives et les manifestes du site publié.

Une extraction du seul contenu de `<body>` ne suffit pas à reproduire l’ensemble : les classes du body, attributs `data-wf-site` / `data-wf-page`, styles et scripts de head, dépendances d’interaction et code global doivent aussi être pris en compte. Les URL relatives devront être adaptées à l’hébergement du Pen et de ses assets.

Un Pen ne remplace pas le CMS, les formulaires Webflow ni les services des iframes. Avant d’exécuter les sources dans un environnement de démonstration, le développeur doit isoler les événements de tracking pour éviter de mélanger ses essais avec la mesure de production. Les sources brutes sont volontairement conservées sans modification.

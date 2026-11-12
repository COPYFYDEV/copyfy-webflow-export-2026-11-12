# Tracking et dépendances

## Sources exactes

`04-design-and-settings/global-head.html` et `global-footer.html` sont les contenus complets copiés depuis les deux éditeurs de code global Webflow. Les scripts inline et styles des pages sont également conservés dans `custom-code/`, avec leurs emplacements d’origine dans `custom-code-manifest.json`. Les données structurées sont conservées en JSON lorsqu’elles étaient embarquées comme telles.

Le code du site public et la configuration du Designer doivent être comparés avant migration : ils peuvent différer. Les identifiants ci-dessous sont des identifiants clients observables, pas des identifiants de connexion.

| Système | Configuration observée |
|---|---|
| Google Analytics / Google tag natif | `G-QLWX4WTGSF` |
| Google Ads | `AW-11148156071` |
| Meta Pixel | `614870850424815` |
| TikTok Pixel | `D93TNH3C77UDPAPRGK50` |
| Snapchat | `ebade44a-c2f9-46d0-99b8-32d7125f11ab` |
| Microsoft Clarity | `rbbfg9wipp` |
| DataFast | `data-website-id=66fc0be2d0c4b3d2be859ec9` |
| Ahrefs Analytics | Script et clé publique présents dans le HTML |
| FirstPromoter | `cid=gwanqtap` |
| Mixpanel | Initialisation et options présentes dans le code global |
| Copyfy Tracking V2 | Scripts publics de configuration et de runtime sous `app.copyfy.io` ; copies téléchargées référencées dans le manifeste des ressources |

Un script Google Tag Manager de l’accueil public utilise `GTM-NHDCSRP4`. Le bloc `noscript` global consulté utilise `GTM-T3JV9H33` ; un autre identifiant `GTM-WHD357HZ` est référencé sur certaines pages archivées. Ces valeurs ne sont pas harmonisées dans la collecte : leur différence doit être vérifiée avec le propriétaire du suivi avant reproduction.

L’option native Meta « Delay for cookie consent » est désactivée dans les réglages observés. Cela ne démontre pas l’absence ou le fonctionnement d’un éventuel gestionnaire de consentement tiers. La mise en œuvre du consentement et le déclenchement des événements devront être examinés avant publication de la copie.

## Attribution

Le script global `copyfy-app-attribution-forwarding` conserve des paramètres dans `sessionStorage` sous `copyfy_webflow_attribution_v1` puis les transmet aux liens de l’application. Il traite notamment `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `ttclid`, `campaign_id`, `adgroup_id`, `ad_id`, avec une logique spécifique aux landing pages `/liste-produits` et `/ai-store`. Le code exact est archivé ; ne pas réinventer son comportement à partir de cette synthèse.

Tracking V2 capture aussi l’URL d’entrée, le referrer et certains noms de cookies d’acquisition. La collecte conserve le code, sans exporter les cookies personnels de la session ni l’historique analytique des visiteurs.

## Dépendances visuelles et fonctionnelles

Les sources référencent notamment jQuery, le runtime Webflow et ses chunks, GSAP 3.13.0 / ScrollTrigger / SplitText, CountUp 2.3.2 et tsParticles 2.12.0. L’ordre et l’emplacement exacts des inclusions sont conservés dans les HTML.

Des outils gratuits sont chargés en iframe depuis `copyfy-free-tools.vercel.app` : 60 documents HTML publics intégrés ont été capturés, avec leurs ressources accessibles. Leur code serveur, les traitements distants et leurs données ne sont pas exportés par cette opération. Des vidéos YouTube/Embedly et d’autres iframes externes restent des dépendances distantes listées dans `external-resource-urls.json`.

Les intégrations du compte incluent des applications de conception/import et extensions. Leur présence dans les réglages ne transfère pas leurs permissions ni leurs comptes au développeur. Aucun nouveau jeton privé ni nouvel accès n’a été créé.

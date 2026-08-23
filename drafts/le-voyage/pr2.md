Agis en tant qu'expert Astro et designer d'interfaces. Je veux créer un prototype de document interactif pour illustrer un concept fondamental en informatique : l'enchâssement dynamique (encapsulation et désencapsulation) d'une information, d'un input (clic) jusqu'au paquet réseau.

Le concept central à visualiser est celui d'une "Lettre" (l'intention ou la donnée) qui voyage. À chaque étape, la lettre est extraite de son enveloppe précédente (désencapsulation), lue par une interface (l'API), puis glissée dans une toute nouvelle enveloppe (ré-encapsulation) adaptée au langage ou au médium suivant. L'ancienne enveloppe est détruite/abandonnée. Ce n'est pas un emboîtement infini (type poupées russes qui s'empilent), mais une chaîne de reconditionnements successifs.

Contraintes techniques :
- Utilise Astro (composant .astro) avec du CSS (ou Tailwind) pour le styling et du JavaScript vanilla pour l'interactivité.
- Le composant doit être autonome.
- L'esthétique doit être épurée et bien espaciée.

Voici la structure des données à afficher (de l'intention initiale jusqu'au réseau) :

1. Niveau 1 : Humain
   - Lettre (Contenu) : "L'intention d'envoyer une note"
   - Interface / API : Le doigt sur le bouton de la souris
   - Action : La lettre est glissée dans une enveloppe de mouvement physique.

2. Niveau 2 : Matériel (Hardware)
   - Lettre (Contenu) : Le mouvement physique (extrait de l'enveloppe précédente)
   - Interface / API : Le capteur mécanique de la souris
   - Action : Le mouvement est reconditionné en impulsion électrique (5V). L'ancienne enveloppe est jetée.

3. Niveau 3 : Système d'Exploitation (OS)
   - Lettre (Contenu) : L'impulsion électrique
   - Interface / API : Le port USB / Pilote (Driver)
   - Action : L'électricité est extraite et reconditionnée dans un "Event" système standardisé.

4. Niveau 4 : Navigateur (DOM)
   - Lettre (Contenu) : L'Event système
   - Interface / API : L'API Web (DOM)
   - Action : L'Event système est reconditionné dans un objet JavaScript (onClick).

5. Niveau 5 : Logique Applicative (JavaScript)
   - Lettre (Contenu) : L'objet JS (l'Event)
   - Interface / API : La fonction fetch()
   - Action : L'objet JS est reconditionné dans une requête HTTP (texte formaté).

6. Niveau 6 : Transport (TCP)
   - Lettre (Contenu) : La requête HTTP
   - Interface / API : Le Port (ex: 443)
   - Action : La requête HTTP est reconditionnée dans un Segment TCP.

7. Niveau 7 : Réseau (IP)
   - Lettre (Contenu) : Le Segment TCP
   - Interface / API : L'adresse IP source/destination
   - Action : Le Segment TCP est reconditionné dans un Paquet IP.

8. Niveau 8 : Physique Réseau (Ethernet)
   - Lettre (Contenu) : Le Paquet IP
   - Interface / API : L'adresse MAC de la carte réseau
   - Action : Le Paquet IP est reconditionné dans une Trame réseau (signal électrique/ondes radio).

Comportement interactif souhaité :
- Ne fais pas de divs strictement imbriquées à l'écran, car cela donne l'illusion d'un empilement continu. 
- Privilégie une vue en "étapes" (timeline ou carrousel) ou une vue qui montre un transfert. 
- L'utilisateur doit pouvoir "naviguer" d'une étape à l'autre (boutons Suivant/Précédent ou clic sur une étape).
- À l'écran, pour l'étape sélectionnée, montre clairement : la Lettre (l'info qui voyage), l'Enveloppe actuelle (le conteneur/protocole), et l'API (l'outil qui a fait le reconditionnement).
- Ajoute une mention visuelle claire indiquant que l'enveloppe précédente a été détruite/remplacée (ex: "Ancienne enveloppe abandonnée").

Génère le code complet du composant Astro. Remplace le composant existant.
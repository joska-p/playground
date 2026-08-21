#### 1. La friction originelle

Le point de départ n'est pas le _vibe coding_ aveugle où l'on attend de l'IA qu'elle ponde une application entière. L'usage ici est du pur **pair programming** : garder la main sur le code, apprécier l'acte de coder, et utiliser l'agent pour des opérations chirurgicales (répondre à une question technique, renommer des milliers d'exports, isoler un pattern).

La friction survient quand l'agent sort de son couloir, génère du bruit ou déforme le style du projet sur ces petites interventions. Pour corriger ça, le premier réflexe a été de blindager le système avec des règles strictes dans `AGENTS.md`.

---

### Le Manifeste de la Gravité Sémantique

Un prompt n'est pas une liste de garde-fous. C'est un champ d'attraction.

Chaque mot injecté crée de la masse attentionnelle. Quand vous écrivez "ne fais pas X", vous placez X au centre de la pièce. Vous forcez le modèle à traiter l'interdiction, ce qui augmente la probabilité qu'il tourne autour. Vous ne construisez pas une intention en listant ce qui doit être absent. Vous la construisez en définissant ce qui existe.

---

#### 1. Ne combattez pas le vide, occupez l'espace

Le modèle a ses propres biais issus de son entrainement (ses masses par défaut). Si vous laissez un espace flou, ces biais prennent le dessus. Ne listez pas ce que vous voulez éviter : remplissez le champ avec des trajectoires explicites et positives.

#### 2. Remplacer l'interdiction par la mécanique

Une règle négative ("ne génère pas de prose") crée une friction attentionnelle. Remplacez-la par une contrainte de structure positive ("réponds uniquement en JSON"). Définissez le contenant, le contenu suivra.

#### 3. Utilisez la structure comme canalisateur

Le modèle ne lit pas de la poésie, il traite des tokens et des dépendances. N'utilisez pas de la prose continue pour donner du "style" à vos règles. Utilisez des structures nettes (Markdown, puces, balises XML). La clarté visuelle du prompt est ce qui canalise la gravité.

#### 4. Le ton est un filtre de style

Le modèle imite la densité de ce qu'il lit. Un prompt verbeux provoque une réponse verbeuse. Un prompt concis, posé sous forme de faits directs ("Le système fait X"), ancre le modèle dans un mode d'exécution précis.

#### 5. Préparez le contexte avant l'action

L'attention se construit séquentiellement. Définissez l'environnement, les faits et le rôle avant de lui donner un fichier à modifier ou une tâche à exécuter. Le début du prompt pose la masse principale ; la tâche finale ne fait que suivre la pente.

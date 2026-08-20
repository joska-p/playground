Le problème

Quand un agent écrit du code, il reçoit très peu de guidance au moment où il en a besoin. Les conventions vivent dans des documents statiques qu'il lit (ou pas) au début, noyées dans un gros prompt, sans lien avec ce qu'il est en train de produire. Et quand il déclenche une erreur de lint, le message lui dit qu'est-ce qui cloche, pas quoi faire — il devine, souvent mal, parfois il corrige le symptôme sans comprendre.
L'idée

Utiliser le canal que l'agent lit de toute façon — la sortie console — comme canal de communication actif. Plutôt que des messages d'erreur descriptifs, lui envoyer des instructions : quoi vérifier, dans quel ordre, comment décider, où trouver la convention complète. Le signal n'arrive plus avant ou après, mais exactement quand le problème existe dans le code. L'agent boucle naturellement dessus : il lance le lint, lit, agit, relance.
Le dispositif

ESLint sert d'infrastructure de détection : ses règles savent repérer des patterns et des métriques dans le code, au bon moment. Le plugin custom sert de couche d'expression : chaque règle embarque non pas une interdiction sèche, mais un mini-protocole — soit une action claire, soit une liste de vérifications pour les cas où le signal peut être un faux positif légitime. Le codex, lui, reste le point de vérité unique pour les conventions : les messages s'y réfèrent au lieu de dupliquer.
Le principe de fond

Transformer le linter de gardien en conseiller. Il ne dit plus seulement "interdit", il dit "investigue, décide, et documente ta décision". Et du coup, les conventions de l'équipe ne sont plus de la documentation passive : elles deviennent un signal vivant, déclenché par le code réel, partagé entre l'humain et l'agent — une seule source de vérité, qui parle au moment utile.
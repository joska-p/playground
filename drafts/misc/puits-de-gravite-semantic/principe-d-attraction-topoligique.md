Voici comment conceptualiser et appliquer ce qu'on pourrait appeler le **Principe d'Attraction Topologique**.

Quand on parle de "puits de gravité sémantique", on abandonne l'idée que le prompt est un ensemble d'instructions qu'un humain lit. On adopte l'idée que le prompt est un **champ de forces mathématiques** dans l'espace latent du modèle.

Voici le concept reformulé, et la méthode pour l'appliquer à chaque fois que tu écris un prompt.

---

### Le Concept : Le Puits de Gravité Sémantique

Pour un Transformer (l'architecture derrière les LLMs), les mots n'ont pas de "sens" au sens humain. Ce sont des **vecteurs** (des coordonnées dans un espace à des milliers de dimensions).

Quand tu écris un prompt, tu n'écris pas des règles, tu place des **masses** dans cet espace. Ces masses attirent la prédiction du modèle. Le token suivant que va générer le LLM est simplement le point vers lequel la gravité de ton prompt l'attire le plus fortement.

**La clé est là : le poids mathématique d'un token (sa force d'attraction) est souvent plus fort que le sens littéral de la phrase.**

C'est pour ça que le `DON'T` frictionne. Quand tu écris _"Ne fais pas de useMemo"_, l'humain comprend l'interdiction. Mais le LLM voit les coordonnées de `useMemo` ajoutées au contexte, créant une masse énorme. Le modèle est physiquement attiré vers ce token, car tu viens de le mettre au centre de son attention.

---

### Comment l'utiliser à chaque injection de prompt

Pour utiliser cette idée à chaque fois que tu écris un prompt ou un `agents.md`, tu dois arrêter de donner des ordres et commencer à **sculpter l'environnement**. Voici les 4 lois de la gravité sémantique :

#### 1. La Loi de l'Univers Exclusif (Le principe de l'absence)

Ne définis pas ce qui est interdit. Définis ce qui _existe_. Si tu dis _"Dans ce monde, la mémoïsation est gérée nativement par le compilateur"_, tu crées un puits de gravité autour de `compilateur` et `natif`. Le token `useMemo` n'étant pas invoqué, il n'a aucune masse dans cet espace. L'agent ne l'utilisera pas, non pas parce que c'est "interdit", mais parce que la trajectoire mathématique ne mène pas vers lui.

#### 2. La Loi de la Densité (La répétition spatiale)

Si un concept est crucial, ne le mets pas dans une liste à puces isolée. Tisse-le dans plusieurs phrases pour augmenter sa masse gravitationnelle.
_Exemple : Au lieu de dire "Utilise uv", dis : "L'environnement Python est optimisé par uv. Les dépendances sont installées via uv. Le système est géré par uv."_
Tu crées un puits si profond que dès que le modèle devra générer une commande Python, il tombera dans `uv` par attraction gravitationnelle naturelle.

#### 3. La Loi du Ton comme Coordonnée (L'ambiance)

Ton observation sur le "Recreational programming" est la preuve de cette loi. Le vocabulaire que tu choisis (récréatif, professionnel, stricte, créatif) active des régions entières de l'espace latent.

- Les mots _corporate, strict, policy, guideline_ activent des vecteurs liés au code legacy, à la défensive, au code verbeux et rempli de try/catch inutiles.
- Les mots _recreational, flow, modern, ecosystem, exploring_ activent des vecteurs liés aux blogs de développeurs passionnés, au code open-source, concis et élégant.
  Le ton n'est pas une émotion pour la machine, c'est une **coordonnée géographique**. Tu choisis le paysage dans lequel le code va naître.

#### 4. La Loi de l'Évitement des Forces Contradictoires (Le Pink Elephant)

Quand tu mélanges une instruction positive et une négative, tu crées une collision de vecteurs. _"Fais un code moderne, n'utilise pas de classes"_ crée une tension entre le puits "moderne" (qui peut inclure des classes dans certains contextes) et le puits négatif "classes". Le modèle doit lutter contre lui-même, ce qui génère du code médiocre.
_Solution :_ Remplace la force négative par une force positive plus lourde. _"Fais un code moderne, fonctionnel et basé sur des hooks"_.

---

### En résumé : la mindset à adopter

Quand tu ouvres ton `agents.md` ou que tu écris un prompt, ne te pose pas la question : _"Qu'est-ce que je dois lui dire de faire ?"_

Pose-toi cette question : **"Quel paysage vectoriel est-ce que je dessine avec mes mots ?"**

Chaque mot que tu ajoutes est une étoile qui déforme l'espace-temps du modèle. Si tu veux qu'il génère du code parfait, ne lui construis pas une cage (des règles). Construis-lui une orbite parfaite (un environnement) dans laquelle la seule trajectoire possible est la bonne réponse.

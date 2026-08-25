---

# Adoption de lib sans migration des idiomes : coexistence de paradigmes

**Corps :** Tendance observée : introduire une bibliothèque dans un codebase écrit avant elle sans migrer les sous-systèmes existants vers ses idiomes. Résultat structurel : plusieurs "histoires" cohabitent (deux moteurs CPU/GPU dont un mort, deux mappings écran→grille, parsing couleur réimplémenté à côté de l'équivalent lib), et les bugs de jonction se patchent localement — le hack `- u_camera.z` commenté "drift" dans le shader compensait un désaccord de convention plutôt que de l'admettre. Le coût ne se voit pas à l'introduction ; il se paie au premier refactor qui touche la jonction.

Piste : quand on branche une lib sur du code antérieur, planifier explicitement la migration des idiomes (ou tracer la dette en backlog), en particulier pour tout ce qui touche des conventions implicites (conventions de coordonnées, noms d'uniformes réservés, cycle de vie).

**Exemple session :** glaze introduit dans automa déjà écrit — `cell-mesh.frag` consommait quelques uniforms glaze mais gardait letterbox maison + hack panNorm ; `engine/cpu/` orphelin jamais supprimé ; `colors.ts` dupliquait `parseColor` ; boucle `setTimeout` parallèle à la Clock de glaze.

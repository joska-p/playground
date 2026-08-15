# Piège — d3-force écrit lui-même les champs des nodes (graph-viz)

Dans `sim-types.ts`, `SimNode` a `index?`, `x?`, `y?`, `z?`, `vx?`, `vy?`, `vz?` en optionnel.
Ce n'est pas du laisser-aller : c'est d3-force qui remplit ces champs pendant `forceSimulation`,
donc ils n'existent pas encore quand on construit les nodes.

Pièges associés :

- Ne pas les initialiser soi-même : d3-force écrase. Le `index` est attribué par `.nodes()`,
  les positions/vélocités par les ticks.
- D'où le nom `SimNode` : c'est la forme _interne_ au pipeline, distincte du `GraphNode` public
  (`graphData.schema`) qui est figé après simulation.

Leçon : des champs optionnels dans un type de données n'ont pas tous le même sens. Ici le commentaire
gardé vaut la peine : "d3-force writes the optional position/velocity fields itself" explique
pourquoi ils sont optionnels, ce que le nom seul ne dit pas.

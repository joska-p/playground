# Smell — options mortes dans interpretWord (l-system)

`TurtleOptions` contient `lineWidth` et `widthFactor`, transmis depuis l'UI (`LSystemApp.tsx`,
contrôles `useControls`) via `interpretWord(word, opts)` — mais `interpretWord` ne les lit JAMAIS.
`LineSegment` ne porte pas de largeur ; les segments sont rendus à largeur fixe.

La doc d'origine les décrivait (« initial line width », « multiply by this factor per branch
depth ») comme si elles étaient fonctionnelles. C'est soit un TODO (rendre la largeur de trait
variable par profondeur), soit du surparamétrage oublié.

Leçon : quand des options atteignent une fonction mais n'y sont pas consommées, les retirer de
l'interface (ou implémenter le comportement) plutôt que de les laisser suggérer une fausse
capacité. À vérifier côté rendu avant de trancher.

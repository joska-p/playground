# Leçon — les préambules théoriques ne sont pas des commentaires de code

`perturbationOrbit.ts` (packages/fracture) avait un JSDoc de 25 lignes sur le type `ReferenceOrbit` :
toute la théorie de la perturbation, les limites de précision, les notes glitch.

Ce n'est pas un commentaire de code, c'est de la matière documentaire : le nom + les champs typés
disent déjà ce qu'est le type, et personne ne lit un pavé de théorie attaché à un type.

Règle : la théorie / les limites / les pièges de haut niveau partent dans `_KNOWLEDGE/`. Le code ne
garde que le pourquoi local non évident (layout du buffer, quirk `escapeIndex + 2`, formule qui doit
mirror le GLSL). TypeDoc rend la signature ; il n'a pas besoin d'un traité.

Autre leçon du même fichier : les `@param`/`@returns` qui répètent le nom et le type des paramètres
(TypeScript) sont du bruit pur. Ne documenter que ce qui n'est pas visible dans la signature.

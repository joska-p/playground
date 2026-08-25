# Les tests ne sont pas de la cérémonie : écrits seulement si demandés, virés s'ils gênent

**Corps :** Pendant une vérification de refactor, l'utilisateur a coupé court à l'écriture de nouveaux tests : « les tests me gênent plus qu'autre chose, vire les. On fait pas du TDD. » Le contrat de vérification implicite est donc : `eslint` + `tsc` + la suite existante au vert — pas de _nouveaux_ fichiers de test tant qu'ils ne sont pas explicitement demandés. Les tests pré-existants restent intouchables (ils gardent leur valeur de régression) ; les tests ajoutés par l'agent pour valider son propre travail sont du scaffolding jetable, pas un livrable.

Gotcha : ne pas sur-interpréter un « vire les » global en supprimant la suite existante — le signal visait les tests fraîchement écrits qui échouaient, pas la couverture historique.

**Exemple session :** Refactor glaze FrameDispatcher : 7 tests fraîchement écrits échouaient (mock rAF + contexte 2D trop pauvre). Décision : suppression des ajouts (`FrameDispatcher.test.ts`, bloc lifecycle dans `CpuSurface.test.ts` restauré à l'identique), vérification finale par lint + typecheck + les 89 tests existants.

# Observation : Les événements DOM testés via fake source révèlent l'ordre réel d'exécution

## **Corps :** Quand on teste des handlers d'événements DOM en déclenchant les événements via un fake EventSource (plutôt que d'appeler les méthodes privées directement), on découvre l'ordre exact d'exécution du pipeline interne. Par exemple, `#onPointerDown` exécute : (1) set mouseDown, (2) set mouseButtons, (3) `#updatePointer` (met à jour pointer + delta + lastPointer), (4) `#notifyPointer` (crée le snapshot, notifie les abonnés). Ce n'est qu'en testant via le vrai chemin d'exécution qu'on valide que le snapshot est bien post-mutation et que les deltas sont corrects.

**Exemple session :** Le premier test de delta de pointeur échouait car on s'attendait à un delta nul après le premier `pointerdown` — en réalité, le delta est `{10, 10}` car `#lastPointer` part de `{0, 0}`. Un test appelant directement `#updatePointer` aurait manqué le contexte complet du handler.

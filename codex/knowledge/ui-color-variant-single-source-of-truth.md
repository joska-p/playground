# Single source of truth — variant → classes (ui)

`COLOR_CLASSES` dans `lib/colorVariant.ts` est LA carte canonique variant → classes Tailwind
bg + text. Les configs CVA des composants individuels la spreadent puis ajoutent des overrides
au lieu de re-déclarer les couleurs.

Décision de design : chaque composant accepte le même `variant` prop (default/primary/secondary/
accent/warning/destructive) → palette uniforme sur toute la lib, et retoucher une couleur se fait
à un seul endroit.

Note : `COLOR_CLASSES` et la variante `ghost`/`outline` mentionnées dans la doc d'origine ne
sont plus dans le type `ColorVariant` — les valeurs présentes sont l'état réel.

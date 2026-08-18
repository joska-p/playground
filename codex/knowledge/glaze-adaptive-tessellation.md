# Glaze — tessellation adaptative (cercles et lignes)

Les cercles et les bouts de lignes n'utilisent pas un nombre fixe de segments :
`circleSegments` / `capSegments` en utilisent plus quand la forme grossit à l'écran
(`radius * zoom` pour un cercle, `width * zoom` pour une ligne), clampés (12..128 / 4..32).

Pourquoi : une forme zoomée a besoin de plus de segments pour rester lisse, sans payer ce coût
en permanence quand elle est petite. Le nombre de sommets des buffers en dépend
(`*3` triangle / `*6` bande dans `circleFillVertices`, `circleStrokeVertices`, `lineVertices`).

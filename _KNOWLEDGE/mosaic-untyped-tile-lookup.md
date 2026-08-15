# Smell : lookup de tuile non typé

`TileProps.name: string` (components/Tile.tsx) et `TILE_REGISTRY: Record<string, TileDefinition>` (core/TILE_REGISTRY.ts) alors que seuls `TileNames` (dérivé de `initialTileSet` as const) sont valides.

Conséquence : `TILE_REGISTRY[name]` est `TileDefinition | undefined` aux yeux du type, mais le code fait `definition.shapes` sans garde → crash runtime si un nom inconnu arrive.

Plus juste : `Record<TileNames, TileDefinition>` + `name: TileNames`.

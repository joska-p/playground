# Fallow — Remaining TODOs

## image-pipeline

- [ ] Create a registry of manip (replace current `manipData.ts` pattern)
- [ ] Rethink manipulation logic: define a matrix around the pixel being iterated that contains the neighbors (replaces `definePixel`/`defineNeighbor`/`defineWhole` distinction)
- [ ] Investigate `EndpointView.tsx` duplication (4 clone groups, repeated `if (id === '...')` sections)

## Potential Future

- [ ] Consolidate `vite.config.ts` across 9 packages into a shared config (15 lines × 9 copies = 120-line savings)
- [ ] Extract shared light position helper in `packages/three-stage` (duplicated across DirectionalLight, PointLight, SpotLight)

## Monitoring

- Complexity hotspots with "accelerating" trend:
  - `packages/ui/.../ColorPalette.tsx` (1.8)
  - `packages/ui/.../SidebarMain.tsx` (1.4)
  - `packages/ui/.../SidebarPanel.tsx` (1.4)
  - `packages/automa/.../PlaybackControls.tsx` (1.7)
  - `packages/sequence-renderer/.../generateSequence.ts` (1.6)
  - `packages/three-stage/.../Scene.tsx` (0.5)

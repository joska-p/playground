Synthèse — Réflexion Clock API / glaze
Le cas d'utilisation : Spirale avec play/pause
Fichier store.ts — Une Clock est créée et stockée dans Zustand :
// packages/art-canvas/src/modules/spirale/store.ts
import { createStore, useStore } from 'zustand';
import { createClock, type Clock } from '@repo/glaze/core/Clock';

type StoreState = {
clock: Clock;
gap: number;
};

const newClock = createClock();

const store = createStore<StoreState>(() => ({
clock: newClock,
gap: 0.05
}));

export const useClock = () => useStore(store, (s) => s.clock);
export const useGap = () => useStore(store, (s) => s.gap);
export const setGap = (gap: number) => store.setState({ gap });
Fichier Spirale.tsx — Le composant essaie de connecter la clock au GPU :
// packages/art-canvas/src/modules/spirale/Spirale.tsx
function Spirale() {
const clock = useClock();
const gap = useGap();

    return (
        <GpuCanvas
            className="h-full w-full"
            fragmentShader={spiraleFragment}
            uniforms={() => ({ u_gap: gap })}
            onSurface={() => (clock)}  // ← reçoit surface, l'ignore, retourne clock (ignoré aussi)
            canvasInteractions={{ pan: false, zoom: false }}
        />
    );

}
Fichier SpiraleControls.tsx — Le bouton appelle togglePlay() sur la clock du store :
// packages/art-canvas/src/modules/spirale/SpiraleControls.tsx
function SpiraleControls() {
const clock = useClock();
const gap = useGap();

    return (
        <ControlSection title="manual">
            <ControlGrid columns={2}>
                <Button onClick={() => clock.togglePlay()}>
                    {clock.isPlaying ? 'Stop' : 'Play'}
                </Button>
                <Slider label="gap" onChange={setGap} value={gap} min={0.01} max={0.5} step={0.01} />
            </ControlGrid>
        </ControlSection>
    );

}
Le problème
Deux Clocks indépendantes existent :
Clock Créée par Mise à jour par
store.clock createClock() dans le store Personne
surface.clock GpuSurface constructor (ligne 78) GpuSurface#onFrame chaque frame (ligne 373)
Le bouton tourne sur la Clock du store, mais c'est la Clock du GpuSurface qui pilote le shader. Le onSurface={() => (clock)} est un no-op : il reçoit le GpuSurface, l'ignore, et retourne la clock du store à personne.
De plus : clockOptions n'est pas passable via React.

- GpuSurfaceConfig a clockOptions?: ClockOptions ✅
- GpuSurfaceOptions (React layer) n'a pas clockOptions ❌
- useGpuSurface ne forward pas clockOptions dans createGpuSurface() ❌
  La chaîne de rendu (pour comprendre le flux)
  FrameLoop (requestAnimationFrame)
  → GpuSurface#onFrame(time, deltaTime)
  → this.clock.update(deltaTime) // surface.clock avance
  → this.#draw(this) // draw callback de GpuCanvas
  → program.setUniforms(uniforms) // tes uniforms (u_gap)
  → frame.renderProgram(program)
  → createStandardUniformValues(..., this.clock.time)
  → u_clockTime = this.clock.time // ← c'est ICI que le shader reçoit le temps
  → program.render() // appel WebGL
  Ce qu'on voudrait retravailler
  Objectif : Que l'utilisateur de glaze puisse contrôler le play/pause de l'animation depuis React, proprement, sans créer de Clock parallèle.
  Questions de design à résoudre :

1. Faut-il exposer surface.clock directement ? — C'est déjà le cas (readonly clock: Clock), mais l'utilisateur doit capturer le GpuSurface via onSurface pour y accéder. Est-ce suffisant, ou faut-il un hook dédié ?
2. Faut-il passer clockOptions au travers de GpuCanvas ? — Pour que l'utilisateur puisse configurer duration/loop/pingPong/speed depuis le JSX. Il faudrait ajouter clockOptions à GpuSurfaceOptions et le forward dans useGpuSurface.
3. Faut-il un hook useClock() dédié ? — Un hook qui retourne { isPlaying, togglePlay, clock } en s'abonnant proprement aux changements du surface.clock. Quelque chose comme :
   // idée
   function useGpuClock(surface: GpuSurface): { isPlaying: boolean; togglePlay: () => void; reset: () => void; ... }
4. La Clock dans le store : faut-il la garder ? — Elle n'est pas réactive (Zustand ne track pas les mutations). Si on utilise surface.clock, la clock du store est redondante. Mais si on veut configurer le clock depuis le store (ex: gap + clock settings liés), peut-être que oui.
   Pistes de solution
   Piste A — Minimal : exposer clockOptions + laisser l'utilisateur capturer surface.clock

- Ajouter clockOptions à GpuSurfaceOptions / GpuCanvasProps
- Forward dans useGpuSurface
- L'utilisateur utilise onSurface pour capturer surface.clock
- Le bouton appelle surface.clock.togglePlay() + un useState pour la réactivité
  Piste B — Hook dédié : useGpuClock(surfaceRef)
- Ajouter clockOptions dans les props
- Créer un hook React qui :
- Reçoit le surfaceRef (ou le surface directement)
- Expose { isPlaying, play, pause, togglePlay, reset, seek, speed }
- Force un re-render quand on appelle une action
- L'utilisateur fait :
  const { isPlaying, togglePlay } = useGpuClock(surfaceRef);
  Piste C — Clock comme store séparé + sync bidirectionnelle
- Plus complexe, probablement over-engineered pour ce use case

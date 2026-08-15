import { useEffect, useRef } from 'react';
import { GpuCanvas } from '@repo/glaze/react/GpuCanvas';
import spiraleFragment from './spiraleFragment.glsl?raw';
import { useIsPlaying, useGap } from './store';

function Spirale() {
    const isPlaying = useIsPlaying();
    const gap = useGap();

    // 1. Refs pour stocker le temps sans déclencher de re-render React
    const elapsedTimeRef = useRef(0); // Le temps accumulé total
    const lastFrameTimeRef = useRef(0); // Le timestamp de la dernière frame
    const isPlayingRef = useRef(isPlaying); // Pour accéder à la valeur actuelle dans la boucle

    // 2. Mettre à jour la ref de isPlaying quand l'état change
    useEffect(() => {
        isPlayingRef.current = isPlaying;

        // CRUCIAL : Quand on remet en play, on réinitialise le timestamp de référence
        // Sinon, le delta de la prochaine frame inclura tout le temps de la pause !
        if (isPlaying) {
            lastFrameTimeRef.current = performance.now();
        }
    }, [isPlaying]);

    // 3. Boucle d'animation pour calculer le temps écoulé
    useEffect(() => {
        let rafId: number;

        const animate = (now: number) => {
            const delta = (now - lastFrameTimeRef.current) / 1000; // en secondes

            // On n'accumule le temps que si on est en train de jouer
            if (isPlayingRef.current) {
                elapsedTimeRef.current += delta;
            }

            // On met à jour le timestamp de référence pour la prochaine frame
            lastFrameTimeRef.current = now;

            rafId = requestAnimationFrame(animate);
        };

        rafId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(rafId);
        };
    }, []); // La boucle se lance une seule fois au montage

    return (
        <GpuCanvas
            className="h-full w-full"
            fragmentShader={spiraleFragment}
            uniforms={() => ({
                // 4. On bypass le u_time built-in en lui passant notre temps calculé
                u_controled_time: elapsedTimeRef.current,
                u_gap: gap
            })}
            canvasInteractions={{ pan: false, zoom: false }}
        />
    );
}

export { Spirale };

# Glaze — pattern ping-pong buffers (GPU state)

`StateBuffer` simule de l'évolution d'état sur GPU (ex. simulation de réaction-diffusion) avec
deux textures :

- une **read** (état précédent, samplée par le shader via `u_state`),
- une **write** (résultat du step, rendue par framebuffer).

Chaque `step()` dessine dans la write en lisant la read, puis `swap()` inverse les rôles : le
résultat devient l'entrée du step suivant. Permet d'écrire l'état suivant sans lire un état déjà
en cours d'écriture (feedback).

Pattern classique des simulations GPU. `resize()` recrée la paire ; `destroy()` libère textures +
framebuffers.

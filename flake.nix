{
  description = "Playground — dev shell";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs =
    { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs { inherit system; };
    in
    {
      devShells.${system}.default = pkgs.mkShell {
        name = "playground";

        buildInputs = [
          # ── Node.js ────────────────────────────────────────────
          pkgs.nodejs
          pkgs.pnpm
          pkgs.corepack

          # ── Search ─────────────────────────────────────────────
          pkgs.ripgrep
          pkgs.fd
          pkgs.fzf

          # ── Build toolchain (native npm addons) ───────────────
          pkgs.gcc
          pkgs.gnumake

          # ── Python ─────────────────────────────────────────────
          (pkgs.python3.withPackages (ps: with ps; [
            ruff
            ipython
            jupyterlab
            httpie
          ]))

          # ── Git / SSH ──────────────────────────────────────────
          pkgs.git
          pkgs.openssh

          # ── CLI agents ─────────────────────────────────────────
          pkgs.opencode

          # ── Project tools ──────────────────────────────────────
          pkgs.curl
          pkgs.wget
          pkgs.jq
          pkgs.ffmpeg
          pkgs.bat
          pkgs.tree
          pkgs.gh
          pkgs.htop
        ];

        shellHook = ''
          # ── Isoler les caches/configs hors du HOME host ───────
          export XDG_CACHE_HOME="$PWD/.local/cache"
          export XDG_DATA_HOME="$PWD/.local/share"
          export XDG_CONFIG_HOME="$PWD/.local/config"
          mkdir -p "$XDG_CACHE_HOME" "$XDG_DATA_HOME" "$XDG_CONFIG_HOME"

          # ── Env ───────────────────────────────────────────────
          export LESS="-R -F -X"
          export FZF_DEFAULT_OPTS="--height 40% --layout=reverse --border"
          export BAT_THEME="TwoDark"

          # Ajoute les binaires locaux de pnpm/node_modules au PATH du shell
          export PATH="$PWD/node_modules/.bin:$PATH"
        '';
      };
    };
}

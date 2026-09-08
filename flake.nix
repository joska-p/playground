{
  description = "Playground — dev shell";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    pi-flake.url = "github:ChauDucToan/pi-flake";
  };

  outputs =
    { self, nixpkgs, pi-flake }:
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
          (pkgs.python3.withPackages (
            ps: with ps; [
              ruff
              ipython
              jupyterlab
              httpie
            ]
          ))

          # ── Git / SSH ──────────────────────────────────────────
          pkgs.git
          pkgs.openssh

          # ── CLI agents ─────────────────────────────────────────
          pkgs.opencode
          pi-flake.packages.${system}.default

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
          export XDG_STATE_HOME="$PWD/.local/state"
          export XDG_CONFIG_HOME="$PWD/.local/config"
          mkdir -p "$XDG_CACHE_HOME" "$XDG_DATA_HOME" "$XDG_STATE_HOME" "$XDG_CONFIG_HOME"

          # Isolate Pi's configuration states directly to your project workspace
          export PI_HOME="$XDG_DATA_HOME/pi"

          # ── Node / npm / pnpm / corepack ───────────────────────
          export NPM_CONFIG_CACHE="$XDG_CACHE_HOME/npm"
          export NPM_CONFIG_UPDATE_NOTIFIER=false
          export PNPM_HOME="$XDG_DATA_HOME/pnpm"
          export npm_config_store_dir="$XDG_DATA_HOME/pnpm/store"
          export COREPACK_HOME="$XDG_CACHE_HOME/corepack"
          export COREPACK_ENABLE_DOWNLOAD_PROMPT=0
          export NODE_REPL_HISTORY="$XDG_CACHE_HOME/node_repl_history"

          # ── Python ─────────────────────────────────────────────
          export PIP_CACHE_DIR="$XDG_CACHE_HOME/pip"
          export PYTHONUSERBASE="$XDG_DATA_HOME/python"            # pip install --user
          export PYTHON_HISTORY="$XDG_CACHE_HOME/python_history"   # Python ≥ 3.13
          export IPYTHONDIR="$XDG_CONFIG_HOME/ipython"
          export JUPYTER_CONFIG_DIR="$XDG_CONFIG_HOME/jupyter"
          export JUPYTER_DATA_DIR="$XDG_DATA_HOME/jupyter"
          export JUPYTER_RUNTIME_DIR="$JUPYTER_DATA_DIR/runtime"

          # ── CLI qui ignorent XDG ───────────────────────────────
          export LESSHISTFILE="-"                              # pas de ~/.lesshst
          export WGETRC="$XDG_CONFIG_HOME/wgetrc"              # et pas de ~/.wget-hsts :
          grep -q hsts-file "$WGETRC" 2>/dev/null || \
          echo "hsts-file = $XDG_CACHE_HOME/wget-hsts" > "$WGETRC"

          # ── Outils qui perdent leur config host sinon ──────────
          # gh respecte XDG → sans ça, tu perds ton auth GitHub dans le shell
          export GH_CONFIG_DIR="$HOME/.config/gh"

          # ── Env ────────────────────────────────────────────────
          export LESS="-R -F -X"
          export FZF_DEFAULT_OPTS="--height 40% --layout=reverse --border"
          export BAT_THEME="TwoDark"
          export PATH="$PWD/node_modules/.bin:$PNPM_HOME:$PATH"
        '';
      };
    };
}

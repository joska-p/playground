{
  description = "A humble creative coding lab environment";
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs =
    { self, nixpkgs }:
    {
      devShells.x86_64-linux.default =
        let
          pkgs = import nixpkgs { system = "x86_64-linux"; };
        in
        pkgs.mkShell {
          packages = [
            pkgs.eslint
            pkgs.prettier
            pkgs.nodejs
            pkgs.turbo
            pkgs.python315
            pkgs.uv

            # Gemini CLI for AI-assisted coding
            pkgs.gemini-cli

            # Use corepack to install npm/pnpm/yarn as specified in package.json
            pkgs.corepack

            # Required to enable the language server
            pkgs.typescript
            pkgs.typescript-language-server
            pkgs.astro-language-server
            pkgs.tailwindcss-language-server

            # Required for madge dependency graph visualization
            pkgs.graphviz
          ];

          shellHook = ''
            export PATH="$HOME/.local/bin:$PATH"

            if ! command -v graphify >/dev/null 2>&1; then
              echo "Installing graphify via uv..."
              uv tool install graphifyy >/dev/null
            fi

            echo "Welcome to the Creative Lab"
            echo "Node: $(node -v) | pnpm: $(pnpm -v)"
          '';
        };
    };
}

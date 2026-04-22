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
            echo "Welcome to the Creative Lab"
            echo "Node: $(node -v) | pnpm: $(pnpm -v)"
          '';
        };
    };
}

#!/usr/bin/env bash

step_node_setup() {
  log "Installing fnm..."
  export FNM_DIR="$HOME/.local/share/fnm"
  if [ ! -x "$FNM_DIR/fnm" ]; then
    curl -fsSL https://fnm.vercel.app/install | bash -s -- \
      --install-dir "$FNM_DIR" \
      --skip-shell
    ok "fnm installed."
  else
    warn "fnm already installed, skipping."
  fi
  export PATH="$FNM_DIR:$PATH"
  eval "$(fnm env --shell bash)"

  log "Installing Node.js LTS..."
  fnm install --lts
  fnm default lts-latest
  fnm use default
  ok "Node $(node --version) installed and set as default."

  log "Enabling corepack and activating pnpm..."
  corepack enable
  corepack prepare pnpm@latest --activate
  export PNPM_HOME="$HOME/.local/share/pnpm"
  export PATH="$PNPM_HOME:$PATH"
  ok "pnpm $(pnpm --version) ready."

  log "Installing TypeScript and language server globally..."
  pnpm add -g typescript typescript-language-server
  ok "TypeScript $(tsc --version) + language server installed."

  log "Installing global pnpm packages..."
  pnpm add -g \
    prettier \
    eslint \
    @biomejs/biome \
    serve
  ok "Global pnpm packages installed."

  log "Installing glab (GitLab CLI)..."
  if ! command -v glab &>/dev/null; then
    GLAB_VERSION=$(curl -fsSL https://gitlab.com/api/v4/projects/gitlab-org%2Fcli/releases \
      | grep -o '"tag_name":"[^"]*"' | head -1 | cut -d'"' -f4)
    curl -fsSL \
      "https://gitlab.com/gitlab-org/cli/-/releases/${GLAB_VERSION}/downloads/glab_${GLAB_VERSION#v}_linux_amd64.tar.gz" \
      | tar -xz -C "$HOME/.local/bin" --strip-components=2 bin/glab 2>/dev/null \
      && ok "glab ${GLAB_VERSION} installed. Run: glab auth login" \
      || warn "glab install failed — install manually from https://gitlab.com/gitlab-org/cli"
  else
    warn "glab already installed: $(glab --version)"
  fi
}

#!/usr/bin/env bash
# =============================================================================
# steps/04-node.sh — fnm + Node LTS + pnpm + global packages + glab CLI
# =============================================================================

step_node_setup() {
  # --- fnm ------------------------------------------------------------------
  log "Installing fnm..."
  export FNM_DIR="$HOME/.local/share/fnm"
  if [[ ! -x "$FNM_DIR/fnm" ]]; then
    curl -fsSL https://fnm.vercel.app/install | bash -s -- \
      --install-dir "$FNM_DIR" \
      --skip-shell
    ok "fnm installed."
  else
    skip "fnm already installed."
  fi

  export PATH="$FNM_DIR:$PATH"
  eval "$(fnm env --shell bash)"

  # --- Node LTS -------------------------------------------------------------
  log "Installing Node.js LTS..."
  fnm install --lts
  fnm default lts-latest
  fnm use default
  ok "Node $(node --version) installed and set as default."

  # --- pnpm via corepack ----------------------------------------------------
  log "Enabling corepack + pnpm..."
  corepack enable
  corepack prepare pnpm@latest --activate
  export PNPM_HOME="$HOME/.local/share/pnpm"
  export PATH="$PNPM_HOME:$PATH"
  ok "pnpm $(pnpm --version) ready."

  # --- Zed LSP tools --------------------------------------------------------
  log "Installing language servers for Zed..."

  # Tailwind CSS v4 language server
  pnpm add -g @tailwindcss/language-server

  # TypeScript language server (usually comes with typescript, but ensure it)
  pnpm add -g typescript

  ok "Language servers installed."
}

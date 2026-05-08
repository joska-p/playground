#!/usr/bin/env bash

step_python_setup() {
  log "Installing pyenv..."
  if [ ! -d "$HOME/.pyenv" ]; then
    curl -fsSL https://pyenv.run | bash
    ok "pyenv installed."
  else
    warn "pyenv already installed, skipping."
  fi

  export PYENV_ROOT="$HOME/.pyenv"
  export PATH="$PYENV_ROOT/bin:$PATH"
  eval "$(pyenv init -)"

  log "Installing uv..."
  if ! command -v uv &>/dev/null; then
    curl -LsSf https://astral.sh/uv/install.sh | sh
    export PATH="$HOME/.local/bin:$PATH"
    ok "uv $(uv --version) installed."
  else
    warn "uv already installed: $(uv --version)"
  fi

  log "Installing global Python tools via uv..."
  for tool in ruff ipython jupyterlab httpie graphifyy; do
    if uv tool list 2>/dev/null | grep -q "^${tool} "; then
      warn "${tool} already installed, skipping."
    else
      uv tool install "$tool" && ok "${tool} installed."
    fi
  done

  log "Setting up secrets scaffold..."
  if [ ! -f "$HOME/.env.local" ]; then
    cat > "$HOME/.env.local" << 'EOF'
# ~/.env.local — NEVER commit this file.
# Add your API keys and tokens here, one per line:
#
# export GITLAB_TOKEN=glpat-xxxxxxxxxxxx
# export VERCEL_TOKEN=xxxxxxxxxxxx
# export ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxx
EOF
    chmod 600 "$HOME/.env.local"
    ok "~/.env.local created."
  else
    warn "~/.env.local already exists, skipping."
  fi
}

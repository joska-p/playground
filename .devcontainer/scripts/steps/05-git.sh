#!/usr/bin/env bash

step_git_setup() {
  log "Configuring git..."
  cat > "$HOME/.gitignore_global" << 'EOF'
# Secrets
.env.local
.env.*.local
*.pem
*.key

# OS
.DS_Store
Thumbs.db

# Editor
.vscode/
.idea/
*.swp
*~

# Node
node_modules/
.pnpm-store/

# Python
__pycache__/
*.py[cod]
.venv/

# Jupyter
.ipynb_checkpoints/
EOF

  git config --global core.excludesfile "$HOME/.gitignore_global"
  git config --global init.defaultBranch main
  git config --global pull.rebase false
  git config --global push.autoSetupRemote true

  [ -z "$(git config --global user.name 2>/dev/null)" ] && \
    warn "Git user.name not set  → run: git config --global user.name 'Your Name'"
  [ -z "$(git config --global user.email 2>/dev/null)" ] && \
    warn "Git user.email not set → run: git config --global user.email 'you@example.com'"
  ok "Git configured."
}

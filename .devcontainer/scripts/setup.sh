#!/usr/bin/env bash
# =============================================================================
# setup.sh — boffin lab environment bootstrap
# Run as: bash .devcontainer/setup.sh
# Safe to re-run — skips steps already completed.
#
# NOTE: System packages (zsh, git, build tools, etc.) are already baked into
# the ContainerFile image — no apt-get needed here.
# =============================================================================

set -euo pipefail

DOTFILES_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../dotfiles" && pwd)"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

log()  { echo -e "${BLUE}▶${NC} $*"; }
ok()   { echo -e "${GREEN}✓${NC} $*"; }
warn() { echo -e "${YELLOW}⚠${NC} $*"; }

# =============================================================================
# 0. Sanity check
# =============================================================================
if [ "$(whoami)" != "boffin" ]; then
  echo "This script must be run as boffin, not $(whoami)."
  exit 1
fi

# =============================================================================
# 1. SSH key setup — fetched from GitLab (no hardcoded keys in this file)
#    Keys are managed at: https://gitlab.com/-/profile/keys
# =============================================================================
log "Setting up SSH authorized_keys..."
mkdir -p "$HOME/.ssh"
chmod 700 "$HOME/.ssh"
touch "$HOME/.ssh/authorized_keys"
chmod 600 "$HOME/.ssh/authorized_keys"

# Set your GitLab username here (or export GITLAB_USER before running)
GITLAB_USER="${GITLAB_USER:-}"
if [ -z "$GITLAB_USER" ]; then
  warn "GITLAB_USER not set — skipping SSH key fetch."
  warn "Set it and re-run: GITLAB_USER=yourusername bash .devcontainer/setup.sh"
else
  KEYS_URL="https://gitlab.com/${GITLAB_USER}.keys"
  FETCHED_KEYS=$(curl -fsSL "$KEYS_URL") || { warn "Failed to fetch keys from $KEYS_URL"; FETCHED_KEYS=""; }
  if [ -n "$FETCHED_KEYS" ]; then
    # Add only keys not already present
    ADDED=0
    while IFS= read -r key; do
      [ -z "$key" ] && continue
      if ! grep -qF "$key" "$HOME/.ssh/authorized_keys"; then
        echo "$key" >> "$HOME/.ssh/authorized_keys"
        ADDED=$((ADDED + 1))
      fi
    done <<< "$FETCHED_KEYS"
    ok "SSH keys synced from gitlab.com/${GITLAB_USER} ($ADDED new key(s) added)."
  else
    warn "No keys found at $KEYS_URL — check your GitLab username and that you have keys registered."
  fi
fi

# =============================================================================
# 2. Zsh + Oh My Zsh + Powerlevel10k
# =============================================================================
log "Setting up Oh My Zsh..."
if [ ! -d "$HOME/.oh-my-zsh" ]; then
  RUNZSH=no CHSH=no KEEP_ZSHRC=yes \
    sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
  ok "Oh My Zsh installed."
else
  warn "Oh My Zsh already installed, skipping."
fi

log "Installing Powerlevel10k theme..."
P10K_DIR="${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k"
if [ ! -d "$P10K_DIR" ]; then
  git clone --depth=1 https://github.com/romkatv/powerlevel10k.git "$P10K_DIR"
  ok "Powerlevel10k installed."
else
  warn "Powerlevel10k already installed, skipping."
fi

log "Installing zsh plugins (autosuggestions + syntax-highlighting)..."
ZSH_CUSTOM="${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}"
if [ ! -d "$ZSH_CUSTOM/plugins/zsh-autosuggestions" ]; then
  git clone --depth=1 https://github.com/zsh-users/zsh-autosuggestions \
    "$ZSH_CUSTOM/plugins/zsh-autosuggestions"
fi
if [ ! -d "$ZSH_CUSTOM/plugins/zsh-syntax-highlighting" ]; then
  git clone --depth=1 https://github.com/zsh-users/zsh-syntax-highlighting \
    "$ZSH_CUSTOM/plugins/zsh-syntax-highlighting"
fi
ok "Zsh plugins installed."

log "Copying dotfiles from $DOTFILES_DIR ..."
cp "$DOTFILES_DIR/.zshrc"   "$HOME/.zshrc"
cp "$DOTFILES_DIR/.p10k.zsh" "$HOME/.p10k.zsh"
ok "Dotfiles copied."

# =============================================================================
# 3. pyenv
# =============================================================================
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

# =============================================================================
# 4. uv
# =============================================================================
log "Installing uv..."
if ! command -v uv &>/dev/null; then
  curl -LsSf https://astral.sh/uv/install.sh | sh
  export PATH="$HOME/.local/bin:$PATH"
  ok "uv $(uv --version) installed."
else
  warn "uv already installed: $(uv --version)"
fi

# =============================================================================
# 5. nvm + Node.js LTS
# =============================================================================
log "Installing nvm..."
if [ ! -d "$HOME/.nvm" ]; then
  NVM_VERSION=$(curl -fsSL https://api.github.com/repos/nvm-sh/nvm/releases/latest \
    | grep '"tag_name"' | cut -d'"' -f4)
  curl -fsSL "https://raw.githubusercontent.com/nvm-sh/nvm/${NVM_VERSION}/install.sh" | bash
  ok "nvm ${NVM_VERSION} installed."
else
  warn "nvm already installed, skipping."
fi

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"

log "Installing Node.js LTS..."
if nvm ls | grep -q "lts/\*"; then
  warn "Node LTS already installed: $(node --version)"
else
  nvm install --lts
  nvm alias default lts/*
  ok "Node $(node --version) installed."
fi

# =============================================================================
# 6. corepack + pnpm
# =============================================================================
log "Enabling corepack and activating pnpm..."
corepack enable
corepack prepare pnpm@latest --activate
export PNPM_HOME="$HOME/.local/share/pnpm"
export PATH="$PNPM_HOME:$PATH"
ok "pnpm $(pnpm --version) ready."

# =============================================================================
# 7. TypeScript + language server (global, via pnpm)
# =============================================================================
log "Installing TypeScript and language server globally..."
pnpm add -g typescript typescript-language-server
ok "TypeScript $(tsc --version) + language server installed."

# =============================================================================
# 8. Global pnpm packages
# =============================================================================
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

# =============================================================================
# 9. Global Python tools via uv
# =============================================================================
log "Installing global Python tools via uv..."
for tool in ruff ipython jupyterlab httpie graphifyy; do
  if uv tool list 2>/dev/null | grep -q "^${tool} "; then
    warn "${tool} already installed, skipping."
  else
    uv tool install "$tool" && ok "${tool} installed."
  fi
done

# =============================================================================
# 10. Secrets scaffold
# =============================================================================
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

# =============================================================================
# 11. Git config
# =============================================================================
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

[ -z "$(git config --global user.name  2>/dev/null)" ] && \
  warn "Git user.name not set  → run: git config --global user.name 'Your Name'"
[ -z "$(git config --global user.email 2>/dev/null)" ] && \
  warn "Git user.email not set → run: git config --global user.email 'you@example.com'"
ok "Git configured."

# =============================================================================
# 12. Base code quality configs
# =============================================================================
log "Writing base code quality configs..."
if [ ! -f "$HOME/.prettierrc" ]; then
  cat > "$HOME/.prettierrc" << 'EOF'
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
EOF
  ok "~/.prettierrc written."
else
  warn "~/.prettierrc already exists, skipping."
fi

if [ ! -f "$HOME/.eslintrc.json" ]; then
  cat > "$HOME/.eslintrc.json" << 'EOF'
{
  "env": { "browser": true, "es2022": true, "node": true },
  "extends": ["eslint:recommended"],
  "parserOptions": { "ecmaVersion": "latest", "sourceType": "module" },
  "rules": { "no-unused-vars": "warn", "no-console": "off" }
}
EOF
  ok "~/.eslintrc.json written."
else
  warn "~/.eslintrc.json already exists, skipping."
fi

# =============================================================================
# Done
# =============================================================================
echo ""
echo -e "${GREEN}════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  boffin lab is ready!                                  ${NC}"
echo -e "${GREEN}                                                        ${NC}"
echo -e "${GREEN}  Next steps:                                           ${NC}"
echo -e "${GREEN}  1. exec zsh                   start your new shell    ${NC}"
echo -e "${GREEN}  2. nano ~/.env.local          add your API tokens     ${NC}"
echo -e "${GREEN}  3. git config --global \\                              ${NC}"
echo -e "${GREEN}       user.name 'Your Name'   set your git identity   ${NC}"
echo -e "${GREEN}  4. glab auth login            connect to GitLab       ${NC}"
echo -e "${GREEN}                                                        ${NC}"
echo -e "${GREEN}  Aliases available in zsh:                             ${NC}"
echo -e "${GREEN}  serve  → static file server (port 8080)               ${NC}"
echo -e "${GREEN}  jl     → JupyterLab (port 8888)                       ${NC}"
echo -e "${GREEN}  ipy    → IPython REPL                                 ${NC}"
echo -e "${GREEN}  http   → HTTPie (friendly curl)                       ${NC}"
echo -e "${GREEN}════════════════════════════════════════════════════════${NC}"

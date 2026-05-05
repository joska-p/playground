# --- Powerlevel10k instant prompt (keep at top) ---
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

# --- Oh My Zsh ---
export ZSH="$HOME/.oh-my-zsh"
ZSH_THEME="powerlevel10k/powerlevel10k"
plugins=(
  git
  zsh-autosuggestions
  zsh-syntax-highlighting
  docker
  python
  node
)
source "$ZSH/oh-my-zsh.sh"

# --- p10k config ---
[[ -f "$HOME/.p10k.zsh" ]] && source "$HOME/.p10k.zsh"

# --- pyenv ---
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"

# --- nvm ---
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && source "$NVM_DIR/bash_completion"

# --- pnpm (via corepack) ---
export PNPM_HOME="$HOME/.local/share/pnpm"
export PATH="$PNPM_HOME:$PATH"

# --- uv ---
export PATH="$HOME/.local/bin:$PATH"

# --- General ---
export PATH="$HOME/.local/bin:$PATH"
export HISTSIZE=50000
export HISTFILESIZE=100000
export HISTCONTROL=ignoredups:erasedups

# --- Secrets ---
# Put your API keys here, one per line:
#   export GITLAB_TOKEN=glpat-xxxx
#   export VERCEL_TOKEN=xxxx
#   export ANTHROPIC_API_KEY=sk-ant-xxxx
[[ -f "$HOME/.env.local" ]] && source "$HOME/.env.local"

# --- Aliases ---
alias ll='ls -lah --color=auto'
alias gs='git status'
alias gp='git push'
alias gl='git pull'
alias py='python'
alias ipy='ipython'
alias jl='jupyter lab --no-browser --port=8888'
alias serve='npx serve'

. "$HOME/.local/bin/env"

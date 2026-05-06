#!/usr/bin/env bash

DOTFILES_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../dotfiles" && pwd)"

GREEN='\033[38;5;142m'   # gruvbox green
BLUE='\033[38;5;109m'    # gruvbox aqua
YELLOW='\033[38;5;214m'  # gruvbox yellow
RED='\033[38;5;167m'     # gruvbox red
FG='\033[38;5;223m'      # gruvbox fg1
MUTED='\033[38;5;245m'   # neutral gray
NC='\033[0m'

log()  { echo -e "${BLUE}▶${NC} $*"; }
ok()   { echo -e "${GREEN}✓${NC} $*"; }
warn() { echo -e "${YELLOW}⚠${NC} $*"; }

require_boffin_user() {
  if [ "$(whoami)" != "boffin" ]; then
    echo "This script must be run as boffin, not $(whoami)."
    exit 1
  fi
}

print_ready_banner() {
  local cols inner_width
  cols="$(tput cols 2>/dev/null || echo 80)"
  if ! [[ "$cols" =~ ^[0-9]+$ ]]; then
    cols=80
  fi
  if [ "$cols" -lt 60 ]; then
    cols=60
  fi
  if [ "$cols" -gt 120 ]; then
    cols=120
  fi

  inner_width=$((cols - 2))
  local border pad title=" boffin lab is ready "
  border="$(printf '%*s' "$inner_width" '' | tr ' ' '─')"
  pad="$(printf '%*s' "$((inner_width - ${#title}))" '')"

  echo ""
  echo -e "${MUTED}┌${border}┐${NC}"
  echo -e "${MUTED}│${NC}${GREEN}${title}${NC}${pad}${MUTED}│${NC}"
  echo -e "${MUTED}└${border}┘${NC}"
  echo ""
  echo -e "${YELLOW}SSH keys (choose one):${NC}"
  echo -e "${FG}  1) GitLab:${NC}     ${BLUE}GITLAB_USER=yourusername bash .devcontainer/scripts/setup.sh ssh${NC}"
  echo -e "${FG}  2) Key file:${NC}   ${BLUE}SSH_PUBLIC_KEY_FILE=~/.ssh/id_ed25519.pub bash .devcontainer/scripts/setup.sh ssh${NC}"
  echo -e "${FG}  3) Inline key:${NC} ${BLUE}SSH_PUBLIC_KEY=\"\$(cat ~/.ssh/id_ed25519.pub)\" bash .devcontainer/scripts/setup.sh ssh${NC}"
  echo ""
  echo -e "${YELLOW}Then run:${NC}"
  echo -e "${BLUE}  exec zsh${NC}"
  echo -e "${BLUE}  glab auth login${NC}"
  echo -e "${BLUE}  git config --global user.name 'Your Name'${NC}"
  echo -e "${BLUE}  git config --global user.email 'you@example.com'${NC}"
  echo -e "${BLUE}  nano ~/.env.local${NC}"
  echo ""
  echo -e "${YELLOW}Useful shortcuts:${NC} ${FG}serve${NC}, ${FG}jl${NC}, ${FG}ipy${NC}, ${FG}http${NC}, ${FG}bat${NC}"
  echo -e "${YELLOW}Run modules anytime:${NC} ${BLUE}bash .devcontainer/scripts/setup.sh ssh,node,quality${NC}"
  echo ""
  echo -e "${MUTED}Tip:${NC} ${RED}No keys are hardcoded in this repo.${NC}"
}

#!/usr/bin/env bash
# =============================================================================
# setup.sh — boffin lab environment bootstrap
# Run as: bash .devcontainer/scripts/setup.sh
# Safe to re-run — skips steps already completed.
#
# Optional:
#   bash .devcontainer/scripts/setup.sh all
#   bash .devcontainer/scripts/setup.sh ssh,zsh,node
# =============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# shellcheck source=.devcontainer/scripts/lib/common.sh
source "$SCRIPT_DIR/lib/common.sh"

# shellcheck source=.devcontainer/scripts/steps/01-ssh.sh
source "$SCRIPT_DIR/steps/01-ssh.sh"
# shellcheck source=.devcontainer/scripts/steps/02-zsh.sh
source "$SCRIPT_DIR/steps/02-zsh.sh"
# shellcheck source=.devcontainer/scripts/steps/03-python.sh
source "$SCRIPT_DIR/steps/03-python.sh"
# shellcheck source=.devcontainer/scripts/steps/04-node.sh
source "$SCRIPT_DIR/steps/04-node.sh"
# shellcheck source=.devcontainer/scripts/steps/05-git.sh
source "$SCRIPT_DIR/steps/05-git.sh"
# shellcheck source=.devcontainer/scripts/steps/06-quality.sh
source "$SCRIPT_DIR/steps/06-quality.sh"

require_boffin_user

REQUEST="${1:-all}"
REQUEST="${REQUEST// /}"

run_step() {
  local key="$1"
  local fn="$2"
  if [[ "$REQUEST" == "all" || ",$REQUEST," == *",$key,"* ]]; then
    "$fn"
  fi
}

run_step "ssh" step_ssh_setup
run_step "zsh" step_zsh_setup
run_step "python" step_python_setup
run_step "node" step_node_setup
run_step "git" step_git_setup
run_step "quality" step_quality_setup

print_ready_banner

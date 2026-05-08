#!/usr/bin/env bash

step_ssh_setup() {
  log "Setting up SSH authorized_keys..."
  mkdir -p "$HOME/.ssh"
  chmod 700 "$HOME/.ssh"
  touch "$HOME/.ssh/authorized_keys"
  chmod 600 "$HOME/.ssh/authorized_keys"

  add_missing_keys() {
    local source_name="$1"
    local keys_blob="$2"
    local added=0

    while IFS= read -r key; do
      [ -z "$key" ] && continue
      if ! grep -qF "$key" "$HOME/.ssh/authorized_keys"; then
        echo "$key" >> "$HOME/.ssh/authorized_keys"
        added=$((added + 1))
      fi
    done <<< "$keys_blob"

    ok "SSH keys synced from ${source_name} (${added} new key(s) added)."
  }

  if [ -n "${SSH_PUBLIC_KEY:-}" ]; then
    add_missing_keys "SSH_PUBLIC_KEY env var" "${SSH_PUBLIC_KEY}"
    return
  fi

  if [ -n "${SSH_PUBLIC_KEY_FILE:-}" ]; then
    if [ -f "${SSH_PUBLIC_KEY_FILE}" ]; then
      add_missing_keys "SSH_PUBLIC_KEY_FILE=${SSH_PUBLIC_KEY_FILE}" "$(cat "${SSH_PUBLIC_KEY_FILE}")"
    else
      warn "SSH_PUBLIC_KEY_FILE does not exist: ${SSH_PUBLIC_KEY_FILE}"
    fi
    return
  fi

  if [ -f "$HOME/.ssh/id_ed25519.pub" ]; then
    add_missing_keys "$HOME/.ssh/id_ed25519.pub" "$(cat "$HOME/.ssh/id_ed25519.pub")"
    return
  fi

  if [ -f "$HOME/.ssh/id_rsa.pub" ]; then
    add_missing_keys "$HOME/.ssh/id_rsa.pub" "$(cat "$HOME/.ssh/id_rsa.pub")"
    return
  fi

  GITLAB_USER="${GITLAB_USER:-}"
  if [ -n "$GITLAB_USER" ]; then
    KEYS_URL="https://gitlab.com/${GITLAB_USER}.keys"
    FETCHED_KEYS=$(curl -fsSL "$KEYS_URL") || { warn "Failed to fetch keys from $KEYS_URL"; FETCHED_KEYS=""; }
    if [ -n "$FETCHED_KEYS" ]; then
      add_missing_keys "gitlab.com/${GITLAB_USER}" "$FETCHED_KEYS"
    else
      warn "No keys found at $KEYS_URL — check your GitLab username and that you have keys registered."
    fi
    return
  fi

  warn "No SSH key source configured."
  warn "Use one of:"
  warn "  - SSH_PUBLIC_KEY='ssh-ed25519 ...' bash .devcontainer/scripts/setup.sh ssh"
  warn "  - SSH_PUBLIC_KEY_FILE=~/.ssh/id_ed25519.pub bash .devcontainer/scripts/setup.sh ssh"
  warn "  - GITLAB_USER=yourusername bash .devcontainer/scripts/setup.sh ssh"
}

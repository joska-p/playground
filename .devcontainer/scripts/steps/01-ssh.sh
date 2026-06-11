#!/usr/bin/env bash
# =============================================================================
# steps/01-ssh.sh — add SSH authorized_keys
#
# Key source priority:
#   1. SSH_PUBLIC_KEY env var (inline key string)
#   2. SSH_PUBLIC_KEY_FILE env var (path to a .pub file)
#   3. ~/.ssh/id_ed25519.pub  (already in the container home)
#   4. ~/.ssh/id_rsa.pub
#   5. GITLAB_USER env var    (fetches from gitlab.com/<user>.keys)
# =============================================================================

step_ssh_setup() {
  log "Setting up SSH authorized_keys..."
  mkdir -p "$HOME/.ssh"
  chmod 700 "$HOME/.ssh"
  touch "$HOME/.ssh/authorized_keys"
  chmod 600 "$HOME/.ssh/authorized_keys"

  _append_keys() {
    local source_name="$1" keys_blob="$2" added=0 key
    while IFS= read -r key; do
      [[ -z "$key" || "$key" == \#* ]] && continue
      if ! grep -qF "$key" "$HOME/.ssh/authorized_keys"; then
        echo "$key" >> "$HOME/.ssh/authorized_keys"
        added=$((added + 1))
      fi
    done <<< "$keys_blob"
    ok "SSH keys synced from ${source_name} (${added} new key(s) added)."
  }

  if [[ -n "${SSH_PUBLIC_KEY:-}" ]]; then
    _append_keys "SSH_PUBLIC_KEY env var" "$SSH_PUBLIC_KEY"
    return
  fi

  if [[ -n "${SSH_PUBLIC_KEY_FILE:-}" ]]; then
    if [[ -f "$SSH_PUBLIC_KEY_FILE" ]]; then
      _append_keys "SSH_PUBLIC_KEY_FILE=${SSH_PUBLIC_KEY_FILE}" "$(cat "$SSH_PUBLIC_KEY_FILE")"
    else
      warn "SSH_PUBLIC_KEY_FILE not found: ${SSH_PUBLIC_KEY_FILE}"
    fi
    return
  fi

  if [[ -f "$HOME/.ssh/id_ed25519.pub" ]]; then
    _append_keys "$HOME/.ssh/id_ed25519.pub" "$(cat "$HOME/.ssh/id_ed25519.pub")"
    return
  fi

  if [[ -f "$HOME/.ssh/id_rsa.pub" ]]; then
    _append_keys "$HOME/.ssh/id_rsa.pub" "$(cat "$HOME/.ssh/id_rsa.pub")"
    return
  fi

  if [[ -n "${GITLAB_USER:-}" ]]; then
    local keys_url="https://gitlab.com/${GITLAB_USER}.keys"
    local fetched_keys
    fetched_keys="$(curl -fsSL "$keys_url" 2>/dev/null)" || {
      warn "Failed to fetch keys from ${keys_url}"
      return
    }
    if [[ -n "$fetched_keys" ]]; then
      _append_keys "gitlab.com/${GITLAB_USER}" "$fetched_keys"
    else
      warn "No keys found at ${keys_url} — check your GitLab username."
    fi
    return
  fi

  warn "No SSH key source configured. Set one of:"
  warn "  SSH_PUBLIC_KEY, SSH_PUBLIC_KEY_FILE, GITLAB_USER"
  warn "  or place a key at ~/.ssh/id_ed25519.pub"
}

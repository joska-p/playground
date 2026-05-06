#!/usr/bin/env bash

step_zsh_setup() {
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
  cp "$DOTFILES_DIR/.zshrc" "$HOME/.zshrc"
  cp "$DOTFILES_DIR/.p10k.zsh" "$HOME/.p10k.zsh"
  ok "Dotfiles copied."
}

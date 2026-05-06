#!/usr/bin/env bash

step_quality_setup() {
  log "Writing base code quality configs..."
  if [ ! -f "$HOME/.prettierrc" ]; then
    cp "$DOTFILES_DIR/.prettierrc" "$HOME/.prettierrc"
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
}

#!/usr/bin/env bash
# =============================================================================
# steps/06-quality.sh — global code quality config files
# =============================================================================

step_quality_setup() {
  log "Writing base code quality configs..."

  if [[ ! -f "$HOME/.prettierrc" ]]; then
    cp "$DOTFILES_DIR/.prettierrc" "$HOME/.prettierrc"
    ok "~/.prettierrc written."
  else
    skip "~/.prettierrc already exists."
  fi

  if [[ ! -f "$HOME/.eslintrc.json" ]]; then
    cat > "$HOME/.eslintrc.json" << 'EOF'
{
  "env": { "browser": true, "es2022": true, "node": true },
  "extends": ["eslint:recommended"],
  "parserOptions": { "ecmaVersion": "latest", "sourceType": "module" },
  "rules": {
    "no-unused-vars": "warn",
    "no-console": "off"
  }
}
EOF
    ok "~/.eslintrc.json written."
  else
    skip "~/.eslintrc.json already exists."
  fi

  # Global biome.json — acts as a project-agnostic fallback
  if [[ ! -f "$HOME/biome.json" ]]; then
    cat > "$HOME/biome.json" << 'EOF'
{
  "$schema": "https://biomejs.dev/schemas/1.6.0/schema.json",
  "organizeImports": { "enabled": true },
  "linter": {
    "enabled": true,
    "rules": { "recommended": true }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  }
}
EOF
    ok "~/biome.json written."
  else
    skip "~/biome.json already exists."
  fi
}

#!/usr/bin/env bash
# kanban.sh — CLI pour le GitHub Project "Le Bazar Créatif".
# Capture d'idées rapide : les cartes arrivent déjà dans la bonne colonne.
#
# Usage:
#   ./scripts/kanban.sh add "TITLE" [-s STATUS] [-p PRIORITY] [-b BODY]
#   ./scripts/kanban.sh idea "TITLE"            # raccourci: Backlog / Low
#   ./scripts/kanban.sh wip "TITLE"             # raccourci: In Progress / High
#   ./scripts/kanban.sh list
#   ./scripts/kanban.sh status <ITEM_ID> <STATUS>
#   ./scripts/kanban.sh priority <ITEM_ID> <PRIORITY>
#   ./scripts/kanban.sh delete <ITEM_ID>
#   ./scripts/kanban.sh board                   # ouvre le board dans le navigateur
#
# STATUS:   Backlog | Todo | In Progress | Done
# PRIORITY: Low | Medium | High | Urgent

set -euo pipefail

OWNER="joska-p"
PROJECT_NUMBER=1
DEFAULT_STATUS="Backlog"
DEFAULT_PRIORITY="Medium"

VALID_STATUS="Backlog|Todo|In Progress|Done"
VALID_PRIORITY="Low|Medium|High|Urgent"

die() {
  echo "❌ $*" >&2
  exit 1
}

PROJECT_ID=""
FIELDS_JSON=""

# Résolution paresseuse + cache : un seul appel réseau par ressource par invocation.
project_id() {
  if [[ -z "$PROJECT_ID" ]]; then
    PROJECT_ID="$(gh project view "$PROJECT_NUMBER" --owner "$OWNER" --format json --jq .id)"
  fi
  printf '%s' "$PROJECT_ID"
}

fields_json() {
  if [[ -z "$FIELDS_JSON" ]]; then
    FIELDS_JSON="$(gh project field-list "$PROJECT_NUMBER" --owner "$OWNER" --format json)"
  fi
  printf '%s' "$FIELDS_JSON"
}

field_id() {
  fields_json | jq -r --arg n "$1" '.fields[] | select(.name==$n) | .id'
}

option_id() {
  fields_json | jq -r --arg f "$1" --arg o "$2" \
    '.fields[] | select(.name==$f) | .options[]? | select(.name==$o) | .id'
}

set_field() { # $1 item_id, $2 field name, $3 option name
  local item="$1" fname="$2" oname="$3" pid fid oid expected
  pid="$(project_id)"
  fid="$(field_id "$fname")"
  [[ -n "$fid" ]] || die "Champ '$fname' introuvable sur le projet."
  oid="$(option_id "$fname" "$oname")"
  if [[ -z "$oid" ]]; then
    if [[ "$fname" == "Status" ]]; then expected="$VALID_STATUS"; else expected="$VALID_PRIORITY"; fi
    die "Option '$oname' inconnue pour '$fname' (attendu: $expected)."
  fi
  gh project item-edit --id "$item" --project-id "$pid" \
    --field-id "$fid" --single-select-option-id "$oid" >/dev/null
}

create_item() { # $1 title, $2 body
  local title="$1" body="${2:-}"
  if [[ -n "$body" ]]; then
    gh project item-create "$PROJECT_NUMBER" --owner "$OWNER" \
      --title "$title" --body "$body" --format json --jq .id
  else
    gh project item-create "$PROJECT_NUMBER" --owner "$OWNER" \
      --title "$title" --format json --jq .id
  fi
}

cmd_add() {
  [[ $# -ge 1 ]] || die "Usage: kanban.sh add \"TITLE\" [-s STATUS] [-p PRIORITY] [-b BODY]"
  local title="$1"
  shift
  local status="$DEFAULT_STATUS" priority="$DEFAULT_PRIORITY" body=""
  while [[ $# -gt 0 ]]; do
    case "$1" in
      -s | --status) status="$2"; shift 2 ;;
      -p | --priority) priority="$2"; shift 2 ;;
      -b | --body) body="$2"; shift 2 ;;
      *) die "Option inconnue: $1" ;;
    esac
  done
  [[ "$status" =~ ^($VALID_STATUS)$ ]] || die "Statut invalide: '$status' (attendu: $VALID_STATUS)."
  [[ "$priority" =~ ^($VALID_PRIORITY)$ ]] || die "Priorité invalide: '$priority' (attendu: $VALID_PRIORITY)."

  local item
  item="$(create_item "$title" "$body")"
  set_field "$item" Status "$status"
  set_field "$item" Priority "$priority"
  echo "✅ Carte ajoutée: $title ($status / $priority)"
}

cmd_list() {
  gh project item-list "$PROJECT_NUMBER" --owner "$OWNER" --format json --jq '
    ["STATUS", "PRIORITY", "TITLE", "ID"],
    (.items[] | [(.status // "—"), (.priority // "—"), .title, .id])
  | @tsv'
}

cmd_set_status() {
  [[ $# -eq 2 ]] || die "Usage: kanban.sh status <ITEM_ID> <STATUS>"
  [[ "$2" =~ ^($VALID_STATUS)$ ]] || die "Statut invalide: '$2' (attendu: $VALID_STATUS)."
  set_field "$1" Status "$2"
  echo "✅ Statut mis à jour: $2"
}

cmd_set_priority() {
  [[ $# -eq 2 ]] || die "Usage: kanban.sh priority <ITEM_ID> <PRIORITY>"
  [[ "$2" =~ ^($VALID_PRIORITY)$ ]] || die "Priorité invalide: '$2' (attendu: $VALID_PRIORITY)."
  set_field "$1" Priority "$2"
  echo "✅ Priorité mise à jour: $2"
}

cmd_delete() {
  [[ $# -eq 1 ]] || die "Usage: kanban.sh delete <ITEM_ID>"
  gh project item-delete "$PROJECT_NUMBER" --owner "$OWNER" --id "$1"
  echo "🗑️  Carte supprimée."
}

cmd_board() {
  gh project view "$PROJECT_NUMBER" --owner "$OWNER" --web
}

case "${1:-}" in
  add) shift; cmd_add "$@" ;;
  idea) shift; cmd_add "$1" -s Backlog -p Low ;;
  wip) shift; cmd_add "$1" -s "In Progress" -p High ;;
  list) cmd_list ;;
  status) shift; cmd_set_status "$@" ;;
  priority) shift; cmd_set_priority "$@" ;;
  delete) shift; cmd_delete "$@" ;;
  board) cmd_board ;;
  *)
    cat <<EOF
Usage: ./scripts/kanban.sh <commande> [args]

  add "TITLE" [-s STATUS] [-p PRIORITY] [-b BODY]   Crée une carte (Backlog/Medium par défaut)
  idea "TITLE"                                      Raccourci: Backlog + Low
  wip "TITLE"                                       Raccourci: In Progress + High
  list                                              Liste les cartes
  status <ITEM_ID> <STATUS>                         Backlog | Todo | In Progress | Done
  priority <ITEM_ID> <PRIORITY>                     Low | Medium | High | Urgent
  delete <ITEM_ID>                                  Supprime une carte
  board                                             Ouvre le board dans le navigateur
EOF
    ;;
esac

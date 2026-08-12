#!/usr/bin/env bash

OWNER="joska-p"
PROJECT_NUMBER=1 # Remplace par ton numéro si besoin

COMMAND=$1
TITLE=$2

if [ "$COMMAND" == "add" ]; then
  if [ -z "$TITLE" ]; then
    echo "Erreur : Spécifie un titre pour la carte."
    exit 1
  fi
  
  # On crée l'item ET on s'assure qu'il est lié au projet de manière visible
  # Si tu as personnalisé tes colonnes, GitHub Projects utilise parfois un champ "Status"
  gh project item-create $PROJECT_NUMBER --owner "$OWNER" --title "$TITLE" --format JSON
  
  echo "✅ Carte ajoutée avec succès !"

elif [ "$COMMAND" == "list" ]; then
  gh project item-list $PROJECT_NUMBER --owner "$OWNER"
else
  echo "Usage: ./scripts/kanban.sh [add|list] \"Mon titre de carte\""
fi
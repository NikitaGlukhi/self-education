#!/bin/sh
branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
eval "$(grep ^GITHUB_ACCESS_TOKEN= .env)"
curl \
  -X POST \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Authorization: token $GITHUB_ACCESS_TOKEN" \
  https://api.github.com/repos/NikitaGlukhi/self-education/actions/workflows/manually-run-workflow.yml/dispatches \
  -d '{"ref": "'$branch'", "inputs": {"name":"Deploy to staging", "description": "Manual test"}}'

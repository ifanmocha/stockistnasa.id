#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
REMOTE="${DEPLOY_REMOTE:-hawkhost}"
REMOTE_PATH="${DEPLOY_PATH:-/home/stockis2/stockistnasa.id}"
LOCAL_PATH="$(cd "$(dirname "$0")/.." && pwd)"
HTACCESS_TEMPLATE="${ROOT}/templates/stockistnasa.id.apache-root.htaccess"

if [[ ! -f "${HTACCESS_TEMPLATE}" ]]; then
  echo "Error: template htaccess tidak ada: ${HTACCESS_TEMPLATE}"
  exit 1
fi

echo "Deploy stockistnasa.id: ${LOCAL_PATH} -> ${REMOTE}:${REMOTE_PATH}"

ssh "${REMOTE}" "mkdir -p ${REMOTE_PATH}/.well-known"

rsync -avz --delete \
  --exclude .git \
  --exclude .DS_Store \
  --exclude scripts \
  --exclude README.md \
  "${LOCAL_PATH}/" "${REMOTE}:${REMOTE_PATH}/"

scp -q "${HTACCESS_TEMPLATE}" "${REMOTE}:${REMOTE_PATH}/.htaccess"

echo "Deploy selesai: https://stockistnasa.id"

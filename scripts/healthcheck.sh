#!/usr/bin/env bash
# =============================================================================
# healthcheck.sh · Comprobación rápida del estado de un servidor Linux
# Proyecto académico NokiCloud (ficticio).
#
# Solo LEE información del sistema: no modifica nada.
#
# Uso:
#   bash scripts/healthcheck.sh                 # umbral de disco por defecto: 85 %
#   bash scripts/healthcheck.sh -u 90           # umbral de disco al 90 %
#   bash scripts/healthcheck.sh -s "ssh nginx"  # servicios a comprobar
#
# Código de salida: 0 si todo está bien, 1 si hay algún aviso.
# =============================================================================
set -euo pipefail

UMBRAL_DISCO=85
SERVICIOS="ssh cron"
AVISOS=0

while getopts ":u:s:h" opt; do
  case "$opt" in
    u) UMBRAL_DISCO="$OPTARG" ;;
    s) SERVICIOS="$OPTARG" ;;
    h) sed -n '2,15p' "$0"; exit 0 ;;
    *) echo "Opción no válida. Usa -h para ver la ayuda." >&2; exit 2 ;;
  esac
done

ok()    { printf '  [ OK ] %s\n' "$1"; }
aviso() { printf '  [WARN] %s\n' "$1"; AVISOS=$((AVISOS + 1)); }

echo "== NokiCloud · healthcheck de $(hostname) · $(date '+%Y-%m-%d %H:%M') =="

echo
echo "Sistema"
ok "Encendido desde: $(uptime -p 2>/dev/null || uptime)"
CARGA=$(cut -d ' ' -f1 /proc/loadavg 2>/dev/null || echo "?")
NUCLEOS=$(nproc 2>/dev/null || echo 1)
ok "Carga (1 min): ${CARGA} con ${NUCLEOS} núcleo(s)"

echo
echo "Memoria"
if command -v free >/dev/null 2>&1; then
  USO_MEM=$(free | awk '/^Mem:/ {printf "%d", ($3/$2)*100}')
  if [ "$USO_MEM" -ge 90 ]; then aviso "Memoria al ${USO_MEM} %"; else ok "Memoria al ${USO_MEM} %"; fi
else
  aviso "No se encuentra el comando 'free'"
fi

echo
echo "Discos (umbral ${UMBRAL_DISCO} %)"
while read -r uso punto; do
  PORC=${uso%\%}
  if [ "$PORC" -ge "$UMBRAL_DISCO" ]; then aviso "${punto} al ${uso}"; else ok "${punto} al ${uso}"; fi
done < <(df -P -x tmpfs -x devtmpfs -x overlay -x squashfs 2>/dev/null | awk 'NR>1 {print $5, $6}')

echo
echo "Servicios"
if command -v systemctl >/dev/null 2>&1 && [ -d /run/systemd/system ]; then
  for s in $SERVICIOS; do
    if systemctl is-active --quiet "$s" 2>/dev/null; then ok "$s activo"; else aviso "$s no está activo"; fi
  done
else
  aviso "systemctl no disponible: se omite la comprobación de servicios"
fi

echo
if [ "$AVISOS" -eq 0 ]; then
  echo "Resultado: todo correcto."
  exit 0
else
  echo "Resultado: ${AVISOS} aviso(s). Revisa las líneas marcadas con [WARN]."
  exit 1
fi

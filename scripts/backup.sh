#!/usr/bin/env bash
# =============================================================================
# backup.sh · Copia de seguridad comprimida de una carpeta, con rotación
# Proyecto académico NokiCloud (ficticio).
#
# Crea un archivo .tar.gz con fecha y borra las copias más antiguas que
# superen el número de días indicado. Con -n solo muestra lo que haría.
#
# Uso:
#   bash scripts/backup.sh -o ORIGEN -d DESTINO [-r DIAS] [-n]
#
# Ejemplo:
#   bash scripts/backup.sh -o ~/proyectos -d ~/copias -r 7
#   bash scripts/backup.sh -o ~/proyectos -d ~/copias -n   # simulación
# =============================================================================
set -euo pipefail

ORIGEN=""
DESTINO=""
RETENCION=7
SIMULAR=0

uso() { sed -n '2,15p' "$0"; }

while getopts ":o:d:r:nh" opt; do
  case "$opt" in
    o) ORIGEN="$OPTARG" ;;
    d) DESTINO="$OPTARG" ;;
    r) RETENCION="$OPTARG" ;;
    n) SIMULAR=1 ;;
    h) uso; exit 0 ;;
    *) echo "Opción no válida." >&2; uso; exit 2 ;;
  esac
done

if [ -z "$ORIGEN" ] || [ -z "$DESTINO" ]; then
  echo "Faltan parámetros: -o ORIGEN y -d DESTINO son obligatorios." >&2
  uso
  exit 2
fi

if [ ! -d "$ORIGEN" ]; then
  echo "La carpeta de origen no existe: $ORIGEN" >&2
  exit 1
fi

if ! [[ "$RETENCION" =~ ^[0-9]+$ ]]; then
  echo "La retención (-r) debe ser un número de días." >&2
  exit 2
fi

NOMBRE="$(basename "$ORIGEN")"
FECHA="$(date '+%Y%m%d-%H%M%S')"
ARCHIVO="${DESTINO%/}/${NOMBRE}-${FECHA}.tar.gz"

echo "== NokiCloud · backup =="
echo "Origen:     $ORIGEN"
echo "Destino:    $ARCHIVO"
echo "Retención:  $RETENCION días"

if [ "$SIMULAR" -eq 1 ]; then
  echo
  echo "[simulación] Se crearía: $ARCHIVO"
  echo "[simulación] Se borrarían estas copias antiguas:"
  find "$DESTINO" -maxdepth 1 -name "${NOMBRE}-*.tar.gz" -mtime +"$RETENCION" -print 2>/dev/null || true
  exit 0
fi

mkdir -p "$DESTINO"
tar -czf "$ARCHIVO" -C "$(dirname "$ORIGEN")" "$NOMBRE"
echo "Copia creada ($(du -h "$ARCHIVO" | cut -f1))."

BORRADAS=$(find "$DESTINO" -maxdepth 1 -name "${NOMBRE}-*.tar.gz" -mtime +"$RETENCION" -print -delete | wc -l)
echo "Copias antiguas eliminadas: $BORRADAS"

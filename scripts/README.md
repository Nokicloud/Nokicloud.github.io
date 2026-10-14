# Scripts de administración de servidores

Scripts de ejemplo que ilustran el servicio de administración de servidores de NokiCloud (empresa ficticia). Son sencillos, están comentados y pensados para leerlos y probarlos en una máquina Linux de prácticas.

| Script | Qué hace | ¿Modifica el sistema? |
| --- | --- | --- |
| `healthcheck.sh` | Revisa tiempo encendido, carga, memoria, ocupación de discos y servicios. | No, solo lee. |
| `backup.sh` | Crea una copia `.tar.gz` de una carpeta con fecha y borra las copias más antiguas que los días indicados. | Sí, escribe en la carpeta de destino. Usa `-n` para simular. |

## Uso

```bash
# Comprobación del servidor (umbral de disco al 90 % y servicios ssh y nginx)
bash scripts/healthcheck.sh -u 90 -s "ssh nginx"

# Simular una copia de seguridad
bash scripts/backup.sh -o ~/proyectos -d ~/copias -r 7 -n

# Hacer la copia de verdad
bash scripts/backup.sh -o ~/proyectos -d ~/copias -r 7
```

Cada script muestra su ayuda con `-h`.

## Programarlos con cron

Para lanzar la copia todas las noches a las 3:00, añade esta línea con `crontab -e`:

```cron
0 3 * * * /bin/bash /ruta/al/repo/scripts/backup.sh -o /srv/datos -d /backups -r 14 >> /var/log/nokicloud-backup.log 2>&1
```

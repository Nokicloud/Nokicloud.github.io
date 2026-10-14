/*
 * Datos FICTICIOS de reparaciones para la demo de seguimiento.
 * Están en un archivo .js (y no .json) para que la página funcione también
 * abriendo el HTML directamente desde el disco, sin servidor.
 *
 * "estado" es el índice del paso actual dentro de PASOS_REPARACION.
 */
window.PASOS_REPARACION = [
  'Recibido en tienda',
  'Diagnóstico',
  'Presupuesto enviado',
  'En reparación',
  'Listo para recoger',
  'Entregado'
];

window.REPARACIONES = [
  {
    codigo: 'NK-2026-0398',
    equipo: 'Portátil HP Pavilion 15',
    servicio: 'Limpieza interna y cambio de pasta térmica',
    entrada: '2026-09-28',
    estado: 5,
    nota: 'Temperaturas en carga reducidas de 94 °C a 71 °C. Equipo entregado.'
  },
  {
    codigo: 'NK-2026-0412',
    equipo: 'Portátil Lenovo ThinkPad T14',
    servicio: 'Sustitución de SSD y clonado del sistema',
    entrada: '2026-10-06',
    estado: 3,
    nota: 'Clonado en curso al nuevo SSD NVMe de 1 TB.'
  },
  {
    codigo: 'NK-2026-0415',
    equipo: 'Sobremesa a medida',
    servicio: 'No arranca: sustitución de fuente de alimentación',
    entrada: '2026-10-07',
    estado: 4,
    nota: 'Fuente nueva instalada y prueba de estrés de 2 horas superada.'
  },
  {
    codigo: 'NK-2026-0419',
    equipo: 'MacBook Air (M1, 2020)',
    servicio: 'Pantalla con líneas verticales',
    entrada: '2026-10-09',
    estado: 2,
    nota: 'Presupuesto enviado por correo. Pendiente de aprobación.'
  },
  {
    codigo: 'NK-2026-0421',
    equipo: 'Servidor Dell PowerEdge T140',
    servicio: 'RAID 1 degradado: revisión y sustitución de disco',
    entrada: '2026-10-13',
    estado: 1,
    nota: 'Comprobando el estado SMART de ambos discos.'
  }
];

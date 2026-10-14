/*
 * Catálogo de productos de NokiCloud (datos FICTICIOS para la demo).
 * Están en un archivo .js (y no .json) para que la web funcione también
 * abriendo el HTML directamente desde el disco, sin servidor.
 *
 * Cómo añadir un producto: copia un bloque { ... } y cambia sus datos.
 *  - id:             identificador único, sin espacios ni tildes.
 *  - categoria:      una de las claves de CATEGORIAS.
 *  - estado:         'Nuevo' o 'Reacondicionado'.
 *  - precio:         número en euros, IVA incluido.
 *  - disponibilidad: 'tienda' (disponible), 'pocas' (últimas unidades) o 'pedido' (bajo pedido).
 *  - icono:          dibujo que se muestra: portatil, telefono, ssd, ram, raton, cargador o disco.
 *  - destacado:      true para que aparezca en la página de inicio (se muestran 4).
 *  - resumen:        3 características cortas para la tarjeta.
 *  - ficha:          lista de pares [nombre, valor] para la ficha completa.
 */
window.CATEGORIAS = {
  portatiles: 'Portátiles',
  telefonos: 'Teléfonos',
  componentes: 'Componentes',
  accesorios: 'Accesorios'
};

window.PRODUCTOS = [
  {
    id: 'thinkpad-t14-g2',
    nombre: 'Lenovo ThinkPad T14 Gen 2',
    categoria: 'portatiles',
    estado: 'Reacondicionado',
    precio: 449,
    disponibilidad: 'tienda',
    icono: 'portatil',
    destacado: true,
    descripcion: 'Portátil profesional de 14 pulgadas, resistente y con un teclado excelente. Ideal para trabajar o estudiar.',
    resumen: ['14" Full HD', 'Intel Core i5 · 16 GB RAM', 'SSD de 512 GB'],
    ficha: [
      ['Pantalla', '14" Full HD (1920 × 1080) IPS'],
      ['Procesador', 'Intel Core i5-1135G7'],
      ['Memoria', '16 GB DDR4'],
      ['Almacenamiento', 'SSD NVMe de 512 GB'],
      ['Sistema', 'Windows 11 Pro'],
      ['Estado', 'Grado A: sin marcas visibles, batería por encima del 85 %'],
      ['Garantía', '12 meses en NokiCloud']
    ]
  },
  {
    id: 'macbook-air-m1',
    nombre: 'Apple MacBook Air 13" (M1, 2020)',
    categoria: 'portatiles',
    estado: 'Reacondicionado',
    precio: 599,
    disponibilidad: 'pocas',
    icono: 'portatil',
    destacado: true,
    descripcion: 'Ligero, silencioso (no tiene ventilador) y con muchas horas de batería.',
    resumen: ['13,3" Retina', 'Chip Apple M1 · 8 GB', 'SSD de 256 GB'],
    ficha: [
      ['Pantalla', '13,3" Retina (2560 × 1600)'],
      ['Procesador', 'Apple M1 (8 núcleos)'],
      ['Memoria', '8 GB'],
      ['Almacenamiento', 'SSD de 256 GB'],
      ['Sistema', 'macOS'],
      ['Estado', 'Grado A: sin marcas visibles, batería por encima del 85 %'],
      ['Garantía', '12 meses en NokiCloud']
    ]
  },
  {
    id: 'latitude-5420',
    nombre: 'Dell Latitude 5420',
    categoria: 'portatiles',
    estado: 'Reacondicionado',
    precio: 399,
    disponibilidad: 'tienda',
    icono: 'portatil',
    destacado: false,
    descripcion: 'Portátil de empresa fiable, con buena conectividad y fácil de reparar.',
    resumen: ['14" Full HD', 'Intel Core i5 · 16 GB RAM', 'SSD de 256 GB'],
    ficha: [
      ['Pantalla', '14" Full HD (1920 × 1080)'],
      ['Procesador', 'Intel Core i5-1145G7'],
      ['Memoria', '16 GB DDR4'],
      ['Almacenamiento', 'SSD NVMe de 256 GB'],
      ['Sistema', 'Windows 11 Pro'],
      ['Estado', 'Grado B: pequeñas marcas de uso en la tapa'],
      ['Garantía', '12 meses en NokiCloud']
    ]
  },
  {
    id: 'probook-450-g8',
    nombre: 'HP ProBook 450 G8',
    categoria: 'portatiles',
    estado: 'Reacondicionado',
    precio: 369,
    disponibilidad: 'tienda',
    icono: 'portatil',
    destacado: false,
    descripcion: 'Pantalla grande y teclado numérico. Una buena opción para la oficina o para estudiar.',
    resumen: ['15,6" Full HD', 'Intel Core i5 · 8 GB RAM', 'SSD de 256 GB'],
    ficha: [
      ['Pantalla', '15,6" Full HD (1920 × 1080)'],
      ['Procesador', 'Intel Core i5-1135G7'],
      ['Memoria', '8 GB DDR4 (ampliable)'],
      ['Almacenamiento', 'SSD NVMe de 256 GB'],
      ['Sistema', 'Windows 11 Pro'],
      ['Estado', 'Grado A: sin marcas visibles'],
      ['Garantía', '12 meses en NokiCloud']
    ]
  },
  {
    id: 'iphone-13',
    nombre: 'Apple iPhone 13 · 128 GB',
    categoria: 'telefonos',
    estado: 'Reacondicionado',
    precio: 429,
    disponibilidad: 'tienda',
    icono: 'telefono',
    destacado: true,
    descripcion: 'Revisado en nuestro taller: batería, cámaras, altavoces y pantalla comprobados uno a uno.',
    resumen: ['Pantalla OLED de 6,1"', 'Chip A15 Bionic', '128 GB'],
    ficha: [
      ['Pantalla', '6,1" Super Retina XDR (OLED)'],
      ['Procesador', 'A15 Bionic'],
      ['Almacenamiento', '128 GB'],
      ['Cámaras', 'Doble cámara trasera de 12 MP'],
      ['Estado', 'Grado A: batería por encima del 85 %'],
      ['Incluye', 'Cable USB-C a Lightning'],
      ['Garantía', '12 meses en NokiCloud']
    ]
  },
  {
    id: 'galaxy-a55',
    nombre: 'Samsung Galaxy A55 5G · 128 GB',
    categoria: 'telefonos',
    estado: 'Nuevo',
    precio: 349,
    disponibilidad: 'tienda',
    icono: 'telefono',
    destacado: false,
    descripcion: 'Gama media con una pantalla muy fluida y batería para todo el día.',
    resumen: ['6,6" AMOLED a 120 Hz', '8 GB RAM · 128 GB', 'Batería de 5.000 mAh'],
    ficha: [
      ['Pantalla', '6,6" Super AMOLED a 120 Hz'],
      ['Memoria', '8 GB'],
      ['Almacenamiento', '128 GB (ampliable con microSD)'],
      ['Batería', '5.000 mAh'],
      ['Conectividad', '5G, wifi 6, NFC'],
      ['Garantía', 'Del fabricante']
    ]
  },
  {
    id: 'pixel-8a',
    nombre: 'Google Pixel 8a · 128 GB',
    categoria: 'telefonos',
    estado: 'Nuevo',
    precio: 399,
    disponibilidad: 'pedido',
    icono: 'telefono',
    destacado: false,
    descripcion: 'Android limpio, muy buena cámara y actualizaciones durante muchos años.',
    resumen: ['6,1" OLED a 120 Hz', 'Google Tensor G3', '128 GB'],
    ficha: [
      ['Pantalla', '6,1" OLED a 120 Hz'],
      ['Procesador', 'Google Tensor G3'],
      ['Memoria', '8 GB'],
      ['Almacenamiento', '128 GB'],
      ['Disponibilidad', 'Bajo pedido, en 3–5 días laborables'],
      ['Garantía', 'Del fabricante']
    ]
  },
  {
    id: 'ssd-990-pro-1tb',
    nombre: 'SSD Samsung 990 PRO · 1 TB',
    categoria: 'componentes',
    estado: 'Nuevo',
    precio: 99,
    disponibilidad: 'tienda',
    icono: 'ssd',
    destacado: true,
    descripcion: 'La mejora que más se nota en un equipo con unos años. Te lo instalamos y clonamos tu sistema.',
    resumen: ['M.2 NVMe PCIe 4.0', 'Hasta 7.450 MB/s de lectura', 'Instalación opcional: 25 €'],
    ficha: [
      ['Formato', 'M.2 2280'],
      ['Interfaz', 'NVMe PCIe 4.0'],
      ['Capacidad', '1 TB'],
      ['Lectura secuencial', 'Hasta 7.450 MB/s'],
      ['Instalación', 'Montaje y clonado del sistema por 25 €'],
      ['Garantía', '5 años del fabricante']
    ]
  },
  {
    id: 'ram-16gb-sodimm',
    nombre: 'Memoria RAM 16 GB DDR4 SO-DIMM',
    categoria: 'componentes',
    estado: 'Nuevo',
    precio: 45,
    disponibilidad: 'tienda',
    icono: 'ram',
    destacado: false,
    descripcion: 'Módulo para portátil. Comprobamos gratis si es compatible con tu equipo.',
    resumen: ['16 GB DDR4 a 3.200 MHz', 'Formato SO-DIMM (portátil)', 'Instalación opcional: 15 €'],
    ficha: [
      ['Capacidad', '16 GB (1 módulo)'],
      ['Tipo', 'DDR4 a 3.200 MHz'],
      ['Formato', 'SO-DIMM, para portátiles'],
      ['Instalación', '15 €, con prueba de memoria incluida'],
      ['Garantía', 'Del fabricante']
    ]
  },
  {
    id: 'raton-mx-master-3s',
    nombre: 'Ratón Logitech MX Master 3S',
    categoria: 'accesorios',
    estado: 'Nuevo',
    precio: 99,
    disponibilidad: 'pocas',
    icono: 'raton',
    destacado: false,
    descripcion: 'Ratón ergonómico inalámbrico con clics silenciosos y rueda de desplazamiento rápido.',
    resumen: ['Inalámbrico: Bluetooth y receptor USB', 'Sensor de 8.000 DPI', 'Carga por USB-C'],
    ficha: [
      ['Conexión', 'Bluetooth y receptor USB Logi Bolt'],
      ['Sensor', '8.000 DPI'],
      ['Batería', 'Recargable por USB-C'],
      ['Compatible con', 'Windows, macOS, Linux, iPadOS'],
      ['Garantía', 'Del fabricante']
    ]
  },
  {
    id: 'cargador-gan-65w',
    nombre: 'Cargador USB-C GaN de 65 W',
    categoria: 'accesorios',
    estado: 'Nuevo',
    precio: 35,
    disponibilidad: 'tienda',
    icono: 'cargador',
    destacado: false,
    descripcion: 'Pequeño y potente: carga el portátil y el móvil a la vez. Te decimos si sirve para tu equipo.',
    resumen: ['65 W con USB Power Delivery', '2 puertos: USB-C y USB-A', 'Tamaño compacto'],
    ficha: [
      ['Potencia', '65 W en total'],
      ['Puertos', '1 × USB-C (PD), 1 × USB-A'],
      ['Compatible con', 'Portátiles, tabletas y móviles con carga USB-C'],
      ['Garantía', '2 años']
    ]
  },
  {
    id: 'disco-externo-2tb',
    nombre: 'Disco duro externo 2 TB',
    categoria: 'accesorios',
    estado: 'Nuevo',
    precio: 79,
    disponibilidad: 'tienda',
    icono: 'disco',
    destacado: false,
    descripcion: 'Para tus copias de seguridad. Si quieres, te dejamos configurada la copia automática.',
    resumen: ['2 TB, formato de 2,5"', 'USB 3.2', 'Funciona en Windows y macOS'],
    ficha: [
      ['Capacidad', '2 TB'],
      ['Formato', '2,5", sin alimentación externa'],
      ['Conexión', 'USB 3.2 Gen 1 (cable incluido)'],
      ['Compatible con', 'Windows y macOS'],
      ['Servicio extra', 'Configuración de copia automática: 15 €'],
      ['Garantía', '2 años']
    ]
  }
];

/*
 * NokiCloud · Catálogo de productos (demo)
 * - En catalogo.html: pinta los productos, los filtra por categoría y abre la ficha.
 * - En index.html: pinta los productos marcados como destacados.
 * Los datos están en datos-catalogo.js.
 * Enlaces directos: catalogo.html?categoria=telefonos  ·  catalogo.html?producto=iphone-13
 */
(function () {
  'use strict';

  var productos = window.PRODUCTOS || [];
  var categorias = window.CATEGORIAS || {};

  // Dibujos de cada tipo de producto (SVG en línea, sin marcas comerciales)
  var A = '#5FB3B0';
  function dibujo(viewBox, contenido) {
    return '<svg viewBox="' + viewBox + '" fill="none" stroke="currentColor" stroke-width="3" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + contenido + '</svg>';
  }
  var ICONOS = {
    portatil: dibujo('0 0 120 90', '<rect x="24" y="14" width="72" height="50" rx="4"/><path d="M12 74h96l-7-10H19z"/><path d="M53 69h14"/>'),
    telefono: dibujo('0 0 120 120', '<rect x="38" y="10" width="44" height="100" rx="9"/><path d="M54 19h12"/><circle cx="60" cy="100" r="3"/>'),
    ssd: dibujo('0 0 120 90', '<rect x="10" y="28" width="100" height="34" rx="3"/><path d="M17 34v22M22 34v22"/><rect x="32" y="36" width="22" height="18" rx="2" fill="' + A + '" stroke="none"/><rect x="60" y="36" width="22" height="18" rx="2"/><circle cx="101" cy="45" r="3"/>'),
    ram: dibujo('0 0 120 90', '<path d="M8 28h104v30H64v-5h-8v5H8z"/><rect x="16" y="35" width="16" height="12" rx="1.5" fill="' + A + '" stroke="none"/><rect x="38" y="35" width="16" height="12" rx="1.5" fill="' + A + '" stroke="none"/><rect x="66" y="35" width="16" height="12" rx="1.5" fill="' + A + '" stroke="none"/><rect x="88" y="35" width="16" height="12" rx="1.5" fill="' + A + '" stroke="none"/><path d="M12 66h96" stroke-dasharray="2 5"/>'),
    raton: dibujo('0 0 120 120', '<rect x="36" y="14" width="48" height="88" rx="24"/><path d="M60 14v30M36 44h48"/><rect x="56.5" y="24" width="7" height="12" rx="3.5" fill="' + A + '" stroke="none"/>'),
    cargador: dibujo('0 0 120 120', '<path d="M48 30V12M72 30V12"/><rect x="28" y="30" width="64" height="70" rx="12"/><path d="m64 44-10 14h12l-10 14" stroke="' + A + '"/><rect x="50" y="84" width="20" height="6" rx="2"/>'),
    disco: dibujo('0 0 120 120', '<rect x="30" y="12" width="60" height="84" rx="9"/><circle cx="60" cy="48" r="18"/><circle cx="60" cy="48" r="4"/><circle cx="60" cy="82" r="3" fill="' + A + '" stroke="none"/><path d="M60 96v6c0 5 3 8 8 8h22"/>')
  };

  var FONDOS = {
    portatiles: 'cover-teal',
    telefonos: 'cover-dark',
    componentes: 'cover-paper',
    accesorios: 'cover-steel'
  };

  var DISPONIBILIDAD = {
    tienda: 'Disponible en tienda',
    pocas: 'Últimas unidades',
    pedido: 'Bajo pedido (3–5 días)'
  };

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function euros(n) {
    return n.toLocaleString('es-ES') + ' €';
  }

  function media(p) {
    var box = el('div', 'product-media ' + (FONDOS[p.categoria] || 'cover-dark'));
    box.innerHTML = ICONOS[p.icono] || ICONOS.portatil; // contenido fijo de este archivo
    box.appendChild(el('span', 'estado', p.estado));
    return box;
  }

  function stock(p) {
    return el('span', 'stock ' + p.disponibilidad, DISPONIBILIDAD[p.disponibilidad] || '');
  }

  function precio(p) {
    var node = el('p', 'product-price', euros(p.precio));
    node.appendChild(el('small', '', 'IVA incluido'));
    return node;
  }

  // Tarjeta de producto. onOpen: función que abre la ficha; si no hay, enlaza al catálogo.
  function tarjeta(p, onOpen) {
    var card = el('article', 'product-card');
    card.appendChild(media(p));

    var body = el('div', 'product-body');
    body.appendChild(el('span', 'product-cat', categorias[p.categoria] || ''));
    body.appendChild(el('h3', '', p.nombre));

    var specs = el('ul', 'product-specs');
    p.resumen.forEach(function (s) { specs.appendChild(el('li', '', s)); });
    body.appendChild(specs);
    body.appendChild(stock(p));

    var foot = el('div', 'product-foot');
    foot.appendChild(precio(p));
    var boton;
    if (onOpen) {
      boton = el('button', 'btn btn-ghost btn-sm', 'Ver ficha');
      boton.type = 'button';
      boton.addEventListener('click', function () { onOpen(p, boton); });
    } else {
      boton = el('a', 'btn btn-ghost btn-sm', 'Ver ficha');
      boton.href = 'catalogo.html?producto=' + encodeURIComponent(p.id);
    }
    boton.setAttribute('aria-label', 'Ver ficha de ' + p.nombre);
    foot.appendChild(boton);
    body.appendChild(foot);

    card.appendChild(body);
    return card;
  }

  // --- Inicio: productos destacados ---------------------------------------
  var destacados = document.querySelector('[data-destacados]');
  if (destacados) {
    productos.filter(function (p) { return p.destacado; }).slice(0, 4).forEach(function (p, i) {
      var card = tarjeta(p, null);
      card.style.animationDelay = (i * 80) + 'ms';
      destacados.appendChild(card);
    });
  }

  // --- Página del catálogo -------------------------------------------------
  var grid = document.getElementById('catalogo-grid');
  if (!grid) return;

  var filtros = document.getElementById('catalogo-filtros');
  var total = document.getElementById('catalogo-total');
  var ficha = document.getElementById('ficha');
  var ultimoBoton = null;

  function contar(n) {
    total.textContent = n === 1 ? '1 producto' : n + ' productos';
  }

  function pintar(cat) {
    grid.textContent = '';
    var lista = productos.filter(function (p) { return cat === 'todos' || p.categoria === cat; });
    lista.forEach(function (p, i) {
      var card = tarjeta(p, abrirFicha);
      card.style.animationDelay = (i * 50) + 'ms';
      grid.appendChild(card);
    });
    contar(lista.length);
    filtros.querySelectorAll('button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-cat') === cat));
    });
  }

  // Botones de filtro
  var opciones = [['todos', 'Todos']].concat(Object.keys(categorias).map(function (k) { return [k, categorias[k]]; }));
  opciones.forEach(function (op) {
    var b = el('button', '', op[1]);
    b.type = 'button';
    b.setAttribute('data-cat', op[0]);
    b.addEventListener('click', function () {
      pintar(op[0]);
      var url = new URL(window.location.href);
      if (op[0] === 'todos') url.searchParams.delete('categoria');
      else url.searchParams.set('categoria', op[0]);
      url.searchParams.delete('producto');
      try { window.history.replaceState(null, '', url); } catch (e) { /* file:// */ }
    });
    filtros.appendChild(b);
  });

  // Ficha del producto
  function abrirFicha(p, boton) {
    ultimoBoton = boton || null;
    var caja = document.getElementById('ficha-media');
    caja.className = 'product-media ' + (FONDOS[p.categoria] || 'cover-dark');
    caja.innerHTML = ICONOS[p.icono] || ICONOS.portatil; // contenido fijo de este archivo
    caja.appendChild(el('span', 'estado', p.estado));

    document.getElementById('ficha-cat').textContent = categorias[p.categoria] || '';
    document.getElementById('ficha-titulo').textContent = p.nombre;
    document.getElementById('ficha-desc').textContent = p.descripcion || '';

    var precioNodo = document.getElementById('ficha-precio');
    precioNodo.textContent = euros(p.precio);
    precioNodo.appendChild(el('small', '', 'IVA incluido · Venta en tienda'));

    var st = document.getElementById('ficha-stock');
    st.className = 'stock ' + p.disponibilidad;
    st.textContent = DISPONIBILIDAD[p.disponibilidad] || '';

    var specs = document.getElementById('ficha-specs');
    specs.textContent = '';
    p.ficha.forEach(function (par) {
      var fila = el('div');
      fila.appendChild(el('dt', '', par[0]));
      fila.appendChild(el('dd', '', par[1]));
      specs.appendChild(fila);
    });

    document.getElementById('ficha-preguntar').href =
      'nosotros.html?producto=' + encodeURIComponent(p.nombre) + '#contacto';

    if (typeof ficha.showModal === 'function') {
      if (!ficha.open) ficha.showModal();
    } else {
      ficha.setAttribute('open', '');
    }
  }

  function cerrarFicha() {
    if (typeof ficha.close === 'function') ficha.close();
    else ficha.removeAttribute('open');
  }

  ficha.querySelector('[data-cerrar]').addEventListener('click', cerrarFicha);
  // Cerrar al pulsar fuera de la ficha (en el fondo oscuro)
  ficha.addEventListener('click', function (e) {
    if (e.target === ficha) cerrarFicha();
  });
  ficha.addEventListener('close', function () {
    if (ultimoBoton) ultimoBoton.focus();
  });

  // Estado inicial desde la dirección (?categoria=... o ?producto=...)
  var params = new URLSearchParams(window.location.search);
  var catInicial = params.get('categoria');
  pintar(categorias[catInicial] ? catInicial : 'todos');

  var idInicial = params.get('producto');
  if (idInicial) {
    var prod = productos.find(function (p) { return p.id === idInicial; });
    if (prod) abrirFicha(prod, null);
  }
})();

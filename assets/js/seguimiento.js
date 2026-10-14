/*
 * NokiCloud · Consulta del estado de una reparación (demo)
 * Lee los datos ficticios de datos-reparaciones.js y pinta una línea de tiempo.
 * Admite enlaces directos: seguimiento.html?codigo=NK-2026-0412
 */
(function () {
  'use strict';

  var pasos = window.PASOS_REPARACION || [];
  var reparaciones = window.REPARACIONES || [];

  var form = document.getElementById('tracker-form');
  var input = document.getElementById('codigo');
  var result = document.getElementById('result');
  var examples = document.getElementById('example-codes');

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function formatDate(iso) {
    var d = new Date(iso + 'T12:00:00');
    return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function normalize(code) {
    return code.trim().toUpperCase().replace(/\s+/g, '');
  }

  function markExample(code) {
    examples.querySelectorAll('button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.textContent === code));
    });
  }

  function render(code) {
    result.textContent = '';
    markExample(code);
    var item = reparaciones.find(function (r) { return r.codigo === code; });

    if (!item) {
      result.appendChild(el('p', 'empty', 'No encontramos ninguna reparación con el código ' + code + '. Revisa que esté bien escrito.'));
      return;
    }

    var card = el('article', 'result-card');
    card.appendChild(el('h2', '', item.codigo));

    var meta = el('dl', 'result-meta');
    [['Equipo', item.equipo], ['Servicio', item.servicio], ['Entrada', formatDate(item.entrada)], ['Estado actual', pasos[item.estado]]]
      .forEach(function (pair) {
        var wrap = el('div');
        wrap.appendChild(el('dt', '', pair[0]));
        wrap.appendChild(el('dd', '', pair[1]));
        meta.appendChild(wrap);
      });
    card.appendChild(meta);

    var list = el('ol', 'timeline');
    pasos.forEach(function (paso, i) {
      var cls = i < item.estado ? 'done' : (i === item.estado ? 'current' : '');
      var li = el('li', cls, paso);
      if (i === item.estado && item.nota) li.appendChild(el('small', '', item.nota));
      list.appendChild(li);
    });
    card.appendChild(list);

    result.appendChild(card);
  }

  // Botones con los códigos de ejemplo
  reparaciones.forEach(function (r) {
    var b = el('button', '', r.codigo);
    b.type = 'button';
    b.setAttribute('aria-pressed', 'false');
    b.addEventListener('click', function () {
      input.value = r.codigo;
      render(r.codigo);
    });
    examples.appendChild(b);
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var code = normalize(input.value);
    if (!code) { input.focus(); return; }
    input.value = code;
    render(code);
  });

  var fromUrl = new URLSearchParams(window.location.search).get('codigo');
  if (fromUrl) {
    input.value = normalize(fromUrl);
    render(input.value);
  }
})();

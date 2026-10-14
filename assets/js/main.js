/*
 * NokiCloud · Comportamiento común de la web
 * - Menú a pantalla completa en móvil
 * - Cabecera con borde al hacer scroll
 * - Animaciones de aparición al hacer scroll (IntersectionObserver)
 * - Rellena el formulario de contacto si llegas desde un servicio o un producto
 *   (nosotros.html?servicio=servidores#contacto o nosotros.html?producto=...#contacto)
 * - Año actual en el pie
 * - Validación del formulario de contacto (demo: no envía datos a ningún sitio)
 */
(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('menu');

  // Menú móvil -------------------------------------------------------------
  function setMenu(open) {
    if (!toggle || !nav) return;
    if (open && header) {
      // El menú empieza justo debajo de la cabecera, esté donde esté.
      nav.style.setProperty('--nav-top', Math.round(header.getBoundingClientRect().bottom) + 'px');
    }
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    var text = toggle.querySelector('.nav-toggle-text');
    if (text) text.textContent = open ? 'Cerrar' : 'Menú';
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setMenu(false);
        toggle.focus();
      }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 920) setMenu(false);
    });
  }

  // Cabecera al hacer scroll ----------------------------------------------
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Aparición al hacer scroll ---------------------------------------------
  var revealables = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.1 });
    revealables.forEach(function (el) { observer.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Año actual -------------------------------------------------------------
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  // Formulario de contacto -------------------------------------------------
  var form = document.getElementById('contact-form');
  if (!form) return;

  // Si llegas desde un servicio o un producto, el formulario se rellena solo.
  var params = new URLSearchParams(window.location.search);
  var servicio = params.get('servicio');
  var producto = params.get('producto');
  if (producto) {
    form.elements.servicio.value = 'producto';
    form.elements.mensaje.value = 'Hola, me interesa «' + producto.slice(0, 120) + '» del catálogo. ¿Lo tenéis disponible en la tienda?';
  } else if (servicio) {
    servicio = servicio.replace(/[^a-z]/g, '');
    if (form.querySelector('#servicio option[value="' + servicio + '"]')) form.elements.servicio.value = servicio;
  }

  var rules = {
    nombre: function (v) { return v.trim().length >= 2 ? '' : 'Escribe tu nombre (mínimo 2 caracteres).'; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Escribe un correo válido, por ejemplo nombre@dominio.es.'; },
    servicio: function (v) { return v ? '' : 'Elige el motivo de tu consulta.'; },
    mensaje: function (v) { return v.trim().length >= 10 ? '' : 'Cuéntanos un poco más (mínimo 10 caracteres).'; }
  };

  function validateField(name) {
    var input = form.elements[name];
    var msg = rules[name](input.value);
    var error = document.getElementById(name + '-error');
    error.textContent = msg;
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (msg) input.setAttribute('aria-describedby', name + '-error');
    else input.removeAttribute('aria-describedby');
    return !msg;
  }

  Object.keys(rules).forEach(function (name) {
    form.elements[name].addEventListener('blur', function () { validateField(name); });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var status = document.getElementById('form-status');
    var firstInvalid = null;
    Object.keys(rules).forEach(function (name) {
      if (!validateField(name) && !firstInvalid) firstInvalid = form.elements[name];
    });
    if (firstInvalid) {
      status.textContent = '';
      firstInvalid.focus();
      return;
    }
    // Proyecto ficticio: no hay servidor, así que solo simulamos el envío.
    status.textContent = 'Gracias, ' + form.elements.nombre.value.trim() + '. Esto es una demo: tu mensaje no se ha enviado a ningún sitio.';
    form.reset();
    Object.keys(rules).forEach(function (name) { form.elements[name].removeAttribute('aria-invalid'); });
  });
})();

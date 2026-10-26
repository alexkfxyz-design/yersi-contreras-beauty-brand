# YERSI CONTRERAS BEAUTY BRAND ✨

Landing page para la peluquería y estudio de belleza **Yersi Contreras Beauty Brand** (Arequipa, Perú).
Hecha con HTML, CSS y JavaScript puro: sin instalaciones, sin frameworks, lista para GitHub Pages.

## Qué incluye
- Hero animado con contadores y sello giratorio
- Catálogo de servicios con filtros (Cortes, Color, Tratamientos, Peinado & Make up) y precios
- Comparador **Antes / Después** deslizable
- Galería, sección "Nosotros" y slider de opiniones (táctil en celular)
- **Reservas por WhatsApp**: el formulario arma el mensaje con servicio, fecha y hora disponibles
- Horario con indicador "Abierto ahora / Cerrado"
- Mapa de Google con la ubicación del local y botón "Cómo llegar"
- Botón flotante de WhatsApp, menú móvil y diseño 100 % responsive

## Estructura
```
yersi-contreras-beauty-brand/
├── index.html
├── css/styles.css
├── js/main.js
└── README.md
```

## Cómo probarlo
Abre `index.html` en el navegador (doble clic). No necesita servidor.

## Publicar en GitHub Pages
1. Crea un repositorio nuevo en GitHub y sube el contenido de esta carpeta.
2. Ve a **Settings → Pages**.
3. En *Source* elige **Deploy from a branch**, rama `main`, carpeta `/ (root)` y guarda.
4. En 1–2 minutos tendrás el enlace `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/` para compartir con el cliente.

## Personalizar (antes de entregar)
| Qué | Dónde |
|---|---|
| Número de WhatsApp | `js/main.js` → `CONFIG.whatsapp` (formato `51987654321`) |
| Horarios | `js/main.js` → `CONFIG.hours` y la lista en `index.html` (sección `#reservar`) |
| Servicios y precios | `js/main.js` → arreglo `SERVICES` |
| Dirección exacta y redes | `index.html` → sección `#ubicacion` |
| Fotos | Reemplaza las URLs en los `style="--img:url('...')"` por fotos reales del salón (puedes crear una carpeta `img/`) |
| Opiniones | `index.html` → sección `#opiniones` |

> Las fotos actuales son de demostración (Unsplash) y el "antes/después" usa un filtro sobre la misma foto.
> Para la versión final conviene usar trabajos reales de la clienta.

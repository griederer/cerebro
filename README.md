# Cerebro

Visor de sólo lectura, para el teléfono, de una bóveda de notas en Markdown
(Obsidian) guardada en un repositorio privado de GitHub.

Es una PWA de un archivo: se abre en Safari, *Añadir a pantalla de inicio*, y
queda como una app. Pide `Sistema/movil.json` —una instantánea que genera el
widget [Captura](https://github.com/griederer/GRwidgets) en el escritorio— a
la API de GitHub con un token propio de sólo lectura, y dibuja pendientes,
capturas, notas, guías y presupuesto.

**Aquí no hay datos de nadie.** Este repositorio es sólo el cascarón: sin un
token y un repositorio privado detrás, la página no muestra nada. El token se
guarda en `localStorage` del teléfono y no se envía a ningún otro sitio.

La paleta sale del tema activo de [omarchy](https://omarchy.org) y viaja en la
instantánea, así que el teléfono sigue al escritorio.

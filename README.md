# AdNull 🛡️  
**Bloqueador de anuncios ligero y eficaz para Google Chrome.**

AdNull es una extensión de navegador diseñada para eliminar la mayoría de los anuncios web de manera silenciosa y eficiente, sin consumir recursos excesivos ni invadir tu privacidad.


## 🧠 ¿Qué hace AdNull?

- 🔇 Bloquea anuncios molestos (banners, iframes, popups, scripts).
- ⚡ Mejora la velocidad de carga de las páginas.
- 🔐 Respeta tu privacidad: no recolecta ningún dato.
- 🌐 Funciona en todos los sitios web.
- 🧩 Basado en las últimas APIs de Chrome (Manifest V3).


## 📦 Características principales

- ✅ Bloqueo dinámico de scripts de publicidad conocidos.
- ✅ Eliminación automática de elementos comunes de anuncios (por CSS).
- ✅ Código abierto y transparente.
- ✅ Fácil de mantener y extender.
- ✅ Ligero: sin paneles ni configuraciones innecesarias.


## 🚀 Instalación manual (modo desarrollador)

1. Clona este repositorio:
```
   git clone https://github.com/MushhDev/AdNull.git
```

3. Abre Google Chrome y ve a `chrome://extensions/`.
4. Activa el **modo desarrollador** (esquina superior derecha).
5. Clic en **"Cargar descomprimida"** y selecciona la carpeta `AdNull`.
6. ¡Listo! La extensión está activa.


## 🛠️ Estructura del proyecto

```
AdNull/
├── manifest.json          # Configuración de la extensión (Manifest V3)
├── background.js          # Bloqueador de peticiones a servidores de anuncios
├── content.js             # Eliminación de anuncios visibles por CSS
├── icon.png               # Icono de la extensión
└── README.md              # Este archivo
```


## 📚 ¿Cómo funciona?

* `background.js` usa `chrome.declarativeNetRequest` para bloquear peticiones de anuncios como `doubleclick.net`, `ads.google.com`, etc.
* `content.js` se inyecta en cada página para remover visualmente banners usando selectores como `.ad`, `#ads`, `[class*="sponsor"]`, etc.


## 🧩 Extensiones futuras

* Lista de filtros personalizada y editable.
* Activar/desactivar por dominio.
* Estadísticas de anuncios bloqueados.
* Panel de configuración propio.

## 📜 Licencia

Este proyecto está bajo la licencia **MIT**.
Puedes usarlo, modificarlo y distribuirlo libremente. ¡Solo no digas que lo hiciste tú sin crédito! 😄


## ❤️ Créditos

Desarrollado por [ MushhDev ]
Inspirado en proyectos como **uBlock Origin**, **AdGuard** y **Pi-hole**.

## 📫 Contacto

¿Tienes dudas, ideas o encontraste un bug?
¡gmail: mushhdev@gmail.com!

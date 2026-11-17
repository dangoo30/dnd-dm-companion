# Cofre de Danna · D&D 5e

Herramienta para Dungeon Masters: bestiario de enemigos, generador de botín según el nivel de desafío y bandeja de dados. Funciona en el navegador (responsivo) y como app Android con CapacitorJS.

- **Demo web (Vercel):** https://dangronito.vercel.app/
- **APK:** disponible en la sección [Releases](../../releases) del repositorio.

## Tecnologías

- React 18 + Vite
- JavaScript y CSS (mobile-first)
- Fetch contra la API pública [dnd5eapi.co](https://www.dnd5eapi.co/api/) (sin API key)
- CapacitorJS 7 + Android Studio

## Módulos

1. **Bestiario:** lista y busca monstruos (`/api/monsters`) y muestra en tarjetas la Clase de Armadura, los Puntos de Golpe y el Nivel de Desafío.
2. **Generador de botín:** según el CR elegido, genera monedas aleatorias y objetos reales (`/api/magic-items` y `/api/equipment`). Más CR, más monedas y objetos de mayor rareza.
3. **Bandeja de dados:** d4, d6, d8, d10, d12, d20 y d100, con resultado destacado e historial.

## Ejecutar en local

```bash
npm install
npm run dev
```

Abre la URL que muestra la terminal (normalmente http://localhost:5173).

## Build web

```bash
npm run build
```

Genera la carpeta `dist/`.

## Empaquetar para Android

Requisitos: Node 18+, Android Studio y JDK 17 (Android Studio ya lo incluye).

```bash
npm run build
npx cap add android      # solo la primera vez
npx cap sync android     # cada vez que cambies la web
npx cap open android     # abre el proyecto en Android Studio
```

En Android Studio: **Build → Build Bundle(s) / APK(s) → Build APK(s)**. El archivo queda en `android/app/build/outputs/apk/debug/app-debug.apk`.

## Despliegue

Vercel detecta Vite automáticamente: build command `npm run build`, output directory `dist`.

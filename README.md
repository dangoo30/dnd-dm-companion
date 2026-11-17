# Dangronito · D&D 5e

Herramienta para Dungeon Masters de Dungeons & Dragons 5e. Incluye consulta de enemigos, generación de botín según el nivel de desafío y una bandeja de dados. Funciona en el navegador con diseño responsivo y como aplicación Android empaquetada con CapacitorJS.

## Enlaces

- **Aplicación web (Vercel):** https://dangronito.vercel.app/
- **Repositorio:** https://github.com/dangoo30/dnd-dm-companion
- **APK (Android):** https://github.com/dangoo30/dnd-dm-companion/releases/tag/v1.0.0

## Tecnologías

- React 18 y Vite
- JavaScript y CSS con enfoque mobile-first
- Fetch contra la API pública [dnd5eapi.co](https://www.dnd5eapi.co/api/), sin API key
- CapacitorJS 7 y Android Studio

## Módulos

1. **Bestiario:** lista y busca monstruos desde `/api/monsters`. Cada tarjeta muestra la Clase de Armadura, los Puntos de Golpe y el Nivel de Desafío.
2. **Generador de botín:** según el Nivel de Desafío elegido, genera monedas y objetos reales desde `/api/magic-items` y `/api/equipment`. A mayor nivel, más monedas y objetos de mayor rareza.
3. **Bandeja de dados:** d4, d6, d8, d10, d12, d20 y d100, con resultado destacado e historial.
4. **Pokémon:** ejemplo de consumo de API con PokeAPI.

## Ejecutar en local

```bash
npm install
npm run dev
```

Abre http://localhost:5173 en el navegador.

## Build web

```bash
npm run build
```

Genera la carpeta `dist/`.

## Empaquetar para Android

Requisitos: Node 18 o superior y Android Studio.

```bash
npm run build
npx cap add android
npx cap sync android
npx cap open android
```

En Android Studio: **Build → Build Bundle(s) / APK(s) → Build APK(s)**. El archivo queda en `android/app/build/outputs/apk/debug/app-debug.apk`.

## Despliegue

Vercel detecta Vite automáticamente: comando de build `npm run build` y carpeta de salida `dist`.

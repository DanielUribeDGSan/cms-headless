# Arquitectura y Reglas del Proyecto (Guía para IAs y Desarrolladores)

Este documento contiene las reglas arquitectónicas, los patrones de diseño y las convenciones de código para este proyecto (Next.js + Payload CMS). **Cualquier IA o desarrollador que trabaje en este código DEBE adherirse estrictamente a estos principios antes de realizar cambios.**

## 1. Patrón de Arquitectura: Clean Architecture + Modularidad
El código NO debe mezclarse en una estructura monolítica gigante. Usamos una división por **módulos de negocio** (Domain-Driven Design).

### Estructura de Directorios
- `src/app/`: **Exclusivo para enrutamiento (App Router).** No debe contener lógica de negocio ni componentes visuales pesados.
- `src/modules/{nombre-del-modulo}/`: **Contiene la lógica de negocio.** Dividido en tres capas:
  - `domain/`: Entidades TypeScript y contratos (interfaces de repositorios). Cero dependencias externas.
  - `application/`: Casos de uso (Use Cases). Orquestan la lógica (ej. `get-home-page.usecase.ts`).
  - `infrastructure/`: Implementaciones reales (ej. fetch a Payload CMS) y Mappers.
- `src/themes/`: **Capa de Presentación y UI Multi-Tema.** Contiene las plantillas visuales intercambiables.
- `src/shared/`: Utilidades genéricas y componentes UI compartidos que no pertenecen a un módulo específico.

## 2. El Patrón "Theme Registry" (Plantillas Visuales)
La UI está totalmente desacoplada de la lógica de negocio mediante el directorio `src/themes`.

- **Regla:** NUNCA escribas HTML, Tailwind o importes CSS directamente en `src/app/page.tsx` o `src/app/layout.tsx`. 
- **¿Cómo funciona?:** `src/app/layout.tsx` y `page.tsx` deben usar el `ThemeRegistry` (`src/themes/index.ts`) para obtener dinámicamente el componente visual basado en la variable de entorno `NEXT_PUBLIC_THEME`.
- **Tema `legacy-elementor`:** Contiene el HTML estático heredado de WordPress. Este código está aislado intencionalmente porque contiene `divs` innecesarios y estilos globales pesados. NO uses este tema como referencia de buenas prácticas HTML.
- **Nuevos Temas:** Al crear un nuevo diseño (ej. `modern-v2`), este debe construirse con HTML5 semántico puro y Tailwind CSS (Utility-first), sin ensuciar otras plantillas.

## 3. Integración con Payload CMS (Fase 3+)
- Payload CMS (v3) corre localmente sobre Next.js. La configuración está en `src/payload.config.ts`.
- **Regla:** Los componentes de React (UI) **jamás** deben importar funciones de la base de datos de Payload directamente. 
- **Flujo correcto:** La página de Next (`src/app/page.tsx`) llama a un **Caso de Uso** (Capa Application), el caso de uso llama al **Repositorio** (Capa Infrastructure) que se comunica con Payload, y la data limpia (Mappeada al Dominio) se pasa como `props` a los componentes del Tema.

## 4. Buenas Prácticas de Código (Clean Code)
1. **Componentes Puros:** Los componentes dentro de `src/themes/` deben ser en su mayoría componentes de presentación ("Dumb Components") que reciben información por `props`.
2. **Custom Hooks:** Si un componente de cliente necesita lógica compleja o estado (ej. un formulario), la lógica debe extraerse a un Custom Hook (`use-form.ts`) y colocarse cerca del módulo correspondiente (ej. `src/modules/contact/ui/hooks/`).
3. **HTML Semántico:** Para los nuevos temas, usa etiquetas semánticas correctas (`<article>`, `<section>`, `<nav>`, `<main>`, `<aside>`). Elimina el "div-soup".
4. **Tailwind CSS:** Para nuevos desarrollos, usa las clases utilitarias de Tailwind. Evita crear archivos `.css` globales a menos que sea estrictamente necesario para configuraciones de temas heredados.
5. **Tipado Estricto:** TypeScript es mandatorio. Usa interfaces y tipos, no uses `any`.

---
> **Nota para IAs Asistentes:** Antes de proponer un refactor o crear una nueva página, revisa este archivo. Si se te solicita hacer un cambio en el diseño principal, asegúrate de preguntar en cuál de los Temas (`themes/`) debes aplicarlo.

# GitHub Copilot Instructions

## Project context
- Este repositorio contiene un proyecto React + TypeScript en `ice-task-manager/`.
- La app usa Vite y se ejecuta desde `ice-task-manager/package.json`.
- El enfoque es un MVP sencillo, didáctico y sin backend.

## Technology
- React 19
- TypeScript 6
- Vite
- ESLint
- Type-safe code y tipado estricto

## Primary guidelines
- Prioriza acción sobre narrativa.
- Sé conciso en los resultados y no describas pasos intermedios si no se pide explícitamente.
- Usa clean code: nombres claros, funciones pequeñas y responsabilidad única.
- No hardcodees secretos ni claves en el código.
- Evita soluciones complejas cuando una implementación simple y mantenible es suficiente.

## Behavior for suggestions
- Responde con claridad y directo al objetivo.
- Cuando modifiques código, ajusta solo lo necesario y conserva el estilo del repositorio.
- Usa tipado fuerte en TypeScript y define interfaces/Tipos en lugar de `any`.
- Prioriza patrones idiomáticos de React y composición de componentes.
- Si hay una carpeta `src/`, ubica cambios dentro de `ice-task-manager/src/`.

## Commands
- `cd ice-task-manager`
- `npm install`
- `npm run dev`
- `npm run build`
- `npm run lint`

## When creating issues or tasks
- Extrae descripciones concretas de los archivos de planificación existentes.
- Añade listas de verificación claras y validaciones.
- Usa etiquetas de estado como `todo`, `doing`, `done`.

## Avoid
- No uses secretos embebidos en el frontend.
- No asumas configuración fuera de `ice-task-manager/`.
- No generes cambios innecesarios en repositorios o archivos de configuración no relacionados.

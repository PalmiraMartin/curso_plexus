# Workspace Instructions

## Project purpose
- Este repo contiene una app React + TypeScript en `ice-task-manager/`.
- El objetivo principal es un MVP didáctico de un gestor de tareas con cálculo ICE.
- No hay backend ni persistencia, el estado vive en memoria.

## Coding rules
- Genera código TypeScript estricto y tipado fuerte.
- Sigue patrones estándar de React como arquitecto senior:
  - componentes pequeños y responsables de una sola cosa
  - separar lógica de negocio de presentación
  - preferir composición sobre herencia
  - evitar duplicación y estados derivados
- No uses Redux ni librerías adicionales innecesarias sin pedir permiso.
- Usa MUI para generar controles y componentes de UI siempre que sea posible.
- No hardcodees secretos ni configuraciones sensibles en el frontend.
- Mantén la solución simple y mantenible; evita complejidad prematura.

## Implementation guidance
- Ubica nuevos cambios en `ice-task-manager/src/`.
- En componentes React, usa hooks nativos y composición clara.
- Usa utilidades puras para cálculos y validaciones.
- Mantén `App` ligero; centraliza la lógica en hooks y servicios.
- Si necesitas un componente de formulario o botón, prefierelo de MUI.

## Communication style
- Respóndele al usuario de forma concisa y directa.
- No expliques pasos intermedios a menos que te lo pidan.
- Actúa en función del resultado esperado.

## Commands
- `cd ice-task-manager`
- `npm install`
- `npm run dev`
- `npm run build`
- `npm run lint`

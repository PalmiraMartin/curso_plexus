# Alcance Funcional del MVP: Gestor de Tareas Inteligente con Modelo ICE

## Descripción General

El MVP es una aplicación web simple basada en React que permite gestionar tareas de manera inteligente utilizando el modelo ICE (Impact, Confidence, Ease) para priorizarlas. No incluye backend ni persistencia de datos, por lo que toda la información se maneja en el estado local del navegador y se pierde al recargar la página. Está diseñado para ser muy simple, adecuado para un curso corto de programación.

## Objetivos

- Proporcionar una interfaz sencilla para crear y listar tareas con nombre y descripción.
- Integrar una funcionalidad de IA para calcular automáticamente los scores ICE basados en la descripción de la tarea mediante una API gratuita.
- Mantener la simplicidad para enfocarse en conceptos básicos de React y llamadas a APIs.

## Funcionalidades Principales

### 1. Creación de Tareas
- Campo de texto para ingresar el nombre de la tarea.
- Campo de texto (textarea) para ingresar la descripción de la tarea (límite de 200 palabras).
- Botón "Agregar Tarea" para añadir la tarea a la lista.
- Validación básica: nombre y descripción no pueden estar vacíos.

### 2. Listado de Tareas
- Mostrar una lista de tareas creadas en tiempo real.
- Cada tarea muestra:
  - Nombre
  - Descripción
  - Scores ICE (Impact, Confidence, Ease) - inicialmente vacíos o con valores por defecto.
  - Score total ICE (calculado como Impact * Confidence * Ease).

### 3. Cálculo de ICE
- Para cada tarea, campos editables para Impact, Confidence y Ease (escala 1-10).
- Botón "Calcular ICE" que llama a la API de Gemini con la descripción de la tarea.
- La API procesa la descripción y devuelve scores numéricos para Impact, Confidence y Ease.
- Los campos se rellenan automáticamente con la respuesta de la API, pero pueden editarse manualmente.
- Calcular y mostrar el score total ICE = Impact * Confidence * Ease.
- Manejo de errores: Si la API falla, mostrar un mensaje de error.

### 4. Priorización y Ordenamiento
- Opción para ordenar la lista de tareas por score ICE descendente (mayor prioridad primero).
- Botón o toggle para activar/desactivar el ordenamiento por puntuación.

## Tecnologías Utilizadas

- **Frontend**: React (usando hooks como useState para manejo de estado).
- **API de IA**: API de Gemini (gratuita en su tier básico).
- **Estilos**: CSS básico o una librería simple como styled-components (opcional para simplicidad).

## Limitaciones

- **No persistencia**: Los datos de las tareas no se guardan; se pierden al recargar la página o cerrar el navegador.
- **Sin backend**: Toda la lógica está en el frontend; no hay servidor.
- **Simplicidad extrema**: Solo funcionalidades básicas; no incluye edición, eliminación individual, filtros avanzados, etc.
- **Dependencia externa**: Requiere conexión a internet para la API de IA; límites de uso de la API gratuita pueden aplicar.
- **Sin autenticación**: No hay usuarios; es una app local.

## Diagrama de Flujo Simplificado

1. **Inicio**: Usuario abre la aplicación React.
2. **Crear Tarea**: Ingresa nombre y descripción, presiona "Agregar".
3. **Listar**: La tarea aparece en la lista con scores ICE vacíos.
4. **Calcular ICE**: Para una tarea, presiona "Calcular ICE".
   - Envía descripción a API de IA.
   - Recibe respuesta con scores.
   - Actualiza la tarea con los scores.
5. **Ordenar**: Opcionalmente, ordena la lista por score ICE.
6. **Fin**: Datos se pierden al recargar.

Este alcance asegura un MVP funcional y educativo, enfocado en React y integración básica con APIs de IA.

## Estructura de carpetas recomendada (React + TypeScript)

La app se organiza en `src/` con componentes modulares y separación clara de responsabilidades.

```
src/
  components/
    Navbar/
      Navbar.tsx
      Navbar.styles.ts
    TaskForm/
      TaskForm.tsx
      TaskForm.styles.ts
    TaskList/
      TaskList.tsx
      TaskList.styles.ts
    TaskCard/
      TaskCard.tsx
      TaskCard.styles.ts
    PriorityModal/
      PriorityModal.tsx
      PriorityModal.styles.ts
  hooks/
    useTasks.ts
  models/
    task.ts
  services/
    ai.ts
  utils/
    ice.ts
  App.tsx
  index.tsx
  theme.ts
```

## División de componentes

- `App.tsx`
  - Componente raíz que mantiene el estado global de tareas y controla la apertura del modal.
  - Gestiona la lógica de ordenamiento, selección de tarea y actualización de valores ICE.

- `Navbar`
  - Barra superior con el título de la aplicación.
  - Incluye un interruptor o botón para ordenar por score ICE y un posible resumen de prioridad.

- `TaskForm`
  - Formulario para crear tareas con campos `name` y `description`.
  - Valida que ambos campos no queden vacíos antes de enviar.
  - Dispara una función callback para agregar la tarea al estado global.

- `TaskList`
  - Contenedor de la lista de tareas.
  - Recibe el arreglo de tareas y renderiza `TaskCard` por cada entrada.
  - Puede mostrar un estado vacío si no hay tareas creadas.

- `TaskCard`
  - Representa una tarea individual con nombre, descripción y valores ICE.
  - Muestra el score total calculado y botones para `Calcular ICE` / `Editar ICE`.
  - Dispara callback para abrir el modal de prioridad o actualizar la tarea.

- `PriorityModal`
  - Dialogo emergente para mostrar/editar los valores de Impact, Confidence y Ease.
  - Permite lanzar la llamada a la API de IA y confirmar los valores sugeridos.
  - Retorna los datos finales al componente padre.

## Gestión del estado (sin librerías externas)

La aplicación usa exclusivamente hooks de React (`useState`, `useMemo`, `useCallback`) y no requiere Redux, MobX ni otras librerías de estado.

- Estado principal en `App.tsx`:
  - `tasks: Task[]` — arreglo de tareas.
  - `sortByIce: boolean` — toggle para ordenar por prioridad.
  - `activeTaskId: string | null` — id de la tarea actual en el modal.
  - `isModalOpen: boolean` — control de visibilidad del `PriorityModal`.

- `TaskForm` solo mantiene estado local de los campos del formulario y llama a `onAddTask`.
- `TaskList` es presentacional: recibe datos y callbacks desde `App`.
- `TaskCard` puede ser controlado por props y usar callbacks para acciones.
- `PriorityModal` recibe la tarea seleccionada y actualiza el estado global mediante una función `onConfirmIce`.

### Flujo de datos

1. `TaskForm` crea una nueva tarea y envía los datos a `App`.
2. `App` actualiza `tasks` con la nueva tarea.
3. `TaskList` renderiza las tareas usando `TaskCard`.
4. `TaskCard` abre `PriorityModal` al solicitar el cálculo ICE.
5. `PriorityModal` solicita la sugerencia de IA y confirma los valores.
6. `App` actualiza la tarea correspondiente en `tasks`.

### Ordenamiento y valores calculados

- `App` calcula una lista ordenada con `useMemo` cuando `sortByIce` está activado.
- El score total ICE se obtiene mediante una función utilitaria en `utils/ice.ts`, por ejemplo `calculateIceScore(impact, confidence, ease)`.
- El ordenamiento se aplica solo en la vista; los datos originales de tareas se mantienen en el estado.

## Notas de diseño

- La propuesta respeta el flujo definido en los diagramas: pantalla principal única, formulario visible, lista de tareas y modal de prioridad.
- La estructura de carpetas está diseñada para un proyecto React + TypeScript educativo, manteniendo los componentes pequeños y reutilizables.
- El uso de Material UI se recomienda para los componentes visuales, pero la lógica de estado permanece en React puro.

## Plan de implementación: 8 tareas ordenadas

A continuación se detallan las 8 tareas de implementación propuestas, ordenadas y con entregables esperados. Sirven como backlog para comenzar el desarrollo del MVP en React + TypeScript.

1. Init project + TS React setup
  - Objetivo: Crear el proyecto base con Vite + React + TypeScript (o Create React App si se prefiere). Incluir ESLint/Prettier básicos.
  - Entregables: `package.json`, `tsconfig.json`, `vite.config.ts` (o equivalente), README con comandos de inicio.

2. Create folder structure and core files
  - Objetivo: Añadir la estructura de carpetas propuesta en `src/` y archivos vacíos: `App.tsx`, `index.tsx`, `theme.ts`, `models/task.ts`.
  - Entregables: Estructura de carpetas y archivos iniciales.

3. Implement App shell and Navbar
  - Objetivo: Implementar el layout principal con `AppBar` (Material UI), y el estado global mínimo (`tasks`, `selectedTask`).
  - Entregables: `App.tsx`, `components/Navbar/Navbar.tsx` con el toggle de ordenamiento.

4. Implement TaskForm and validation
  - Objetivo: Implementar el formulario de creación de tareas con validación (nombre y descripción obligatorios, límite de palabras).
  - Entregables: `components/TaskForm/TaskForm.tsx` y callbacks para `onAddTask`.

5. Implement TaskList and TaskCard components
  - Objetivo: Mostrar la lista de tareas y tarjetas individuales con información básica y botones de acción.
  - Entregables: `components/TaskList/TaskList.tsx`, `components/TaskCard/TaskCard.tsx`.

6. Implement PriorityModal and AI service integration
  - Objetivo: Crear `PriorityModal` (Dialog) que muestre la descripción, permita editar Impact/Confidence/Ease, lance la llamada a `services/ai.ts` y devuelva valores sugeridos.
  - Entregables: `components/PriorityModal/PriorityModal.tsx`, `services/ai.ts` (mock + función real para llamada a Gemini cuando se configure API key).

7. State management hook and utils (ice calc)
  - Objetivo: Añadir `hooks/useTasks.ts` si la lógica de manejo de tareas se vuelve repetitiva; crear util `utils/ice.ts` con `calculateIceScore`.
  - Entregables: `hooks/useTasks.ts` (opcional), `utils/ice.ts`.

8. Styling with Material UI theme and polish
  - Objetivo: Definir `theme.ts`, aplicar `CssBaseline`, ajustar espaciados y accesibilidad, añadir handling de estados (loading, error).
  - Entregables: `theme.ts`, ajustes en componentes con estilos coherentes.

### Notas sobre prioridades y riesgos

- Riesgo principal: Acoplamiento si `App.tsx` concentra demasiada lógica; extraer lógica a `useTasks` o a funciones utilitarias mitigará esto.
- Para el MVP, evitar crear archivos de estilos por componente hasta que el diseño lo justifique.

Si confirmas este plan, genero un archivo de implementación (plantilla de archivos y contenido inicial) dentro del repositorio.
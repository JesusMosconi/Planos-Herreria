# Guía operativa para agentes

## Proyecto

Diseñador Digital para Herrería: el modelo paramétrico es la única fuente de verdad.
Del modelo se derivan el plano con cotas y la lista de piezas.

## Fuentes de verdad

Prioridad, de mayor a menor:

1. `.specify/memory/constitution.md`.
2. `specs/<fase>/spec.md`, `plan.md` y `tasks.md` de la fase en curso.

Ante cualquier conflicto, prevalece la constitución.

## Estructura del repo

El código de la aplicación vive SIEMPRE en `/app`.

- `.agents/`: habilidades e instrucciones operativas para agentes.
- `.specify/`: configuración, memoria y recursos de Spec Kit.

## Reglas de código

- Usar milímetros internamente; mostrar metros con coma decimal solo en la UI (Principio III).
- Validar los parámetros con Zod (Principio V).
- Incluir `schemaVersion` en todo JSON guardado (Principio V).
- El motor de cálculo no importa React, DOM ni APIs del navegador (Principio VI).
- Escribir fórmulas como funciones puras y probarlas contra casos calculados a mano (Principio II).
- Las decisiones discretas nunca se editan por arrastre (Principio VII).

## Comandos

Ejecutar desde `/app`:

- `npm.cmd run dev`: servidor local.
- `npm.cmd run lint`: ESLint.
- `npm.cmd run typecheck`: TypeScript sin emitir archivos.
- `npm.cmd run test`: pruebas unitarias, de componentes y rendimiento puro.
- `npm.cmd run test:integration`: persistencia contra `TEST_DATABASE_URL`.
- `npm.cmd run build`: compilación de producción.
- `npm.cmd run test:e2e`: recorridos Playwright.
- `npx.cmd prisma migrate deploy`: aplicar migraciones con `DIRECT_URL`.

## Cómo trabajar

- Implementar únicamente lo indicado en `tasks.md` de la fase en curso.
- No agregar funcionalidad fuera del alcance de la fase.
- No eliminar funcionalidad existente para resolver un problema; si debe ocultarse, hacerlo
  condicionalmente.
- No modificar la constitución ni archivos de otras fases sin pedido explícito.
- Ante ambigüedad, preguntar antes de asumir.

## Fuera de alcance

CAD completo, ERP, stock, CNC e IA que automatice todo.

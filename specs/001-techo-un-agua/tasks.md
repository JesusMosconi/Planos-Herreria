---

description: "Tareas de implementación para el núcleo paramétrico y techo a un agua"
---

# Tasks: Fase 1 - Núcleo y techo a un agua

**Input**: Documentos de diseño en `/specs/001-techo-un-agua/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`

**Tests**: Son obligatorios porque la constitución exige fórmulas puras verificadas contra casos
calculados a mano y el spec define recorridos independientes para cada historia.

**Organization**: Las tareas se agrupan por historia para permitir implementación y validación
incrementales. Toda la aplicación reside en `/app`.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Puede ejecutarse en paralelo porque trabaja en archivos distintos y no depende de otra
  tarea incompleta del mismo bloque.
- **[Story]**: Historia de usuario correspondiente (`US1` a `US6`).
- Cada tarea incluye una ruta exacta.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Inicializar el único proyecto web y sus herramientas.

- [X] T001 Inicializar un proyecto Next.js App Router con TypeScript, Tailwind CSS 4, ESLint, `src/`
  e import alias `@/*` directamente en `app/package.json` y `app/src/app/`
- [X] T002 Instalar y fijar Zod, Maker.js, Prisma ORM 7, cliente/adaptador Neon y PDFKit en
  `app/package.json` y `app/package-lock.json`
- [X] T003 [P] Instalar y configurar Vitest, Testing Library, Playwright y scripts `typecheck`,
  `test`, `test:integration` y `test:e2e` en `app/package.json`, `app/vitest.config.ts` y
  `app/playwright.config.ts`
- [X] T004 [P] Activar `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`,
  `noImplicitReturns` y rutas tipadas en `app/tsconfig.json` y `app/next.config.ts`
- [X] T005 [P] Crear tokens CSS-first, estilos base responsivos y tipografía sans en
  `app/src/app/globals.css`
- [X] T006 [P] Crear `.env.example` solo con los nombres `DATABASE_URL`, `DIRECT_URL` y
  `TEST_DATABASE_URL` en `app/.env.example`
- [X] T007 [P] Configurar exclusiones de artefactos locales, cobertura y Playwright en
  `app/.gitignore`
- [X] T008 Crear las carpetas de arquitectura acordadas mediante archivos índice en
  `app/src/core/`, `app/src/features/`, `app/src/server/`, `app/tests/integration/` y
  `app/tests/e2e/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Contratos, unidades, persistencia y composición compartida que bloquean todas las
historias.

**⚠️ CRITICAL**: No comenzar historias hasta completar esta fase.

- [X] T009 [P] Definir tipos comunes inmutables para definición, cálculo, geometría, cotas, piezas y
  avisos en `app/src/core/model/types.ts`
- [X] T010 [P] Escribir primero pruebas de conversión para coma y punto decimal, equivalencia
  `1.500` → `1,5 m`, recorte de espacios exteriores, rechazo de espacios internos, signo `+`, valores
  no numéricos, infinitos, más de tres decimales y texto parcial en
  `app/src/core/units/metric.test.ts`
- [X] T011 Implementar la conversión explícita definida por T010 entre metros y milímetros enteros,
  con mensajes claros y sin redondeo silencioso, en `app/src/core/units/metric.ts`
- [X] T012 [P] Escribir primero pruebas Zod para documento válido, versión ausente/futura,
  dimensiones y posiciones manuales en mm enteros, posiciones derivadas de correas con mm
  fraccionarios finitos, sentidos `front/back`, dimensiones no positivas y perfiles vacíos parciales
  en `app/src/core/schemas/project-v1.test.ts`; incluir dimensiones `> 0` y `<= 30000`, aceptación del
  intervalo `12000..30000`, cantidad de correas entera `0..100` y rechazo de valores no finitos
- [X] T013 Definir esquemas Zod `ProjectDefinitionV1`, `TechoUnAguaParametersV1`, correas, apoyos y
  desagüe con `schemaVersion: 1`; dimensiones y posiciones ingresadas manualmente en mm enteros;
  posiciones inicialmente derivadas de correas como números finitos que pueden contener fracciones
  de mm; dimensiones `> 0` y `<= 30000`; cantidad de correas entera `0..100`; sentidos `front/back`;
  y colecciones editables en `app/src/core/schemas/project-v1.ts`, manteniendo el umbral de 12000 mm
  como aviso no bloqueante fuera del error Zod
- [X] T014 [P] Escribir primero fixtures y pruebas de lectura actual, migración antigua soportada y
  rechazo de versión futura en `app/src/core/schemas/versioning.test.ts` y
  `app/src/core/schemas/__fixtures__/`
- [X] T015 Implementar despacho de versiones y migraciones puras encadenables sin sobrescribir
  versiones futuras en `app/src/core/schemas/versioning.ts`
- [X] T016 Crear el contrato común de estructura y el único registro central con
  `techo-un-agua` en `app/src/core/structures/contract.ts` y
  `app/src/core/structures/registry.ts`
- [X] T017 Definir el modelo Prisma `Project` con id, nombre obligatorio, cliente/notas libres,
  `TECHO_UN_AGUA`, marca aproximada, `schemaVersion`, `definition Json`, `duplicatedFromId` y fechas
  en `app/prisma/schema.prisma`
- [X] T018 Crear la migración inicial PostgreSQL/JSONB e índices de listado/versionado en
  `app/prisma/migrations/0001_initial/migration.sql`
- [X] T019 Configurar clientes Prisma Neon de runtime y test solo servidor en
  `app/src/server/db/prisma.ts` y `app/src/server/db/test-prisma.ts`
- [X] T020 [P] Crear resultados de acción discriminados para `validation`, `not_found`,
  `unsupported_schema`, `conflict` y `storage_failure` en `app/src/server/actions/action-result.ts`
- [X] T021 Crear shell, encabezado mínimo y navegación exclusiva a Mis proyectos en
  `app/src/app/layout.tsx`, `app/src/app/page.tsx` y `app/src/features/projects/AppHeader.tsx`

**Checkpoint**: Contratos y base compartida listos; pueden comenzar las historias.

---

## Phase 3: User Story 1 - Crear y definir un techo (Priority: P1) 🎯 MVP

**Goal**: Crear un proyecto y editar por formulario todos los parámetros, viendo medidas, pendiente y
resumen calculados desde un único modelo.

**Independent Test**: Crear un techo sin persistencia previa, ingresar coma o punto decimal, definir caída,
correas, apoyos, desagüe y perfiles, y obtener un resumen correcto sin arrastre.

### Tests for User Story 1

- [X] T022 [P] [US1] Escribir primero pruebas manuales de diagonal, porcentaje y ángulo con precisión
  completa para profundidad horizontal/desnivel, incluidos ambos sentidos de caída, en
  `app/src/core/structures/techo-un-agua/calculation.test.ts`
- [X] T023 [P] [US1] Escribir primero pruebas de reparto para cero, una y varias correas con primera y
  última en bordes y `n-1` espacios iguales; cubrir límite `0..100` y regeneración que reemplaza
  posiciones manuales al cambiar ancho o cantidad en
  `app/src/core/structures/techo-un-agua/purlins.test.ts`
- [X] T024 [P] [US1] Escribir primero pruebas de componentes para formatos métricos aceptados y
  rechazados, texto parcial, límite de 100 correas, ángulo visible con un decimal, aviso de
  redistribución, controles discretos y actualización única del modelo en
  `app/src/features/techo-un-agua/RoofEditor.test.tsx`

### Implementation for User Story 1

- [X] T025 [P] [US1] Implementar tipos y defaults editables del techo sin presentar valores como
  mediciones confirmadas en `app/src/core/structures/techo-un-agua/model.ts`
- [X] T026 [P] [US1] Implementar distribución pura de correas para `n=0`, centro para `n=1` y extremos
  con `n-1` espacios para `n>1`, conservando posiciones derivadas en mm sin redondeo prematuro aunque
  sean fraccionarias, e implementar una operación pura que regenere posiciones ante cambio de ancho
  o cantidad en `app/src/core/structures/techo-un-agua/purlins.ts`
- [X] T027 [P] [US1] Implementar cálculo puro de diagonal, pendiente porcentual y ángulo desde
  profundidad horizontal y diferencia de altura en
  `app/src/core/structures/techo-un-agua/calculation.ts`
- [X] T028 [US1] Componer el módulo `techo-un-agua` que valida y produce un `RoofCalculation`
  inmutable desde la definición en `app/src/core/structures/techo-un-agua/index.ts`
- [X] T029 [P] [US1] Crear controles de medida con borrador textual, todos los formatos y mensajes de
  T010 y conversión validada al confirmar en `app/src/features/techo-un-agua/MetricField.tsx`
- [X] T030 [P] [US1] Crear editores de cantidad `0..100`, posiciones de correas y apoyos sin arrastre;
  al cambiar ancho o cantidad descartar posiciones manuales, redistribuir y avisar, en
  `app/src/features/techo-un-agua/PurlinFields.tsx` y
  `app/src/features/techo-un-agua/SupportFields.tsx`
- [X] T031 [P] [US1] Crear controles discretos de sentido de caída, canaleta/bajadas y perfiles
  editables en `app/src/features/techo-un-agua/DrainageFields.tsx` y
  `app/src/features/techo-un-agua/ProfileFields.tsx`
- [X] T032 [US1] Integrar un único estado `ProjectDefinitionV1` y recalcular derivados tras cada cambio
  válido en `app/src/features/techo-un-agua/RoofEditor.tsx`
- [X] T033 [P] [US1] Crear resumen en metros con coma, pendiente identificada como porcentaje/ángulo,
  ángulo con exactamente un decimal sin modificar el valor técnico y cantidades/posiciones en
  `app/src/features/techo-un-agua/CalculationSummary.tsx`
- [X] T034 [US1] Implementar creación validada en servidor y formulario de nombre, cliente y notas en
  `app/src/server/actions/create-project.ts`, `app/src/features/projects/NewProjectForm.tsx` y
  `app/src/app/proyectos/nuevo/page.tsx`
- [X] T035 [US1] Integrar el editor inicial accesible y responsivo en
  `app/src/app/proyectos/[id]/page.tsx`

**Checkpoint**: MVP calculable por formulario, independientemente de plano, lista y persistencia avanzada.

---

## Phase 4: User Story 2 - Ver y exportar el plano técnico (Priority: P2)

**Goal**: Mostrar planta y lateral acotadas y exportar exactamente la misma información.

**Independent Test**: Una definición conocida produce ambas vistas coherentes y archivos PDF, SVG y
DXF con identidad, cotas y unidades correctas.

### Tests for User Story 2

- [X] T036 [P] [US2] Escribir primero pruebas semánticas de planta/lateral, orientación de vigas y
  correas, bordes alto/bajo y cotas en `app/src/core/drawing/technical-drawing.test.ts`
- [X] T037 [P] [US2] Escribir primero pruebas de exportación: `viewBox`/capas SVG, unidades/capas DXF y
  firma/página PDF sin snapshots binarios completos en `app/src/core/export/exporters.test.ts`
- [X] T038 [P] [US2] Escribir primero recorrido Playwright de visualización y descarga reintentable en
  `app/tests/e2e/technical-drawing.spec.ts`

### Implementation for User Story 2

- [X] T039 [P] [US2] Construir `TechnicalDrawing` puro con superficie, dos vigas, correas, apoyos,
  desagüe, cotas y textos en `app/src/core/drawing/technical-drawing.ts`
- [X] T040 [US2] Adaptar `TechnicalDrawing` a modelos Maker.js nuevos en mm y capas estables, sin
  mutar el dominio, en `app/src/core/drawing/maker-adapter.ts`
- [X] T041 [P] [US2] Crear previsualización SVG accesible de planta y lateral desde el modelo Maker.js
  en `app/src/features/techo-un-agua/TechnicalDrawingView.tsx`
- [X] T042 [P] [US2] Implementar exportadores SVG y DXF con unidades explícitas y capas en
  `app/src/core/export/vector-exporters.ts`
- [X] T043 [US2] Implementar PDF A4 apaisado, escalando un clon según extents sin cambiar cotas, en
  `app/src/core/export/pdf-exporter.ts`
- [X] T044 [US2] Crear Route Handler para PDF/SVG/DXF con MIME, nombre seguro y error reintentable en
  `app/src/app/api/proyectos/[id]/export/[format]/route.ts`
- [X] T045 [US2] Integrar pestaña Plano y acciones de exportación sin editar el dibujo en
  `app/src/features/techo-un-agua/RoofEditor.tsx`

**Checkpoint**: El plano y sus exportaciones son derivados equivalentes del modelo.

---

## Phase 5: User Story 3 - Obtener la lista de piezas (Priority: P3)

**Goal**: Entregar vigas y correas agrupadas con cantidad, longitud exacta, perfil y cortes.

**Independent Test**: Un modelo conocido produce solo piezas estructurales derivables, agrupadas por
tipo/longitud/perfil/cortes y comparables con un cálculo manual.

### Tests for User Story 3

- [X] T046 [P] [US3] Escribir primero pruebas manuales para dos vigas de largo ancho, correas de largo
  diagonal, cortes 90°/90°, cero correas y perfiles vacíos en
  `app/src/core/structures/techo-un-agua/pieces.test.ts`
- [X] T047 [P] [US3] Escribir primero pruebas de agrupamiento exacto y exclusión de apoyos, canaleta,
  bajadas, cubierta, barras, consumibles y precios en `app/src/core/model/group-pieces.test.ts`

### Implementation for User Story 3

- [X] T048 [P] [US3] Implementar piezas crudas exactas de vigas y correas en
  `app/src/core/structures/techo-un-agua/pieces.ts`
- [X] T049 [P] [US3] Implementar agrupamiento puro por tipo, longitud exacta, perfil y ambos cortes en
  `app/src/core/model/group-pieces.ts`
- [X] T050 [US3] Integrar piezas en el único `RoofCalculation` del módulo en
  `app/src/core/structures/techo-un-agua/index.ts`
- [X] T051 [P] [US3] Crear tabla responsiva con cantidad, pieza, largo en metros con coma, perfil y
  cortes en `app/src/features/techo-un-agua/PartsList.tsx`
- [X] T052 [US3] Integrar pestaña Lista de piezas y estado parcial por perfil vacío en
  `app/src/features/techo-un-agua/RoofEditor.tsx`

**Checkpoint**: Plano y lista describen el mismo modelo sin precios ni materiales excluidos. La
implementación funcional de US3 queda completa; su aceptación contra el caso de referencia permanece
condicionada a la confirmación externa del herrero y se cierra mediante T073–T075.

---

## Phase 6: User Story 4 - Comunicar medidas aproximadas (Priority: P4)

**Goal**: Conservar y mostrar la incertidumbre en todas las salidas técnicas.

**Independent Test**: Activar/desactivar la marca cambia editor, plano, lista y exportaciones; al
reabrir conserva su estado.

### Tests and Implementation for User Story 4

- [X] T053 [P] [US4] Escribir primero pruebas de presencia/ausencia del texto canónico en cálculo,
  plano, lista y exportadores en `app/src/core/model/approximate-measurements.test.ts`
- [X] T054 [P] [US4] Crear control y leyenda canónica `Medidas aproximadas / a confirmar en obra` en
  `app/src/features/projects/ApproximateMeasurements.tsx`
- [X] T055 [US4] Incorporar la marca a `TechnicalDrawing` y exportaciones sin duplicar estado en
  `app/src/core/drawing/technical-drawing.ts` y `app/src/core/export/pdf-exporter.ts`
- [X] T056 [US4] Integrar el control y la leyenda en editor, Plano y Lista en
  `app/src/features/techo-un-agua/RoofEditor.tsx`

**Checkpoint**: Ninguna salida técnica presenta como confirmadas las medidas marcadas.

---

## Phase 7: User Story 5 - Guardar, abrir y duplicar (Priority: P5)

**Goal**: Persistir definiciones versionadas y crear copias independientes.

**Independent Test**: Guardar/reabrir conserva datos y derivados; duplicar crea otro id y editar la
copia no cambia el original.

### Tests for User Story 5

- [X] T057 [P] [US5] Escribir primero integración de crear/guardar/abrir, control de conflicto y
  equivalencia de derivados contra `TEST_DATABASE_URL` en
  `app/tests/integration/project-persistence.test.ts`
- [X] T058 [P] [US5] Escribir primero integración transaccional de duplicación, independencia y
  rollback ante fallo en `app/tests/integration/project-duplication.test.ts`
- [X] T059 [P] [US5] Escribir primero recorrido Playwright de listar, abrir, guardar y duplicar en
  `app/tests/e2e/project-lifecycle.spec.ts`

### Implementation for User Story 5

- [X] T060 [US5] Implementar constructor único de fila/JSON y repositorio list/create/open/save con
  Zod, versiones y `expectedUpdatedAt` en `app/src/server/repositories/project-repository.ts`
- [X] T061 [US5] Implementar duplicación read/create en transacción corta con nuevo id/fechas y
  `duplicatedFromId` en `app/src/server/repositories/duplicate-project.ts`
- [X] T062 [P] [US5] Exponer Server Actions tipadas para guardar y duplicar en
  `app/src/server/actions/save-project.ts` y `app/src/server/actions/duplicate-project.ts`
- [X] T063 [P] [US5] Crear listado con apertura por fila y acción Duplicar en
  `app/src/features/projects/ProjectList.tsx` y `app/src/app/proyectos/page.tsx`
- [X] T064 [US5] Integrar estados de guardado, éxito, conflicto y fallo recuperable sin perder el
  borrador en `app/src/features/techo-un-agua/RoofEditor.tsx`

**Checkpoint**: El ciclo de vida persistido conserva el modelo y regenera resultados equivalentes.

---

## Phase 8: User Story 6 - Continuar ante datos incoherentes (Priority: P6)

**Goal**: Explicar incoherencias interpretables sin corregirlas ni bloquear edición/guardado.

**Independent Test**: Cada caso límite especificado genera un aviso asociado al dato y el proyecto
se conserva sin pérdida.

### Tests for User Story 6

- [X] T065 [P] [US6] Escribir primero pruebas de códigos/rutas para desnivel sospechoso, dimensiones
  sobre 12000 mm, redistribución de correas, correas repetidas/fuera/desordenadas, apoyo fuera,
  canaleta en otro borde y bajada incoherente en
  `app/src/core/structures/techo-un-agua/warnings.test.ts`
- [X] T066 [P] [US6] Escribir primero pruebas de formulario para errores bloqueantes frente a avisos
  no bloqueantes y guardado habilitado en `app/src/features/techo-un-agua/Warnings.test.tsx`
- [X] T067 [P] [US6] Escribir primero recorrido Playwright de aviso, guardado y reapertura en
  `app/tests/e2e/nonblocking-warnings.spec.ts`

### Implementation for User Story 6

- [X] T068 [US6] Implementar derivación pura de avisos con código estable, ruta y mensaje en español,
  incluidos `LINEAR_DIMENSION_OVER_RECOMMENDED_MAX` y `PURLIN_POSITIONS_REDISTRIBUTED`, en
  `app/src/core/structures/techo-un-agua/warnings.ts`
- [X] T069 [P] [US6] Crear resumen anunciable y mensajes asociados a campos, incluido el umbral lineal
  recomendado y la redistribución de correas, en
  `app/src/features/techo-un-agua/Warnings.tsx`
- [X] T070 [US6] Integrar avisos en cálculo, editor y persistencia regenerada sin bloquear guardado en
  `app/src/core/structures/techo-un-agua/index.ts` y
  `app/src/features/techo-un-agua/RoofEditor.tsx`

**Checkpoint**: Todos los casos incoherentes especificados son comprensibles y recuperables.

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Validación integral, rendimiento, accesibilidad y límites de fase.

- [X] T071 [P] Añadir prueba arquitectónica que impida imports de React, DOM, navegador, Next.js y
  Prisma desde `app/src/core/` en `app/src/core/architecture.test.ts`
- [X] T072 [P] Añadir fixture provisional del cuaderno únicamente como comparación informativa,
  marcado no definitivo hasta confirmación del herrero, en
  `app/src/core/structures/techo-un-agua/__fixtures__/notebook-provisional.ts`
- [ ] T073 [P] Escribir primero pruebas de comparación por tipo, cantidad, longitud, perfil, cortes y
  tolerancias confirmadas en `app/src/core/validation/compare-reference-case.test.ts`
- [X] T074 Implementar comparación pura de renglones manuales y calculados con registro de diferencias
  y decisión del herrero en `app/src/core/validation/compare-reference-case.ts`
- [X] T075 Crear la plantilla del caso confirmado y su informe de diferencias en
  `specs/001-techo-un-agua/reference-validation.md`, sin completarla con cifras provisionales
- [X] T076 Medir y ajustar recálculo <100 ms, apertura/guardado <2 s p95 sin base suspendida y
  exportación <5 s mediante `app/tests/performance/phase-1.performance.test.ts`
- [X] T077 Revisar teclado, foco, etiquetas, regiones anunciables y presentación móvil de los tres
  recorridos en `app/tests/e2e/accessibility-responsive.spec.ts`
- [ ] T078 Ejecutar los cinco escenarios de `specs/001-techo-un-agua/quickstart.md` y registrar
  evidencia sin marcar el caso del cuaderno como aceptado en
  `specs/001-techo-un-agua/validation.md`
- [X] T079 Ejecutar `lint`, `typecheck`, unitarias, integración, build y E2E; corregir solo defectos de
  esta fase y documentar comandos vigentes en `AGENTS.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: inicia inmediatamente.
- **Foundational (Phase 2)**: depende de Setup y bloquea todas las historias.
- **US1 (Phase 3)**: depende de Foundational y constituye el MVP.
- **US2 (Phase 4)**: depende de US1 porque dibuja el cálculo autoritativo.
- **US3 (Phase 5)**: depende de US1; puede avanzar en paralelo con US2.
- **US4 (Phase 6)**: depende de US2 y US3 para cubrir todas las salidas.
- **US5 (Phase 7)**: depende de US1 para regenerar resultados; sus repositorios pueden prepararse en
  paralelo con US2/US3 después de Foundation.
- **US6 (Phase 8)**: depende de US1; puede desarrollar el dominio en paralelo con US2/US3/US5, pero
  la prueba completa requiere guardado de US5.
- **Validación de referencia de US3**: T073–T075 dependen de la confirmación del herrero. Esta
  condición no bloquea las demás historias ni autoriza usar las cifras provisionales como criterio
  definitivo.
- **Polish (Phase 9)**: depende de todas las historias incluidas.

### User Story Dependency Graph

```text
Setup → Foundation → US1 ─┬→ US2 ─┐
                          ├→ US3 ─┼→ US4 ─┐
                          ├→ US5 ─┴───────┼→ Polish
                          └→ US6 ─────────┘
```

### Within Each User Story

- Escribir las pruebas indicadas y observar su fallo antes de implementar.
- Contratos/modelos antes que servicios; servicios antes que páginas e integración.
- El motor produce derivados antes de que UI o exportadores los consuman.
- Cerrar el checkpoint independiente antes de continuar con otra prioridad.

### Parallel Opportunities

- T003–T007 pueden avanzar en paralelo después de T001–T002.
- T009–T010, T012, T014, T020 y T021 trabajan en archivos separados dentro de Foundation.
- En US1, pruebas T022–T024 y módulos T025–T027 pueden repartirse respetando prueba antes de código.
- Tras US1, US2 y US3 pueden ejecutarse en paralelo; la capa de repositorio de US5 también puede
  comenzar sin esperar sus pantallas.
- Dentro de cada historia, todas las tareas `[P]` son candidatas explícitas a paralelización.

## Parallel Examples

### User Story 1

```text
T022 calculation.test.ts | T023 purlins.test.ts | T024 RoofEditor.test.tsx
T025 model.ts            | T026 purlins.ts      | T027 calculation.ts
```

### User Stories 2 and 3

```text
US2: T036–T045 plano y exportación
US3: T046–T052 lista de piezas
```

### User Stories 5 and 6

```text
US5: T057–T064 persistencia
US6: T065–T070 avisos (prueba E2E final después de US5)
```

## Implementation Strategy

### MVP First

1. Completar Setup.
2. Completar Foundation.
3. Completar US1.
4. Detenerse y validar creación, edición, unidades, fórmulas y reparto sin arrastre.
5. No presentar todavía plano, piezas ni persistencia avanzada como completos.

### Incremental Delivery

1. US1: modelo editable y cálculo.
2. US2 + US3: plano/exportación y lista desde el mismo resultado.
3. US4: incertidumbre visible en todas las salidas.
4. US5: ciclo persistido y duplicación independiente.
5. US6: cobertura completa de incoherencias no bloqueantes.
6. Polish: límites, accesibilidad, rendimiento y quickstart.

## Notes

- `[P]` solo indica archivos distintos y ausencia de dependencia inmediata.
- El caso del cuaderno continúa provisional hasta confirmación explícita del herrero.
- No implementar arrastre, dos aguas, aleros, portones, escaleras, barras, consumibles, cubierta,
  catálogo, precios, render, cuentas ni IA.
- No persistir plano, cotas, pendiente, piezas, avisos ni archivos exportados.
- Marcar tareas completadas solo con evidencia proporcional a su alcance.

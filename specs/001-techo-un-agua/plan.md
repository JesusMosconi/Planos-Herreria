# Implementation Plan: Fase 1 - Núcleo y techo a un agua

**Branch**: `001-techo-un-agua` | **Date**: 2026-09-29 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-techo-un-agua/spec.md`

## Summary

Construir una aplicación web para que un herrero cree, edite, guarde, reabra y duplique proyectos de
techo a un agua, obteniendo desde un único modelo paramétrico el plano acotado, los avisos y la lista
estructural. La aplicación vivirá íntegramente en `/app`: Next.js App Router y Tailwind para la
experiencia, un núcleo TypeScript puro validado con Zod, Maker.js como adaptador de geometría y
exportación, y Prisma con PostgreSQL en Neon para persistir solamente la definición versionada.

## Technical Context

**Language/Version**: TypeScript estricto sobre una versión de Node.js compatible con la versión
estable de Next.js fijada por el lockfile al inicializar `/app`

**Primary Dependencies**: Next.js App Router, React, Tailwind CSS 4, Zod, Maker.js, Prisma ORM 7,
adaptador Prisma para Neon y PDFKit

**Storage**: PostgreSQL en Neon; metadatos relacionales de `Proyecto` y definición paramétrica
versionada en `jsonb`; ningún resultado derivado persistido

**Testing**: Vitest en entorno Node para dominio y contratos, React Testing Library para formularios,
integración contra una base de prueba y Playwright para los recorridos completos

**Target Platform**: Navegadores modernos de escritorio y móvil; servidor Next.js desplegado en
Vercel con Root Directory `app`

**Project Type**: Aplicación web full-stack de usuario único

**Performance Goals**: Actualizar plano, resumen, avisos y lista en menos de 100 ms para un proyecto
de Fase 1; abrir o guardar en menos de 2 s p95 sin contar una base suspendida; exportar en menos de 5 s

**Constraints**: Medidas técnicas expresadas internamente en milímetros, admitiendo fracciones de
milímetro cuando una operación geométrica exacta lo requiera; entradas de UI con resolución de 1 mm
y coma o punto decimal, sin separador de miles, espacios internos, signo `+`, valores no numéricos ni
infinitos; dimensiones lineales con aviso sobre 12.000 mm y bloqueo sobre 30.000 mm; cantidad de
correas entera entre 0 y 100; cálculo determinista; motor sin React, DOM, navegador, Next.js ni
Prisma; edición solo por formulario; PDF compartible o imprimible; avisos incoherentes no bloquean
guardado

**Scale/Scope**: Un herrero, un tipo de estructura, tres rutas principales, seis historias, 26
requisitos, dos vistas técnicas y decenas o pocos cientos de proyectos por instalación

## Constitution Check

*GATE: Passed before Phase 0 research. Passed again after Phase 1 design.*

- **Modelo único**: `ProjectDefinitionV1` es la única fuente técnica; derivados no se guardan.
- **Precisión**: fórmulas puras en mm, probadas contra cálculos manuales; exportadores consumen el
  mismo resultado.
- **Herrero primero**: UI convierte coma o punto decimal a mm en límites probados; no incorpora CAD
  genérico.
- **Extensibilidad**: `src/core/structures/registry.ts` es el único registro; cada estructura se aísla.
- **Contrato versionado**: Zod valida lectura/escritura; JSON incluye `schemaVersion` y migraciones.
- **Motor independiente**: `src/core` no importa React, DOM, navegador, Next.js ni Prisma.
- **Edición sincronizada**: solo formulario; cada cambio válido recalcula todos los derivados.
- **Incertidumbre**: la marca pertenece al modelo y aparece en editor, plano, lista y exportación.
- **Plataforma**: Next.js, TypeScript, Tailwind, Zod, Maker.js, Prisma, Neon y Vercel, todo en `/app`.

No se requieren excepciones constitucionales.

## Project Structure

### Documentation (this feature)

```text
specs/001-techo-un-agua/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── domain-contract.md
│   ├── persistence-contract.md
│   ├── export-contract.md
│   └── ui-contract.md
├── design/
└── tasks.md                 # se generará con $speckit-tasks
```

### Source Code (repository root)

```text
app/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── proyectos/
│   │   │   ├── page.tsx
│   │   │   ├── nuevo/page.tsx
│   │   │   └── [id]/page.tsx
│   │   └── api/proyectos/[id]/export/[format]/route.ts
│   ├── core/
│   │   ├── model/
│   │   ├── schemas/
│   │   ├── units/
│   │   ├── drawing/
│   │   ├── export/
│   │   └── structures/
│   │       ├── registry.ts
│   │       └── techo-un-agua/
│   ├── features/
│   │   ├── projects/
│   │   └── techo-un-agua/
│   └── server/
│       ├── actions/
│       ├── db/
│       └── repositories/
├── tests/
│   ├── integration/
│   └── e2e/
└── package.json
```

**Structure Decision**: Un proyecto Next.js en `/app`, router en `src/app`, cálculo puro en
`src/core`, UI en `src/features` y persistencia en `src/server`. Crear, guardar y duplicar usan Server
Actions; la ruta HTTP especial genera descargas porque no hay una API pública en esta fase.

## Design Decisions

### Flujo de cálculo

UI (metros con coma o punto) → mm → Zod → registro central → módulo `techo-un-agua` → geometría semántica,
cotas, piezas y avisos → UI/Maker.js/exportadores. La diagonal es
`hypot(profundidadMm, diferenciaAlturaMm)`; pendiente `% = desnivel / profundidad * 100`; ángulo =
`atan2(desnivel, profundidad)`. Para `n > 1`, posiciones `i * anchoMm / (n - 1)` conservadas sin
redondeo prematuro, aunque resulten fraccionarias en mm; una correa queda en `anchoMm / 2`; cero
produce ninguna. Los parámetros ingresados por el usuario tienen resolución de 1 mm, pero los
resultados derivados mantienen la precisión necesaria para preservar la geometría determinista. El
ángulo conserva la precisión completa y se presenta con un decimal. Cambiar el ancho o la cantidad
de correas descarta las posiciones manuales, vuelve a generar el reparto parejo y produce un aviso
visible.

### Persistencia y compatibilidad

`Proyecto` guarda metadatos consultables y `definition` JSONB. JSON y columna repiten
`schemaVersion` mediante un único constructor. La versión actual se valida, una anterior soportada se
migra con funciones puras y una futura se rechaza sin sobrescribir. Guardar y duplicar validan en
servidor. Duplicar usa una transacción corta y crea una identidad independiente con
`duplicatedFromId`.

### Plano y exportación

El dominio produce `TechnicalDrawing` independiente de Maker.js. El adaptador crea modelos 2D en mm
y capas `estructura`, `cubierta`, `apoyos`, `desague`, `cotas`, `textos`. Vista superior: vigas
paralelas al ancho, correas perpendiculares sobre profundidad. Vista lateral: profundidad horizontal,
desnivel y pendiente. PDF es obligatorio; SVG y DXF reutilizan el modelo. PDF escala un clon a A4
apaisado sin cambiar etiquetas ni medidas.

### Avisos y errores

Dimensiones no positivas o contrato incompleto impiden el derivado imposible. Incoherencias
interpretables producen avisos y permiten editar/guardar. Perfil vacío excluye solo piezas afectadas.
Un fallo de persistencia o exportación nunca borra el modelo en edición.

### Referencias visuales

`design/` orienta composición, no reglas. Se excluyen navegación extra, serif, jerga, datos no
especificados y cualquier dibujo que invierta vigas y correas.

## Post-Design Constitution Check

El modelo persiste solo parámetros versionados; los contratos mantienen una fuente, Zod, motor puro
y salidas derivadas. No hay arrastre. Las pruebas cubren fórmulas, conversiones, persistencia,
duplicación, exportaciones e incertidumbre. **Resultado: PASS**, sin excepciones.

## Complexity Tracking

Sin entradas: no existen violaciones constitucionales que justificar.

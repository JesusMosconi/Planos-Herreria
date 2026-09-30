# Phase 0 Research: Núcleo y techo a un agua

## 1. Aplicación y fronteras

**Decision**: Next.js App Router en `/app`, rutas en `src/app`, dominio puro en `src/core`, UI en
`src/features` y datos en `src/server`. Server Components por defecto e islas cliente para el editor.

**Rationale**: Mantiene el cálculo fuera del router. Server Actions cubren mutaciones internas y
vuelven a validar con Zod.

**Alternatives considered**: `app/app` es válido pero ambiguo; páginas cliente completas mezclan
fronteras; REST interno agrega contrato sin clientes externos.

**Sources**: [Next.js src folder](https://nextjs.org/docs/app/api-reference/file-conventions/src-folder),
[Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components),
[Forms](https://nextjs.org/docs/app/guides/forms).

## 2. Versiones y estilos

**Decision**: Fijar en lockfile la versión estable al inicializar: Next.js App Router, TypeScript
estricto y Tailwind CSS 4 CSS-first. Activar `noUncheckedIndexedAccess`,
`exactOptionalPropertyTypes`, `noImplicitReturns` y rutas tipadas.

**Rationale**: El documento no envejece por números flotantes y el lockfile conserva reproducción.

**Alternatives considered**: Versiones fijas antes del lockfile quedarían desactualizadas; Tailwind 3
solo ante incompatibilidad concreta.

**Sources**: [Next TypeScript](https://nextjs.org/docs/app/api-reference/config/typescript),
[TS strict](https://www.typescriptlang.org/tsconfig/strict),
[Tailwind Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs).

## 3. Persistencia única

**Decision**: Prisma ORM 7 y PostgreSQL/Neon en todos los entornos, conexión agrupada en runtime,
directa en migraciones y adaptador Neon. Metadatos relacionales más definición completa JSONB.

**Rationale**: Una semántica evita otra fuente local; JSONB encaja con el modelo anidado.

**Alternatives considered**: Normalizar todo es prematuro; todo JSON dificulta listado; localStorage
o IndexedDB crea sincronización fuera de alcance.

**Sources**: [Prisma PostgreSQL](https://www.prisma.io/docs/orm/v7/core-concepts/supported-databases/postgresql),
[Prisma JSON](https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/working-with-json-fields),
[PostgreSQL JSON](https://www.postgresql.org/docs/current/datatype-json.html),
[Neon pooling](https://neon.com/docs/connect/connection-pooling).

## 4. Versionado y duplicación

**Decision**: Zod valida lectura/escritura. La versión actual se valida, anteriores se migran con
funciones puras y futuras se rechazan sin mutar. Duplicación en transacción corta read/create.

**Rationale**: JSONB no garantiza dominio; migraciones puras explicitan compatibilidad; transacción
conserva copia coherente.

**Alternatives considered**: TypeScript solo no protege persistencia; migrar documentos en bloque
aumenta riesgo; leer/crear separado debilita atomicidad.

**Sources**: [Prisma transactions](https://www.prisma.io/docs/orm/prisma-client/queries/transactions),
[Migrate workflows](https://www.prisma.io/docs/orm/prisma-migrate/workflows/development-and-production).

## 5. Geometría y salidas

**Decision**: `Zod -> dominio puro -> resultado derivado -> Maker.js`. Maker.js crea un modelo nuevo
en mm. SVG/DXF salen de él; PDFKit y Maker.js generan A4 apaisado escalando un clon.

**Rationale**: Una tubería evita diferencias. El escalado es explícito porque miles de mm no caben
a 1:1 en A4.

**Alternatives considered**: SVG manual duplica geometría; Canvas no es vectorial; Paper.js es para
interacción futura; guardar exportaciones viola derivación.

**Sources**: [Maker drawing](https://maker.js.org/docs/basic-drawing/),
[Maker exporting](https://maker.js.org/docs/exporting/),
[Exporter API](https://maker.js.org/docs/api/modules/makerjs.exporter.html),
[PDFKit](https://pdfkit.org/docs/getting_started.html).

## 6. Pruebas y despliegue

**Decision**: Vitest/Node para dominio, Testing Library para formulario, integración con base aislada,
Playwright sobre build. `tsc --noEmit` separado. Vercel usa Root Directory `app` y previews.

**Rationale**: Fórmulas rápidas sin DOM; recorridos asíncronos por E2E; runtime no depende de specs.

**Alternatives considered**: Snapshots binarios son frágiles; construir Vercel desde raíz requiere
configuración personalizada innecesaria.

**Sources**: [Next testing](https://nextjs.org/docs/app/guides/testing),
[Vitest](https://vitest.dev/guide/), [Playwright](https://playwright.dev/docs/intro),
[Vercel builds](https://vercel.com/docs/builds/configure-a-build).

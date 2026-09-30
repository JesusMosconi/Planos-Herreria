# Notas de seguridad

**Fecha de revisión:** 2026-09-29

## Estado de `npm audit`

`npm audit` reporta cuatro vulnerabilidades de severidad alta asociadas con:

- `prisma`
- `@prisma/config`
- `deepmerge-ts`
- `mysql2`

Estos paquetes vulnerables pertenecen al toolchain de desarrollo del CLI de Prisma 7.10.0. Aunque
`prisma` está declarado como dependencia de desarrollo, `npm audit --omit=dev` también informa los
hallazgos porque `prisma` figura como peer opcional de `@prisma/client`.

No existe una versión estable de Prisma 7.x posterior a 7.10.0. Se descartaron estas remediaciones:

- Downgrade a Prisma 6.19.3: supone un cambio de major incompatible.
- Actualización a Prisma 8.0.0-rc.19: es una release candidate, no una versión estable.

El runtime de producción utiliza solamente `@prisma/client` y `@prisma/adapter-neon`, que no están
afectados por estos avisos. El 2026-09-29 se verificó mediante un build de producción que ni
`prisma` (CLI), ni `@prisma/config`, ni `deepmerge-ts`, ni `mysql2` aparecen en la salida desplegable
de `.next`; solo se incluye el runtime de `@prisma/client`.

## Seguimiento

Revisar nuevamente `npm audit` y las versiones disponibles cuando se publique un parche estable de
Prisma 7 o la versión estable de Prisma 8.

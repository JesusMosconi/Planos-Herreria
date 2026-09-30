# Persistence Contract

- `listProjects()`: id, nombre, tipo, actualización y marca; sin derivados.
- `createProject(input)`: Zod, coherencia de versión e identidad nueva.
- `openProject(id)`: valida actual, migra antiguas soportadas, rechaza futura sin sobrescribir.
- `saveProject(id, expectedUpdatedAt, definition)`: valida y evita pisar cambios concurrentes; avisos
  de dominio no bloquean.
- `duplicateProject(sourceId, requestedName?)`: transacción corta; nueva identidad/fechas, definición
  inicialmente equivalente y `duplicatedFromId`; nunca copia derivados.

Errores: `validation`, `not_found`, `unsupported_schema`, `conflict`, `storage_failure`. No exponer
Prisma ni secretos. `DATABASE_URL`/`DIRECT_URL` quedan solo en servidor; producción usa
`prisma migrate deploy`, no `db push`.

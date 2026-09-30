# Persistence Contract

- `listProjects()`: id, nombre, tipo, actualización y marca; sin derivados.
- `createProject(input)`: Zod V2, coherencia de versión e identidad nueva.
- `openProject(id)`: valida V2; migra V1 de forma pura conservando los datos no afectados,
  descartando posiciones manuales de correas y redistribuyéndolas sobre la profundidad horizontal;
  devuelve un aviso explícito y no persiste V2 hasta el siguiente guardado; rechaza versiones futuras
  sin sobrescribir.
- `saveProject(id, expectedUpdatedAt, definition)`: valida y evita pisar cambios concurrentes; avisos
  de dominio no bloquean.
- `duplicateProject(sourceId, requestedName?)`: transacción corta; migra primero a V2 si corresponde;
  nueva identidad/fechas, definición V2 inicialmente equivalente y `duplicatedFromId`; nunca copia
  derivados.

Errores: `validation`, `not_found`, `unsupported_schema`, `conflict`, `storage_failure`. No exponer
Prisma ni secretos. `DATABASE_URL`/`DIRECT_URL` quedan solo en servidor; producción usa
`prisma migrate deploy`, no `db push`.

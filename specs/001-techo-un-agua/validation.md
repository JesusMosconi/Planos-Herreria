# Evidencia de validación de Fase 1

## Automatizada

- `npm.cmd run test`: 47 pruebas aprobadas.
- `npm.cmd run typecheck`: aprobado.
- `npm.cmd run lint`: aprobado.
- `npm.cmd run build`: aprobado; seis rutas generadas.
- `npm.cmd run test:integration`: dos pruebas aprobadas contra `TEST_DATABASE_URL`.
- `npm.cmd run test:e2e -- --reporter=line --workers=1`: seis recorridos aprobados en Chromium.
- Migración `0001_initial`: aplicada correctamente en desarrollo mediante `DIRECT_URL` y en test
  mediante `TEST_DATABASE_URL`; no se aplicaron migraciones a otras bases.

## Rendimiento T076

Medición contra la base de test, calentando primero la conexión para excluir una base suspendida:

| Operación | Métrica real | Límite | Resultado |
|---|---:|---:|---|
| Recálculo con 100 correas | 0,330 ms promedio | <100 ms | Aprobado |
| Apertura | 71,50 ms p95 | <2.000 ms | Aprobado |
| Guardado | 144,86 ms p95 | <2.000 ms | Aprobado |
| Apertura, cálculo y exportación PDF/SVG/DXF | 122,54 ms p95 | <5.000 ms | Aprobado |

## Accesibilidad y recorridos T077

- Creación móvil: foco visible y ausencia de desbordamiento horizontal.
- Editor móvil: pestañas identificadas, campos etiquetados y resultado de guardado anunciado.
- Listado de escritorio: navegación operable por teclado.
- Avisos: guardado y reapertura sin bloqueo ni pérdida.
- Ciclo de proyecto: crear, guardar, abrir, duplicar y comprobar independencia.
- Plano/lista: visualización y descargas PDF, SVG y DXF.

## Quickstart

1. Cálculo manual: cubierto por pruebas determinísticas de diagonal, pendiente, seis correas,
   longitudes y cortes a 90°.
2. Plano y exportación: cubierto por pruebas semánticas y E2E de PDF/SVG/DXF.
3. Avisos: cubierto por pruebas de todos los códigos y E2E de persistencia no bloqueante.
4. Persistencia y duplicación: integración y E2E aprobados contra la base de test.
5. Esquema: fixtures V1, V0, ausente, inválido y futuro cubiertos por pruebas. La medición de
   creación, interpretación y guardado en diez minutos o menos con un herrero real sigue pendiente.

Por esa última comprobación humana, T078 permanece sin marcar. El caso del cuaderno continúa sin
aceptarse y no fue usado como verdad técnica.

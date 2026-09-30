# Precisión de medidas y cálculo Checklist: Fase 1 - Núcleo y techo a un agua

**Purpose**: Evaluar si los requisitos de unidades, conversiones, pendiente, reparto de correas,
cortes y comunicación de medidas aproximadas son completos, claros, consistentes y medibles.
**Created**: 2026-09-29
**Feature**: [spec.md](../spec.md)

**Note**: Este checklist personalizado fue generado por `$speckit-checklist` para revisar la calidad
de los requisitos, no la implementación.
**Review Ownership**: Este artefacto pertenece al revisor. Marcar `[x]` únicamente cuando el revisor
determine que el criterio de calidad de requisitos está satisfecho.
**Marker Semantics**: `[x]` significa que el criterio fue revisado y aprobado como requisito. No
significa que la implementación esté terminada.

## Completitud de requisitos

- [x] CHK001 ¿Están enumeradas todas las medidas que deben ingresarse, almacenarse, calcularse y
  mostrarse, junto con la unidad correspondiente en cada límite? [Completeness, Spec §FR-003–FR-005]
- [x] CHK002 ¿Está definido que ancho, profundidad horizontal, diferencia de altura, posiciones y
  longitudes exactas comparten milímetros como unidad interna? [Completeness, Gap, Constitution §III]
- [x] CHK003 ¿Están especificados tanto el análisis de coma decimal de entrada como el formateo de
  salida, incluidos guardar, abrir, duplicar y exportar? [Completeness, Spec §FR-003, Edge Cases]
- [x] CHK004 ¿Están documentadas las fórmulas autoritativas para pendiente porcentual, ángulo y largo
  diagonal de correas, identificando las magnitudes usadas? [Completeness, Spec §FR-004–FR-005,
  §FR-025]
- [x] CHK005 ¿Están definidos los resultados para cantidad de correas igual a cero, uno y más de uno,
  incluidos extremos y número de espacios? [Completeness, Spec §FR-006, §FR-025]
- [x] CHK006 ¿Está explícito que cada viga y cada correa tiene dos cortes de 90°, y que el agrupamiento
  de piezas conserva ambos ángulos? [Completeness, Spec §FR-014, §FR-024–FR-025]
- [x] CHK007 ¿Están enumeradas todas las salidas donde debe aparecer la marca de medidas aproximadas,
  incluido editor, plano, lista, persistencia y toda exportación? [Completeness, Spec §FR-013,
  §FR-016, SC-007]

## Claridad y precisión

- [x] CHK008 ¿La expresión “metros con coma decimal” define formatos aceptados y evita ambigüedad
  respecto de punto decimal, separadores de miles, espacios, signo y precisión admitida? [Ambiguity,
  Spec §FR-003]
- [x] CHK009 ¿La conversión de metros a milímetros aclara la política para fracciones menores a 1 mm,
  incluidos rechazo o redondeo y su dirección? [Clarity, Gap, Constitution §III]
- [x] CHK010 ¿“Longitud exacta” distingue inequívocamente el valor técnico sin redondear del valor
  formateado que ve el herrero? [Clarity, Spec §FR-014, SC-003]
- [x] CHK011 ¿“Diferencia de altura entre apoyos” identifica sin ambigüedad cuáles son los dos apoyos o
  bordes de referencia y que no representa alturas absolutas? [Clarity, Spec §FR-004, §FR-026]
- [x] CHK012 ¿La profundidad está definida consistentemente como distancia horizontal entre borde alto
  y bajo, diferenciada de la longitud inclinada de la correa? [Clarity, Spec §FR-004, §FR-025]
- [x] CHK013 ¿La frase “n-1 espacios iguales” establece con precisión el eje sobre el que se reparten
  las correas y cómo se representan posiciones no enteras en mm? [Clarity, Spec §FR-006, §FR-025]
- [x] CHK014 ¿La marca de incertidumbre tiene un texto canónico y requisitos de visibilidad que evitan
  que una medida aproximada se interprete como confirmada? [Clarity, Spec §FR-016, Constitution §VIII]

## Consistencia entre artefactos

- [x] CHK015 ¿Son consistentes spec, plan, modelo de datos y contrato de UI al situar metros con coma
  únicamente en presentación y milímetros en el núcleo? [Consistency, Spec §FR-003, Plan §Technical
  Context, Data Model §Principios]
- [x] CHK016 ¿Coinciden spec y plan en calcular pendiente desde profundidad horizontal y diferencia de
  altura, sin aceptar una pendiente independiente? [Consistency, Spec §FR-004–FR-005, Plan §Flujo de
  cálculo]
- [x] CHK017 ¿Coinciden las reglas de distribución de correas en requisitos, entidades, fórmulas y casos
  límite para `n=0`, `n=1` y `n>1`? [Consistency, Spec §FR-006, §FR-025, Data Model §Entidades]
- [x] CHK018 ¿Son consistentes la geometría, la lista de piezas y las cotas al asignar ancho a las
  vigas y diagonal de profundidad/desnivel a las correas? [Consistency, Spec §FR-024–FR-026]
- [x] CHK019 ¿La exigencia de cortes 90°/90° coincide entre requisitos, definición de entidades,
  agrupamiento y criterio de comparación manual? [Consistency, Spec §FR-014, §FR-022,
  §FR-024–FR-025]
- [x] CHK020 ¿La persistencia de la marca aproximada y su derivación en todas las salidas están
  descritas sin convertir plano o lista en fuentes independientes? [Consistency, Spec §FR-010,
  §FR-016–FR-017, Constitution §I]

## Calidad de criterios de aceptación

- [x] CHK021 ¿Los criterios permiten comparar objetivamente valores internos en mm con su presentación
  en metros sin pérdida de magnitud tras un ciclo guardar/abrir/duplicar? [Measurability, Spec Edge
  Cases, SC-004–SC-005]
- [x] CHK022 ¿Existe una tolerancia explícita o una regla de igualdad para comparar raíces y funciones
  trigonométricas con cálculos manuales? [Measurability, Gap, Spec §SC-003]
- [x] CHK023 ¿El criterio del reparto de correas permite decidir objetivamente si todos los espacios
  son iguales cuando el ancho no es divisible exactamente en milímetros por `n-1`? [Measurability,
  Gap, Spec §FR-006]
- [x] CHK024 ¿Los criterios de la lista definen el nivel de precisión visible para longitud y ángulo
  sin contradecir la conservación del valor exacto? [Measurability, Gap, Spec §FR-014, SC-003]
- [x] CHK025 ¿SC-007 identifica de forma exhaustiva y medible qué plano, lista y formatos exportados
  deben incluir la advertencia? [Acceptance Criteria, Spec §SC-007, Plan §Plano y exportación]

## Cobertura de escenarios y bordes

- [x] CHK026 ¿Están cubiertos valores con coma equivalentes (`2,9`, `2,90`), mínimos positivos,
  precisión excesiva y entradas parcialmente escritas, sin confundir requisito con decisión de UI?
  [Coverage, Edge Case, Gap]
- [x] CHK027 ¿Están definidos los límites y la respuesta requerida ante cero, negativos, valores muy
  grandes o desbordes en dimensiones y diferencia de altura? [Coverage, Spec Edge Cases]
- [x] CHK028 ¿Los requisitos distinguen una distribución inicial pareja de las posiciones editadas
  posteriormente, incluidas posiciones repetidas, desordenadas o fuera de superficie? [Coverage,
  Spec §FR-006, §FR-019, Edge Cases]
- [x] CHK029 ¿Está especificado si modificar ancho o cantidad debe redistribuir todas las correas,
  preservar posiciones manuales o solicitar una decisión al usuario? [Gap, Alternate Flow]
- [x] CHK030 ¿Está definido cómo se comunica una diferencia de altura sospechosa sin alterar las
  fórmulas ni bloquear el guardado? [Coverage, Exception Flow, Spec Edge Cases, §FR-019]
- [x] CHK031 ¿La marca aproximada cubre activación, desactivación, guardado, reapertura, duplicación y
  fallo de exportación sin estados contradictorios? [Coverage, Primary/Alternate/Recovery, Spec User
  Story 4, §FR-016–FR-018]

## Dependencias, supuestos y trazabilidad

- [x] CHK032 ¿Se mantiene explícitamente como no vinculante el caso provisional del cuaderno y se
  separa de las fórmulas y criterios definitivos hasta confirmación del herrero? [Assumption, Spec
  §FR-022–FR-023, Assumptions]
- [x] CHK033 ¿Cada regla crítica de precisión puede rastrearse desde la constitución hasta un requisito
  funcional y un criterio de aceptación, sin depender únicamente del plan? [Traceability,
  Constitution §II–III, Spec §FR-003–FR-006, §FR-014, §FR-024–FR-025]
- [x] CHK034 ¿Está documentado que ninguna referencia visual con puntos decimales, vigas/correas
  invertidas o cálculos inconsistentes prevalece sobre el spec? [Conflict, Design README,
  Spec §FR-003, §FR-024–FR-026]
- [x] CHK035 ¿Las decisiones pendientes sobre precisión de presentación, tolerancias y redistribución
  están marcadas como requisitos por resolver antes de generar tareas de implementación? [Gap,
  Readiness]

## Notes

- Marcar `[x]` solo cuando la revisión confirme la calidad del requisito.
- Dejar sin marcar todo punto que requiera aclaración, corrección o decisión del revisor.
- `$speckit-implement` lee el estado del checklist como compuerta y no modifica las marcas.
- `checklists/requirements.md` mantiene su ciclo separado de `$speckit-specify` y `$speckit-clarify`.
- Agregar comentarios y enlaces a decisiones junto al ítem correspondiente.

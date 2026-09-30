<!--
Sync Impact Report
- Version change: 1.0.0 -> 1.0.1
- Modified principles:
  - IV. Arquitectura extensible -> aclarado el registro central único de tipos
- Added principles: ninguno
- Added sections: ninguna
- Removed sections: ninguna
- Follow-up TODOs: ninguno
-->

# Constitución del Diseñador Digital para Herrería

## Core Principles

### I. Modelo paramétrico como única fuente de verdad

El modelo paramétrico DEBE ser la única representación autoritativa de cada proyecto. El plano
técnico, las cotas, las vistas, la lista de piezas y toda salida futura, incluidos presupuesto y
render, DEBEN derivarse del mismo modelo. Estas salidas NO DEBEN guardarse ni editarse como fuentes
independientes. Toda operación de edición DEBE modificar el modelo y regenerar sus derivados.

Rationale: una única fuente evita discrepancias entre lo diseñado, lo medido, lo cotizado y lo
fabricado.

### II. Precisión determinística

Toda medida técnica DEBE calcularse mediante funciones puras, reproducibles y libres de estado de
interfaz. Una misma entrada y versión de esquema DEBEN producir exactamente la misma geometría,
piezas y cotas. Las fórmulas de cada estructura DEBEN tener tests contra casos de referencia
calculados a mano. El render es una capa visual separada y NO DEBE modificar, inferir ni redondear
medidas técnicas.

Rationale: el herrero debe poder confiar en que un resultado puede verificarse y repetirse.

### III. El software se adapta al herrero

La experiencia DEBE priorizar rapidez, claridad y el flujo de trabajo real del herrero. La interfaz
DEBE mostrar metros con coma decimal cuando corresponda a su forma de trabajo, mientras el núcleo
DEBE representar longitudes internamente en milímetros. Toda conversión DEBE ocurrir en límites
explícitos y probados. El producto NO DEBE evolucionar hacia un CAD genérico ni exigir conceptos de
dibujo técnico que no aporten al trabajo de herrería definido por cada fase.

Rationale: el valor del producto está en reducir fricción en el taller, no en replicar AutoCAD.

### IV. Arquitectura extensible

Cada tipo de estructura DEBE implementar un contrato común de parámetros a geometría, piezas y
cotas. Incorporar un tipo nuevo DEBE consistir en agregar un módulo nuevo y registrarlo en un único
registro central de tipos. Ese registro es la única modificación permitida fuera del módulo nuevo.
No se DEBEN modificar los módulos de estructuras existentes ni distribuir condicionales por tipo en
la aplicación. La salida cruda de piezas DEBE conservar longitud exacta, perfil y ángulos de corte
desde su primera implementación. El catálogo de precios DEBE permanecer separado del motor de
geometría.

Rationale: la expansión del catálogo no debe degradar ni acoplar el núcleo geométrico.

### V. Contrato de datos versionado

El esquema Zod de parámetros DEBE ser el contrato compartido por formulario, motor de cálculo,
persistencia e integraciones futuras. Todo JSON persistido DEBE incluir `schemaVersion`. Cualquier
cambio incompatible DEBE incluir una estrategia explícita de migración o lectura compatible antes
de adoptarse. Ninguna capa DEBE aceptar como técnico un dato que no haya sido validado por el
esquema correspondiente.

Rationale: el versionado protege proyectos antiguos y evita interpretaciones divergentes de datos.

### VI. Motor independiente de la UI

El motor de cálculo NO DEBE depender de React, del DOM, de APIs del navegador ni del estado de la
interfaz. DEBE estar implementado como TypeScript ejecutable y comprobable tanto en servidor como
en entornos de test. Maker.js puede usarse para geometría y exportaciones; Paper.js o SVG solo
PUEDEN intervenir en la capa de interacción y arrastre.

Rationale: separar cálculo e interfaz permite probar, reutilizar y ejecutar el núcleo con garantías.

### VII. Edición dual sincronizada

El formulario y el arrastre sobre el dibujo DEBEN leer y modificar el mismo modelo paramétrico.
Cada edición válida DEBE producir una única actualización del modelo y regenerar todas las vistas
derivadas. Las decisiones discretas, como cantidad de escalones, tipo de movimiento o sentido,
DEBEN realizarse mediante formulario o botón y NUNCA mediante arrastre. El arrastre solo PUEDE
ajustar magnitudes continuas permitidas por el contrato de la estructura.

Rationale: dos representaciones editables solo son seguras si comparten estado y límites claros.

### VIII. Transparencia sobre la incertidumbre

Cada proyecto DEBE poder marcar sus medidas como `aproximadas / a confirmar en obra`, y esa
condición DEBE permanecer visible en las salidas técnicas pertinentes. Todos los valores por defecto
DEBEN ser editables y NO DEBEN presentarse como mediciones confirmadas. Cualquier asistencia futura
de IA DEBE requerir confirmación humana antes de convertir una sugerencia en dato técnico.

Rationale: comunicar incertidumbre evita que supuestos o estimaciones se fabriquen como certezas.

## Restricciones técnicas y de alcance

- La aplicación DEBE usar Next.js, TypeScript y Tailwind para la experiencia web.
- La persistencia DEBE usar Prisma con PostgreSQL en Neon, y el despliegue objetivo es Vercel.
- Maker.js DEBE ser la base de geometría y de exportación SVG, PDF y DXF.
- Paper.js o SVG PUEDEN usarse únicamente para la capa de arrastre y no como fuente de medidas.
- Zod DEBE definir y validar los contratos de parámetros y sus versiones.
- El código de la aplicación DEBE residir en la carpeta `/app` de la raíz del proyecto.
- Quedan fuera de alcance un CAD completo tipo AutoCAD, ERP, gestión de stock, fabricación CNC y
  automatización integral mediante IA.
- La IA, si se incorpora, solo PUEDE actuar como asistente; el usuario DEBE confirmar cualquier dato
  antes de que adquiera carácter técnico.

## Flujo de desarrollo y entrega por fases

El MVP DEBE dividirse en fases, y cada fase DEBE contar con sus propios `spec.md`, `plan.md` y
`tasks.md`. Cada especificación DEBE declarar qué tipo de estructura o capacidad entrega y qué
criterios permiten verificarla. Las fases posteriores DEBEN heredar esta constitución y NO DEBEN
redefinir el contrato del núcleo sin una enmienda constitucional y una estrategia de compatibilidad.

Antes de aprobar una fase, la revisión DEBE comprobar como mínimo: derivación desde el modelo único,
validación Zod, independencia del motor respecto de la UI, determinismo de fórmulas y tests de casos
de referencia manuales. Toda excepción o complejidad adicional DEBE justificarse en el plan de la
fase y demostrar que no contradice los principios anteriores.

## Governance

Esta constitución prevalece sobre especificaciones, planes, tareas y decisiones de implementación.
Toda revisión de una fase o cambio al núcleo DEBE verificar explícitamente su cumplimiento. Una
enmienda requiere documentar la motivación, el impacto sobre proyectos existentes y, cuando cambie
un contrato, el plan de migración o compatibilidad.

El versionado de esta constitución sigue SemVer: MAJOR para eliminar o redefinir de forma
incompatible un principio o regla de gobernanza; MINOR para agregar un principio, sección o
exigencia material; PATCH para aclaraciones que no cambien obligaciones. La fecha de última enmienda
DEBE actualizarse con cada cambio adoptado. Todo incumplimiento conocido DEBE corregirse antes de
considerar terminada la fase o registrarse como excepción explícita, temporal y aprobada con su
remediación prevista.

**Version**: 1.0.1 | **Ratified**: 2026-09-28 | **Last Amended**: 2026-09-28

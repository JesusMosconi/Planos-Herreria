# Domain Contract

El motor recibe solo `ProjectDefinition` validado, nunca componentes, formulario, Prisma o Maker.js.
El registro central asocia `structureType` con esquema Zod y `calculate(definition)` puro.

Para igual definición/versión devuelve igual resultado: pendiente; dos vigas de longitud ancho;
correas según posiciones y diagonal; cortes 90°; piezas agrupadas; dos vistas; cotas y avisos.

Invariantes: ningún cálculo usa metros formateados; no hay redondeo técnico prematuro; la caída cambia
orientación, no magnitudes; cero elementos no crea piezas; avisos no corrigen valores; no se leen
reloj, red, base, DOM ni estado global.

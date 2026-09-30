# Domain Contract

El motor recibe solo `ProjectDefinition` validado, nunca componentes, formulario, Prisma o Maker.js.
El registro central asocia `structureType` con esquema Zod y `calculate(definition)` puro.

Para igual definición/versión devuelve igual resultado: pendiente; dos vigas cuya longitud es la
diagonal de profundidad y desnivel; correas según posiciones horizontales sobre la profundidad y de
longitud igual al ancho; cortes 90°; piezas agrupadas; dos vistas; cotas y avisos. Una diagonal de
viga mayor que 4.500 mm es inválida y no genera empalmes ni combinaciones de barras.

Invariantes: ningún cálculo usa metros formateados; no hay redondeo técnico prematuro; la caída cambia
orientación, no magnitudes ni posiciones manuales medidas desde el borde frontal fijo; cambiar solo
el desnivel tampoco redistribuye correas; cero elementos no crea piezas; avisos no corrigen valores;
no se leen reloj, red, base, DOM ni estado global.

# Data Model: Núcleo y techo a un agua

## Principios

- Las longitudes técnicas se expresan internamente en milímetros.
- Los parámetros ingresados por el usuario se convierten a milímetros enteros.
- Los resultados derivados pueden conservar fracciones de milímetro sin redondeo prematuro.
- `ProjectDefinitionV2`: única fuente técnica actual.
- Todo JSON guardado nuevo incluye `schemaVersion: 2`.
- Plano, pendiente, cotas, piezas y avisos son derivados.

## Entidades persistidas

### Proyecto

| Campo | Tipo | Reglas |
| --- | --- | --- |
| `id` | UUID/CUID | Nuevo al crear o duplicar |
| `name` | string | Obligatorio y recortado |
| `client`, `notes` | string | Texto libre, puede ser vacío |
| `structureType` | `TECHO_UN_AGUA` | Único tipo de Fase 1 |
| `approximateMeasurements` | boolean | Controla advertencia global |
| `schemaVersion` | integer | Coincide con el JSON |
| `definition` | JSONB | `ProjectDefinitionV2` validado; V1 solo se admite como entrada de migración |
| `duplicatedFromId` | id opcional | Origen informativo, sin sincronización |
| `createdAt`, `updatedAt` | timestamp | Asignados por servidor |

### ProjectDefinitionV2

Contiene `schemaVersion: 2`, `structureType: techo-un-agua`, metadatos editables del proyecto y
`parameters: TechoUnAguaParametersV2`. Un constructor único mantiene coherentes columnas y JSON.

### TechoUnAguaParametersV2

| Campo | Tipo | Reglas |
| --- | --- | --- |
| `widthMm` | integer | > 0 y <= 30000; sobre 12000 genera aviso |
| `horizontalDepthMm` | integer | > 0 y <= 30000; sobre 12000 genera aviso; nunca diagonal |
| `heightDifferenceMm` | integer | > 0 y <= 30000; sobre 12000 o si supera profundidad, aviso |
| `fallDirection` | enum | `front/back`; `front` es el borde inferior de la vista superior y `back` el borde superior |
| `purlins` | colección | Puede ser vacía; posiciones horizontales sobre profundidad |
| `supports` | colección | Posiciones dentro o fuera de superficie |
| `drainage` | objeto | Canaleta opcional y bajadas |
| `profiles` | objeto | Texto separado para vigas y correas |

`CorreaParam` tiene id estable y `positionMm`, medido horizontalmente desde el borde frontal fijo:
`0` es el borde frontal y `horizontalDepthMm` el posterior. Al cambiar cantidad: cero → `[]`, una →
centro de la profundidad, `n > 1` → ambos bordes y `n-1` espacios horizontales iguales. Las
posiciones inicialmente derivadas conservan fracciones de milímetro cuando son necesarias para
mantener espacios iguales; una edición manual tiene resolución de 1 mm. La edición individual
conserva valores fuera de rango, repetidos o desordenados y genera avisos. La cantidad de correas es
un entero entre 0 y 100 inclusive. Cambiar `horizontalDepthMm` o la cantidad reemplaza la colección
actual por posiciones nuevamente distribuidas, descarta las posiciones manuales anteriores y genera
un aviso de redistribución. Cambiar solo `heightDifferenceMm` o `fallDirection` conserva esas
posiciones y no las refleja.

`ApoyoParam` tiene id, `xMm`, `yMm` y etiqueta opcional. No posee longitud/cortes porque no se
inventan alturas. `DrainageParam` tiene canaleta habilitada, borde y bajadas posicionadas; otro borde
o bajadas incoherentes generan avisos y no entran a la lista estructural.

## Entidades derivadas

### RoofCalculation

Resultado inmutable con diagonal, pendiente, geometría semántica, cotas, piezas y avisos. El ángulo
conserva la precisión completa del cálculo y su representación para UI usa exactamente un decimal.

### StructuralPiece

Tipo `beam` o `purlin`, longitud exacta, perfil y cortes 90°/90°. Se agrupa por esos cuatro valores;
no redondea. Vigas = hipotenusa de profundidad y desnivel; correas = ancho. Hay exactamente dos
vigas y cada una debe caber en una barra de compra de 4.500 mm; esta fase no calcula empalmes ni
combinaciones de barras.

### TechnicalDrawing

Dos vistas en mm, cotas, etiquetas, identidad, advertencia y capas semánticas. Superior: superficie,
dos vigas que recorren la profundidad en los lados del ancho, correas paralelas al ancho, apoyos y
desagüe. Lateral: profundidad horizontal, desnivel y diagonal de las vigas.

### Warning

Código estable, ruta de campo, mensaje español y severidad `warning`. Cubre desnivel sospechoso,
correas fuera/repetidas/desordenadas, apoyo fuera, canaleta fuera del borde bajo, bajada incoherente,
`LINEAR_DIMENSION_OVER_RECOMMENDED_MAX` para valores sobre 12000 mm y
`PURLIN_POSITIONS_REDISTRIBUTED` al regenerar posiciones manuales. Valores mayores que 30000 mm,
cantidades de correas superiores a 100, valores no finitos y diagonales de viga mayores que 4500 mm
son errores de validación, no avisos.

## Validación y transiciones

1. **Borrador UI inválido**: texto parcial; no entra al motor ni se persiste.
2. **Modelo válido parcial**: perfil vacío impide solo piezas afectadas.
3. **Modelo válido con avisos**: calcula y guarda; avisos se regeneran.
4. **Modelo completo**: produce todas las salidas.

- Crear: defaults editables → validar V2 → insertar.
- Guardar: validar V2 → actualizar id actual → regenerar.
- Abrir V2: leer → validar → calcular.
- Abrir V1: leer → migrar de forma pura a V2 conservando los demás datos → descartar posiciones
  manuales de correas → redistribuir según cantidad sobre `horizontalDepthMm` → devolver la causa de
  migración `purlin-positions-redistributed` → materializar el aviso de redistribución en el módulo de
  avisos → validar → calcular. La persistencia cambia a V2 recién en el siguiente guardado.
- Duplicar V2: transacción leer/validar/crear → id/fechas nuevos → definición inicial equivalente.
- Duplicar V1: migrar en memoria como al abrir → crear una copia V2 del resultado migrado → mantener
  el original V1 sin modificaciones.
- Versión futura: error explícito y ninguna modificación.

No hay publicación, cuentas, eliminación ni colaboración en Fase 1.

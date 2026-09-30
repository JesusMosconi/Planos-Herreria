# Data Model: Núcleo y techo a un agua

## Principios

- Las longitudes técnicas se expresan internamente en milímetros.
- Los parámetros ingresados por el usuario se convierten a milímetros enteros.
- Los resultados derivados pueden conservar fracciones de milímetro sin redondeo prematuro.
- `ProjectDefinitionV1`: única fuente técnica.
- Todo JSON guardado incluye `schemaVersion: 1`.
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
| `definition` | JSONB | `ProjectDefinitionV1` validado |
| `duplicatedFromId` | id opcional | Origen informativo, sin sincronización |
| `createdAt`, `updatedAt` | timestamp | Asignados por servidor |

### ProjectDefinitionV1

Contiene `schemaVersion: 1`, `structureType: techo-un-agua`, metadatos editables del proyecto y
`parameters: TechoUnAguaParametersV1`. Un constructor único mantiene coherentes columnas y JSON.

### TechoUnAguaParametersV1

| Campo | Tipo | Reglas |
| --- | --- | --- |
| `widthMm` | integer | > 0 y <= 30000; sobre 12000 genera aviso |
| `horizontalDepthMm` | integer | > 0 y <= 30000; sobre 12000 genera aviso; nunca diagonal |
| `heightDifferenceMm` | integer | > 0 y <= 30000; sobre 12000 o si supera profundidad, aviso |
| `fallDirection` | enum | `front/back`; `front` es el borde inferior de la vista superior y `back` el borde superior |
| `purlins` | colección | Puede ser vacía; posiciones sobre ancho |
| `supports` | colección | Posiciones dentro o fuera de superficie |
| `drainage` | objeto | Canaleta opcional y bajadas |
| `profiles` | objeto | Texto separado para vigas y correas |

`CorreaParam` tiene id estable y `positionMm`. Al cambiar cantidad: cero → `[]`, una → centro,
`n > 1` → ambos bordes y `n-1` espacios. Las posiciones inicialmente derivadas conservan fracciones
de milímetro cuando son necesarias para mantener espacios iguales; una edición manual tiene
resolución de 1 mm. La edición individual conserva valores fuera de rango, repetidos o desordenados
y genera avisos. La cantidad de correas es un entero entre 0 y 100 inclusive. Cambiar `widthMm` o la
cantidad reemplaza la colección actual por posiciones nuevamente distribuidas, descarta las
posiciones manuales anteriores y genera un aviso de redistribución.

`ApoyoParam` tiene id, `xMm`, `yMm` y etiqueta opcional. No posee longitud/cortes porque no se
inventan alturas. `DrainageParam` tiene canaleta habilitada, borde y bajadas posicionadas; otro borde
o bajadas incoherentes generan avisos y no entran a la lista estructural.

## Entidades derivadas

### RoofCalculation

Resultado inmutable con diagonal, pendiente, geometría semántica, cotas, piezas y avisos. El ángulo
conserva la precisión completa del cálculo y su representación para UI usa exactamente un decimal.

### StructuralPiece

Tipo `beam` o `purlin`, longitud exacta, perfil y cortes 90°/90°. Se agrupa por esos cuatro valores;
no redondea ni adapta a barras. Vigas = ancho; correas = hipotenusa.

### TechnicalDrawing

Dos vistas en mm, cotas, etiquetas, identidad, advertencia y capas semánticas. Superior: superficie,
vigas paralelas al ancho, correas perpendiculares, apoyos y desagüe. Lateral: profundidad horizontal,
desnivel y diagonal.

### Warning

Código estable, ruta de campo, mensaje español y severidad `warning`. Cubre desnivel sospechoso,
correas fuera/repetidas/desordenadas, apoyo fuera, canaleta fuera del borde bajo, bajada incoherente,
`LINEAR_DIMENSION_OVER_RECOMMENDED_MAX` para valores sobre 12000 mm y
`PURLIN_POSITIONS_REDISTRIBUTED` al regenerar posiciones manuales. Valores mayores que 30000 mm,
cantidades de correas superiores a 100 y valores no finitos son errores de validación, no avisos.

## Validación y transiciones

1. **Borrador UI inválido**: texto parcial; no entra al motor ni se persiste.
2. **Modelo válido parcial**: perfil vacío impide solo piezas afectadas.
3. **Modelo válido con avisos**: calcula y guarda; avisos se regeneran.
4. **Modelo completo**: produce todas las salidas.

- Crear: defaults editables → validar V1 → insertar.
- Guardar: validar V1 → actualizar id actual → regenerar.
- Abrir: leer → despachar versión → migrar si procede → validar → calcular.
- Duplicar: transacción leer/validar/crear → id/fechas nuevos → definición inicial equivalente.
- Versión futura: error explícito y ninguna modificación.

No hay publicación, cuentas, eliminación ni colaboración en Fase 1.

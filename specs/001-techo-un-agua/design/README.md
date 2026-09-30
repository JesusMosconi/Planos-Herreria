# Referencia visual de la Fase 1

## Propósito

Estas capturas provienen de Stitch y son solo referencia visual, no obligatoria. Ante cualquier diferencia entre una captura y `specs/001-techo-un-agua/spec.md`, manda el spec. Las capturas pueden mostrar detalles que no forman parte de la Fase 1; no deben implementarse por estar dibujados.

## Tabla de archivos

| Archivo | Descripción |
| --- | --- |
| `mis-proyectos.png` | Lista de proyectos con botón "Nuevo techo" y acción Duplicar por fila. |
| `editor-plano.png` | Editor con formulario, resultados y plano (vista de arriba y de costado), sin avisos. |
| `editor-con-avisos.png` | Editor con avisos no bloqueantes (correa que no entra en barra de 3 m y canaleta cambiada al borde alto). |
| `lista-de-piezas.png` | Pestaña Lista de piezas con cantidad, pieza, largo, perfil y cortes. |

## Qué no copiar de las capturas

- Navegación adicional (Taller CAD, Lista de Corte, Materiales, usuario).
- Tipografía serif.
- Jerga técnica.
- Columnas o tarjetas extra (por ejemplo "Validación de Cargas y Apoyos").
- Cualquier dibujo con vigas y correas invertidas. En el plano correcto, las vigas van horizontales y las correas verticales.

## Diferencias conocidas por archivo

### `editor-plano.png`

- La cabecera tiene navegación de más (Taller CAD, Lista de Corte, Materiales, ícono de usuario) y la leyenda "Taller metalúrgico activo".
- Usa tipografía serif en valores de campos, resultados, "Nombre de estructura", "Escala 2D Taller" y textos del plano.
- Los campos muestran punto decimal (5.40, 4.15, 0.65); en pantalla va coma.
- Textos técnicos que no van: "Apoyos longitudinales transversales a la pendiente", "Sección de acero estructural sugerida", "Plano técnico de taller", "Resultados calculados", "Define la ubicación del borde bajo de descarga".
- En la vista de arriba las correas (líneas punteadas) están horizontales: vigas y correas están invertidas.
- "Largo de cada correa" muestra 5,40 m (igual al ancho). Debe ser la diagonal entre profundidad horizontal y diferencia de altura (con 4,15 y 0,65 da ≈ 4,20 m).
- La separación de 0,83 m no corresponde a un ancho de 5,40 m con 6 correas (daría 1,08 m).
- La canaleta es un interruptor sí/no; en el spec se propone en el borde bajo y se puede cambiar, con aviso (ver `editor-con-avisos.png`).
- Los datos de ejemplo (5,40 × 4,15 × 0,65) no son el caso de referencia (4,15 × 2,90 × 0,50).

### `editor-con-avisos.png`

- Los campos muestran punto decimal (4.15, 2.90, 0.90); en pantalla va coma.
- La flecha "Caída del agua" apunta a la derecha y está seleccionado "Derecha", pero en la vista de arriba la viga alta está arriba y la baja abajo. Dibujo y control no coinciden; manda el spec.

### `lista-de-piezas.png`

- Usa tipografía serif en "Nombre de estructura", cantidades, largos y cortes.

### `mis-proyectos.png`

- Sin diferencias de contenido. La captura es de baja resolución e incluye el marco de Stitch.

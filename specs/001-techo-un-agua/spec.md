# Feature Specification: Fase 1 - Núcleo y techo a un agua

**Feature Branch**: `001-techo-un-agua`

**Created**: 2026-09-28

**Status**: Ready for implementation

**Input**: User description: "Fase 1: núcleo del proyecto y primera estructura completa, techo a un agua."

## Clarifications

### Session 2026-09-28

- Q: ¿Las vigas son dos elementos paralelos al ancho, ubicados en los bordes alto y bajo, que
  sostienen correas perpendiculares, y su longitud terminada equivale al ancho del techo? → A: Sí;
  dos vigas paralelas al ancho, una alta y otra baja, de longitud terminada igual al ancho.
- Q: ¿Las correas corren perpendiculares a las vigas, desde el borde alto hasta el bajo, se reparten
  sobre el ancho y se cortan a 90° con una longitud real igual a la diagonal formada por profundidad
  y diferencia de altura? → A: Sí.
- Q: ¿El sentido de caída debe indicar cuál de los dos bordes de profundidad queda bajo, dejando el
  opuesto alto, mostrando la vista lateral de alto a bajo, asignando esas alturas a las vigas y
  proponiendo la canaleta en el borde bajo? → A: Sí; la canaleta permanece editable y elegir otro
  lado genera un aviso no bloqueante.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Crear y definir un techo (Priority: P1)

El herrero crea un proyecto con nombre, cliente y notas, selecciona techo a un agua y completa sus
medidas y opciones mediante un formulario que usa metros con coma decimal.

**Why this priority**: Sin un proyecto y un techo completamente definido no existe una fuente desde
la cual generar el plano ni la lista de piezas.

**Independent Test**: Se puede crear un proyecto, completar todos los datos del techo y revisar un
resumen de los valores ingresados y calculados sin usar edición por arrastre.

**Acceptance Scenarios**:

1. **Given** que no existe un proyecto abierto, **When** el herrero indica nombre, cliente y notas,
   elige techo a un agua y confirma, **Then** obtiene un proyecto editable de ese tipo.
2. **Given** un techo a un agua, **When** ingresa ancho, profundidad, diferencia de altura y sentido
   de caída, **Then** ve esas medidas y la pendiente calculada como ángulo o porcentaje.
3. **Given** dimensiones válidas, **When** define una cantidad de correas, **Then** sus posiciones se
   distribuyen de forma pareja y cada posición puede ajustarse por formulario.
4. **Given** un techo definido, **When** agrega apoyos, canaleta, bajadas y perfiles, **Then** el
   resumen refleja sus cantidades, posiciones, lados y descripciones.

---

### User Story 2 - Ver y exportar el plano técnico (Priority: P2)

El herrero consulta un plano derivado de las medidas del proyecto, con vista superior principal y
vista lateral de la pendiente, ambas acotadas.

**Why this priority**: Las medidas visibles y comunicables son el resultado principal que reemplaza
el dibujo del cuaderno.

**Independent Test**: Con un proyecto definido se puede verificar visualmente ambas vistas, sus
cotas y una exportación que conserva la misma información.

**Acceptance Scenarios**:

1. **Given** un techo completamente definido, **When** el herrero abre el plano, **Then** ve la
   superficie de cubierta, correas, apoyos, canaleta y bajadas en la vista que corresponda.
2. **Given** el mismo techo, **When** consulta las cotas, **Then** la vista superior muestra las
   dimensiones y posiciones de planta y la lateral muestra la diferencia de altura y la pendiente.
3. **Given** un plano visible, **When** lo exporta, **Then** el archivo resultante conserva vistas,
   cotas y datos identificatorios necesarios para reconocer el proyecto.

---

### User Story 3 - Obtener la lista de piezas (Priority: P3)

El herrero obtiene una lista estructural calculada desde el mismo techo, agrupada por piezas
equivalentes y preparada para compararla con su cálculo manual.

**Why this priority**: La lista elimina un segundo cálculo manual y permite comprobar que el plano y
las piezas describen el mismo trabajo.

**Independent Test**: Un proyecto con medidas conocidas produce una lista donde cada renglón informa
cantidad, longitud exacta, perfil y ángulos de corte, sin precios ni insumos excluidos.

**Acceptance Scenarios**:

1. **Given** un techo definido, **When** el herrero abre la lista, **Then** cada pieza estructural
   derivable muestra cantidad, longitud exacta, perfil y ángulos de corte.
2. **Given** dos piezas con iguales datos, **When** se genera la lista, **Then** aparecen agrupadas en
   un renglón con la cantidad correcta.
3. **Given** el caso de referencia confirmado por el herrero, **When** se comparan lista automática y
   manual, **Then** cada diferencia puede identificarse por tipo, cantidad, longitud, perfil o corte.

---

### User Story 4 - Comunicar medidas aproximadas (Priority: P4)

El herrero marca que las medidas deben confirmarse en obra para evitar que una estimación parezca un
dato definitivo.

**Why this priority**: Una advertencia persistente reduce el riesgo de fabricar con medidas aún no
verificadas.

**Independent Test**: Al activar la marca, esta queda visible en el proyecto, el plano, la
exportación y la lista de piezas; al desactivarla, desaparece de todos esos lugares.

**Acceptance Scenarios**:

1. **Given** un proyecto con medidas aproximadas, **When** se visualizan o exportan sus resultados,
   **Then** aparece la leyenda "medidas aproximadas / a confirmar en obra".
2. **Given** un proyecto marcado, **When** se guarda y reabre, **Then** la marca permanece activa.

---

### User Story 5 - Guardar, abrir y duplicar (Priority: P5)

El herrero conserva proyectos para retomarlos y crea copias independientes para probar variantes.

**Why this priority**: La persistencia convierte el cálculo en una herramienta de trabajo recurrente
y evita volver a cargar datos.

**Independent Test**: Se guarda un proyecto completo, se cierra, se reabre y se duplica; los datos y
resultados se comparan antes y después.

**Acceptance Scenarios**:

1. **Given** un proyecto completo, **When** se guarda y luego se abre, **Then** recupera exactamente
   sus datos, posiciones, advertencias, plano y lista derivada.
2. **Given** un proyecto guardado, **When** se duplica, **Then** se crea otro proyecto editable con
   los mismos datos iniciales y los cambios de la copia no afectan al original.

---

### User Story 6 - Continuar ante datos incoherentes (Priority: P6)

El herrero recibe avisos comprensibles cuando un dato parece incoherente, sin perder el trabajo ni
quedar bloqueado.

**Why this priority**: En obra hay estimaciones y excepciones legítimas; la aplicación debe advertir
sin sustituir el criterio del usuario.

**Independent Test**: Se coloca un apoyo fuera de la superficie y se comprueba que aparece un aviso,
pero siguen disponibles la edición y el guardado.

**Acceptance Scenarios**:

1. **Given** un valor incoherente pero interpretable, **When** el herrero lo ingresa, **Then** recibe
   un aviso que identifica el dato y puede corregirlo o conservarlo.
2. **Given** uno o más avisos activos, **When** el herrero guarda el proyecto, **Then** el guardado se
   completa sin perder los avisos ni los valores ingresados.

### Edge Cases

- Ancho, profundidad o diferencia de altura iguales a cero o negativos no permiten completar un
  techo calculable y se explican al usuario.
- Una diferencia de altura mayor que la dimensión recorrida por la caída se acepta solo con un aviso
  de incoherencia claramente visible.
- Correas repetidas, fuera de la superficie o en posiciones no ordenadas generan avisos y conservan
  las posiciones ingresadas para que el usuario pueda corregirlas.
- Cero correas o cero bajadas se representa explícitamente y no produce piezas fantasma.
- Una bajada configurada sin canaleta, o fuera del lado elegido para ella, genera un aviso no
  bloqueante.
- Un apoyo fuera de la superficie genera un aviso no bloqueante y permanece editable.
- Perfiles vacíos impiden considerar completa la lista de las piezas afectadas, sin borrar el resto
  del proyecto.
- Los decimales con coma o punto se interpretan como metros; no existe separador de miles, por lo
  que `1.500` equivale a `1,5 m`. Se ignoran espacios al inicio y al final, mientras que espacios
  internos y el signo `+` se rechazan con un mensaje claro.
- Toda dimensión lineal mayor que 12 m genera un aviso no bloqueante; una dimensión mayor que 30 m,
  un valor no numérico o un valor infinito se rechaza. La cantidad de correas debe ser un entero
  entre 0 y 100 inclusive.
- Al modificar el ancho o la cantidad de correas se descartan las posiciones manuales anteriores,
  se vuelve a generar el reparto parejo y se muestra un aviso visible de la redistribución.
- Los valores mostrados no cambian de magnitud al guardar, abrir o duplicar.
- Si una exportación no puede generarse, el proyecto permanece intacto y el usuario puede reintentar.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sistema DEBE permitir crear un proyecto con nombre, cliente en texto libre, notas y
  tipo de estructura techo a un agua.
- **FR-002**: El sistema DEBE permitir editar mediante formulario todos los valores por defecto y
  todos los parámetros incluidos en esta fase.
- **FR-003**: El sistema DEBE mostrar las medidas lineales en metros con coma decimal. La entrada
  DEBE aceptar coma o punto como separador decimal y hasta tres cifras decimales en metros,
  equivalentes a una resolución de 1 mm. No DEBE aceptar separadores de miles: `1.500` DEBE
  interpretarse como `1,5 m`. DEBE ignorar espacios al inicio y al final; los espacios internos, el
  signo `+`, una precisión mayor, los valores no numéricos y los valores infinitos DEBEN rechazarse
  con una explicación y sin redondeo silencioso. Toda dimensión lineal mayor que 12 m DEBE generar
  un aviso no bloqueante y una dimensión mayor que 30 m DEBE rechazarse.
- **FR-004**: El sistema DEBE registrar ancho, profundidad, diferencia de altura entre apoyos y
  sentido de la caída. La profundidad DEBE representar la medida horizontal del techo entre el
  borde alto y el bajo, no la longitud inclinada. El sentido elegido DEBE identificar el borde bajo
  de la profundidad y el borde opuesto DEBE quedar alto. El sentido de caída DEBE admitir únicamente
  los dos sentidos posibles sobre el eje de la profundidad: hacia el borde frontal o hacia el borde
  posterior. El borde frontal DEBE corresponder al borde cercano representado en la parte inferior
  de la vista superior; el borde posterior DEBE ser el borde opuesto, representado en la parte
  superior. Esta referencia DEBE permanecer estable aunque cambie el tamaño o la orientación de la
  pantalla. La pendiente DEBE calcularse sin pedirla como dato independiente.
- **FR-005**: El sistema DEBE mostrar la pendiente calculada como ángulo o porcentaje, dejando claro
  cuál de las dos representaciones se está usando. Todo ángulo mostrado DEBE usar un decimal; su
  cálculo y almacenamiento DEBEN conservar la precisión completa sin redondeo prematuro.
- **FR-006**: El sistema DEBE permitir definir la cantidad de correas, distribuirlas inicialmente a
  separación pareja y editar individualmente sus posiciones mediante formulario. Para `n` correas,
  la primera y la última DEBEN ubicarse sobre los bordes del ancho, con `n-1` espacios iguales entre
  ellas; cuando exista una sola correa, DEBE ubicarse centrada sobre el ancho. Las posiciones
  inicialmente derivadas DEBEN conservar la precisión necesaria en milímetros para mantener esos
  espacios iguales, sin redondeo prematuro. La cantidad de correas DEBE ser un entero entre 0 y 100
  inclusive. Cualquier cambio del ancho o de la cantidad de correas DEBE descartar las posiciones
  manuales anteriores, volver a generar el reparto parejo y mostrar un aviso visible de la
  redistribución.
- **FR-007**: El sistema DEBE permitir ubicar apoyos o columnas por posición dentro o fuera de la
  superficie del techo.
- **FR-008**: El sistema DEBE permitir indicar si existe canaleta, proponer el borde bajo como su
  lado, permitir elegir otro lado con un aviso no bloqueante y definir la cantidad y posición de las
  bajadas de agua.
- **FR-009**: El sistema DEBE permitir identificar los perfiles de correas y vigas mediante texto o
  una lista corta de opciones editables.
- **FR-010**: Toda modificación de parámetros DEBE actualizar el plano y la lista de piezas desde la
  misma definición del proyecto, sin ediciones independientes de esos resultados.
- **FR-011**: El sistema DEBE presentar una vista superior principal y una vista lateral de la
  pendiente, ambas con cotas suficientes para reconstruir las medidas y posiciones representadas.
- **FR-012**: La cubierta DEBE representarse como una superficie y NO DEBE producir cantidades de
  chapas, tornillos, membrana, sellador ni otros materiales de cobertura.
- **FR-013**: El sistema DEBE permitir exportar el plano conservando ambas vistas, cotas y cualquier
  marca de medidas aproximadas.
- **FR-014**: El sistema DEBE generar una lista de piezas estructurales con cantidad, longitud exacta,
  perfil y ángulos de corte para cada grupo de piezas equivalentes. Las longitudes exactas DEBEN
  conservarse internamente sin redondeo prematuro y mostrarse en metros con coma decimal y una
  resolución mínima de 1 mm.
- **FR-015**: La lista NO DEBE incluir cálculo de barras, consumibles, accesorios, materiales de
  cubierta, catálogo ni precios.
- **FR-016**: El sistema DEBE permitir marcar y desmarcar un proyecto como "medidas aproximadas / a
  confirmar en obra" y mostrar la marca en plano, exportación y lista de piezas.
- **FR-017**: El sistema DEBE guardar y reabrir todos los datos editables del proyecto sin cambios y
  regenerar resultados equivalentes.
- **FR-018**: El sistema DEBE duplicar un proyecto como una entidad independiente que conserve los
  datos del original en el momento de la copia.
- **FR-019**: El sistema DEBE detectar valores incoherentes conocidos, explicar el dato afectado y
  permitir continuar editando y guardando cuando el valor siga siendo interpretable.
- **FR-020**: La edición del techo en esta fase DEBE realizarse solo por formulario; no debe existir
  edición por arrastre.
- **FR-021**: El sistema NO DEBE incluir techo a dos aguas, alero, portones, escaleras, render ni
  asistencia mediante IA en esta fase.
- **FR-022**: Una vez confirmado el caso de referencia por el herrero, la validación DEBE registrar,
  por cada renglón manual y calculado, tipo de pieza, cantidad, longitud, perfil, ángulos de corte,
  cada diferencia encontrada y su aceptación o corrección por el herrero.
- **FR-023**: El caso de referencia NO DEBE convertirse en criterio definitivo de aceptación hasta
  que el herrero confirme las cifras dudosas del dibujo original y el significado de cada pieza.
- **FR-024**: Cada techo DEBE incluir dos vigas paralelas al ancho: una en el borde alto y otra en el
  borde bajo. Cada viga DEBE tener como longitud terminada el ancho del techo y sostener las correas
  perpendiculares a ellas. Ambos cortes de cada viga DEBEN ser de 90°.
- **FR-025**: Las correas DEBEN correr perpendiculares a las vigas, desde el borde alto hasta el bajo,
  y distribuirse sobre el ancho. Para `n` correas, la primera y la última DEBEN coincidir con los
  bordes del ancho y formar `n-1` espacios iguales; una única correa DEBE quedar centrada. Su longitud
  exacta DEBE ser la diagonal formada por la profundidad y la diferencia de altura, y ambos cortes
  DEBEN ser de 90°.
- **FR-026**: La vista lateral DEBE representar la profundidad desde el borde alto hasta el bajo. La
  viga del borde elegido como sentido de caída DEBE ser la viga baja y la del borde opuesto DEBE ser
  la viga alta.

### Key Entities *(include if feature involves data)*

- **Proyecto**: Trabajo identificable por nombre, cliente, notas, tipo de estructura, estado de
  medidas aproximadas y datos necesarios para guardarlo, abrirlo y duplicarlo.
- **Techo a un agua**: Definición editable de dimensiones, desnivel, sentido de caída, correas,
  apoyos, canaleta, bajadas y perfiles de correas y vigas.
- **Correa**: Elemento estructural perpendicular a las vigas que recorre la pendiente desde el borde
  alto hasta el bajo. Su posición sobre el ancho es ajustable, su longitud es la diagonal de la
  profundidad y la diferencia de altura, y sus cortes son de 90°.
- **Viga**: Elemento estructural paralelo al ancho. El techo contiene una viga en el borde alto y
  otra en el borde bajo; ambas tienen una longitud terminada igual al ancho, sostienen las correas y
  llevan dos cortes de 90°.
- **Apoyo**: Punto colocado por el usuario que condiciona la representación y las validaciones. En
  esta fase su posición no implica una longitud fabricable si esta no puede derivarse de los datos.
- **Elemento de desagüe**: Canaleta o bajada definida por lado, cantidad o posición para aparecer en
  el plano; no forma parte de la lista estructural de esta fase.
- **Plano técnico**: Resultado derivado que reúne vista superior, vista lateral, cotas, identificación
  del proyecto y estado de confirmación de medidas.
- **Renglón de piezas**: Agrupación de piezas estructurales equivalentes por cantidad, longitud
  exacta, perfil y ángulos de corte.
- **Aviso de incoherencia**: Mensaje no bloqueante asociado al dato que requiere revisión.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Un herrero puede crear desde cero un techo a un agua completo y obtener su plano y
  lista de piezas en 10 minutos o menos, sin asistencia técnica.
- **SC-002**: El herrero identifica las medidas principales, el sentido de caída y la pendiente en
  el plano sin ayuda.
- **SC-003**: Para el caso de referencia una vez confirmado, el 100 % de los renglones calculados
  coincide con el cálculo manual validado en cantidad, longitud exacta, perfil y ángulos de corte, o
  presenta una diferencia explicada y aceptada por el herrero. La comparación admite una diferencia
  máxima de 0,5 mm en longitudes y 0,05° en ángulos mostrados; cantidad, perfil y cortes nominales
  DEBEN coincidir exactamente.
- **SC-004**: El 100 % de los proyectos de prueba guardados y reabiertos conserva todos sus datos
  editables y produce un plano y una lista equivalentes a los anteriores al cierre.
- **SC-005**: El 100 % de las copias de prueba comienza con los mismos datos que su original y puede
  modificarse sin alterar ese original.
- **SC-006**: El 100 % de los casos incoherentes definidos en esta especificación muestra un aviso
  asociado al dato y permite seguir editando y guardando sin fallos ni pérdida de información.
- **SC-007**: El 100 % de los planos y listas de proyectos marcados muestra la advertencia de medidas
  aproximadas, incluida toda exportación del plano.

## Assumptions

- El usuario de esta fase es un único herrero; cuentas, roles y colaboración no forman parte del
  alcance solicitado.
- La profundidad es la medida horizontal del techo entre el borde alto y el bajo, no su longitud
  inclinada. El sentido de caída identifica el borde bajo de la profundidad; el borde opuesto queda
  alto. La vista lateral recorre ambos bordes de alto a bajo, y la canaleta se propone en el borde
  bajo sin impedir que el herrero seleccione otro lado.
- El techo lleva exactamente dos vigas paralelas al ancho, una alta y una baja, cuya longitud
  terminada coincide con el ancho. Que los dos tubos del caso de referencia correspondan a estas
  vigas y que 4,5 m sea su longitud de compra siguen pendientes de confirmación con el herrero.
- Los apoyos o columnas se definen por posición. Solo integran la lista de piezas cuando su longitud
  exacta y cortes pueden derivarse de los parámetros disponibles; no se inventan alturas faltantes.
- Canaletas y bajadas se representan en el plano, pero se consideran accesorios y quedan fuera de la
  lista de piezas estructurales de esta fase.
- La exportación debe producir al menos un documento portátil apto para compartir o imprimir; el
  formato concreto se decidirá durante la planificación sin cambiar el resultado funcional.
- El caso de cuaderno de aproximadamente 4,15 × 2,90 m, perfil 40×80×1,6, seis correas cercanas a
  3 m y dos tubos cercanos a 4,5 m es evidencia provisional, no una verdad técnica, hasta ser
  confirmado con el herrero.
- Quedan pendientes de confirmación con el herrero, sin bloquear esta especificación: las medidas
  exactas 4,15 × 2,90 m; el perfil 40×80×1,6; la cantidad de seis correas; si 3 m y 4,5 m son
  longitudes de compra o terminadas; si 83 cm describe la separación; y si los dos tubos de 4,5 m
  corresponden efectivamente a las dos vigas.

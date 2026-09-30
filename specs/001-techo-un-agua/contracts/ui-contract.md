# UI Contract

- `/proyectos`: listar, abrir, crear y duplicar.
- `/proyectos/nuevo`: crear y conducir al editor.
- `/proyectos/[id]`: formulario, resumen, avisos, Plano/Lista y exportación.

Todos los parámetros se editan por formulario, sin arrastre. La UI acepta coma o punto como
separador decimal y hasta tres decimales, elimina espacios al inicio y al final e interpreta `1.500`
como `1,5 m` porque no admite separadores de miles. Rechaza espacios internos, signo `+`, valores no
numéricos, infinitos y dimensiones mayores que 30 m con un mensaje asociado al campo. Texto parcial
permanece en UI hasta ser válido. Decisiones discretas usan controles accesibles.

Las dimensiones mayores que 12 m y menores o iguales que 30 m producen un aviso no bloqueante. La
cantidad de correas admite enteros de 0 a 100. El ángulo se presenta con un decimal, aunque el modelo
conserva precisión completa. Al cambiar ancho o cantidad de correas, la UI sustituye las posiciones
manuales por el reparto parejo y muestra un aviso visible de la redistribución.

Mostrar unidad y coma sin cambiar magnitud al reabrir; identificar porcentaje/ángulo; avisos junto al
dato sin deshabilitar Guardar; advertencia aproximada en plano/lista; vigas siempre paralelas al ancho
y correas perpendiculares. Debe funcionar con teclado/táctil y móvil sin depender de hover.

Las capturas de `../design/` son orientación visual no normativa.

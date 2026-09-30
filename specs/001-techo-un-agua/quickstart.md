# Quickstart Validation: Núcleo y techo a un agua

Guía ejecutable una vez implementadas las tareas; no contiene implementación.

## Prerequisitos

Node.js/npm; PostgreSQL/Neon de desarrollo y base aislada de test; variables `DATABASE_URL`,
`DIRECT_URL`, `TEST_DATABASE_URL` configuradas sin exponer valores.

## Preparación y comprobaciones

```powershell
Set-Location .\app
npm.cmd install
npx.cmd prisma migrate deploy
npm.cmd run dev
```

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run test
npm.cmd run test:integration
npm.cmd run build
npm.cmd run test:e2e
```

## 1. Cálculo manual

Crear ancho 2,90 m, profundidad 4,15 m, desnivel 0,50 m y seis correas. Verificar diagonal
`sqrt(4150² + 500²) ≈ 4180 mm`, pendiente, ángulo y posiciones horizontales
`0, 830, 1660, 2490, 3320, 4150` mm medidas desde el borde frontal. Confirmar dos vigas de
aproximadamente 4.180 mm y seis correas de 2.900 mm, todas con cortes 90°/90°. Cambiar solo el
desnivel o el sentido de caída y confirmar que las posiciones manuales se conservan sin reflejarse;
cambiar profundidad o cantidad y confirmar que se redistribuyen con aviso. Probar que una diagonal
mayor que 4.500 mm bloquea el cálculo con una explicación y sin proponer empalmes. El desnivel y las
medidas del caso siguen siendo provisionales hasta la confirmación del herrero.

## 2. Plano y exportación

Verificar en planta dos vigas sobre los lados del ancho recorriendo la pendiente y correas paralelas
al ancho; en lateral, profundidad horizontal, desnivel y diagonal. Activar medidas aproximadas;
exportar PDF/SVG/DXF; confirmar vistas, cotas, identidad, advertencia, DXF en mm y PDF A4.

## 3. Avisos

Crear correa/apoyo fuera, posición repetida y canaleta fuera del borde bajo. Confirmar avisos sin
corrección automática; guardar/reabrir y regenerarlos. Dimensiones no positivas no generan techo.

## 4. Persistencia y duplicación

Guardar/reabrir V2 y comparar definición/derivados. Duplicar V2: id/fechas nuevos, origen correcto y
datos equivalentes. Duplicar V1: copia nueva con el resultado V2 migrado y original V1 intacto.
Editar cualquier copia sin cambiar el original. Un fallo forzado deja cero copias parciales.

## 5. Esquema y aceptación

Probar fixture V2, V1 con posiciones manuales antiguas, sin versión, inválido y futuro. Al abrir V1,
confirmar conservación de los demás datos, redistribución pareja sobre profundidad, aviso visible y
ausencia de escritura hasta guardar; después del guardado debe persistir como V2. Los errores no
sobrescriben. Con un herrero, cronometrar creación, interpretación y guardado en ≤10 minutos, en
escritorio y móvil.

Véanse [contracts/](./contracts/) y [data-model.md](./data-model.md).

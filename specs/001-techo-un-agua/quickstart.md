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

Crear ancho 4,15 m, profundidad 2,90 m, desnivel 0,50 m y seis correas. Verificar diagonal
`sqrt(2900² + 500²)`, pendiente, ángulo y posiciones `0, 830, 1660, 2490, 3320, 4150` mm. Confirmar
dos vigas de 4.150 mm y seis correas iguales, cortes 90°/90°. Esto prueba fórmulas; no confirma el
caso de cuaderno ni barras comerciales.

## 2. Plano y exportación

Verificar vigas/correas correctas en planta y profundidad/desnivel en lateral. Activar medidas
aproximadas; exportar PDF/SVG/DXF; confirmar vistas, cotas, identidad, advertencia, DXF en mm y PDF A4.

## 3. Avisos

Crear correa/apoyo fuera, posición repetida y canaleta fuera del borde bajo. Confirmar avisos sin
corrección automática; guardar/reabrir y regenerarlos. Dimensiones no positivas no generan techo.

## 4. Persistencia y duplicación

Guardar/reabrir y comparar definición/derivados. Duplicar: id/fechas nuevos, origen correcto y datos
equivalentes. Editar copia sin cambiar original. Un fallo forzado deja cero copias parciales.

## 5. Esquema y aceptación

Probar fixture V1, antiguo soportado, sin versión, inválido y futuro; errores no sobrescriben. Con un
herrero, cronometrar creación, interpretación y guardado en ≤10 minutos, en escritorio y móvil.

Véanse [contracts/](./contracts/) y [data-model.md](./data-model.md).

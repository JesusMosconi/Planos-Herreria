# Export Contract

Toda exportación recibe el mismo `TechnicalDrawing` de la previsualización.

- **PDF** obligatorio: A4 apaisado, ambas vistas, cotas, identidad y advertencia; escala de impresión
  sin cambiar valores.
- **SVG**: vector con `viewBox`, unidades, capas, vistas y textos.
- **DXF**: unidades explícitas en mm y capas equivalentes.

Capas: `estructura`, `cubierta`, `apoyos`, `desague`, `cotas`, `textos`. La ruta acepta id y formato,
abre/valida/calcula en servidor y entrega MIME/nombre seguros. Un fallo no muta el proyecto y puede
reintentarse. Tests verifican firma y semántica, no snapshots binarios completos.

export type MetricParseResult = { readonly ok: true; readonly mm: number } | { readonly ok: false; readonly message: string };

export function parseMetersToMillimeters(raw: string): MetricParseResult {
  const text = raw.trim();
  if (!text) return { ok: false, message: "Ingresá una medida." };
  if (/\s/.test(text)) return { ok: false, message: "No se permiten espacios dentro de la medida." };
  if (text.startsWith("+")) return { ok: false, message: "No se permite el signo +." };
  if (!/^\d+(?:[.,]\d{1,3})?$/.test(text)) return { ok: false, message: "Usá metros con coma o punto y hasta tres decimales." };
  const meters = Number(text.replace(",", "."));
  if (!Number.isFinite(meters)) return { ok: false, message: "La medida debe ser un número finito." };
  const mm = meters * 1000;
  if (!Number.isInteger(mm)) return { ok: false, message: "La resolución máxima es de 1 mm." };
  return { ok: true, mm };
}

export function formatMillimetersAsMeters(mm: number): string {
  return `${(mm / 1000).toFixed(3).replace(".", ",")} m`;
}

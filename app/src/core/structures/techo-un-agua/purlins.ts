import type { PurlinParam } from "@/core/model/types";

export function distributePurlins(widthMm: number, count: number): readonly PurlinParam[] {
  if (!Number.isInteger(count) || count < 0 || count > 100) throw new RangeError("La cantidad de correas debe estar entre 0 y 100.");
  if (count === 0) return [];
  if (count === 1) return [{ id: "purlin-1", positionMm: widthMm / 2, manual: false }];
  return Array.from({ length: count }, (_, index) => ({ id: `purlin-${index + 1}`, positionMm: index * widthMm / (count - 1), manual: false }));
}

export function redistributePurlins(widthMm: number, count: number): { readonly purlins: readonly PurlinParam[]; readonly redistributed: boolean } {
  return { purlins: distributePurlins(widthMm, count), redistributed: true };
}

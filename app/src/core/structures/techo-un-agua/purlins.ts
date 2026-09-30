import type { PurlinParam, TechoUnAguaParametersV2 } from "@/core/model/types";

export function distributePurlins(horizontalDepthMm: number, count: number): readonly PurlinParam[] {
  if (!Number.isInteger(count) || count < 0 || count > 100) throw new RangeError("La cantidad de correas debe estar entre 0 y 100.");
  if (count === 0) return [];
  if (count === 1) return [{ id: "purlin-1", positionMm: horizontalDepthMm / 2, manual: false }];
  return Array.from({ length: count }, (_, index) => ({ id: `purlin-${index + 1}`, positionMm: index * horizontalDepthMm / (count - 1), manual: false }));
}

export function redistributePurlins(horizontalDepthMm: number, count: number): { readonly purlins: readonly PurlinParam[]; readonly redistributed: boolean } {
  return { purlins: distributePurlins(horizontalDepthMm, count), redistributed: true };
}

export function applyPurlinLayoutChange(
  current: TechoUnAguaParametersV2,
  change: Partial<Pick<TechoUnAguaParametersV2, "widthMm" | "horizontalDepthMm" | "heightDifferenceMm" | "fallDirection" | "purlinCount">>,
): TechoUnAguaParametersV2 {
  const next = { ...current, ...change };
  const shouldRedistribute =
    (change.horizontalDepthMm !== undefined && change.horizontalDepthMm !== current.horizontalDepthMm) ||
    (change.purlinCount !== undefined && change.purlinCount !== current.purlinCount);

  if (!shouldRedistribute) return next;

  return {
    ...next,
    purlins: distributePurlins(next.horizontalDepthMm, next.purlinCount),
    purlinPositionsRedistributed: true,
  };
}

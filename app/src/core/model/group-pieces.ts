import type { GroupedPiece, StructuralPiece } from "./types";
export function groupPieces(pieces: readonly StructuralPiece[]): readonly GroupedPiece[] {
  const groups = new Map<string, GroupedPiece>();
  for (const piece of pieces) { const key=[piece.type,piece.lengthMm,piece.profile,piece.cutStartDeg,piece.cutEndDeg].join("|"); const current=groups.get(key); groups.set(key,{...piece,quantity:(current?.quantity ?? 0)+1}); }
  return [...groups.values()];
}

import type { StructuralPiece, TechoUnAguaParametersV1 } from "@/core/model/types";
export function createRoofPieces(parameters: TechoUnAguaParametersV1, diagonalMm: number): readonly StructuralPiece[] {
  const beams = parameters.profiles.beam.trim() ? Array.from({length:2},()=>({type:"beam" as const,lengthMm:parameters.widthMm,profile:parameters.profiles.beam,cutStartDeg:90 as const,cutEndDeg:90 as const})) : [];
  const purlins = parameters.profiles.purlin.trim() ? parameters.purlins.map(()=>({type:"purlin" as const,lengthMm:diagonalMm,profile:parameters.profiles.purlin,cutStartDeg:90 as const,cutEndDeg:90 as const})) : [];
  return [...beams,...purlins];
}

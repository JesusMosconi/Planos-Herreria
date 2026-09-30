import type { FallDirection, RoofEdge } from "@/core/model/types";
export interface SlopeCalculation { readonly diagonalMm: number; readonly slopePercent: number; readonly angleDegrees: number; readonly lowEdge: RoofEdge }
export function calculateSlope(horizontalDepthMm: number, heightDifferenceMm: number, fallDirection: FallDirection): SlopeCalculation {
  return { diagonalMm: Math.hypot(horizontalDepthMm, heightDifferenceMm), slopePercent: heightDifferenceMm / horizontalDepthMm * 100, angleDegrees: Math.atan2(heightDifferenceMm, horizontalDepthMm) * 180 / Math.PI, lowEdge: fallDirection };
}

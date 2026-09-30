import { describe, expect, it } from "vitest";
import { calculateSlope } from "./calculation";
describe("roof calculation", () => {
  it.each(["front","back"] as const)("calculates manual case toward %s", direction => { const value=calculateSlope(2900,500,direction); expect(value.diagonalMm).toBeCloseTo(Math.sqrt(2900**2+500**2),12); expect(value.slopePercent).toBeCloseTo(500/2900*100,12); expect(value.angleDegrees).toBeCloseTo(Math.atan2(500,2900)*180/Math.PI,12); expect(value.lowEdge).toBe(direction); });
});

import { describe, expect, it } from "vitest";
import { calculateSlope } from "./calculation";
describe("roof calculation", () => {
  it.each(["front", "back"] as const)("calculates the 2900 x 4150 x 500 mm case toward %s", (direction) => {
    const widthMm = 2900;
    const horizontalDepthMm = 4150;
    const heightDifferenceMm = 500;
    const value = calculateSlope(horizontalDepthMm, heightDifferenceMm, direction);

    expect(widthMm).toBe(2900);
    expect(value.diagonalMm).toBeCloseTo(4180, 0);
    expect(value.diagonalMm).toBeCloseTo(Math.hypot(horizontalDepthMm, heightDifferenceMm), 12);
    expect(value.slopePercent).toBeCloseTo((heightDifferenceMm / horizontalDepthMm) * 100, 12);
    expect(value.angleDegrees).toBeCloseTo(
      (Math.atan2(heightDifferenceMm, horizontalDepthMm) * 180) / Math.PI,
      12,
    );
    expect(value.lowEdge).toBe(direction);
  });
});

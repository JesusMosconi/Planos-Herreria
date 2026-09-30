import { describe, expect, it } from "vitest";
import type { ProjectDefinitionV2 } from "@/core/model/types";
import { calculateTechoUnAgua } from ".";
import { distributePurlins } from "./purlins";

describe("reference roof geometry regression", () => {
  it("keeps beams on the slope and purlins across the width", () => {
    const widthMm = 2900;
    const horizontalDepthMm = 4150;
    const heightDifferenceMm = 500;
    const purlins = distributePurlins(horizontalDepthMm, 6);
    const definition: ProjectDefinitionV2 = {
      schemaVersion: 2,
      structureType: "techo-un-agua",
      name: "Caso de referencia",
      client: "",
      notes: "",
      approximateMeasurements: true,
      parameters: {
        widthMm,
        horizontalDepthMm,
        heightDifferenceMm,
        fallDirection: "front",
        purlinCount: 6,
        purlins,
        supports: [],
        drainage: { enabled: false, edge: "front", downspouts: [] },
        profiles: { beam: "Viga de prueba", purlin: "Correa de prueba" },
      },
    };

    const result = calculateTechoUnAgua(definition);
    const beams = result.pieces.find((piece) => piece.type === "beam");
    const roofPurlins = result.pieces.find((piece) => piece.type === "purlin");

    expect(result.diagonalMm).toBeCloseTo(4180, 0);
    expect(purlins.map((purlin) => purlin.positionMm)).toEqual([0, 830, 1660, 2490, 3320, 4150]);
    expect(beams).toMatchObject({
      quantity: 2,
      lengthMm: result.diagonalMm,
      cutStartDeg: 90,
      cutEndDeg: 90,
    });
    expect(roofPurlins).toMatchObject({
      quantity: 6,
      lengthMm: widthMm,
      cutStartDeg: 90,
      cutEndDeg: 90,
    });
  });
});

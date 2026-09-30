import { describe, expect, it } from "vitest";
import { DEFAULT_PROJECT_DEFINITION } from "@/core/structures/techo-un-agua/model";
import { CURRENT_V1_FIXTURE } from "./__fixtures__/current-v1";
import { readProjectDefinition, UnsupportedSchemaVersionError } from "./versioning";

describe("schema versioning", () => {
  it("reads V2 without a migration cause", () => {
    expect(readProjectDefinition(DEFAULT_PROJECT_DEFINITION)).toEqual({
      definition: DEFAULT_PROJECT_DEFINITION,
      migrationCauses: [],
    });
  });

  it("migrates V1 without mutating it and redistributes purlins over horizontal depth", () => {
    const before = structuredClone(CURRENT_V1_FIXTURE);
    const result = readProjectDefinition(CURRENT_V1_FIXTURE);

    expect(CURRENT_V1_FIXTURE).toEqual(before);
    expect(result.definition).toMatchObject({
      schemaVersion: 2,
      name: CURRENT_V1_FIXTURE.name,
      client: CURRENT_V1_FIXTURE.client,
      notes: CURRENT_V1_FIXTURE.notes,
      parameters: {
        widthMm: 2900,
        horizontalDepthMm: 4150,
        purlinCount: 3,
      },
    });
    expect(result.definition.parameters.purlins.map((purlin) => purlin.positionMm)).toEqual([
      0,
      2075,
      4150,
    ]);
    expect(result.migrationCauses).toEqual(["purlin-positions-redistributed"]);
  });

  it.each([undefined, 3])("rejects missing/future version", (schemaVersion) => {
    expect(() =>
      readProjectDefinition(
        schemaVersion === undefined ? {} : { ...DEFAULT_PROJECT_DEFINITION, schemaVersion },
      ),
    ).toThrow(UnsupportedSchemaVersionError);
  });
});

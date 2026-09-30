import { describe, expect, it } from "vitest";
import { DEFAULT_PROJECT_DEFINITION } from "@/core/structures/techo-un-agua/model";
import { projectDefinitionV2Schema } from "./project-v2";

describe("ProjectDefinitionV2", () => {
  it("accepts the current V2 document and empty profiles", () => {
    expect(projectDefinitionV2Schema.safeParse(DEFAULT_PROJECT_DEFINITION).success).toBe(true);
  });

  it.each([0, -1, 30001, Infinity])("rejects width %s", (widthMm) => {
    expect(
      projectDefinitionV2Schema.safeParse({
        ...DEFAULT_PROJECT_DEFINITION,
        parameters: { ...DEFAULT_PROJECT_DEFINITION.parameters, widthMm },
      }).success,
    ).toBe(false);
  });

  it("accepts values over 12000 through 30000 when the beam diagonal remains valid", () => {
    expect(
      projectDefinitionV2Schema.safeParse({
        ...DEFAULT_PROJECT_DEFINITION,
        parameters: { ...DEFAULT_PROJECT_DEFINITION.parameters, widthMm: 30000 },
      }).success,
    ).toBe(true);
  });

  it("accepts fractional derived positions but rejects fractional manual positions", () => {
    const derived = {
      ...DEFAULT_PROJECT_DEFINITION,
      parameters: {
        ...DEFAULT_PROJECT_DEFINITION.parameters,
        purlinCount: 2,
        purlins: [
          { id: "a", positionMm: 0.5, manual: false },
          { id: "b", positionMm: 4150, manual: false },
        ],
      },
    };
    expect(projectDefinitionV2Schema.safeParse(derived).success).toBe(true);
    expect(
      projectDefinitionV2Schema.safeParse({
        ...derived,
        parameters: {
          ...derived.parameters,
          purlins: [{ id: "a", positionMm: 1.5, manual: true }, derived.parameters.purlins[1]],
        },
      }).success,
    ).toBe(false);
  });

  it.each([-1, 101, 1.5])("rejects purlin count %s", (purlinCount) => {
    expect(
      projectDefinitionV2Schema.safeParse({
        ...DEFAULT_PROJECT_DEFINITION,
        parameters: { ...DEFAULT_PROJECT_DEFINITION.parameters, purlinCount },
      }).success,
    ).toBe(false);
  });

  it("rejects a beam diagonal longer than the 4500 mm purchase bar", () => {
    expect(
      projectDefinitionV2Schema.safeParse({
        ...DEFAULT_PROJECT_DEFINITION,
        parameters: {
          ...DEFAULT_PROJECT_DEFINITION.parameters,
          horizontalDepthMm: 4500,
          heightDifferenceMm: 1,
        },
      }).success,
    ).toBe(false);
  });
});

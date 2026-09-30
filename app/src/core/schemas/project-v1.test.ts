import { describe, expect, it } from "vitest";
import { CURRENT_V1_FIXTURE } from "./__fixtures__/current-v1";
import { projectDefinitionV1Schema } from "./project-v1";

describe("ProjectDefinitionV1", () => {
  it("accepts a persisted V1 document", () => expect(projectDefinitionV1Schema.safeParse(CURRENT_V1_FIXTURE).success).toBe(true));
  it.each([0,-1,30001,Infinity])("rejects width %s", widthMm => expect(projectDefinitionV1Schema.safeParse({ ...CURRENT_V1_FIXTURE, parameters: { ...CURRENT_V1_FIXTURE.parameters, widthMm } }).success).toBe(false));
  it("accepts 12000..30000 and fractional derived positions", () => expect(projectDefinitionV1Schema.safeParse({ ...CURRENT_V1_FIXTURE, parameters: { ...CURRENT_V1_FIXTURE.parameters, widthMm: 30000, purlinCount: 2, purlins: [{ id: "a", positionMm: 0.5, manual: false }, { id: "b", positionMm: 30000, manual: false }] } }).success).toBe(true));
  it("rejects a fractional manually entered position",()=>expect(projectDefinitionV1Schema.safeParse({...CURRENT_V1_FIXTURE,parameters:{...CURRENT_V1_FIXTURE.parameters,purlinCount:1,purlins:[{id:"a",positionMm:1.5,manual:true}]}}).success).toBe(false));
  it.each([-1,101,1.5])("rejects purlin count %s", purlinCount => expect(projectDefinitionV1Schema.safeParse({ ...CURRENT_V1_FIXTURE, parameters: { ...CURRENT_V1_FIXTURE.parameters, purlinCount } }).success).toBe(false));
});

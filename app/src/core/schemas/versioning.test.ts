import { describe, expect, it } from "vitest";
import { DEFAULT_PROJECT_DEFINITION } from "@/core/structures/techo-un-agua/model";
import { readProjectDefinition, UnsupportedSchemaVersionError } from "./versioning";

describe("schema versioning", () => {
  it("reads V1", () => expect(readProjectDefinition(DEFAULT_PROJECT_DEFINITION)).toEqual(DEFAULT_PROJECT_DEFINITION));
  it("migrates supported V0 without mutating it", () => { const old = { ...DEFAULT_PROJECT_DEFINITION, schemaVersion: 0 }; expect(readProjectDefinition(old).schemaVersion).toBe(1); expect(old.schemaVersion).toBe(0); });
  it.each([undefined,2])("rejects missing/future version", schemaVersion => expect(() => readProjectDefinition(schemaVersion === undefined ? {} : { ...DEFAULT_PROJECT_DEFINITION, schemaVersion })).toThrow(UnsupportedSchemaVersionError));
});

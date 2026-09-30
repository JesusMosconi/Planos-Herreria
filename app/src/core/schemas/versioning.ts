import type { ProjectDefinitionV1 } from "@/core/model/types";
import { projectDefinitionV1Schema } from "./project-v1";

export class UnsupportedSchemaVersionError extends Error {}

export function readProjectDefinition(input: unknown): ProjectDefinitionV1 {
  if (!input || typeof input !== "object" || !("schemaVersion" in input)) throw new UnsupportedSchemaVersionError("Falta schemaVersion.");
  const version = (input as { schemaVersion: unknown }).schemaVersion;
  if (version === 0) return projectDefinitionV1Schema.parse({ ...(input as object), schemaVersion: 1 }) as ProjectDefinitionV1;
  if (version !== 1) throw new UnsupportedSchemaVersionError(`La versión ${String(version)} no está soportada.`);
  return projectDefinitionV1Schema.parse(input) as ProjectDefinitionV1;
}

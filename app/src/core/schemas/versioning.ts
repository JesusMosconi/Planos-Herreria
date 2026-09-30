import type {
  ProjectDefinitionV1,
  ProjectDefinitionV2,
  ProjectMigrationCause,
} from "@/core/model/types";
import { distributePurlins } from "@/core/structures/techo-un-agua/purlins";
import { projectDefinitionV1Schema } from "./project-v1";
import { projectDefinitionV2Schema } from "./project-v2";

export class UnsupportedSchemaVersionError extends Error {}

export interface ReadProjectDefinitionResult {
  readonly definition: ProjectDefinitionV2;
  readonly migrationCauses: readonly ProjectMigrationCause[];
}

function migrateV1ToV2(input: ProjectDefinitionV1): ReadProjectDefinitionResult {
  const migrated: ProjectDefinitionV2 = {
    ...input,
    schemaVersion: 2,
    parameters: {
      ...input.parameters,
      purlins: distributePurlins(input.parameters.horizontalDepthMm, input.parameters.purlinCount),
    },
  };

  return {
    definition: projectDefinitionV2Schema.parse(migrated) as ProjectDefinitionV2,
    migrationCauses: ["purlin-positions-redistributed"],
  };
}

export function readProjectDefinition(input: unknown): ReadProjectDefinitionResult {
  if (!input || typeof input !== "object" || !("schemaVersion" in input)) throw new UnsupportedSchemaVersionError("Falta schemaVersion.");
  const version = (input as { schemaVersion: unknown }).schemaVersion;
  if (version === 1) return migrateV1ToV2(projectDefinitionV1Schema.parse(input) as ProjectDefinitionV1);
  if (version === 2) {
    return {
      definition: projectDefinitionV2Schema.parse(input) as ProjectDefinitionV2,
      migrationCauses: [],
    };
  }
  throw new UnsupportedSchemaVersionError(`La versión ${String(version)} no está soportada.`);
}

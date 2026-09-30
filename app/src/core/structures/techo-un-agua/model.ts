import type { ProjectDefinitionV1 } from "@/core/model/types";

export const DEFAULT_PROJECT_DEFINITION: ProjectDefinitionV1 = {
  schemaVersion: 1, structureType: "techo-un-agua", name: "Nuevo techo", client: "", notes: "", approximateMeasurements: true,
  parameters: { widthMm: 4000, horizontalDepthMm: 3000, heightDifferenceMm: 500, fallDirection: "front", purlinCount: 0, purlins: [], supports: [], drainage: { enabled: false, edge: "front", downspouts: [] }, profiles: { beam: "", purlin: "" } },
};

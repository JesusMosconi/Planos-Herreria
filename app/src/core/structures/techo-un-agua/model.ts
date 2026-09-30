import type { ProjectDefinitionV2 } from "@/core/model/types";

export const DEFAULT_PROJECT_DEFINITION: ProjectDefinitionV2 = {
  schemaVersion: 2, structureType: "techo-un-agua", name: "Nuevo techo", client: "", notes: "", approximateMeasurements: true,
  parameters: { widthMm: 2900, horizontalDepthMm: 4150, heightDifferenceMm: 500, fallDirection: "front", purlinCount: 0, purlins: [], supports: [], drainage: { enabled: false, edge: "front", downspouts: [] }, profiles: { beam: "", purlin: "" } },
};

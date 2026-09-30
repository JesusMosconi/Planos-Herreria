import type { ProjectDefinitionV1 } from "@/core/model/types";

export const CURRENT_V1_FIXTURE: ProjectDefinitionV1 = {
  schemaVersion: 1,
  structureType: "techo-un-agua",
  name: "Proyecto V1",
  client: "Cliente conservado",
  notes: "Notas conservadas",
  approximateMeasurements: true,
  parameters: {
    widthMm: 2900,
    horizontalDepthMm: 4150,
    heightDifferenceMm: 500,
    fallDirection: "front",
    purlinCount: 3,
    purlins: [
      { id: "old-1", positionMm: 100, manual: true },
      { id: "old-2", positionMm: 1200, manual: true },
      { id: "old-3", positionMm: 2800, manual: true },
    ],
    supports: [{ id: "support-1", xMm: 1000, yMm: 2000, label: "Apoyo" }],
    drainage: { enabled: true, edge: "front", downspouts: [] },
    profiles: { beam: "80x40", purlin: "40x40" },
  },
};

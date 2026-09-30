export type FallDirection = "front" | "back";
export type RoofEdge = "front" | "back";

export interface PurlinParam { readonly id: string; readonly positionMm: number; readonly manual: boolean }
export interface SupportParam { readonly id: string; readonly xMm: number; readonly yMm: number; readonly label?: string }
export interface DownspoutParam { readonly id: string; readonly positionMm: number; readonly edge: RoofEdge }
export interface DrainageParam { readonly enabled: boolean; readonly edge: RoofEdge; readonly downspouts: readonly DownspoutParam[] }
export interface Profiles { readonly beam: string; readonly purlin: string }
export interface TechoUnAguaParameters {
  readonly widthMm: number;
  readonly horizontalDepthMm: number;
  readonly heightDifferenceMm: number;
  readonly fallDirection: FallDirection;
  readonly purlinCount: number;
  readonly purlins: readonly PurlinParam[];
  readonly supports: readonly SupportParam[];
  readonly drainage: DrainageParam;
  readonly profiles: Profiles;
  readonly purlinPositionsRedistributed?: boolean;
}
export type TechoUnAguaParametersV1 = TechoUnAguaParameters;
export type TechoUnAguaParametersV2 = TechoUnAguaParameters;
export interface ProjectDefinitionV1 {
  readonly schemaVersion: 1;
  readonly structureType: "techo-un-agua";
  readonly name: string;
  readonly client: string;
  readonly notes: string;
  readonly approximateMeasurements: boolean;
  readonly parameters: TechoUnAguaParametersV1;
}
export interface ProjectDefinitionV2 {
  readonly schemaVersion: 2;
  readonly structureType: "techo-un-agua";
  readonly name: string;
  readonly client: string;
  readonly notes: string;
  readonly approximateMeasurements: boolean;
  readonly parameters: TechoUnAguaParametersV2;
}
export type ProjectDefinition = ProjectDefinitionV2;
export type ProjectMigrationCause = "purlin-positions-redistributed";
export interface Warning { readonly code: string; readonly path: string; readonly message: string; readonly severity: "warning" }
export interface StructuralPiece { readonly type: "beam" | "purlin"; readonly lengthMm: number; readonly profile: string; readonly cutStartDeg: 90; readonly cutEndDeg: 90 }
export interface GroupedPiece extends StructuralPiece { readonly quantity: number }
export interface DrawingLine { readonly id: string; readonly layer: DrawingLayer; readonly from: readonly [number, number]; readonly to: readonly [number, number] }
export type DrawingLayer = "estructura" | "cubierta" | "apoyos" | "desague" | "cotas" | "textos";
export interface DrawingText { readonly id: string; readonly layer: "cotas" | "textos"; readonly at: readonly [number, number]; readonly text: string }
export interface TechnicalDrawing { readonly widthMm: number; readonly heightMm: number; readonly lines: readonly DrawingLine[]; readonly texts: readonly DrawingText[]; readonly approximateLabel?: string }
export interface RoofCalculation {
  readonly diagonalMm: number;
  readonly slopePercent: number;
  readonly angleDegrees: number;
  readonly lowEdge: RoofEdge;
  readonly pieces: readonly GroupedPiece[];
  readonly warnings: readonly Warning[];
  readonly drawing: TechnicalDrawing;
}

import { groupPieces } from "@/core/model/group-pieces";
import type { ProjectDefinitionV2, RoofCalculation } from "@/core/model/types";
import { projectDefinitionV2Schema } from "@/core/schemas/project-v2";
import { createTechnicalDrawing } from "@/core/drawing/technical-drawing";
import { calculateSlope } from "./calculation";
import { createRoofPieces } from "./pieces";
import { deriveWarnings } from "./warnings";
export function calculateTechoUnAgua(input:ProjectDefinitionV2):RoofCalculation { const definition=projectDefinitionV2Schema.parse(input) as ProjectDefinitionV2; const slope=calculateSlope(definition.parameters.horizontalDepthMm,definition.parameters.heightDifferenceMm,definition.parameters.fallDirection); return {...slope,pieces:groupPieces(createRoofPieces(definition.parameters,slope.diagonalMm)),warnings:deriveWarnings(definition.parameters),drawing:createTechnicalDrawing(definition)}; }
export const techoUnAguaModule={schema:projectDefinitionV2Schema,calculate:calculateTechoUnAgua};

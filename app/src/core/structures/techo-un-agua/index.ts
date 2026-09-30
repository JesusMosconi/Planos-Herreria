import { groupPieces } from "@/core/model/group-pieces";
import type { ProjectDefinitionV1, RoofCalculation } from "@/core/model/types";
import { projectDefinitionV1Schema } from "@/core/schemas/project-v1";
import { createTechnicalDrawing } from "@/core/drawing/technical-drawing";
import { calculateSlope } from "./calculation";
import { createRoofPieces } from "./pieces";
import { deriveWarnings } from "./warnings";
export function calculateTechoUnAgua(input:ProjectDefinitionV1):RoofCalculation { const definition=projectDefinitionV1Schema.parse(input) as ProjectDefinitionV1; const slope=calculateSlope(definition.parameters.horizontalDepthMm,definition.parameters.heightDifferenceMm,definition.parameters.fallDirection); return {...slope,pieces:groupPieces(createRoofPieces(definition.parameters,slope.diagonalMm)),warnings:deriveWarnings(definition.parameters),drawing:createTechnicalDrawing(definition)}; }
export const techoUnAguaModule={schema:projectDefinitionV1Schema,calculate:calculateTechoUnAgua};

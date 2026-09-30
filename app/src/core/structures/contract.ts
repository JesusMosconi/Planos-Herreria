import type { ProjectDefinitionV1, RoofCalculation } from "@/core/model/types";
import type { ZodType } from "zod";
export interface StructureModule { readonly schema: ZodType<ProjectDefinitionV1>; calculate(definition: ProjectDefinitionV1): RoofCalculation }

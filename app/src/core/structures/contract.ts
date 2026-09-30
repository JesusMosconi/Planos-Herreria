import type { ProjectDefinitionV2, RoofCalculation } from "@/core/model/types";
import type { ZodType } from "zod";
export interface StructureModule { readonly schema: ZodType<ProjectDefinitionV2>; calculate(definition: ProjectDefinitionV2): RoofCalculation }

import { Prisma } from "@prisma/client";
import type { ProjectDefinitionV1 } from "@/core/model/types";
import { readProjectDefinition } from "@/core/schemas/versioning";
import { projectDefinitionV1Schema } from "@/core/schemas/project-v1";
import { getPrisma } from "@/server/db/prisma";
const json=(value:ProjectDefinitionV1)=>value as unknown as Prisma.InputJsonValue;
const columns=(d:ProjectDefinitionV1)=>({name:d.name,client:d.client,notes:d.notes,structureType:"TECHO_UN_AGUA" as const,approximateMeasurements:d.approximateMeasurements,schemaVersion:d.schemaVersion,definition:json(d)});
export async function listProjects(){return getPrisma().project.findMany({select:{id:true,name:true,structureType:true,updatedAt:true,approximateMeasurements:true},orderBy:{updatedAt:"desc"}});}
export async function createProject(definition:ProjectDefinitionV1){const valid=projectDefinitionV1Schema.parse(definition) as ProjectDefinitionV1; return getPrisma().project.create({data:columns(valid)});}
export async function openProject(id:string){const row=await getPrisma().project.findUnique({where:{id}}); if(!row)return null; return {...row,definition:readProjectDefinition(row.definition)};}
export async function saveProject(id:string,expectedUpdatedAt:Date,definition:ProjectDefinitionV1){const valid=projectDefinitionV1Schema.parse(definition) as ProjectDefinitionV1; const result=await getPrisma().project.updateMany({where:{id,updatedAt:expectedUpdatedAt},data:columns(valid)}); if(result.count!==1)throw new Error("conflict"); return openProject(id);}

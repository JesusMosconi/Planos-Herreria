import { Prisma } from "@prisma/client";
import type { ProjectDefinitionV2 } from "@/core/model/types";
import { readProjectDefinition } from "@/core/schemas/versioning";
import { projectDefinitionV2Schema } from "@/core/schemas/project-v2";
import { getPrisma } from "@/server/db/prisma";
const json=(value:ProjectDefinitionV2)=>value as unknown as Prisma.InputJsonValue;
const columns=(d:ProjectDefinitionV2)=>({name:d.name,client:d.client,notes:d.notes,structureType:"TECHO_UN_AGUA" as const,approximateMeasurements:d.approximateMeasurements,schemaVersion:d.schemaVersion,definition:json(d)});
export async function listProjects(){return getPrisma().project.findMany({select:{id:true,name:true,structureType:true,updatedAt:true,approximateMeasurements:true},orderBy:{updatedAt:"desc"}});}
export async function createProject(definition:ProjectDefinitionV2){const valid=projectDefinitionV2Schema.parse(definition) as ProjectDefinitionV2; return getPrisma().project.create({data:columns(valid)});}
export async function openProject(id:string){const row=await getPrisma().project.findUnique({where:{id}}); if(!row)return null; const read=readProjectDefinition(row.definition); return {...row,definition:read.definition,migrationCauses:read.migrationCauses};}
export async function saveProject(id:string,expectedUpdatedAt:Date,definition:ProjectDefinitionV2){const valid=projectDefinitionV2Schema.parse(definition) as ProjectDefinitionV2; const result=await getPrisma().project.updateMany({where:{id,updatedAt:expectedUpdatedAt},data:columns(valid)}); if(result.count!==1)throw new Error("conflict"); return openProject(id);}

import { afterAll, beforeAll, expect, it } from "vitest";
import { performance } from "node:perf_hooks";
import { calculateTechoUnAgua } from "@/core/structures/techo-un-agua";
import { DEFAULT_PROJECT_DEFINITION } from "@/core/structures/techo-un-agua/model";
import { exportDxf, exportSvg } from "@/core/export/vector-exporters";
import { exportPdf } from "@/core/export/pdf-exporter";

const p95=(values:readonly number[])=>[...values].sort((a,b)=>a-b)[Math.ceil(values.length*.95)-1]??Infinity;
const metrics={recalculationMs:0,openP95Ms:0,saveP95Ms:0,exportP95Ms:0};
let projectId="";
let updatedAt=new Date();

beforeAll(async()=>{
  if(!process.env.TEST_DATABASE_URL)throw new Error("TEST_DATABASE_URL es obligatoria para T076.");
  process.env.DATABASE_URL=process.env.TEST_DATABASE_URL;
  const { createProject }=await import("@/server/repositories/project-repository");
  const row=await createProject({...DEFAULT_PROJECT_DEFINITION,name:`perf-${Date.now()}`,parameters:{...DEFAULT_PROJECT_DEFINITION.parameters,purlinCount:100,purlins:Array.from({length:100},(_,i)=>({id:`p-${i}`,positionMm:i*4000/99,manual:false})),profiles:{beam:"80x40",purlin:"40x40"}}});
  projectId=row.id;updatedAt=row.updatedAt;
},30000);

afterAll(async()=>{if(projectId){const{getPrisma}=await import("@/server/db/prisma");await getPrisma().project.deleteMany({where:{id:projectId}});await getPrisma().$disconnect();}});

it("measures Phase 1 thresholds with real test storage",async()=>{
  const { openProject,saveProject }=await import("@/server/repositories/project-repository");
  const definition={...DEFAULT_PROJECT_DEFINITION,name:`perf-${Date.now()}`,parameters:{...DEFAULT_PROJECT_DEFINITION.parameters,purlinCount:100,purlins:Array.from({length:100},(_,i)=>({id:`p-${i}`,positionMm:i*4000/99,manual:false})),profiles:{beam:"80x40",purlin:"40x40"}}};
  const recalcStart=performance.now();for(let i=0;i<200;i++)calculateTechoUnAgua(definition);metrics.recalculationMs=(performance.now()-recalcStart)/200;
  await openProject(projectId); // warm suspended database before measuring p95
  const opens:number[]=[];for(let i=0;i<20;i++){const start=performance.now();await openProject(projectId);opens.push(performance.now()-start)}metrics.openP95Ms=p95(opens);
  const saves:number[]=[];for(let i=0;i<20;i++){const start=performance.now();const row=await saveProject(projectId,updatedAt,{...definition,notes:`medición ${i}`});updatedAt=row!.updatedAt;saves.push(performance.now()-start)}metrics.saveP95Ms=p95(saves);
  const exports:number[]=[];for(let i=0;i<10;i++){const start=performance.now();const opened=await openProject(projectId);const drawing=calculateTechoUnAgua(opened!.definition).drawing;exportSvg(drawing);exportDxf(drawing);await exportPdf(drawing);exports.push(performance.now()-start)}metrics.exportP95Ms=p95(exports);
  console.info(`T076_METRICS ${JSON.stringify(metrics)}`);
  expect(metrics.recalculationMs).toBeLessThan(100);expect(metrics.openP95Ms).toBeLessThan(2000);expect(metrics.saveP95Ms).toBeLessThan(2000);expect(metrics.exportP95Ms).toBeLessThan(5000);
},120000);

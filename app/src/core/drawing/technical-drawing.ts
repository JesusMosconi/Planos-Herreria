import type { DrawingLine, DrawingText, ProjectDefinitionV2, TechnicalDrawing } from "@/core/model/types";
import { formatMillimetersAsMeters } from "@/core/units/metric";
export const APPROXIMATE_LABEL="Medidas aproximadas / a confirmar en obra";
export function createTechnicalDrawing(definition: ProjectDefinitionV2): TechnicalDrawing {
  const p=definition.parameters; const lines:DrawingLine[]=[]; const texts:DrawingText[]=[];
  const line=(id:string,layer:DrawingLine["layer"],from:readonly[number,number],to:readonly[number,number])=>lines.push({id,layer,from,to});
  line("cover-top","cubierta",[0,0],[p.widthMm,0]); line("cover-right","cubierta",[p.widthMm,0],[p.widthMm,p.horizontalDepthMm]); line("cover-bottom","cubierta",[p.widthMm,p.horizontalDepthMm],[0,p.horizontalDepthMm]); line("cover-left","cubierta",[0,p.horizontalDepthMm],[0,0]);
  line("beam-back","estructura",[0,0],[p.widthMm,0]); line("beam-front","estructura",[0,p.horizontalDepthMm],[p.widthMm,p.horizontalDepthMm]);
  p.purlins.forEach((item,index)=>line(`purlin-${index}`,"estructura",[item.positionMm,0],[item.positionMm,p.horizontalDepthMm]));
  p.supports.forEach((item,index)=>{line(`support-${index}-x`,"apoyos",[item.xMm-25,item.yMm],[item.xMm+25,item.yMm]);});
  if(p.drainage.enabled)line("gutter","desague",[0,p.drainage.edge==="front"?p.horizontalDepthMm:0],[p.widthMm,p.drainage.edge==="front"?p.horizontalDepthMm:0]);
  const sideY=p.horizontalDepthMm+600; const scale=Math.min(1,p.widthMm/p.horizontalDepthMm); const sideDepth=p.horizontalDepthMm*scale; const sideHeight=p.heightDifferenceMm*scale; const frontLow=p.fallDirection==="front";
  line("side-depth","cotas",[0,sideY],[sideDepth,sideY]); line("side-slope","estructura",frontLow?[0,sideY-sideHeight]:[0,sideY],[sideDepth,frontLow?sideY:sideY-sideHeight]); line("side-high","estructura",frontLow?[0,sideY-sideHeight]:[sideDepth,sideY-sideHeight],frontLow?[0,sideY]:[sideDepth,sideY]);
  texts.push({id:"width",layer:"cotas",at:[p.widthMm/2,-100],text:formatMillimetersAsMeters(p.widthMm)},{id:"depth",layer:"cotas",at:[p.widthMm+100,p.horizontalDepthMm/2],text:formatMillimetersAsMeters(p.horizontalDepthMm)},{id:"side-depth-label",layer:"cotas",at:[sideDepth/2,sideY+140],text:`Profundidad ${formatMillimetersAsMeters(p.horizontalDepthMm)}`},{id:"side-height-label",layer:"cotas",at:[sideDepth+100,sideY-sideHeight/2],text:`Desnivel ${formatMillimetersAsMeters(p.heightDifferenceMm)}`},{id:"identity",layer:"textos",at:[0,p.horizontalDepthMm+200],text:`${definition.name} · ${definition.client}`});
  return {widthMm:Math.max(p.widthMm,sideDepth),heightMm:sideY+200,lines,texts,...(definition.approximateMeasurements?{approximateLabel:APPROXIMATE_LABEL}:{})};
}

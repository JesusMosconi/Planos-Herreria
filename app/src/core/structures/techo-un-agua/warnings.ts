import type { TechoUnAguaParametersV2, Warning } from "@/core/model/types";
const warning=(code:string,path:string,message:string):Warning=>({code,path,message,severity:"warning"});
export function deriveWarnings(p: TechoUnAguaParametersV2): readonly Warning[] {
  const result: Warning[]=[];
  for(const [key,value] of [["widthMm",p.widthMm],["horizontalDepthMm",p.horizontalDepthMm],["heightDifferenceMm",p.heightDifferenceMm]] as const) if(value>12000) result.push(warning("LINEAR_DIMENSION_OVER_RECOMMENDED_MAX",`parameters.${key}`,"La medida supera 12 m; confirmala en obra."));
  if(p.heightDifferenceMm>p.horizontalDepthMm) result.push(warning("HEIGHT_DIFFERENCE_SUSPICIOUS","parameters.heightDifferenceMm","El desnivel supera la profundidad horizontal."));
  if(p.purlinPositionsRedistributed) result.push(warning("PURLIN_POSITIONS_REDISTRIBUTED","parameters.purlins","Las posiciones manuales se descartaron y las correas se repartieron nuevamente."));
  p.purlins.forEach((item,index)=>{if(item.positionMm<0||item.positionMm>p.horizontalDepthMm)result.push(warning("PURLIN_OUTSIDE",`parameters.purlins.${index}.positionMm`,"La correa está fuera de la profundidad horizontal.")); if(index>0&&item.positionMm<(p.purlins[index-1]?.positionMm??0))result.push(warning("PURLINS_UNORDERED",`parameters.purlins.${index}.positionMm`,"Las correas no están ordenadas.")); if(p.purlins.some((other,j)=>j<index&&other.positionMm===item.positionMm))result.push(warning("PURLIN_DUPLICATE",`parameters.purlins.${index}.positionMm`,"Hay correas repetidas."));});
  p.supports.forEach((item,index)=>{if(item.xMm<0||item.xMm>p.widthMm||item.yMm<0||item.yMm>p.horizontalDepthMm)result.push(warning("SUPPORT_OUTSIDE",`parameters.supports.${index}`,"El apoyo está fuera de la superficie."));});
  if(p.drainage.enabled&&p.drainage.edge!==p.fallDirection)result.push(warning("GUTTER_NOT_LOW_EDGE","parameters.drainage.edge","La canaleta no está en el borde bajo."));
  p.drainage.downspouts.forEach((item,index)=>{if(!p.drainage.enabled||item.edge!==p.drainage.edge||item.positionMm<0||item.positionMm>p.widthMm)result.push(warning("DOWNSPOUT_INCOHERENT",`parameters.drainage.downspouts.${index}`,"La bajada no coincide con la canaleta."));});
  return result;
}

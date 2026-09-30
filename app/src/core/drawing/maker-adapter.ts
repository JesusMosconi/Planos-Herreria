import makerjs from "makerjs";
import type { TechnicalDrawing } from "@/core/model/types";
export function toMakerModel(drawing:TechnicalDrawing):makerjs.IModel { const paths:Record<string,makerjs.IPath>={}; drawing.lines.forEach(line=>{const path=new makerjs.paths.Line([...line.from],[...line.to]) as makerjs.IPath&{layer?:string}; path.layer=line.layer; paths[line.id]=path;}); return {units:makerjs.unitType.Millimeter,paths}; }

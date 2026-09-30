"use client";
import type { DrainageParam, FallDirection } from "@/core/model/types";
export function DrainageFields({fallDirection,onFallDirection,drainage,onDrainage}:{fallDirection:FallDirection;onFallDirection:(v:FallDirection)=>void;drainage:DrainageParam;onDrainage:(v:DrainageParam)=>void}){return <div className="grid gap-3">
  <label>Sentido de caída<select value={fallDirection} onChange={e=>onFallDirection(e.target.value as FallDirection)} className="ml-2 rounded border p-2"><option value="front">Hacia borde frontal</option><option value="back">Hacia borde posterior</option></select></label>
  <label><input type="checkbox" checked={drainage.enabled} onChange={e=>onDrainage({...drainage,enabled:e.target.checked})}/> Canaleta</label>
  {drainage.enabled&&<><label>Borde de canaleta<select value={drainage.edge} onChange={e=>onDrainage({...drainage,edge:e.target.value as FallDirection})} className="ml-2 rounded border p-2"><option value="front">Frontal</option><option value="back">Posterior</option></select></label>
  {drainage.downspouts.map((d,i)=><label key={d.id}>Bajada {i+1} (mm)<input type="number" step="1" value={d.positionMm} onChange={e=>onDrainage({...drainage,downspouts:drainage.downspouts.map((x,j)=>j===i?{...x,positionMm:Number(e.target.value)}:x)})} className="ml-2 w-32 rounded border p-2"/></label>)}
  <button type="button" onClick={()=>onDrainage({...drainage,downspouts:[...drainage.downspouts,{id:crypto.randomUUID(),positionMm:0,edge:drainage.edge}]})} className="rounded border px-3 py-2">Agregar bajada</button></>}
</div>}

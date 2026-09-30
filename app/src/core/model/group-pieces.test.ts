import { expect,it } from "vitest"; import { groupPieces } from "./group-pieces";
it("groups only exact structural properties",()=>expect(groupPieces([{type:"beam",lengthMm:4000,profile:"80x40",cutStartDeg:90,cutEndDeg:90},{type:"beam",lengthMm:4000,profile:"80x40",cutStartDeg:90,cutEndDeg:90}])).toEqual([{type:"beam",lengthMm:4000,profile:"80x40",cutStartDeg:90,cutEndDeg:90,quantity:2}]));

import { describe, expect, it } from "vitest";
import { distributePurlins, redistributePurlins } from "./purlins";
describe("purlin distribution", () => {
  it("represents zero",()=>expect(distributePurlins(4150,0)).toEqual([]));
  it("centres one",()=>expect(distributePurlins(4150,1)[0]?.positionMm).toBe(2075));
  it("uses n-1 equal spaces and exact borders",()=>expect(distributePurlins(4150,6).map(x=>x.positionMm)).toEqual([0,830,1660,2490,3320,4150]));
  it("keeps fractional positions",()=>expect(distributePurlins(4000,4)[1]?.positionMm).toBe(4000/3));
  it.each([-1,101,1.5])("rejects %s",count=>expect(()=>distributePurlins(4000,count)).toThrow());
  it("replaces manual positions",()=>expect(redistributePurlins(2000,2)).toEqual({ redistributed:true,purlins:[{id:"purlin-1",positionMm:0,manual:false},{id:"purlin-2",positionMm:2000,manual:false}] }));
});

import { describe, expect, it } from "vitest";
import { formatMillimetersAsMeters, parseMetersToMillimeters } from "./metric";

describe("metric boundary", () => {
  it.each([["1,5",1500],["1.500",1500],[" 2,125 ",2125],["0,001",1]])("parses %s", (text, mm) => expect(parseMetersToMillimeters(text)).toEqual({ ok: true, mm }));
  it.each(["1 500", "+1", "abc", "Infinity", "1,2345", "1,"])("rejects %s", text => expect(parseMetersToMillimeters(text).ok).toBe(false));
  it("formats with comma and millimetre resolution", () => expect(formatMillimetersAsMeters(4150)).toBe("4,150 m"));
});

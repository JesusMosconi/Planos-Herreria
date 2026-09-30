import { z } from "zod";

const enteredMm = z.number().finite().int().positive().max(30000);
const derivedPosition = z.number().finite();
const edge = z.enum(["front", "back"]);

export const purlinV2Schema = z
  .object({ id: z.string().min(1), positionMm: derivedPosition, manual: z.boolean() })
  .readonly();

export const supportV2Schema = z
  .object({
    id: z.string().min(1),
    xMm: z.number().finite().int(),
    yMm: z.number().finite().int(),
    label: z.string().optional(),
  })
  .readonly();

export const drainageV2Schema = z
  .object({
    enabled: z.boolean(),
    edge,
    downspouts: z.array(
      z
        .object({
          id: z.string().min(1),
          positionMm: z.number().finite().int(),
          edge,
        })
        .readonly(),
    ),
  })
  .readonly();

export const techoUnAguaParametersV2Schema = z
  .object({
    widthMm: enteredMm,
    horizontalDepthMm: enteredMm,
    heightDifferenceMm: enteredMm,
    fallDirection: edge,
    purlinCount: z.number().int().min(0).max(100),
    purlins: z.array(purlinV2Schema),
    supports: z.array(supportV2Schema),
    drainage: drainageV2Schema,
    profiles: z.object({ beam: z.string(), purlin: z.string() }).readonly(),
    purlinPositionsRedistributed: z.boolean().optional(),
  })
  .readonly()
  .superRefine((value, ctx) => {
    if (value.purlins.length !== value.purlinCount) {
      ctx.addIssue({
        code: "custom",
        path: ["purlins"],
        message: "La cantidad de correas no coincide con sus posiciones.",
      });
    }

    value.purlins.forEach((purlin, index) => {
      if (purlin.manual && !Number.isInteger(purlin.positionMm)) {
        ctx.addIssue({
          code: "custom",
          path: ["purlins", index, "positionMm"],
          message: "Una posición manual debe expresarse en milímetros enteros.",
        });
      }
    });

    if (Math.hypot(value.horizontalDepthMm, value.heightDifferenceMm) > 4500) {
      ctx.addIssue({
        code: "custom",
        path: ["horizontalDepthMm"],
        message: "La viga supera la barra de compra de 4,50 m.",
      });
    }
  });

export const projectDefinitionV2Schema = z
  .object({
    schemaVersion: z.literal(2),
    structureType: z.literal("techo-un-agua"),
    name: z.string().trim().min(1),
    client: z.string(),
    notes: z.string(),
    approximateMeasurements: z.boolean(),
    parameters: techoUnAguaParametersV2Schema,
  })
  .readonly();

export type ParsedProjectDefinitionV2 = z.infer<typeof projectDefinitionV2Schema>;

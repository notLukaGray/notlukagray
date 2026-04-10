import { z } from "zod";
import { motionPropsSchema } from "./motion-props-schema";
import { pageBuilderDefinitionBlockSchema } from "./page-definition-and-resolution-schemas";

/** Optional modal enter/exit animation config from JSON. */
export const modalTransitionConfigSchema = z
  .object({
    enterDurationMs: z.number().nonnegative().optional(),
    exitDurationMs: z.number().nonnegative().optional(),
    easing: z.string().optional(),
  })
  .optional();

/** Modal content definition: sectionOrder + definitions, mirroring page-builder page shape. */
export const modalBuilderSchema = z
  .object({
    id: z.string().min(1),
    title: z.string().optional(),
    sectionOrder: z.array(z.string()),
    definitions: z.record(z.string(), pageBuilderDefinitionBlockSchema),
    transition: modalTransitionConfigSchema,
    motion: motionPropsSchema,
  })
  .passthrough();

export type ModalTransitionConfigFromSchema = z.infer<typeof modalTransitionConfigSchema>;
export type ModalBuilderFromSchema = z.infer<typeof modalBuilderSchema>;

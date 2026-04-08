import { z } from "zod";
import { elementLayoutSchema } from "./element-foundation-schemas";
import { triggerActionSchema } from "./schema-primitives";

export const elementRiveSchema = z
  .object({
    type: z.literal("elementRive"),
    /** URL to the .riv file (resolved by the asset pipeline the same as image/video src). */
    src: z.string(),
    /** Artboard name to display; defaults to the first artboard in the file. */
    artboard: z.string().optional(),
    /** State machine name to activate. */
    stateMachine: z.string().optional(),
    /** Start playback automatically. Defaults to true. */
    autoplay: z.boolean().optional(),
    /** Accessible label for the canvas wrapper. */
    ariaLabel: z.string().optional(),
    /**
     * Fired via firePageBuilderAction when the active state machine emits a state-change
     * event. The emitted state name is injected as payload.stateName.
     */
    onStateChange: triggerActionSchema.optional(),
  })
  .merge(elementLayoutSchema);

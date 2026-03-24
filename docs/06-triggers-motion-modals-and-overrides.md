# Triggers, motion, modals, and overrides

## Event layer

Pages respond to viewport progress, trigger events, motion timing, transitions, slot state, and authored actions.

## Trigger system

Primary files:

- `src/page-builder/triggers/PageTrigger.tsx`
- `src/page-builder/triggers/core/trigger-event.ts`
- `src/page-builder/core/page-builder-triggers.ts`
- `src/page-builder/core/page-builder-trigger-handlers.ts`
- `src/page-builder/hooks/use-page-builder-triggers.ts`
- `src/page-builder/hooks/use-page-builder-trigger-listener.ts`

## What triggers do

Triggers let authored sections or interactions cause runtime state changes such as:

- background switching
- transition start and stop
- transition progress updates
- content overrides
- 3D commands
- reveal behavior
- other page-level actions the handler layer understands

This is how the page-builder crosses from authored structure into runtime state change.

The main trigger actions and their effects are:

| Type                       | Payload                       | Effect                                                                |
| -------------------------- | ----------------------------- | --------------------------------------------------------------------- |
| `contentOverride`          | `{ key, value }`              | Override element or background by key (`key === "bg"` for background) |
| `backgroundSwitch`         | `bgBlock` or string (def key) | Replace the current background                                        |
| `startTransition`          | `id` (transition id)          | Start a time- or trigger-based background transition                  |
| `stopTransition`           | `id`                          | Reverse or stop a transition                                          |
| `updateTransitionProgress` | `{ id?, progress }`           | Set scroll-driven transition progress                                 |

## Transition model

The repo supports background transition effects and progress-driven transitions.

Relevant files:

- `src/page-builder/BackgroundTransitionEffect.tsx`
- `src/page-builder/background/BackgroundTransitionEffect/`
- `src/page-builder/hooks/use-page-builder-transition-state.ts`
- `src/page-builder/PageBuilderBackground.tsx`

A transition can be:

- explicitly triggered
- scroll-progress-driven

The key idea is that transitions are separate runtime state, not just CSS fades.

## Motion integration

Primary files:

- `src/page-builder/integrations/framer-motion/`
- `src/page-builder/elements/Shared/ElementEntranceWrapper.tsx`
- `src/page-builder/integrations/framer-motion/motion-from-json.tsx`
- `src/page-builder/core/page-builder-motion-defaults.ts`

The important design choice is that motion is authored as data where possible.

That gives the system:

- repeatable entrance presets
- exit presets
- viewport behavior
- motion wrappers around elements and modal surfaces
- one integration layer instead of bespoke motion logic everywhere

## Reduce-motion awareness

The motion layer includes accessibility and reduced-motion handling.

## Modals

Primary files:

- `src/page-builder/core/modal-load.ts`
- `src/page-builder/core/modal-types.ts`
- `src/page-builder/ModalRenderer.tsx`
- `src/content/modals/`

Modals are not a separate mini-app.
They are page-builder-shaped content with a different container and lifecycle.

That is a strong architectural decision because it avoids duplicating a whole second content model.

### Modal load path

A modal:

- loads from `src/content/modals/<id>.json`
- hydrates nested modal section files
- expands through the page-builder system
- resolves assets similarly to a page
- renders through `ModalRenderer`

This keeps modal behavior structurally consistent with page behavior.

## Overrides

Primary file:

- `src/page-builder/core/page-builder-overrides.ts`

Overrides let runtime state replace authored blocks in controlled ways.

Typical use:

- element-level overrides by ID
- background replacement or switching behavior

This surface is useful but can be a source of confusion if overused.

Controlled runtime substitution is the intended use; large-scale content rewrites in state are not.

## Where motion and triggers meet

Motion and triggers meet in the user experience, but they are not the same subsystem.

- triggers are event and action semantics
- motion is visual state transition and animation semantics

Keep them separate mentally.
That helps keep changes clean.

## Common mistakes

- Treating trigger payloads like arbitrary code instead of a constrained action contract
- Hiding page logic inside motion wrappers instead of keeping it in the state and trigger layers
- Using overrides to patch weak content structure instead of improving the authored model
- Implementing modals as one-off React islands instead of using the shared modal/content model

## Practical debugging order

If a triggered page behavior is wrong, inspect in this order:

1. the authored trigger block or action payload
2. the expanded section or element state
3. the trigger event utility
4. the handler implementation
5. the transition state hook or motion wrapper receiving the action
6. the actual rendered background or element state

The trigger and motion systems are central to how this repo behaves as a platform rather than a set of static pages.

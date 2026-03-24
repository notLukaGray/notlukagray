# Rich media, 3D, and asset delivery

## Media in the architecture

This repo treats media as a first-class systems concern.
It includes background video, inline video, optimized images, signed URLs, 3D models, HDR environments, texture maps, and transition assets.

## The asset contract

Authored content usually stores asset references as keys or paths, not final public URLs.

Examples of what the runtime expects:

- filenames
- path-style keys
- relative asset refs inside the content model

The runtime then decides how those become usable URLs.

That separation is important because it lets the same content model survive storage and CDN changes.

## Core asset files

- `src/core/lib/asset-url.ts`
- `src/core/lib/proxy-url.ts`
- `src/core/lib/video-url.ts`
- `src/core/lib/cdn-asset-server.ts`
- `src/core/lib/next-image-loader.ts`
- `src/page-builder/core/page-builder-resolve-assets-server.ts`
- `src/page-builder/core/page-builder-resolved-assets.ts`
- `src/core/hooks/use-resolved-web-asset-urls.ts`

## Delivery strategy

There are two main paths.

### 1. Signed CDN URLs

Used when the runtime can safely construct a final CDN URL, often with image optimization parameters or tokenized access.

### 2. Same-origin proxy URLs

Used when the browser or Three.js needs a same-origin path or when the system wants a stable intermediary like `/api/video/...`.

The same-origin path is a mediated frontend-facing entry point, not the storage backend.

## Why proxy helpers exist

`src/core/lib/proxy-url.ts` exists because some media needs to be requested through a path the browser can trust immediately.

This is especially relevant for:

- 3D asset fetches
- HDR and EXR assets
- GLB and GLTF files
- media that can be sensitive to CORS or token timing

## Bunny specifics

The current implementation assumes Bunny for:

- signed tokenized URLs
- image optimization params
- CDN origin behavior
- storage path conventions
- optional redirect-based media API behavior

Files that encode this:

- `src/core/lib/cdn-asset-server.ts`
- `src/core/lib/next-image-loader.ts`

## Portability considerations

The content model does not depend on a single CDN or storage provider.

To move to another provider, the main replacements would be:

- asset key validation rules
- signed URL generation
- image optimization parameter mapping
- any assumptions about redirect or proxy behavior
- CORS configuration expectations

The page-builder does not need a conceptual rewrite for that.
The adapter layer does.

## Background media

Backgrounds are authored blocks, not hardcoded page chrome.

Common background types include:

- backgroundVideo
- backgroundImage
- backgroundVariable
- backgroundPattern
- transition-related background surfaces

Background rendering is handled by `src/page-builder/PageBuilderBackground.tsx` plus the background component set under `src/page-builder/background/`.

The main background block types and their key props are:

| Type                   | Props                                                                                                          | Description                                   |
| ---------------------- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `backgroundVideo`      | `video`, `poster` (both required)                                                                              | Full-bleed video; poster is fallback on error |
| `backgroundImage`      | `image`                                                                                                        | Image fill                                    |
| `backgroundVariable`   | `layers`                                                                                                       | `{ fill, blendMode?, opacity? }[]`            |
| `backgroundPattern`    | `image`, `repeat?`                                                                                             | Tiled image                                   |
| `backgroundTransition` | `from`, `to`, `duration?`, `easing?`, `mode?`, `trigger?`, `time?`, `position?`, `progress?`, `progressRange?` | Morphs between two background blocks          |

## Inline video

Primary runtime files:

- `src/page-builder/elements/ElementVideo.tsx`
- `src/page-builder/elements/ElementVideo/`
- `src/page-builder/elements/ElementVideo/VideoSlotSection.tsx`
- `src/page-builder/elements/ElementVideo/VideoControlContext.tsx`

Video is authored as an interactive surface with slot-driven controls, visibility states, action handlers, and module composition.

## Module-driven video controls

The `video-player` module under `src/content/modules/video-player.json` demonstrates the intended architecture.

The player UI is authored as slots and definitions, not buried inside hardcoded component branches.

## The 3D system

Primary files:

- `src/page-builder/elements/Element3D.tsx`
- `src/page-builder/elements/Element3D/Model3DScene.tsx`
- `src/page-builder/elements/Element3D/model3d-*.ts*`
- `src/page-builder/core/page-builder-model3d.ts`
- `src/page-builder/core/page-builder-schemas/element-model3d-schemas.ts`

### 3D pipeline shape

The authored 3D model is built from layers:

- textures
- materials
- models
- scene
- canvas
- post-processing

This structure keeps 3D content declarative: a scene is described as data, then interpreted by the runtime.

### Runtime behavior

The 3D element handles:

- load state
- ready state
- opacity and visibility sequencing
- camera effect overrides
- animation commands
- trigger-driven control changes
- video texture commands
- motion-wrapped entrance and exit behavior

## Image loading

`src/core/lib/next-image-loader.ts` implements a custom image loader that understands CDN-hosted assets and optimization parameters.

The loader decides when it can safely mutate image parameters and when it must preserve a pre-signed URL.

## Asset resolution on server and client

The repo performs as much asset work on the server as possible.

The client still has a role:

- batch-fetch signed URLs when needed
- build immediate proxy maps
- fill in runtime media references
- handle browser-only timing and caching

## CORS reality

The code comments are honest here.
CORS is not abstract.

If the CDN is not configured to allow the required origins and asset access patterns, 3D and media fetches will fail in ways that look random from the component level.

That is not a React problem.
It is deployment configuration.

## What to preserve if you change media strategy

1. Authored content should keep referring to stable asset keys, not temporary URLs.
2. Media resolution should stay centralized.
3. 3D assets should still have a same-origin-friendly path when needed.
4. Image optimization should remain adapter-based.
5. Backgrounds, transitions, and inline media should keep using one coherent resolution pipeline.

Implement the Swagger-inspired PipelineDocs refactor for @repo/image-pipeline.

## Context

The design document is at `packages/image-pipeline/docs/swagger-docs-refactor.md`.
Read it first. It describes replacing the current single-scroll PipelineDocs
component with a Swagger-UI–inspired interactive docs experience.

## Existing code

The current PipelineDocs lives at:
`packages/image-pipeline/src/components/pipeline-docs/`

All existing demo components, helpers, types, manip data, and the usePipeline hook
are in that directory. Read them to understand the current code.

The UI library is at `packages/ui/` with components: Sidebar (compound), Card (with
sub-components), Badge, Button, Slider, Input. All use the gruvbox theme.
Read the sidebar component to understand its compound API.

## What to build

### New files to create (in `src/components/pipeline-docs/`):

1. `SwaggerSidebar.tsx` — sidebar with collapsible groups, color-coded type badges,
   active highlighting. Groups: Overview, Pixel, Neighbor, Whole, Pipeline.
   No search bar. Each item shows a type badge (PIXEL/NEIGHBOR/WHOLE/PIPELINE)
   and the manipulation label. Color scheme: PIXEL=green(bg-secondary),
   NEIGHBOR=amber(bg-category-image), WHOLE=purple(bg-category-color),
   PIPELINE=blue(bg-primary).

2. `EndpointView.tsx` — dispatcher that renders the right content based on
   EndpointId. For manip endpoints: EndpointHeader + ParamTable + TryItOut +
   CodeSample. For pipeline endpoints: embeds existing demo components.
   For overview: architecture intro + quick start.

3. `ParamTable.tsx` — Swagger-style table: Name | Type | Default | Description.
   Only renders if the manip has params defined.

4. `TryItOut.tsx` — interactive section: source image + sliders (from @repo/ui)
   - result image. Auto-applies on slider change using pipelineGateway in a
     useEffect with cancellation. Shows loading state.

### Files to modify:

5. `PipelineDocs.tsx` — Complete rewrite. Orchestrates Sidebar layout from @repo/ui
   with desktopPosition="left" and mobilePosition="bottom". Holds all state:
   activeEndpoint, sourceData, paramValues. Loads demo image on mount.

6. `manipData.ts` — Extend ManipInfo or create a unified EndpointItem type that
   wraps both manipulation entries and pipeline-level entries. Add a "path"
   field and richer descriptions.

### Files to remove:

7. `SectionHeader.tsx` — no longer needed (replaced by endpoint headers + sidebar)
8. `ApiShowcase.tsx` — content folded into the Overview endpoint

### Files to keep as-is:

- `usePipeline.ts`, `helpers.ts`, `CodeBlock.tsx`
- `ChainDemo.tsx`, `ResizeDemo.tsx`, `SnapshotDemo.tsx`, `CustomDemo.tsx`

## State shape

```typescript
type EndpointId =
  | { kind: "overview" }
  | { kind: "manip"; id: string }
  | { kind: "pipeline"; id: "snapshots" | "resize" | "chaining" | "custom" };

// In PipelineDocs:
const [activeEndpoint, setActiveEndpoint] = useState<EndpointId>({ kind: "overview" });
const [sourceData, setSourceData] = useState<ImageData | null>(null);
const [paramValues, setParamValues] = useState<Record<string, number>>({});
Conventions
- Named exports only, no default exports
- Function declarations for components (not const arrow functions)
- Types co-located, use type over interface
- No comments
- Import @repo/ui components directly: import { Slider } from "@repo/ui/Slider"
- Run commands: pnpm --filter @repo/image-pipeline dev
Verify
After implementation, run pnpm --filter @repo/image-pipeline check-types and
pnpm --filter @repo/image-pipeline lint to verify no errors.
```

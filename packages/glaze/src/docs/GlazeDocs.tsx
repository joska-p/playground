import { Hero, SectionHeading } from '@repo/ui/data-display';
import { LifecycleReport } from './LifecycleReport';
import { DemoGallery } from './DemoGallery';

/**
 * The exportable docs feature: an in-depth lifecycle report plus a live demo
 * gallery that mounts each demo only while its accordion section is open.
 * Import as `GlazeDocs` from `@repo/glaze/docs/GlazeDocs`.
 */
export function GlazeDocs() {
    return (
        <div className="mx-auto flex max-w-4xl flex-col gap-14 px-6 py-10">
            <Hero
                variant="primary"
                badgeText="@repo/glaze · docs"
                highlight="glaze"
                title="Lifecycle Report"
                description="One canvas, one frame loop, one input bus. An in-depth walkthrough of how a glaze demo mounts, runs, and tears down — the surface, the camera, the input store, the gestures — followed by a live gallery that mounts each demo only while open."
            />
            <section className="flex flex-col gap-6">
                <SectionHeading
                    label="how it runs"
                    title="The lifecycle, section by section"
                    description="Every claim cites the current source. Sections are independent — open as many as you like."
                />
                <LifecycleReport />
            </section>
            <section className="flex flex-col gap-6">
                <SectionHeading
                    label="live"
                    title="The demos"
                    description="One at a time: each demo mounts its canvas only while its section is open, so exactly one frame loop runs and the page stays fast."
                />
                <DemoGallery />
            </section>
        </div>
    );
}

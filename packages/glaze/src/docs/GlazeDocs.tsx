import { Hero, SectionHeading } from '@repo/ui/data-display';

import { DemoGallery } from './DemoGallery';
import { LifecycleReport } from './LifecycleReport';

export function GlazeDocs() {
    return (
        <div className="mx-auto flex max-w-4xl flex-col gap-14 px-6 py-10">
            <Hero
                variant="primary"
                badgeText="@repo/glaze · docs"
                highlight="glaze"
                title="From mount to unmount"
                description="One canvas, one frame loop, one input bus. An in-depth walkthrough of how a glaze demo mounts, runs, and tears down — the surface, the camera, the input store, the gestures — followed by a progressive demo gallery, level by level, that mounts each demo only while open."
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
                    title="The demos, level by level"
                    description="A journey from a canvas that runs itself to a GPGPU simulation. One at a time: each demo mounts its canvas only while its section is open, so exactly one frame loop runs and the page stays fast."
                />
                <DemoGallery />
            </section>
        </div>
    );
}

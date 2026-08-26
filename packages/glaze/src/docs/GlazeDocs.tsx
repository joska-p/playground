import { DemoGallery } from './DemoGallery';
import { LifecycleReport } from './LifecycleReport';

export function GlazeDocs() {
    return (
        <div className="mx-auto flex max-w-4xl flex-col gap-14 px-6 py-10">
            <section className="flex flex-col gap-6">
                <h1>The lifecycle, section by section</h1>
                <p>
                    Every claim cites the current source. Sections are independent — open as many as
                    you like.
                </p>
                <LifecycleReport />
            </section>
            <section className="flex flex-col gap-6">
                <h2>The demos, level by level</h2>
                <p>
                    A journey from a canvas that runs itself to a GPGPU simulation. One at a time:
                    each demo mounts its canvas only while its section is open, so exactly one frame
                    loop runs and the page stays fast."
                </p>

                <DemoGallery />
            </section>
        </div>
    );
}

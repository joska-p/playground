import { Button } from '../../components/data-entry';
import { useToast } from '../../components/feedback';
import { DemoSection } from '../layout/DemoSection';
import { VARIANTS } from '../layout/constants';

export function ToastDemo() {
  const { toast } = useToast();
  return (
    <DemoSection
      id="component-toast"
      title="Toast"
      intro="Stateless ToastProvider + ToastViewport relay state from useToastQueue. Animates in/out with CSS @starting-style."
      code={`const { toast } = useToast();
toast({ variant: "primary", title: "saved", description: "done." });`}
    >
      <div className="flex flex-wrap gap-2">
        {VARIANTS.map((v) => (
          <Button
            key={v}
            variant={v}
            onClick={() => toast({ variant: v, title: v, description: `this is a ${v} toast.` })}
          >
            {v} toast
          </Button>
        ))}
      </div>
    </DemoSection>
  );
}

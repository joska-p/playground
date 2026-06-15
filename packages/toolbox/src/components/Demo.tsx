import { Badge } from '@repo/ui/Badge';
import { Button } from '@repo/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@repo/ui/Card';
import { ErrorBoundary } from '@repo/ui/ErrorBoundary';
import { Input } from '@repo/ui/Input';
import { useState } from 'react';
import { demoSchema } from '../demo.schema.ts';
import {
  addDemoSubmission,
  resetDemo,
  useDemoCount,
  useDemoLastMessage,
  useDemoSubmissions
} from '../demoStore.ts';

function Demo() {
  const count = useDemoCount();
  const lastMessage = useDemoLastMessage();
  const submissions = useDemoSubmissions();
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  function handleSubmit() {
    const result = demoSchema.safeParse({ text: input });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    setError(null);
    addDemoSubmission(result.data.text);
    setInput('');
  }

  return (
    <ErrorBoundary>
      <div className="bg-background text-foreground flex min-h-screen items-center justify-center p-4 sm:p-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Zustand + Zod Demo</CardTitle>
            <CardDescription>
              A minimal showcase of state management with Zustand and runtime
              validation with Zod.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="text-sm">Submissions:</span>
              <Badge variant="secondary">{count}</Badge>
              {lastMessage && (
                <span className="text-muted-foreground truncate text-sm">
                  Last: &ldquo;{lastMessage}&rdquo;
                </span>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="flex flex-col gap-4"
            >
              <Input
                label="New message"
                placeholder="Type something..."
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  if (error) setError(null);
                }}
                helperText={error ?? undefined}
              />
              <Button type="submit">Submit</Button>
            </form>

            {submissions.length > 0 && (
              <div className="border-border/30 flex flex-col gap-2 border-t pt-4">
                <span className="text-muted-foreground text-xs font-medium uppercase">
                  History
                </span>
                <ul className="flex flex-col gap-1">
                  {[...submissions].reverse().map((sub) => (
                    <li
                      key={sub.timestamp}
                      className="text-sm"
                    >
                      {sub.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>

          {count > 0 && (
            <CardFooter>
              <Button
                variant="ghost"
                onClick={resetDemo}
                size="sm"
              >
                Reset
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </ErrorBoundary>
  );
}

export { Demo };

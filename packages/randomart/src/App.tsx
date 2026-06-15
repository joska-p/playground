import { Card, CardContent } from '@repo/ui/Card';
import { Input } from '@repo/ui/Input';
import { useState } from 'react';
import { RandomArtCanvas } from './components/RandomArtCanvas';

function App() {
  const [text, setText] = useState('Turborepo Rocks');

  return (
    <div className="bg-background grid min-h-screen place-items-center p-6">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-foreground text-3xl font-bold tracking-tight">
          RandomArt Generator
        </h1>
        <p className="text-muted-foreground text-sm">
          Inspired by Perrig & Song (CMU)
        </p>

        <Card variant="outline">
          <CardContent className="flex flex-col items-center gap-6">
            <RandomArtCanvas
              seedString={text}
              size={350}
              maxDepth={7}
            />

            <Input
              label="Seed text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type something to morph the art..."
              fullWidth
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export { App };

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@repo/ui/Card';
import { Input } from '@repo/ui/Input';
import { useState } from 'react';
import { RandomArtCanvas } from './components/RandomArtCanvas';

function App() {
  const [text, setText] = useState(
    "De deux choses lune l'autre c'est le soleil"
  );

  return (
    <div className="bg-background grid min-h-screen place-items-center">
      <Card
        variant="outline"
        className="w-fit"
      >
        <CardHeader>
          <CardTitle>RandomArt Generator</CardTitle>
          <CardDescription>Inspired by Perrig & Song (CMU)</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
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
          />
        </CardContent>
      </Card>
    </div>
  );
}

export { App };

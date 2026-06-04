import { useEffect, useState } from 'react';

import { graphSchema } from '../schemas/graph.schema';
import type { GraphDataType } from '../types/graph';

export function useGraphData() {
  const [data, setData] = useState<GraphDataType | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGraphData = async () => {
      try {
        const response = await fetch('/graph.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch graph data: ${response.statusText}`);
        }
        const raw = await response.json();
        const result = graphSchema.safeParse(raw);
        
        if (!result.success) {
          const issues = result.error.issues || [];
          const firstError = issues[0];
          throw new Error(
            `Invalid graph data${firstError ? ` at ${firstError.path.join('.')}: ${firstError.message}` : ''}`
          );
        }
        
        setData(result.data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };

    loadGraphData();
  }, []);

  return { data, error, loading };
}

import { ControlSection } from '@repo/ui/control-panel';
import { CartesianGrid, Legend, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts';
import { features } from '../data/dataset/ts_objects/features';

const { featureNames, samples } = features;

const styles = {
  car: 'var(--primary)',
  fish: 'var(--red)',
  house: 'var(--yellow)',
  tree: 'var(--green)',
  bicycle: 'var(--aqua)',
  guitar: 'var(--blue)',
  pencil: 'var(--purple)',
  clock: 'var(--orange)'
} as const;

function Charts({ isAnimationActive = false }: { isAnimationActive?: boolean }) {
  const filtered = samples.toSpliced(100);
  return (
    <ControlSection title="charts">
      <ScatterChart
        className="aspect-square w-full max-w-xl"
        responsive
        margin={{
          top: 20,
          right: 20,
          bottom: 10,
          left: 10
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="number"
          name={featureNames[0]}
          dataKey="pathCount"
        />
        <YAxis
          type="number"
          name={featureNames[1]}
          dataKey="pointCount"
          width="auto"
        />
        <Tooltip
          cursor={{ strokeDasharray: '3 3' }}
          contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
        />
        <Legend />

        {Object.keys(styles).map((label) => {
          const points = filtered
            .filter((sample) => sample.label === label)
            .map((sample) => ({ pathCount: sample.point[0], pointCount: sample.point[1] }));
          if (points.length === 0) return null;
          return (
            <Scatter
              key={label}
              name={label}
              data={points}
              fill={styles[label as keyof typeof styles]}
              isAnimationActive={isAnimationActive}
            />
          );
        })}
      </ScatterChart>
    </ControlSection>
  );
}

export { Charts };

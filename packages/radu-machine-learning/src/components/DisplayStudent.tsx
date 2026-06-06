import type { Samples } from '../core/types';

type DisplayStudentProps = {
  samples: Samples;
};

function DisplayStudent({ samples }: DisplayStudentProps) {
  const { student_name } = samples[0];
  return (
    <div className="grid grid-cols-[10%_1fr] items-center gap-4 group/row">
      <h3 className="overflow-hidden text-ellipsis text-muted group-hover/row:text-foreground">
        {student_name}
      </h3>
      <div className="flex gap-4 overflow-y-auto">
        {Object.entries(samples).map((sample) => {
          const [index, { id, label }] = sample;
          return (
            <div
              key={index}
              className="flex gap-2  flex-col group/col "
            >
              <label className="text-xs text-muted text-center group-hover/col:text-foreground">
                {label}
              </label>
              <img
                loading="lazy"
                className="object-cover p-2  border border-border/10 rounded bg-black/50"
                src={`/img/${id}.svg`}
                alt={label}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
export { DisplayStudent };

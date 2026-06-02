import type { OutputType } from "../../store/manipulatorStore";
import { Output } from "./Output";

type OutputCardProps = {
  output: OutputType;
  index: number;
};

function OutputCard({ output, index }: OutputCardProps) {
  return (
    <div>
      <p className="pb-2 text-sm">
        {index}. {output.description}
      </p>
      <Output imageData={output.imageData} />
    </div>
  );
}

export { OutputCard };

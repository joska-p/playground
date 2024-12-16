import { useDebounce } from "@/hooks/use-debounce"
import { Label } from "@ui/label"
import { RadioGroup, RadioGroupItem } from "@ui/radio-group"
import { SidebarContent, SidebarGroup } from "@ui/sidebar"
import { Slider } from "@ui/slider"
import { useState } from "react"
import { createRacamanSequence } from "./lib/sequence"

type Props = {
  setSequence: (sequence: number[]) => void
  setDrawMode: (mode: string) => void
  drawMode: string
}

const Controls = ({ setSequence, setDrawMode, drawMode }: Props) => {
  const [sequenceLength, setSequenceLength] = useState(50)

  useDebounce(
    () => {
      setSequence(createRacamanSequence(sequenceLength))
    },
    100,
    [sequenceLength]
  )

  return (
    <SidebarContent className="space-y-6">
      <SidebarGroup className="space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <Label htmlFor="sequence-Length" className="text-sm">
            Sequence Length: {sequenceLength}
          </Label>
          <Slider
            id="sequence-Length"
            min={1}
            max={256}
            step={1}
            defaultValue={[sequenceLength]}
            onValueChange={(value) => {
              setSequenceLength(value[0])
            }}
          />
        </div>
      </SidebarGroup>
      <SidebarGroup>
        <RadioGroup defaultValue={drawMode} onValueChange={setDrawMode}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="canvas-mode" id="canvas-mode" />
            <Label htmlFor="canvas-mode">Canvas mode</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="vector-mode" id="vector-mode" />
            <Label htmlFor="vector-mode">Vector mode</Label>
          </div>
        </RadioGroup>
      </SidebarGroup>
    </SidebarContent>
  )
}

export default Controls

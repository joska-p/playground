import { Sidebar, SidebarInset, SidebarProvider, SidebarTrigger } from "@ui/sidebar"
import { useState } from "react"
import Canvas from "./canvas"
import Controls from "./controls"
import { createRacamanSequence } from "./lib/sequence"
import Vectors from "./vectors"

const Racaman = () => {
  const [sequence, setSequence] = useState<number[]>(createRacamanSequence(50))
  const [drawMode, setDrawMode] = useState("vector-mode")

  return (
    <SidebarProvider>
      <SidebarInset>
        {drawMode === "vector-mode" && <Vectors sequence={sequence} />}
        {drawMode === "canvas-mode" && <Canvas sequence={sequence} />}
        <SidebarTrigger variant="ghost" className="absolute right-2 top-2 bg-sidebar" />
      </SidebarInset>

      <Sidebar side="right" variant="inset">
        <Controls setSequence={setSequence} setDrawMode={setDrawMode} drawMode={drawMode} />
      </Sidebar>
    </SidebarProvider>
  )
}

export default Racaman
